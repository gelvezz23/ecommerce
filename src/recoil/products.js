import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const productsState = atom({
  key: "products",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
