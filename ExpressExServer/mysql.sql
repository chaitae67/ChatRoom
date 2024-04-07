-- Web_Back 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS Web_Back;

-- Web_Back 데이터베이스 선택
USE Web_Back;

-- User 테이블 생성
CREATE TABLE IF NOT EXISTS `User` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `personalID` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `nickname` VARCHAR(255) NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,
    `birthdate` DATE NULL,
    `role` VARCHAR(50) NULL,
    PRIMARY KEY (`ID`)
);

-- Image 테이블 생성
CREATE TABLE IF NOT EXISTS `Image` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(255) NULL,
    `originalFileName` VARCHAR(255) NULL,
    `creationDate` DATETIME NULL,
    PRIMARY KEY (`ID`)
);

-- Profile 테이블 생성
CREATE TABLE IF NOT EXISTS `Profile` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `userID` INT NOT NULL,
    `imageID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`userID`) REFERENCES `User` (`ID`),
    FOREIGN KEY (`imageID`) REFERENCES `Image` (`ID`)
);

-- ProductCategory 테이블 생성
CREATE TABLE IF NOT EXISTS `ProductCategory` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(100) NULL,
    PRIMARY KEY (`ID`)
);

-- ProductPost 테이블 생성
CREATE TABLE IF NOT EXISTS `ProductPost` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `status` VARCHAR(50) NULL,
    `views` INT NULL,
    `content` TEXT NULL,
    `creationDate` DATETIME NULL,
    `modificationDate` DATETIME NULL,
    `userID` INT NOT NULL,
    `categoryID` INT NOT NULL,
    `boardID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`userID`) REFERENCES `User` (`ID`),
    FOREIGN KEY (`categoryID`) REFERENCES `ProductCategory` (`ID`)
);

-- ChatRoom 테이블 생성
CREATE TABLE IF NOT EXISTS `ChatRoom` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `creationDate` DATETIME NULL,
    `buyerID` INT NOT NULL,
    `productID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`buyerID`) REFERENCES `User` (`ID`),
    FOREIGN KEY (`productID`) REFERENCES `ProductPost` (`ID`)
);

-- ChatMessage 테이블 생성
CREATE TABLE IF NOT EXISTS `ChatMessage` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `message` TEXT NULL,
    `readStatus` BOOLEAN NULL,
    `timestamp` DATETIME NULL,
    `isImage` BOOLEAN NULL,
    `chatRoomID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`chatRoomID`) REFERENCES `ChatRoom` (`ID`)
);

-- Board 테이블 생성
CREATE TABLE IF NOT EXISTS `Board` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `postTitle` VARCHAR(255) NULL,
    `creationDate` DATETIME NULL,
    PRIMARY KEY (`ID`)
);

-- ProductImage 테이블 생성
CREATE TABLE IF NOT EXISTS `ProductImage` (
    `imageID` INT NOT NULL,
    `productID` INT NOT NULL,
    PRIMARY KEY (`imageID`),
    FOREIGN KEY (`imageID`) REFERENCES `Image` (`ID`),
    FOREIGN KEY (`productID`) REFERENCES `ProductPost` (`ID`)
);

-- ChatImage 테이블 생성
CREATE TABLE IF NOT EXISTS `ChatImage` (
    `imageID` INT NOT NULL,
    `chatMessageID` INT NOT NULL,
    PRIMARY KEY (`imageID`),
    FOREIGN KEY (`imageID`) REFERENCES `Image` (`ID`),
    FOREIGN KEY (`chatMessageID`) REFERENCES `ChatMessage` (`ID`)
);

-- Post 테이블 생성
CREATE TABLE IF NOT EXISTS `Post` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `postTitle` VARCHAR(255) NULL,
    `views` INT NULL,
    `content` TEXT NULL,
    `creationDate` DATETIME NULL,
    `modificationDate` DATETIME NULL,
    `userID` INT NOT NULL,
    `boardID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`userID`) REFERENCES `User` (`ID`),
    FOREIGN KEY (`boardID`) REFERENCES `Board` (`ID`)
);

-- Comment 테이블 생성
CREATE TABLE IF NOT EXISTS `Comment` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `content` TEXT NULL,
    `creationDate` DATETIME NULL,
    `modificationDate` DATETIME NULL,
    `postID` INT NOT NULL,
    `userID` INT NOT NULL,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`postID`) REFERENCES `Post` (`ID`),
    FOREIGN KEY (`userID`) REFERENCES `User` (`ID`)
);

-- ProfileImage 테이블 생성
CREATE TABLE IF NOT EXISTS `ProfileImage` (
    `imageID` INT NOT NULL,
    `profileID` INT NOT NULL,
    PRIMARY KEY (`imageID`),
    FOREIGN KEY (`imageID`) REFERENCES `Image` (`ID`),
    FOREIGN KEY (`profileID`) REFERENCES `Profile` (`ID`)
);
