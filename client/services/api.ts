// Types
export interface Character {
  id: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  description: string;
  ability: string;
  redeemed: number;
  image?: string;
}

export interface Pet {
  id: string;
  name: string;
  sub_title: string;
  description: string;
  ability: string;
  image?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  hp: number;
  acceleration_torque: number;
  speed: number;
  control: number;
  seats: number;
  ideal_use_case: string;
  image?: string;
}

export interface DashboardSummary {
  totalCharacters: number;
  totalPets: number;
  totalVehicles: number;
}

// Mock data for frontend-only demo
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Warrior Zara',
    gender: 'Female',
    age: 25,
    description: 'A fierce warrior from the northern lands with unmatched sword skills',
    ability: 'Sword Master',
    redeemed: 150,
    image: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Mage Elara',
    gender: 'Female',
    age: 30,
    description: 'Powerful sorceress with elemental magic abilities',
    ability: 'Elemental Magic',
    redeemed: 200,
    image: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Knight Gareth',
    gender: 'Male',
    age: 35,
    description: 'Noble knight with unwavering loyalty and defensive prowess',
    ability: 'Shield Wall',
    redeemed: 180,
    image: '/placeholder.svg',
  },
];

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Fire Phoenix',
    sub_title: 'Legendary Companion',
    description: 'A majestic fire bird with healing powers and fierce loyalty',
    ability: 'Fire Healing',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Ice Wolf',
    sub_title: 'Arctic Guardian',
    description: 'A loyal wolf companion from the frozen lands',
    ability: 'Ice Shield',
    image: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Shadow Cat',
    sub_title: 'Stealth Hunter',
    description: 'A mysterious feline with stealth and agility abilities',
    ability: 'Shadow Step',
    image: '/placeholder.svg',
  },
];

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Lightning Bike',
    hp: 250,
    acceleration_torque: 85,
    speed: 180,
    control: 92,
    seats: 2,
    ideal_use_case: 'Racing and quick travel through urban areas',
    image: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Storm Cruiser',
    hp: 400,
    acceleration_torque: 95,
    speed: 220,
    control: 88,
    seats: 4,
    ideal_use_case: 'Long distance travel and heavy cargo transport',
    image: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Sky Glider',
    hp: 180,
    acceleration_torque: 70,
    speed: 160,
    control: 95,
    seats: 2,
    ideal_use_case: 'Aerial reconnaissance and scouting missions',
    image: '/placeholder.svg',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    await delay(800);
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        message: 'Login successful',
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    throw new Error('Invalid credentials');
  },
};

// Dashboard API
export const dashboardAPI = {
  getSummary: async (): Promise<DashboardSummary> => {
    await delay(500);
    return {
      totalCharacters: mockCharacters.length,
      totalPets: mockPets.length,
      totalVehicles: mockVehicles.length,
    };
  },
};

// Characters API
export const charactersAPI = {
  getAll: async (): Promise<Character[]> => {
    await delay(600);
    return [...mockCharacters];
  },
  getById: async (id: string): Promise<Character> => {
    await delay(300);
    const character = mockCharacters.find(c => c.id === id);
    if (!character) throw new Error('Character not found');
    return character;
  },
  create: async (formData: FormData): Promise<Character> => {
    await delay(800);
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
      age: parseInt(formData.get('age') as string),
      description: formData.get('description') as string,
      ability: formData.get('ability') as string,
      redeemed: parseInt(formData.get('redeemed') as string),
      image: '/placeholder.svg',
    };
    mockCharacters.push(newCharacter);
    return newCharacter;
  },
  update: async (id: string, formData: FormData): Promise<Character> => {
    await delay(800);
    const index = mockCharacters.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Character not found');
    
    mockCharacters[index] = {
      ...mockCharacters[index],
      name: formData.get('name') as string,
      gender: formData.get('gender') as 'Male' | 'Female' | 'Other',
      age: parseInt(formData.get('age') as string),
      description: formData.get('description') as string,
      ability: formData.get('ability') as string,
      redeemed: parseInt(formData.get('redeemed') as string),
    };
    return mockCharacters[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockCharacters.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Character not found');
    mockCharacters.splice(index, 1);
  },
};

// Pets API
export const petsAPI = {
  getAll: async (): Promise<Pet[]> => {
    await delay(600);
    return [...mockPets];
  },
  create: async (formData: FormData): Promise<Pet> => {
    await delay(800);
    const newPet: Pet = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      sub_title: formData.get('sub_title') as string,
      description: formData.get('description') as string,
      ability: formData.get('ability') as string,
      image: '/placeholder.svg',
    };
    mockPets.push(newPet);
    return newPet;
  },
  update: async (id: string, formData: FormData): Promise<Pet> => {
    await delay(800);
    const index = mockPets.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Pet not found');
    
    mockPets[index] = {
      ...mockPets[index],
      name: formData.get('name') as string,
      sub_title: formData.get('sub_title') as string,
      description: formData.get('description') as string,
      ability: formData.get('ability') as string,
    };
    return mockPets[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockPets.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Pet not found');
    mockPets.splice(index, 1);
  },
};

// Vehicles API
export const vehiclesAPI = {
  getAll: async (): Promise<Vehicle[]> => {
    await delay(600);
    return [...mockVehicles];
  },
  create: async (formData: FormData): Promise<Vehicle> => {
    await delay(800);
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      hp: parseInt(formData.get('hp') as string),
      acceleration_torque: parseInt(formData.get('acceleration_torque') as string),
      speed: parseInt(formData.get('speed') as string),
      control: parseInt(formData.get('control') as string),
      seats: parseInt(formData.get('seats') as string),
      ideal_use_case: formData.get('ideal_use_case') as string,
      image: '/placeholder.svg',
    };
    mockVehicles.push(newVehicle);
    return newVehicle;
  },
  update: async (id: string, formData: FormData): Promise<Vehicle> => {
    await delay(800);
    const index = mockVehicles.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vehicle not found');
    
    mockVehicles[index] = {
      ...mockVehicles[index],
      name: formData.get('name') as string,
      hp: parseInt(formData.get('hp') as string),
      acceleration_torque: parseInt(formData.get('acceleration_torque') as string),
      speed: parseInt(formData.get('speed') as string),
      control: parseInt(formData.get('control') as string),
      seats: parseInt(formData.get('seats') as string),
      ideal_use_case: formData.get('ideal_use_case') as string,
    };
    return mockVehicles[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockVehicles.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vehicle not found');
    mockVehicles.splice(index, 1);
  },
};
