import React from "react";
import StarBg from './StarBg';
import GradBg from './GradBg';

export default function Bg({ type }) {
    return type === 'star' ? <StarBg /> : <GradBg />
}