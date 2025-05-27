import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-5 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">Music</h1>
      <div className="flex items-center space-x-2">
        <ShoppingCartOutlinedIcon />
        <span className="text-xl font-medium">12</span>
      </div>
    </nav>
  );
};

export default Navbar;
