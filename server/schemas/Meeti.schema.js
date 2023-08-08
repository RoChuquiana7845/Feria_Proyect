import { z } from 'zod';

const MeetiSchema = z.object({
    title: z.string({required_error: 'The title field is required'}),
    description: z.string({required_error: 'The description field is required'}),
    date: z.date({required_error: 'The date field is required', invalid_type_error: 'That is not a date, please  write the date correctly'}).min(new Date(), { message: 'I did not know you could go back in time, please write a valid date'} ),
    time: z.string({required_error: 'The time field is required, because how do people know when the meeting is'}),
    address: z.string({required_error: 'The address field is required'}),
    state: z.string({required_error: 'The state field is required'}),
    location: z.number({required_error: 'The location field is required', invalid_type_error: 'That is not a location'}),
    coordinates: z.number({required_error: 'the coordinates field is required', invalid_type_error: 'That is not a coordinates'}),
    interested: z.array(Z.number({invalid_type_error: 'That is not a number interested'}))
})

export default MeetiSchema; 
