export interface User {
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
  location: { state: string; city: string };
  email: string;
  phone: string;
  registered: { date: string };
}
