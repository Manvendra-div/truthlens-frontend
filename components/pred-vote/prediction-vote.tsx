"use client";

import { ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
// import { api } from "@/lib/api";

// const voteMutation = useMutation({
//     mutationFn: async (predictionId: number) => {
//         const response = await api.post(`/predictions/${predictionId}/vote`, {
//             vote: "up"
//             });
//         }
// });
export default function PredictionVote() {
    return (
        <div className="flex items-center border gap-1 w-fit py-1.5 px-2 rounded-full">
            <Button variant="ghost" size="icon-xs" className="hover:text-green-400">
                <ArrowBigUp className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-xs" className="hover:text-yellow-400"><ArrowBigDown className="size-4" /></Button>
        </div>
    );
}