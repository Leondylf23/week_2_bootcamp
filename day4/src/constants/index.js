export const categoryList = [
    {
        id: "work",
        name: "Work"
    },
    {
        id: "family",
        name: "Family"
    },
    {
        id: "personal",
        name: "Personal"
    },

];
export const urlRegex = /^(ftp|http|https):\/\/[^ "]+|(www\.)[^ "]+\.[a-z]{2,}(\/[^ "]+)?$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emptyForm = {
    provider: "",
    email: "",
    password: "",
    category: ""
};
