'use client'

import {
  Button as MButton,
  Card as MCard,
  CardBody as MCardBody,
  Checkbox as MCheckbox,
  Input as MInput,
  Typography as MTypography,
} from "@material-tailwind/react";

import type {
  ButtonProps,
  CardProps,
  CheckboxProps,
  InputProps,
  TypographyProps as MTWTypographyProps,
  CardBodyProps
} from "@material-tailwind/react";


type CustomVariant = 
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "lead"
  | "paragraph"
  | "small"
  | "body1"
  | "body2";

// ✅ ทำ CustomTypographyProps (แก้แค่ variant)
interface CustomTypographyProps extends Omit<MTWTypographyProps, 'variant'> {
  variant?: CustomVariant;
}



// สร้างคอมโพเนนต์ใหม่พร้อม autocomplete + ปิด error
export const Button = (props: ButtonProps) => <MButton {...(props as any)} />
export const Card = (props: CardProps) => <MCard {...(props as any)} className={`bg-white dark:bg-gray-800 ${props.className || ""}`} />
export const CardBody = (props: CardBodyProps) => <MCardBody {...(props as any)} />
export const Input = (props: InputProps) => <MInput {...(props as any)} />
export const Checkbox = (props: CheckboxProps) => <MCheckbox {...(props as any)} />
// export const Typography = (props: TypographyProps) => <MTypography {...(props as any)} />


export const Typography = (props: CustomTypographyProps) => {
  const { variant, className, ...rest } = props as any;

  const variantClass = {
    h1: "text-4xl font-bold text-gray-900 dark:text-gray-100",
    h2: "text-3xl font-bold text-gray-900 dark:text-gray-100",
    h3: "text-2xl font-semibold text-gray-900 dark:text-gray-100",
    h4: "text-xl font-semibold text-gray-900 dark:text-gray-100",
    body1: "text-base text-gray-800 dark:text-gray-200", // เข้ม
    body2: "text-sm text-gray-600 dark:text-gray-400",  // อ่อน
  }[variant] || "text-base text-gray-800 dark:text-gray-200"; // default fallback

  return (
    <MTypography
      {...rest}
      variant={variant}
      className={`${variantClass} ${className || ""}`}
    />
  )
}