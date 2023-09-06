import React from "react";

const Avatar = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        className="w-14 h-14 rounded-1/2"
        src="https://cdn-images.kiotviet.vn/newsport700/f289fdb9aa724218a4ba44110af7a27c.jpg"
        alt=""
      />
      <p className="text-base font-semibolde text-white">Nguyễn Cường Phong</p>
    </div>
  );
};

export default Avatar;
