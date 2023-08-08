import { z } from 'zod';

 const GroupSchema = z.object({
    description: z.string({required_error: 'The description field is required'}),
    url: z.url({required_error: 'The url field is required'}),
    imagen: z.string({required_error: 'The imagen field is required'})
 })

 export default GroupSchema;