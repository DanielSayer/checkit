import * as z from 'zod'

export const userRegisterSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Must be at least 8 characters in length')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Must contain at least one special character',
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    },
  )

export const userSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
})
