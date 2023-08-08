import { z } from 'zod';

const UserSchema = z.object({
    name: z.string({required_error: 'The name field needs a value', invalid_type_error: 'That is not name valid'}).max(60, {message: 'The name field must be 60 or fewer characters long'}),
    imagen: z.string({required_error: 'The imagen field needs a value', invalid_type_error: 'That is not imagen valid'}).max(60, {message: 'The imagen field must be 60 o fewer characters long'}),
    email: z.email({message: 'Invalid email address', required_error: ' The email is required'}),
    password: z.string().min(8).max(100).refine(password => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasUppercase && hasLowercase && hasNumber;
      }, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
      active: z.number({invalid_type_error: 'That is not a number >:c'})
})

export default UserSchema;