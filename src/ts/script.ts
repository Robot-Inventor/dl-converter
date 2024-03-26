import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-button.js";
import type { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field.js";
import type { MdOutlinedButton } from "@material/web/button/outlined-button.js";
import type { MdFilledButton } from "@material/web/button/filled-button.js";
import table from "../json/table.json";

const userInput = document.querySelector<MdOutlinedTextField>("#user-input");
if (!userInput) {
    throw new Error("User input not found");
}

const decodeButton = document.querySelector<MdOutlinedButton>("#decode-button");
if (!decodeButton) {
    throw new Error("Decode button not found");
}

const encodeButton = document.querySelector<MdFilledButton>("#encode-button");
if (!encodeButton) {
    throw new Error("Encode button not found");
}

const resultTextBox = document.querySelector<MdOutlinedTextField>("#result-text-box");
if (!resultTextBox) {
    throw new Error("Result text box not found");
}

const encode = (input: string): string => {
    const keys = Object.keys(table) as Array<keyof typeof table>;

    for (const key of keys) {
        const value = table[key];
        if (typeof value === "string") {
            input = input.replaceAll(key, value);
        } else {
            value.forEach((v) => {
                input = input.replaceAll(v, key);
            });
        }
    }

    return input;
};

const decode = (input: string): string => {
    const keys = Object.keys(table) as Array<keyof typeof table>;

    for (const key of keys) {
        const value = table[key];
        if (typeof value === "string") {
            input = input.replaceAll(value, key);
        } else {
            value.forEach((v) => {
                input = input.replaceAll(v, key);
            });
        }
    }

    return input;
};

encodeButton.addEventListener("click", () => {
    resultTextBox.value = encode(userInput.value);
});

decodeButton.addEventListener("click", () => {
    resultTextBox.value = decode(userInput.value);
});
