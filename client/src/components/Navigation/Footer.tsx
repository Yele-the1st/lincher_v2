// components/Footer.js

const Footer = () => {
  return (
    <footer className=" bg-secondary py-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row md:justify-between md:items-center">
        <div>
          <p>&copy; {new Date().getFullYear()} Lincher. All rights reserved.</p>
        </div>
        <div>
          <ul className=" md:flex md:space-x-4">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Courses</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
