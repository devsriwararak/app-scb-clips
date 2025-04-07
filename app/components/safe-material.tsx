'use client'

import {
  Button as MButton,
  Card as MCard,
  Checkbox as MCheckbox,
  Input as MInput,
  Typography as MTypography,
} from "@material-tailwind/react";

import type {
  ButtonProps,
  CardProps,
  CheckboxProps,
  InputProps,
  TypographyProps,
} from "@material-tailwind/react";

// สร้างคอมโพเนนต์ใหม่พร้อม autocomplete + ปิด error
export const Button = (props: ButtonProps) => <MButton {...(props as any)} />
export const Card = (props: CardProps) => <MCard {...(props as any)} />
export const Input = (props: InputProps) => <MInput {...(props as any)} />
export const Checkbox = (props: CheckboxProps) => <MCheckbox {...(props as any)} />
export const Typography = (props: TypographyProps) => <MTypography {...(props as any)} />