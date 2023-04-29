export interface UserEntity {
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
}