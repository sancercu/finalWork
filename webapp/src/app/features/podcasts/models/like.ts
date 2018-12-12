import { User } from '../../../models/user';
import { Podcast } from './podcast';

export class Like {
    id: number;
    podcast: Podcast;
    user: User;
}