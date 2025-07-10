import { memo } from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default memo(RootLayout);
