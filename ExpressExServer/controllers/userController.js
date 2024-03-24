const User = require('../models/user');

const userController = {};

userController.saveUser = async (userName, sid) => {
  try {
    // 이미 있는 유저인지 확인
    let user = await User.findOne({ name: userName });

    // 없다면 새로운 유저정보 만들기
    if (!user) {
      const newUser = new User({
        name: userName,
        token: sid,
        online: true,
      });
      user = await newUser.save(); // 새로운 사용자 정보를 저장하고 반환
    } else {
      // 이미 있는 유저라면 연경정보 token값만 바꾸기
      user.token = sid;
      user.online = true;
      await user.save(); // 기존 사용자 정보를 업데이트
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userController.checkUser = async (sid) => {
  const user = await User.findOne({ token: sid });
  if(!user) throw new Error("User not found");
  return user;
};


module.exports = userController;