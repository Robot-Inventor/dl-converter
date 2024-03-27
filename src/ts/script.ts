import "@material/web/textfield/outlined-text-field.js";
import "@material/web/button/outlined-button.js";
import "@material/web/button/filled-button.js";
import "@material/web/switch/switch.js";
import type { MdOutlinedTextField } from "@material/web/textfield/outlined-text-field.js";
import type { MdOutlinedButton } from "@material/web/button/outlined-button.js";
import type { MdFilledButton } from "@material/web/button/filled-button.js";
import type { MdSwitch } from "@material/web/switch/switch.js";
import slangTable from "../json/table.json";
import primeTable from "../json/prime-table.json";

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

const primeSwitch = document.querySelector<MdSwitch>("#prime-switch");
if (!primeSwitch) {
    throw new Error("Prime switch not found");
}

const encode = (input: string): string => {
    if (primeSwitch.selected) {
        const keys = Object.keys(primeTable).sort((a, b) => b.length - a.length) as Array<keyof typeof primeTable>;
        let output = 1;
        for (const key of keys) {
            const value = primeTable[key];
            if (typeof value === "number") {
                if (input.includes(key)) {
                    output *= value;
                    input = input.replaceAll(key, value.toString());
                }
            } else {
                value.forEach((v) => {
                    if (input.includes(key)) {
                        output *= v;
                        input = input.replaceAll(key, v.toString());
                    }
                }
                );
            }
        }
        input = output.toString();


    } else {

        // キーを長い順にソート
        // 長いものから置換することで、長いもの（例：催眠音声）が誤って短いもの（例：催眠）として置換されることを防ぐ
        const keys = Object.keys(slangTable).sort((a, b) => b.length - a.length) as Array<keyof typeof slangTable>;

        for (const key of keys) {
            const value = slangTable[key];
            if (typeof value === "string") {
                input = input.replaceAll(key, value);
            } else {
                input = input.replaceAll(key, value[0]);
            }
        }
    }

    return input;
};

const decode = (input: string): string => {
    if (primeSwitch.selected) {
        const inputNumber = parseInt(input, 10);
        if (isNaN(inputNumber) || inputNumber < 1) {
            return "自然数を入力してください";
        }
        let decodedText = "";
        const keys = Object.keys(primeTable).sort((a, b) => b.length - a.length) as Array<keyof typeof primeTable>;
        for (const key of keys) {
            const value = primeTable[key];
            if (typeof value === "number") {
                if (inputNumber % value === 0) {
                    decodedText += key;
                }
            } else {
                value.forEach((v) => {
                    if (inputNumber % v === 0) {
                        decodedText += key;
                    }
                });
            }
        }
        if (decodedText === "") {
            decodedText = "健全なテキストです";
        }
        input = decodedText;

    } else {
        // キーを長い順にソート
        // 長いものから置換することで、長いもの（例：催眠音声）が誤って短いもの（例：催眠）として置換されることを防ぐ
        const keys = Object.keys(slangTable).sort((a, b) => b.length - a.length) as Array<keyof typeof slangTable>;

        for (const key of keys) {
            const value = slangTable[key];
            if (typeof value === "string") {
                input = input.replaceAll(value, key);
            } else {
                value.forEach((v) => {
                    input = input.replaceAll(v, key);
                });
            }
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

