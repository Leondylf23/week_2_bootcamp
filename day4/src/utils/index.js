import { categoryList } from "../constants";

export function getCategoryName(category) {
    const index = categoryList.findIndex(v => v.id === category);

    return index != -1 ? categoryList[index]?.name : "";
}