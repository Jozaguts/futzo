import {isDate} from "date-fns";
import type {DatePosition} from "~/models/Schedule";

export default function useCalendar() {
    const dp = ref();
    const dateToString = (date: Date): string => {
        return new Date(date).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatDate = (date: Date): string => {
        if (Array.isArray(date)) {
            return date
                .map((date) => {
                    return dateToString(date);
                })
                .join(" - ");
        } else {
            return dateToString(date);
        }
    };
    const getDate = (value: Date | Date[] | null, index: DatePosition) => {
        if (!value) return;
        if (isDate(value)) {
            return dateToString(value);
        }
        const dates = (value as Date[]).map((date) => formatDate(date));
        return dates[index - 1];
    };
    const selectDate = (dates: Ref<Date>) => {
        dp.value.selectDate();
    };
    const customPosition = (
        inputElement?: HTMLElement,
    ): {
        top: number | string;
        left: number | string;
        transform?: string;
    } => {
        const inputRect = inputElement?.getBoundingClientRect() as DOMRect;
        return {
            top: inputRect.top,
            left: inputRect.left,
            transform: "",
        };
    };

    return {
        getDate,
        customPosition,
        selectDate,
        formatDate,
        dp,
    };
}
