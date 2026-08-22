export type ActivityCategory = 'Culture' | 'Food' | 'Adventure' | 'Nature' | 'Shopping' | 'Relaxation' | 'Transport' | 'Hotel';

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: ActivityCategory;
  time: string;
  duration: string;
  estimatedCost: number;
  image?: string;
  rating?: number;
  tags?: string[];
  notes?: string;
  completed?: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  title?: string;
  focus?: string;
  activities: Activity[];
}

export interface DestinationStop {
  id: string;
  city: string;
  country: string;
  image: string;
  nights: number;
  startDate: string;
  endDate: string;
  estCostPerDay?: number;
  popularityRating?: number;
  region?: string;
  costLevel?: 'Low' | 'Med' | 'High';
  description?: string;
  weatherForecast?: {
    temp: string;
    condition: string;
    icon: string;
  };
  days: DayItinerary[];
}

export type TripStatus = 'Draft' | 'Upcoming' | 'Ongoing' | 'Completed' | 'Planning';

export interface BudgetBreakdown {
  stay: number;
  transport: number;
  meals: number;
  activities: number;
  misc: number;
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: keyof BudgetBreakdown;
  amount: number;
  date: string;
  dayNumber?: number;
}

export interface PackingItem {
  id: string;
  title: string;
  category: 'Essentials' | 'Clothing' | 'Electronics' | 'Documents';
  packed: boolean;
}

export interface Trip {
  id: string;
  userId?: string;
  title: string;
  description: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: TripStatus;
  isPublic: boolean;
  creatorName?: string;
  creatorAvatar?: string;
  likesCount?: number;
  destinations: DestinationStop[];
  customExpenses?: ExpenseItem[];
  packingList?: PackingItem[];
  currency?: 'USD' | 'EUR' | 'INR' | 'GBP';
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  tier: string;
  avatar: string;
  tripsCompleted: number;
  countriesVisited: number;
  preferredLanguage: string;
  displayCurrency: string;
  savedDestinations: {
    city: string;
    country: string;
    image: string;
  }[];
}
