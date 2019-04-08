export class User {
    _id: string;
    name: string;
    email: string;
    phone: number;
    country: string;
}

export class Subscriber {
    _id: string;
    fullName: string;
    email: string;
    password: string;
}

export class SubscriberLogin {
    email: string;
    password: string;
}
