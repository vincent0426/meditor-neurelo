import { UsersApiService } from "neurelo-sdk";

export const getUserById = async (id: string) => {
  try {
    const res = await UsersApiService.findUsersByUserId(id);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};