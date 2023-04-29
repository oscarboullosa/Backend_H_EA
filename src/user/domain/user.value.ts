import {v4 as uuid} from "uuid";
import { AuthEntity, UserAuthEntity, UserEntity } from "./user.entity";

export class UserValue implements UserEntity{
    uuid:string;
    appUser: string;
    nameUser: string;
    surnameUser: string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: "male" | "female";
    ocupationUser?: string;
    descriptionUser: string;
    roleUser: "admin" | "common" | "verified" | "business";
    privacyUser: boolean;
    deletedUser: boolean;
    followersUser?: [string];
    followedUser?: [string];

    constructor({appUser,nameUser,surnameUser,photoUser,birthdateUser,genderUser,ocupationUser,descriptionUser,roleUser,privacyUser,deletedUser,followedUser,followersUser}:{appUser:string,nameUser:string,surnameUser:string,photoUser:string,birthdateUser:Date,genderUser:"male" | "female",ocupationUser?: string,descriptionUser: string,roleUser: "admin" | "common" | "verified" | "business",privacyUser: boolean,deletedUser: boolean,followersUser?: [string],followedUser?: [string]}){
        this.uuid=uuid();
        this.appUser=appUser;
        this.nameUser=nameUser;
        this.surnameUser=surnameUser;
        this.photoUser=photoUser;
        this.birthdateUser=birthdateUser;
        this.genderUser=genderUser;
        this.ocupationUser = ocupationUser  ?? "default";
        this.descriptionUser=descriptionUser;
        this.roleUser=roleUser;
        this.privacyUser=privacyUser;
        this.deletedUser=deletedUser;
        this.followedUser=followersUser;
        this.followersUser=followersUser;
    }
}

export class AuthValue implements AuthEntity{
    mailUser: string;
    passwordUser: string;

    constructor ({mailUser,passwordUser}:{mailUser:string,passwordUser:string}){
        this.mailUser=mailUser;
        this.passwordUser=passwordUser;
    }
}

export class UserAuthValue implements UserAuthEntity{
    uuid:string;
    appUser: string;
    nameUser: string;
    surnameUser: string;
    mailUser: string;
    passwordUser: string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: "male" | "female";
    ocupationUser?: string;
    descriptionUser: string;
    roleUser: "admin" | "common" | "verified" | "business";
    privacyUser: boolean;
    deletedUser: boolean;
    followersUser?: [string];
    followedUser?: [string];

    constructor({appUser,nameUser,surnameUser,mailUser,passwordUser,photoUser,birthdateUser,genderUser,ocupationUser,descriptionUser,roleUser,privacyUser,deletedUser,followedUser,followersUser}:{appUser:string,nameUser:string,surnameUser:string,mailUser:string,passwordUser:string,photoUser:string,birthdateUser:Date,genderUser:"male" | "female",ocupationUser?: string,descriptionUser: string,roleUser: "admin" | "common" | "verified" | "business",privacyUser: boolean,deletedUser: boolean,followersUser?: [string],followedUser?: [string]}){
        this.uuid=uuid();
        this.appUser=appUser;
        this.nameUser=nameUser;
        this.surnameUser=surnameUser;
        this.mailUser=mailUser;
        this.passwordUser=passwordUser;
        this.photoUser=photoUser;
        this.birthdateUser=birthdateUser;
        this.genderUser=genderUser;
        this.ocupationUser = ocupationUser  ?? "default";
        this.descriptionUser=descriptionUser;
        this.roleUser=roleUser;
        this.privacyUser=privacyUser;
        this.deletedUser=deletedUser;
        this.followedUser=followersUser;
        this.followersUser=followersUser;
    }
}
