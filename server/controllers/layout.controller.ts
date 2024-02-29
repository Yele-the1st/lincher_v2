import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import layoutModel, { ILayout, IFaqItem } from "../models/layout.model";
import cloudinary from "cloudinary";

// create layout
export const createLayout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;
    const isTypeExist = await layoutModel.findOne({ type });
    if (isTypeExist) {
      return next(new ErrorHandler(`${type} already Exist`, 400));
    }

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "layout",
      });
      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        },
      };
      await layoutModel.create(banner);
    } else if (type === "FAQ") {
      // Assuming req.body.faq is an array of FAQ items

      const faq = req.body.faq as IFaqItem[];
      const layout = await layoutModel.create({ type, faq });
    } else if (type === "Categories") {
      const { categories } = req.body;
      await layoutModel.create({ type, categories });
    }

    res.status(200).json({
      success: true,
      message: "Layout created successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Edit layout

// Helper function to update a layout type
const updateLayoutType = async (type: string, data: any) => {
  const layoutData: any = await layoutModel.findOne({ type });

  if (!layoutData) {
    throw new ErrorHandler(`Layout type '${type}' not found`, 404);
  }

  return layoutModel.findByIdAndUpdate(layoutData._id, data);
};

// edit layout
export const editLayout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.body;

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;
      const bannerData: any = await layoutModel.findOne({ type: "Banner" });

      let myCloud;

      if (!image.startsWith("https")) {
        // New image is being uploaded
        if (bannerData && bannerData.image && bannerData.image.public_id) {
          // Delete the old image from Cloudinary
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }

        // Upload the new image to Cloudinary
        myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
      } else {
        // Use the existing external image URL
        myCloud = {
          public_id: bannerData.banner.image.public_id,
          secure_url: bannerData.banner.image.url,
        };
      }

      const banner = {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        title,
        subTitle,
      };
      await updateLayoutType("Banner", { banner });
    } else if (type === "FAQ") {
      // Assuming req.body.faq is an array of FAQ items
      const faq = req.body.faq as IFaqItem[];
      await updateLayoutType("FAQ", { type, faq });
    } else if (type === "Categories") {
      const { categories } = req.body;
      await updateLayoutType("Categories", { type, categories });
    }

    res.status(200).json({
      success: true,
      message: "Layout edited successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// get layout by type
export const getLayoutByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.params; // Assuming the type is passed as a URL parameter

    const layout = await layoutModel.findOne({ type });

    if (!layout) {
      throw new ErrorHandler(`Layout type '${type}' not found`, 404);
    }

    res.status(200).json({
      success: true,
      layout,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
