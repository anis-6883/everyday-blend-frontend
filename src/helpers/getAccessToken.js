import { quizCraftBackend } from "./getAxiosInstances";

export default async function getAccessToken(token) {
  try {
    const { data } = await quizCraftBackend.post(
      "/api/user/refresh-token",
      {},
      {
        headers: {
          Authorization: `Refresh ${token.refreshToken}`,
        },
      },
    );

    if (data?.status) {
      return {
        ...token,
        accessToken: data?.data?.accessToken,
        refreshToken: data?.data?.refreshToken,
        expiresIn: data?.data?.expiresIn,
      };
    }
  } catch (error) {
    console.log("Something went wrong on refreshToken!");
  }
}
