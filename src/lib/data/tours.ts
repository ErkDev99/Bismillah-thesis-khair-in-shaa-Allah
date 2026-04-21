// src/lib/data/tours.ts
// Centralized tour data - replace with CMS or database later

export interface Tour {
  id: number;
  slug: string;
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
  longDescription: string;
  longDescriptionRu?: string;
  location: string;
  locationRu?: string;
  destination: string;
  duration: string;
  durationRu?: string;
  durationDays: number;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  difficulty: "Easy" | "Moderate" | "Challenging";
  groupSize: string;
  groupSizeRu?: string;
  category: "cultural" | "adventure";
  highlights: string[];
  highlightsRu?: string[];
  included: string[];
  includedRu?: string[];
  notIncluded: string[];
  notIncludedRu?: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  itineraryRu?: {
    day: number;
    title: string;
    description: string;
  }[];
  featured: boolean;
}

export const tours: Tour[] = [
  {
    id: 1,
    slug: "silk-road-adventure",
    title: "Silk Road Adventure",
    titleRu: "Приключение по Шёлковому пути",
    description:
      "Trace the ancient trade routes through stunning landscapes and historic cities.",
    descriptionRu:
      "Проследите древние торговые пути через потрясающие пейзажи и исторические города.",
    longDescription:
      "Embark on an unforgettable journey along the legendary Silk Road, where ancient civilizations once traded precious goods, ideas, and cultures. This comprehensive tour takes you through breathtaking mountain passes, ancient caravanserais, and vibrant bazaars that have remained virtually unchanged for centuries.",
    longDescriptionRu:
      "Отправляйтесь в незабываемое путешествие по легендарному Шёлковому пути, где когда-то древние цивилизации обменивались драгоценными товарами, идеями и культурами. Этот насыщенный тур проведёт вас через захватывающие горные перевалы, древние караван-сараи и оживлённые базары, которые почти не изменились за века.",
    location: "Central Asia",
    locationRu: "Центральная Азия",
    destination: "kazakhstan",
    duration: "10 Days",
    durationRu: "10 дней",
    durationDays: 10,
    price: 2499,
    rating: 4.9,
    reviewCount: 127,
    image: "/images/tours/silk-road.jpg",
    gallery: [
      "/images/tours/silk-road-1.jpg",
      "/images/tours/silk-road-2.jpg",
      "/images/tours/silk-road-3.jpg",
    ],
    difficulty: "Moderate",
    groupSize: "4-12 people",
    groupSizeRu: "4–12 человек",
    category: "cultural",
    highlights: [
      "Visit ancient Silk Road cities",
      "Explore traditional bazaars",
      "Stay in authentic caravanserais",
      "Experience local hospitality",
      "Photograph stunning mountain scenery",
    ],
    highlightsRu: [
      "Посещение древних городов Шёлкового пути",
      "Прогулки по традиционным базарам",
      "Ночёвки в аутентичных караван-сараях",
      "Знакомство с местным гостеприимством",
      "Съёмка потрясающих горных пейзажей",
    ],
    included: [
      "Airport transfers",
      "9 nights accommodation",
      "Daily breakfast and dinner",
      "English-speaking guide",
      "All entrance fees",
      "Transportation in comfortable vehicle",
    ],
    includedRu: [
      "Трансферы из/в аэропорт",
      "9 ночей проживания",
      "Ежедневный завтрак и ужин",
      "Англоговорящий гид",
      "Все входные билеты",
      "Транспорт в комфортабельном автомобиле",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Lunch meals",
      "Tips for guides and drivers",
    ],
    notIncludedRu: [
      "Международные авиаперелёты",
      "Туристическая страховка",
      "Личные расходы",
      "Обеды",
      "Чаевые гидам и водителям",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Almaty",
        description:
          "Welcome to Kazakhstan! Transfer to your hotel and evening welcome dinner.",
      },
      {
        day: 2,
        title: "Almaty City Tour",
        description:
          "Explore the cultural capital with visits to museums, parks, and the famous Green Bazaar.",
      },
      {
        day: 3,
        title: "Charyn Canyon",
        description:
          "Day trip to the spectacular Charyn Canyon, often compared to the Grand Canyon.",
      },
      {
        day: 4,
        title: "Journey to Kolsai Lakes",
        description:
          "Drive through beautiful mountain scenery to the pristine Kolsai Lakes.",
      },
      {
        day: 5,
        title: "Kolsai Lakes Hiking",
        description:
          "Full day of hiking around the stunning alpine lakes surrounded by spruce forests.",
      },
      {
        day: 6,
        title: "Transfer to Kaindy Lake",
        description:
          "Visit the mysterious sunken forest of Kaindy Lake before continuing east.",
      },
      {
        day: 7,
        title: "Border Crossing & Karakol",
        description:
          "Cross into Kyrgyzstan and arrive at the charming town of Karakol.",
      },
      {
        day: 8,
        title: "Issyk-Kul Lake",
        description:
          "Explore the shores of the world's second-largest alpine lake.",
      },
      {
        day: 9,
        title: "Return to Almaty",
        description:
          "Scenic drive back through the mountains with stops at viewpoints.",
      },
      {
        day: 10,
        title: "Departure",
        description:
          "Transfer to airport for your onward journey. Farewell!",
      },
    ],
    itineraryRu: [
      {
        day: 1,
        title: "Прилёт в Алматы",
        description:
          "Добро пожаловать в Казахстан! Трансфер в отель и приветственный ужин.",
      },
      {
        day: 2,
        title: "Обзорная экскурсия по Алматы",
        description:
          "Знакомство с культурной столицей: музеи, парки и знаменитый Зелёный базар.",
      },
      {
        day: 3,
        title: "Чарынский каньон",
        description:
          "Однодневная поездка в потрясающий Чарынский каньон, который часто сравнивают с Гранд-Каньоном.",
      },
      {
        day: 4,
        title: "Переезд к Кольсайским озёрам",
        description:
          "Дорога через живописные горы к чистейшим Кольсайским озёрам.",
      },
      {
        day: 5,
        title: "Походы вокруг Кольсайских озёр",
        description:
          "Целый день пеших прогулок вокруг горных озёр среди еловых лесов.",
      },
      {
        day: 6,
        title: "Переезд к озеру Каинды",
        description:
          "Посещение таинственного затопленного леса озера Каинды перед продолжением пути на восток.",
      },
      {
        day: 7,
        title: "Пересечение границы и Каракол",
        description:
          "Переезд в Кыргызстан, прибытие в уютный город Каракол.",
      },
      {
        day: 8,
        title: "Озеро Иссык-Куль",
        description:
          "Прогулка вдоль берегов второго по величине горного озера в мире.",
      },
      {
        day: 9,
        title: "Возвращение в Алматы",
        description:
          "Живописная дорога обратно через горы с остановками на смотровых площадках.",
      },
      {
        day: 10,
        title: "Отъезд",
        description:
          "Трансфер в аэропорт. До новых встреч!",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    slug: "mountain-expedition",
    title: "Mountain Expedition",
    titleRu: "Горная экспедиция",
    description:
      "Challenge yourself with breathtaking hikes through the majestic Tian Shan mountains.",
    descriptionRu:
      "Испытайте себя захватывающими походами по величественным горам Тянь-Шаня.",
    longDescription:
      "For adventure seekers and nature lovers, this expedition takes you deep into the heart of the Tian Shan mountain range. Experience pristine wilderness, encounter nomadic herders, and witness some of the most spectacular mountain scenery on Earth.",
    longDescriptionRu:
      "Для любителей приключений и природы эта экспедиция уведёт вас в самое сердце Тянь-Шаня. Нетронутая дикая природа, встречи с кочевыми пастухами и одни из самых впечатляющих горных пейзажей на планете.",
    location: "Tian Shan Mountains",
    locationRu: "Горы Тянь-Шань",
    destination: "kyrgyzstan",
    duration: "7 Days",
    durationRu: "7 дней",
    durationDays: 7,
    price: 1899,
    rating: 4.8,
    reviewCount: 89,
    image: "/images/tours/mountains.jpg",
    gallery: [
      "/images/tours/mountains-1.jpg",
      "/images/tours/mountains-2.jpg",
      "/images/tours/mountains-3.jpg",
    ],
    difficulty: "Challenging",
    groupSize: "4-8 people",
    groupSizeRu: "4–8 человек",
    category: "adventure",
    highlights: [
      "Trek through pristine wilderness",
      "Camp under star-filled skies",
      "Meet nomadic herders",
      "Summit a 4000m peak",
      "Visit high-altitude lakes",
    ],
    highlightsRu: [
      "Походы по нетронутой природе",
      "Ночёвки под звёздным небом",
      "Встречи с кочевыми пастухами",
      "Восхождение на вершину 4000 м",
      "Посещение высокогорных озёр",
    ],
    included: [
      "All camping equipment",
      "Professional mountain guide",
      "All meals during trek",
      "Permits and fees",
      "Emergency satellite phone",
      "First aid kit",
    ],
    includedRu: [
      "Всё снаряжение для кемпинга",
      "Профессиональный горный гид",
      "Все приёмы пищи во время похода",
      "Разрешения и сборы",
      "Спутниковый телефон на случай ЧП",
      "Аптечка",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance (required)",
      "Personal trekking gear",
      "Tips",
      "Pre/post tour accommodation",
    ],
    notIncludedRu: [
      "Международные авиаперелёты",
      "Туристическая страховка (обязательна)",
      "Личное трекинговое снаряжение",
      "Чаевые",
      "Проживание до/после тура",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Briefing",
        description:
          "Arrive in Bishkek, equipment check, and detailed expedition briefing.",
      },
      {
        day: 2,
        title: "Transfer to Base Camp",
        description:
          "Drive to the mountains and establish our first camp at 2,800m.",
      },
      {
        day: 3,
        title: "Acclimatization Hike",
        description:
          "Moderate hike to help acclimatize, reaching 3,500m before returning to camp.",
      },
      {
        day: 4,
        title: "High Camp",
        description:
          "Trek to high camp at 3,800m with stunning views of surrounding peaks.",
      },
      {
        day: 5,
        title: "Summit Day",
        description:
          "Early start for summit attempt, reaching 4,200m before descending.",
      },
      {
        day: 6,
        title: "Descent & Celebration",
        description:
          "Trek back to base camp, celebration dinner under the stars.",
      },
      {
        day: 7,
        title: "Return & Departure",
        description:
          "Drive back to Bishkek, farewell lunch, and airport transfer.",
      },
    ],
    itineraryRu: [
      {
        day: 1,
        title: "Прибытие и брифинг",
        description:
          "Прибытие в Бишкек, проверка снаряжения и подробный брифинг перед экспедицией.",
      },
      {
        day: 2,
        title: "Переезд в базовый лагерь",
        description:
          "Дорога в горы и установка первого лагеря на высоте 2800 м.",
      },
      {
        day: 3,
        title: "Акклиматизационный поход",
        description:
          "Умеренный поход для акклиматизации до 3500 м с возвращением в лагерь.",
      },
      {
        day: 4,
        title: "Верхний лагерь",
        description:
          "Переход к верхнему лагерю на 3800 м с видами на окружающие вершины.",
      },
      {
        day: 5,
        title: "День штурма",
        description:
          "Ранний выход для восхождения на 4200 м с последующим спуском.",
      },
      {
        day: 6,
        title: "Спуск и праздник",
        description:
          "Возвращение в базовый лагерь, праздничный ужин под звёздами.",
      },
      {
        day: 7,
        title: "Возвращение и отъезд",
        description:
          "Дорога в Бишкек, прощальный обед и трансфер в аэропорт.",
      },
    ],
    featured: true,
  },
  {
    id: 3,
    slug: "cultural-heritage-tour",
    title: "Cultural Heritage Tour",
    titleRu: "Тур по культурному наследию",
    description:
      "Immerse yourself in the rich history and traditions of Central Asian civilizations.",
    descriptionRu:
      "Погрузитесь в богатую историю и традиции цивилизаций Центральной Азии.",
    longDescription:
      "Discover the architectural wonders and living traditions of Central Asia on this cultural immersion. From UNESCO World Heritage sites to intimate encounters with local artisans, this tour reveals the depth and beauty of one of the world's oldest cultural crossroads.",
    longDescriptionRu:
      "Откройте для себя архитектурные чудеса и живые традиции Центральной Азии в этом культурном погружении. От объектов Всемирного наследия ЮНЕСКО до личных встреч с местными мастерами — тур раскрывает глубину и красоту одного из древнейших культурных перекрёстков мира.",
    location: "Historic Cities",
    locationRu: "Исторические города",
    destination: "uzbekistan",
    duration: "5 Days",
    durationRu: "5 дней",
    durationDays: 5,
    price: 1299,
    rating: 4.7,
    reviewCount: 156,
    image: "/images/tours/culture.jpg",
    gallery: [
      "/images/tours/culture-1.jpg",
      "/images/tours/culture-2.jpg",
      "/images/tours/culture-3.jpg",
    ],
    difficulty: "Easy",
    groupSize: "6-16 people",
    groupSizeRu: "6–16 человек",
    category: "cultural",
    highlights: [
      "Visit UNESCO World Heritage sites",
      "Learn traditional crafts from masters",
      "Enjoy authentic home-cooked meals",
      "Explore ancient madrasas and mosques",
      "Shop in historic bazaars",
    ],
    highlightsRu: [
      "Посещение объектов Всемирного наследия ЮНЕСКО",
      "Обучение традиционным ремёслам у мастеров",
      "Аутентичные домашние блюда",
      "Знакомство с древними медресе и мечетями",
      "Покупки на исторических базарах",
    ],
    included: [
      "4 nights boutique accommodation",
      "Daily breakfast",
      "2 traditional dinners",
      "Expert local guides",
      "All entrance fees",
      "Intercity transfers",
    ],
    includedRu: [
      "4 ночи в бутик-отелях",
      "Ежедневный завтрак",
      "2 традиционных ужина",
      "Опытные местные гиды",
      "Все входные билеты",
      "Междугородние трансферы",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Meals not specified",
      "Personal shopping",
      "Tips",
    ],
    notIncludedRu: [
      "Международные авиаперелёты",
      "Туристическая страховка",
      "Приёмы пищи, не указанные в программе",
      "Личные покупки",
      "Чаевые",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Samarkand",
        description:
          "Arrival, hotel check-in, and evening stroll through the old city.",
      },
      {
        day: 2,
        title: "Samarkand Treasures",
        description:
          "Full day exploring Registan Square, Shah-i-Zinda, and Gur-e-Amir.",
      },
      {
        day: 3,
        title: "Artisan Workshops",
        description:
          "Morning with silk weavers and ceramicists, afternoon at Bibi-Khanym Mosque.",
      },
      {
        day: 4,
        title: "Journey to Bukhara",
        description:
          "Scenic drive to Bukhara with stops at ancient caravanserais.",
      },
      {
        day: 5,
        title: "Bukhara & Departure",
        description:
          "Morning tour of Bukhara's highlights before airport transfer.",
      },
    ],
    itineraryRu: [
      {
        day: 1,
        title: "Добро пожаловать в Самарканд",
        description:
          "Прибытие, заселение в отель и вечерняя прогулка по старому городу.",
      },
      {
        day: 2,
        title: "Сокровища Самарканда",
        description:
          "Целый день: площадь Регистан, Шахи-Зинда и Гур-Эмир.",
      },
      {
        day: 3,
        title: "Мастерские ремесленников",
        description:
          "Утро с ткачами шёлка и керамистами, днём — мечеть Биби-Ханым.",
      },
      {
        day: 4,
        title: "Переезд в Бухару",
        description:
          "Живописная дорога в Бухару с остановками в древних караван-сараях.",
      },
      {
        day: 5,
        title: "Бухара и отъезд",
        description:
          "Утренняя экскурсия по главным достопримечательностям Бухары, затем трансфер в аэропорт.",
      },
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "nomadic-life-experience",
    title: "Nomadic Life Experience",
    titleRu: "Жизнь кочевников",
    description:
      "Live like a nomad in traditional yurts and learn ancient pastoral traditions.",
    descriptionRu:
      "Поживите как кочевник в традиционных юртах и познакомьтесь с древними пастушескими традициями.",
    longDescription:
      "Step back in time and experience the authentic lifestyle of Central Asian nomads. Stay in traditional yurts, learn to make kumis (fermented mare's milk), try your hand at eagle hunting, and ride horses across endless grasslands.",
    longDescriptionRu:
      "Перенеситесь в прошлое и ощутите подлинный уклад жизни кочевников Центральной Азии. Ночуйте в традиционных юртах, научитесь готовить кумыс, попробуйте охоту с беркутом и прокатитесь верхом по бескрайним степям.",
    location: "Kyrgyz Highlands",
    locationRu: "Киргизское высокогорье",
    destination: "kyrgyzstan",
    duration: "6 Days",
    durationRu: "6 дней",
    durationDays: 6,
    price: 1599,
    rating: 4.9,
    reviewCount: 73,
    image: "/images/tours/nomadic.jpg",
    gallery: [
      "/images/tours/nomadic-1.jpg",
      "/images/tours/nomadic-2.jpg",
      "/images/tours/nomadic-3.jpg",
    ],
    difficulty: "Easy",
    groupSize: "4-10 people",
    groupSizeRu: "4–10 человек",
    category: "cultural",
    highlights: [
      "Stay in authentic yurt camps",
      "Learn traditional horsemanship",
      "Meet eagle hunters",
      "Milk mares and make kumis",
      "Attend traditional music performances",
    ],
    highlightsRu: [
      "Ночёвки в аутентичных юрточных лагерях",
      "Обучение традиционной верховой езде",
      "Встречи с охотниками с беркутами",
      "Дойка кобылиц и приготовление кумыса",
      "Выступления традиционной музыки",
    ],
    included: [
      "5 nights yurt accommodation",
      "All meals (traditional cuisine)",
      "Horse rental",
      "Local family hosts",
      "Cultural activities",
      "Transportation",
    ],
    includedRu: [
      "5 ночей в юртах",
      "Все приёмы пищи (традиционная кухня)",
      "Аренда лошадей",
      "Местные семьи-хозяева",
      "Культурные активности",
      "Транспорт",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal items",
      "Alcoholic beverages",
      "Tips for hosts",
    ],
    notIncludedRu: [
      "Международные авиаперелёты",
      "Туристическая страховка",
      "Личные вещи",
      "Алкогольные напитки",
      "Чаевые хозяевам",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bishkek",
        description:
          "Welcome dinner and introduction to Kyrgyz culture and traditions.",
      },
      {
        day: 2,
        title: "Journey to Song Kul",
        description:
          "Drive to the high-altitude lake of Song Kul, arriving at yurt camp.",
      },
      {
        day: 3,
        title: "Nomadic Activities",
        description:
          "Horse riding lessons, helping with livestock, learning traditional crafts.",
      },
      {
        day: 4,
        title: "Eagle Hunters",
        description:
          "Visit eagle hunters and witness this ancient tradition firsthand.",
      },
      {
        day: 5,
        title: "Lake Exploration",
        description:
          "Hike around Song Kul, photography, evening music and storytelling.",
      },
      {
        day: 6,
        title: "Return & Farewell",
        description:
          "Morning departure, scenic drive back, farewell lunch in Bishkek.",
      },
    ],
    itineraryRu: [
      {
        day: 1,
        title: "Прибытие в Бишкек",
        description:
          "Приветственный ужин и знакомство с кыргызской культурой и традициями.",
      },
      {
        day: 2,
        title: "Переезд на Сон-Куль",
        description:
          "Дорога к высокогорному озеру Сон-Куль, заселение в юрточный лагерь.",
      },
      {
        day: 3,
        title: "Жизнь кочевников",
        description:
          "Уроки верховой езды, помощь со скотом, обучение традиционным ремёслам.",
      },
      {
        day: 4,
        title: "Охотники с беркутами",
        description:
          "Встреча с охотниками с беркутами и знакомство с древней традицией.",
      },
      {
        day: 5,
        title: "Исследование озера",
        description:
          "Походы вокруг Сон-Куля, фотосъёмка, вечерние песни и рассказы.",
      },
      {
        day: 6,
        title: "Возвращение и прощание",
        description:
          "Утренний отъезд, живописная дорога обратно, прощальный обед в Бишкеке.",
      },
    ],
    featured: false,
  },
  {
    id: 5,
    slug: "photography-expedition",
    title: "Photography Expedition",
    titleRu: "Фотоэкспедиция",
    description:
      "Capture stunning landscapes and authentic moments with expert guidance.",
    descriptionRu:
      "Снимайте потрясающие пейзажи и живые моменты под руководством профессионала.",
    longDescription:
      "Designed for photographers of all levels, this expedition combines the best landscapes and cultural moments Central Asia has to offer. With a professional photography guide, you'll learn techniques while capturing images in some of the world's most photogenic locations.",
    longDescriptionRu:
      "Экспедиция для фотографов любого уровня объединяет лучшие пейзажи и культурные моменты Центральной Азии. С профессиональным фотогидом вы освоите техники съёмки в одних из самых фотогеничных мест мира.",
    location: "Multiple Locations",
    locationRu: "Несколько локаций",
    destination: "kazakhstan",
    duration: "8 Days",
    durationRu: "8 дней",
    durationDays: 8,
    price: 2199,
    rating: 4.8,
    reviewCount: 45,
    image: "/images/tours/photography.jpg",
    gallery: [
      "/images/tours/photography-1.jpg",
      "/images/tours/photography-2.jpg",
      "/images/tours/photography-3.jpg",
    ],
    difficulty: "Moderate",
    groupSize: "4-8 people",
    groupSizeRu: "4–8 человек",
    category: "adventure",
    highlights: [
      "Professional photography guidance",
      "Golden hour shoots at iconic locations",
      "Portrait sessions with locals",
      "Night sky photography",
      "Post-processing workshops",
    ],
    highlightsRu: [
      "Профессиональное фото-наставничество",
      "Съёмка в золотой час в знаковых местах",
      "Портретные сессии с местными жителями",
      "Ночная астросъёмка",
      "Мастер-классы по постобработке",
    ],
    included: [
      "7 nights accommodation",
      "Professional photography guide",
      "All transportation",
      "Breakfast daily",
      "Model releases for portraits",
      "Post-processing sessions",
    ],
    includedRu: [
      "7 ночей проживания",
      "Профессиональный фотогид",
      "Весь транспорт",
      "Ежедневный завтрак",
      "Разрешения на публикацию портретов",
      "Занятия по постобработке",
    ],
    notIncluded: [
      "Camera equipment",
      "International flights",
      "Travel insurance",
      "Meals not specified",
      "Personal expenses",
    ],
    notIncludedRu: [
      "Фототехника",
      "Международные авиаперелёты",
      "Туристическая страховка",
      "Приёмы пищи, не указанные в программе",
      "Личные расходы",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description:
          "Arrive in Almaty, equipment check, evening cityscape shoot.",
      },
      {
        day: 2,
        title: "Big Almaty Lake",
        description:
          "Sunrise shoot at the stunning turquoise mountain lake.",
      },
      {
        day: 3,
        title: "Charyn Canyon",
        description:
          "Full day at the canyon, capturing golden hour light on red rocks.",
      },
      {
        day: 4,
        title: "Altyn Emel",
        description:
          "Singing Dunes and surreal desert landscapes.",
      },
      {
        day: 5,
        title: "Kolsai Lakes",
        description:
          "Alpine lake reflections and forest photography.",
      },
      {
        day: 6,
        title: "Nomad Portraits",
        description:
          "Visit local communities for authentic portrait sessions.",
      },
      {
        day: 7,
        title: "Night Sky",
        description:
          "Astrophotography session under pristine dark skies.",
      },
      {
        day: 8,
        title: "Review & Departure",
        description:
          "Morning post-processing workshop, afternoon departure.",
      },
    ],
    itineraryRu: [
      {
        day: 1,
        title: "Прибытие и знакомство",
        description:
          "Прилёт в Алматы, проверка снаряжения, вечерняя съёмка городских пейзажей.",
      },
      {
        day: 2,
        title: "Большое Алматинское озеро",
        description:
          "Рассветная съёмка на потрясающем бирюзовом горном озере.",
      },
      {
        day: 3,
        title: "Чарынский каньон",
        description:
          "Целый день в каньоне: ловим золотой час на красных скалах.",
      },
      {
        day: 4,
        title: "Алтын-Эмель",
        description:
          "Поющие барханы и сюрреалистичные пустынные пейзажи.",
      },
      {
        day: 5,
        title: "Кольсайские озёра",
        description:
          "Отражения в горных озёрах и лесная фотография.",
      },
      {
        day: 6,
        title: "Портреты кочевников",
        description:
          "Визит в местные сообщества для аутентичных портретных сессий.",
      },
      {
        day: 7,
        title: "Ночное небо",
        description:
          "Астрофотография под чистейшим тёмным небом.",
      },
      {
        day: 8,
        title: "Разбор и отъезд",
        description:
          "Утренний мастер-класс по постобработке, дневной отъезд.",
      },
    ],
    featured: false,
  },
  {
    id: 6,
    slug: "winter-wonderland",
    title: "Winter Wonderland",
    titleRu: "Зимняя сказка",
    description:
      "Experience the magic of Central Asia in winter with skiing and cultural experiences.",
    descriptionRu:
      "Откройте зимнюю магию Центральной Азии с горными лыжами и культурной программой.",
    longDescription:
      "Discover a different side of Central Asia when snow blankets the mountains and frozen lakes create otherworldly landscapes. This winter tour combines skiing at world-class resorts with unique cultural experiences only possible in the cold season.",
    longDescriptionRu:
      "Откройте другую сторону Центральной Азии, когда снег укрывает горы, а замёрзшие озёра создают неземные пейзажи. Этот зимний тур объединяет катание на лыжах на курортах мирового уровня с уникальными культурными впечатлениями, доступными только в холодный сезон.",
    location: "Almaty Region",
    locationRu: "Алматинская область",
    destination: "kazakhstan",
    duration: "7 Days",
    durationRu: "7 дней",
    durationDays: 7,
    price: 1799,
    rating: 4.6,
    reviewCount: 34,
    image: "/images/tours/winter.jpg",
    gallery: [
      "/images/tours/winter-1.jpg",
      "/images/tours/winter-2.jpg",
      "/images/tours/winter-3.jpg",
    ],
    difficulty: "Moderate",
    groupSize: "6-12 people",
    groupSizeRu: "6–12 человек",
    category: "adventure",
    highlights: [
      "Ski at Shymbulak Resort",
      "Ice skating on frozen lakes",
      "Traditional banya experience",
      "Winter wildlife spotting",
      "Cozy mountain lodge stays",
    ],
    highlightsRu: [
      "Катание на лыжах на курорте Шымбулак",
      "Коньки на замёрзших озёрах",
      "Традиционная баня",
      "Наблюдение за зимней природой",
      "Уютные горные лоджи",
    ],
    included: [
      "6 nights accommodation",
      "Ski passes (2 days)",
      "Equipment rental",
      "Daily breakfast",
      "Transportation",
      "Winter activities",
    ],
    includedRu: [
      "6 ночей проживания",
      "Ски-пассы (2 дня)",
      "Аренда снаряжения",
      "Ежедневный завтрак",
      "Транспорт",
      "Зимние активности",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Ski lessons",
      "Meals not specified",
      "Personal winter gear",
    ],
    notIncludedRu: [
      "Международные авиаперелёты",
      "Туристическая страховка",
      "Уроки катания на лыжах",
      "Приёмы пищи, не указанные в программе",
      "Личная зимняя одежда",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Almaty",
        description:
          "Welcome to winter wonderland! Evening city lights tour.",
      },
      {
        day: 2,
        title: "Shymbulak Skiing",
        description:
          "Full day skiing at the premier Central Asian ski resort.",
      },
      {
        day: 3,
        title: "More Skiing",
        description:
          "Second day on the slopes with optional lessons available.",
      },
      {
        day: 4,
        title: "Medeu & Ice Skating",
        description:
          "Visit the famous Medeu skating rink, the world's highest.",
      },
      {
        day: 5,
        title: "Mountain Lodge",
        description:
          "Transfer to cozy mountain lodge, afternoon snowshoeing, evening banya.",
      },
      {
        day: 6,
        title: "Frozen Lakes",
        description:
          "Explore frozen Kolsai Lakes, photography and nature walk.",
      },
      {
        day: 7,
        title: "Departure",
        description:
          "Morning at leisure, transfer to airport for departure.",
      },
    ],
    itineraryRu: [
      {
        day: 1,
        title: "Прибытие в Алматы",
        description:
          "Добро пожаловать в зимнюю сказку! Вечерняя экскурсия по ночному городу.",
      },
      {
        day: 2,
        title: "Лыжи в Шымбулаке",
        description:
          "Целый день катания на ведущем горнолыжном курорте Центральной Азии.",
      },
      {
        day: 3,
        title: "Продолжение катания",
        description:
          "Второй день на склонах, при желании — уроки с инструктором.",
      },
      {
        day: 4,
        title: "Медеу и коньки",
        description:
          "Посещение знаменитого высокогорного катка Медеу.",
      },
      {
        day: 5,
        title: "Горная лоджия",
        description:
          "Переезд в уютную горную лоджию, днём — прогулки на снегоступах, вечером — баня.",
      },
      {
        day: 6,
        title: "Замёрзшие озёра",
        description:
          "Замёрзшие Кольсайские озёра: фотосъёмка и прогулка по природе.",
      },
      {
        day: 7,
        title: "Отъезд",
        description:
          "Утро свободное, затем трансфер в аэропорт.",
      },
    ],
    featured: false,
  },
];

// Helper functions
export function getAllTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}

export function getToursByDestination(destination: string): Tour[] {
  return tours.filter(
    (tour) => tour.destination.toLowerCase() === destination.toLowerCase()
  );
}

export function getToursByCategory(category: string): Tour[] {
  return tours.filter(
    (tour) => tour.category.toLowerCase() === category.toLowerCase()
  );
}

export function getUniqueDestinations(): string[] {
  return [...new Set(tours.map((tour) => tour.destination))];
}

export function getUniqueCategories(): string[] {
  return [...new Set(tours.map((tour) => tour.category))];
}

export function getUniqueDifficulties(): string[] {
  return [...new Set(tours.map((tour) => tour.difficulty))];
}