import { Menu, MenuItem, Typography } from "@mui/material";
import { AuthContext } from "App";
import Cookies from "js-cookie";
import { signOut } from "lib/api/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderMenu = ({ anchorEl, open, onClose }) => {
  const { currentUser, setIsSignedIn } = useContext(AuthContext);
  const navigation = useNavigate();

  const handleSignOut = async (e) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        navigation("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem disabled>
        <Typography>{currentUser?.name}</Typography>
      </MenuItem>

      <MenuItem onClick={onClose} component={Link} to="/config" disabled>
        設定
      </MenuItem>
      
      <MenuItem onClick={(e) => { onClose(); handleSignOut(e); }}>
        LogOut
      </MenuItem>
    </Menu>
  );
};

export default HeaderMenu;
