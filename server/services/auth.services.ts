import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { Secret } from "jsonwebtoken";
import sendMail from "../utils/sendMail";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

// Registration user

export const registerUser = async (
  userData: IRegistrationBody
): Promise<IActivationToken> => {
  const { name, email, password } = userData;

  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist) {
    throw new ErrorHandler("Email already exists", 400);
  }

  const activationToken = createActivationToken(userData);

  const activationCode = activationToken.activationCode;

  const data = { user: { name: userData.name }, activationCode };

  try {
    await sendMail({
      email: userData.email,
      subject: "Activate your account",
      template: "activation-mail.ejs",
      data,
    });

    return activationToken; // Return the activation token
  } catch (error: any) {
    throw new ErrorHandler(error.message, 400);
  }
};

// Create Activation Token

export const createActivationToken = (
  user: IRegistrationBody
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

// Activate User

export const activateUser = async (
  activationData: IActivationRequest
): Promise<IUser> => {
  const { activation_code, activation_token } = activationData;
  try {
    const newUser: { user: IUser; activationCode: string } = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as Secret
    ) as { user: IUser; activationCode: string };

    if (newUser.activationCode !== activation_code) {
      throw new ErrorHandler("Invalid activation code", 400);
    }

    const { name, email, password } = newUser.user;

    const existUser = await userModel.findOneAndRemove({ email });

    if (existUser) {
      throw new ErrorHandler("Email already exists", 400);
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });
    return user;
  } catch (error: any) {
    throw new ErrorHandler(error.message, 400); // Re-throw any caught error for handling in the controller
  }
};

// Login User

export const loginUser = async (loginDetails: ILoginRequest) => {
  const { email, password } = loginDetails;
  try {
    // Check if email and password are provided
    if (!email || !password) {
      throw new ErrorHandler("Please enter email and password", 400);
    }

    // Find the user by email in the database
    const user = await userModel.findOne({ email }).select("+password");

    // If no user is found, throw an error
    if (!user) {
      throw new ErrorHandler("Invalid email or password", 400);
    }

    // Compare the provided password with the stored password hash
    const isPasswordMatch = await user.comparePassword(password);

    // If the passwords do not match, throw an error
    if (!isPasswordMatch) {
      throw new ErrorHandler("Invalid email or password", 400);
    }

    return user; // Authentication succeeded; return the user object
  } catch (error: any) {
    throw new ErrorHandler(error.message, 400); // Re-throw any caught error for handling in the controller
  }
};
