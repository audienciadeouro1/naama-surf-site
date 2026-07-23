"use client";

import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

type Language = "pt" | "en" | "es" | "fr";

const WHATSAPP_URLS: Record<Language, string> = {
  pt: "https://wa.me/5521990970011?text=Ol%C3%A1%2C%20Naam%C3%A3%20Surf!%20Quero%20agendar%20uma%20aula%20no%20Arpoador.%20%F0%9F%8C%8A",
  en: "https://wa.me/5521990970011?text=Hello%2C%20Naam%C3%A3%20Surf!%20I%20would%20like%20to%20book%20a%20lesson%20at%20Arpoador.%20%F0%9F%8C%8A",
  es: "https://wa.me/5521990970011?text=%C2%A1Hola%2C%20Naam%C3%A3%20Surf!%20Quiero%20reservar%20una%20clase%20en%20Arpoador.%20%F0%9F%8C%8A",
  fr: "https://wa.me/5521990970011?text=Bonjour%2C%20Naam%C3%A3%20Surf%20!%20Je%20souhaite%20r%C3%A9server%20un%20cours%20%C3%A0%20Arpoador.%20%F0%9F%8C%8A",
};

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const copy = {
  pt: {
    nav: ["Aulas", "Quem é Naamã", "Experiência", "Localização"],
    navHref: ["#aulas", "#naama", "#experiencia", "#localizacao"],
    navCta: "Agendar aula",
    heroKicker: "Escola de surf · Posto 7 · Arpoador",
    heroTitle: "Sua primeira onda começa aqui.",
    heroBody:
      "Do zero ao mar, com segurança, equipamento incluso e a energia de quem nasceu e cresceu no Rio.",
    heroCta: "Agendar pelo WhatsApp",
    heroLink: "Conheça as aulas",
    heroNote: "Aulas todos os dias · Adultos e crianças",
    trust: ["Equipamento incluso", "Iniciantes bem-vindos", "Aulas em quatro idiomas"],
    realKicker: "A Naamã Surf em movimento",
    realTitle: "Aulas, sorrisos e primeiras ondas.",
    realBody:
      "Nada de banco de imagens. Estes são momentos reais de alunos aprendendo no Arpoador, acompanhados de perto pelo Naamã e sua equipe.",
    realVideoTitle: "Um dia de aula no Posto 7",
    realVideoBody: "Da primeira orientação na areia até a sensação de ficar em pé na prancha.",
    realVideoPlay: "Assistir ao vídeo",
    realPhotoHint: "Toque nas fotos para ampliar",
    realCaptions: [
      "Equipe Naamã Surf no Arpoador",
      "Treino de equilíbrio com o Dois Irmãos ao fundo",
      "Primeiros movimentos na prancha, ainda na areia",
      "Equipe e alunos prontos para entrar no mar",
      "Aquecimento e técnica antes da água",
      "Acompanhamento lado a lado desde a primeira remada",
      "Primeira onda com confiança",
      "Primeira onda — um sorriso que fica",
      "Instrutor e aluno a caminho do mar",
      "Preparação em grupo na areia do Arpoador",
      "Naamã no lugar que escolheu para ensinar",
    ],
    introKicker: "O Arpoador é a nossa sala de aula",
    introTitle: "Não sou Jesus, mas te faço andar sobre as águas.",
    introBody:
      "Você não precisa ter experiência, equipamento ou formar um grupo. Só precisa chegar com vontade — o resto é com a gente.",
    classesKicker: "Escolha sua onda",
    classesTitle: "Aulas para o seu momento",
    classesBody:
      "Todas as opções incluem prancha, lycra, leash, parafina e acompanhamento dentro e fora d’água.",
    classCards: [
      {
        tag: "Mais escolhida",
        title: "Aula em grupo",
        subtitle: "Até 5 pessoas por horário",
        bullets: ["2 instrutores", "1 hora de aula", "Adultos e crianças", "Você não precisa formar um grupo"],
      },
      {
        tag: "Seu ritmo",
        title: "Aula particular",
        subtitle: "Um instrutor só para você",
        bullets: ["Atenção individual", "1 hora de aula", "Adultos e crianças", "Agendamento com 1 dia de antecedência"],
      },
      {
        tag: "Evolução contínua",
        title: "Pacotes de aulas",
        subtitle: "Mais tempo para evoluir",
        bullets: ["Sem data de validade", "Marque quando quiser", "1 hora por aula", "Equipamento sempre incluso"],
      },
    ],
    extras: [
      ["Para crianças", "Diversão, confiança e segurança no mar, com atenção especial para os pequenos."],
      ["Stand up paddle", "Um passeio leve pelo mar do Arpoador para viver o Rio por outro ângulo."],
    ],
    cardCta: "Quero essa experiência",
    storyKicker: "Quem é Naamã",
    storyTitle: "Do Cantagalo para as ondas do Havaí.",
    storyP1:
      "Nascido no Morro do Cantagalo, Naamã cresceu cercado por desafios. O surf apareceu como liberdade, disciplina e uma forma de enxergar um horizonte maior.",
    storyP2:
      "Ainda criança, sua história chegou ao Caldeirão do Huck. Luciano Huck o levou ao Havaí para viver um encontro que parecia impossível: surfar com Kelly Slater, um dos maiores nomes do esporte.",
    storyP3:
      "Hoje, Naamã transforma essa trajetória em acolhimento. Cada aluno é recebido sem julgamento — porque toda grande história no mar começa com uma primeira onda.",
    storyCta: "Quero surfar com o Naamã",
    pullQuote: "O mar virou caminho. Agora, Naamã ajuda outras pessoas a encontrarem o seu.",
    storyPhotoLabel: "Registro real · Havaí",
    storyPhotoCaptions: [
      "Naamã ainda criança ao lado de Kelly Slater — o encontro que transformou um sonho em memória.",
      "Kelly e Naamã a caminho do mar, cada um com sua prancha, vivendo o Havaí juntos.",
      "Naamã se preparando para entrar no mar e viver uma das ondas mais importantes de sua história.",
      "Luciano Huck, Kelly Slater e Naamã no registro que eternizou aquele encontro no Havaí.",
    ],
    storyPhotoAlts: [
      "Naamã ainda criança conversando com Kelly Slater no Havaí",
      "Kelly Slater e Naamã com suas pranchas diante do mar no Havaí",
      "Naamã ainda criança levando uma prancha para o mar no Havaí",
      "Luciano Huck, Kelly Slater e Naamã juntos no Havaí",
    ],
    experienceKicker: "Sua primeira aula",
    experienceTitle: "Simples, seguro e inesquecível",
    steps: [
      ["01", "Chame no WhatsApp", "Conte quando você estará no Rio e quantas pessoas vão surfar."],
      ["02", "Encontre a gente no Posto 7", "Chegue ao Arpoador. Todo o equipamento estará esperando por você."],
      ["03", "Treino na areia", "Aprenda posição, equilíbrio, remada e segurança antes de entrar no mar."],
      ["04", "Sua primeira onda", "O instrutor acompanha você dentro e fora d’água durante toda a aula."],
    ],
    locationKicker: "Arpoador, Ipanema",
    locationTitle: "Posto 7. Onde a cidade para para ver o mar.",
    locationBody:
      "Uma das paisagens mais icônicas do Rio e um ponto perfeito para começar. Fale com a gente para confirmar o melhor horário conforme as condições do mar.",
    mapCta: "Abrir no mapa",
    faqKicker: "Antes de entrar no mar",
    faqTitle: "Dúvidas frequentes",
    faqs: [
      ["Nunca surfei. Posso fazer a aula?", "Com certeza. A maioria dos nossos alunos começa do zero e recebe orientação passo a passo."],
      ["Preciso levar equipamento?", "Não. Prancha, lycra, leash e parafina estão incluídos em todas as aulas."],
      ["Crianças podem participar?", "Sim. Atendemos adultos e crianças e ajustamos a experiência à idade e ao nível de cada aluno."],
      ["Quanto tempo dura a aula?", "A aula dura 1 hora e inclui instrução na areia e acompanhamento dentro e fora d’água."],
    ],
    finalKicker: "O Rio está chamando",
    finalTitle: "Pronto para viver sua primeira onda?",
    finalBody: "Envie uma mensagem agora. A gente ajuda você a escolher a melhor aula e o melhor horário.",
    finalCta: "Agendar minha aula",
    footer: "Surf com raiz carioca, do Cantagalo para o mundo.",
    photoCredit: "Foto do Arpoador: Wallace Fonseca / Unsplash",
    floating: "Agendar aula",
  },
  en: {
    nav: ["Lessons", "Meet Naamã", "Experience", "Location"],
    navHref: ["#aulas", "#naama", "#experiencia", "#localizacao"],
    navCta: "Book a lesson",
    heroKicker: "Surf school · Posto 7 · Arpoador",
    heroTitle: "Your first wave starts here.",
    heroBody:
      "From zero to the ocean — safely, with all equipment included and the energy of a true Rio local.",
    heroCta: "Book on WhatsApp",
    heroLink: "Explore lessons",
    heroNote: "Daily lessons · Adults & kids",
    trust: ["Equipment included", "Beginners welcome", "Lessons in four languages"],
    realKicker: "Naamã Surf in motion",
    realTitle: "Lessons, smiles and first waves.",
    realBody:
      "No stock photography. These are real moments of students learning at Arpoador, closely guided by Naamã and his team.",
    realVideoTitle: "A lesson day at Posto 7",
    realVideoBody: "From the first guidance on the sand to the feeling of standing up on a surfboard.",
    realVideoPlay: "Watch the video",
    realPhotoHint: "Tap a photo to enlarge",
    realCaptions: [
      "The Naamã Surf team at Arpoador",
      "Balance practice with Dois Irmãos in the background",
      "First movements on the board, still on the sand",
      "Team and students ready to enter the ocean",
      "Warm-up and technique before the water",
      "Side-by-side support from the very first paddle",
      "A confident first wave",
      "A first wave — and a smile that stays",
      "Instructor and student heading into the ocean",
      "Group preparation on the sand at Arpoador",
      "Naamã in the place he chose to teach",
    ],
    introKicker: "Arpoador is our classroom",
    introTitle: "I’m not Jesus, but I’ll have you walking on water.",
    introBody:
      "No experience, equipment or group required. Just bring your energy — we take care of everything else.",
    classesKicker: "Choose your wave",
    classesTitle: "A lesson for your moment",
    classesBody:
      "Every option includes a surfboard, rash guard, leash, wax and guidance in and out of the water.",
    classCards: [
      {
        tag: "Most popular",
        title: "Group lesson",
        subtitle: "Up to 5 people per time slot",
        bullets: ["2 instructors", "1-hour lesson", "Adults and kids", "You do not need to form a group"],
      },
      {
        tag: "Your own pace",
        title: "Private lesson",
        subtitle: "One instructor just for you",
        bullets: ["Individual attention", "1-hour lesson", "Adults and kids", "Book 1 day in advance"],
      },
      {
        tag: "Keep progressing",
        title: "Lesson packages",
        subtitle: "More time to improve",
        bullets: ["No expiration date", "Book whenever you want", "1 hour per lesson", "Equipment always included"],
      },
    ],
    extras: [
      ["For kids", "Fun, confidence and ocean safety, with special attention for younger surfers."],
      ["Stand up paddle", "A relaxed paddle around Arpoador to experience Rio from a whole new angle."],
    ],
    cardCta: "Choose this experience",
    storyKicker: "Meet Naamã",
    storyTitle: "From Cantagalo to the waves of Hawaii.",
    storyP1:
      "Born in Morro do Cantagalo, Naamã grew up surrounded by challenges. Surfing became freedom, discipline and a new horizon.",
    storyP2:
      "While still a child, his story reached Brazilian television. Luciano Huck took him to Hawaii for a once-in-a-lifetime experience: surfing with Kelly Slater, one of the sport’s greatest names.",
    storyP3:
      "Today, Naamã turns that journey into a warm welcome for every student. No judgment, no pressure — because every great ocean story starts with a first wave.",
    storyCta: "Surf with Naamã",
    pullQuote: "The ocean became a path. Now Naamã helps others find theirs.",
    storyPhotoLabel: "Real moment · Hawaii",
    storyPhotoCaptions: [
      "Naamã as a child beside Kelly Slater — the encounter that turned a dream into a lifelong memory.",
      "Kelly and Naamã heading to the ocean, each carrying a surfboard and sharing the Hawaii experience.",
      "Naamã getting ready to enter the ocean and live one of the most important waves of his story.",
      "Luciano Huck, Kelly Slater and Naamã in the photograph that immortalized their meeting in Hawaii.",
    ],
    storyPhotoAlts: [
      "Naamã as a child talking with Kelly Slater in Hawaii",
      "Kelly Slater and Naamã holding their surfboards by the ocean in Hawaii",
      "Naamã as a child carrying a surfboard toward the ocean in Hawaii",
      "Luciano Huck, Kelly Slater and Naamã together in Hawaii",
    ],
    experienceKicker: "Your first lesson",
    experienceTitle: "Simple, safe, unforgettable",
    steps: [
      ["01", "Message us", "Tell us when you will be in Rio and how many people want to surf."],
      ["02", "Meet us at Posto 7", "Come to Arpoador. All your equipment will be ready and waiting."],
      ["03", "Practice on the sand", "Learn stance, balance, paddling and ocean safety before heading in."],
      ["04", "Catch your first wave", "Your instructor stays with you in and out of the water for the full lesson."],
    ],
    locationKicker: "Arpoador, Ipanema",
    locationTitle: "Posto 7. Where the city stops to watch the ocean.",
    locationBody:
      "One of Rio’s most iconic landscapes and an amazing place to begin. Message us to confirm the best time based on ocean conditions.",
    mapCta: "Open in maps",
    faqKicker: "Before the ocean",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["I have never surfed. Can I join?", "Absolutely. Most of our students start from zero and receive step-by-step guidance."],
      ["Do I need to bring equipment?", "No. Surfboard, rash guard, leash and wax are included in every lesson."],
      ["Can children join?", "Yes. We welcome adults and kids and adapt the experience to each student’s age and level."],
      ["How long is the lesson?", "The lesson lasts 1 hour, including instruction on the sand and support in and out of the water."],
    ],
    finalKicker: "Rio is calling",
    finalTitle: "Ready to catch your first wave?",
    finalBody: "Send us a message now. We will help you choose the right lesson and the best time.",
    finalCta: "Book my lesson",
    footer: "Authentic Rio surf, from Cantagalo to the world.",
    photoCredit: "Arpoador photo: Wallace Fonseca / Unsplash",
    floating: "Book a lesson",
  },
  es: {
    nav: ["Clases", "Conoce a Naamã", "Experiencia", "Ubicación"],
    navHref: ["#aulas", "#naama", "#experiencia", "#localizacao"],
    navCta: "Reservar clase",
    heroKicker: "Escuela de surf · Posto 7 · Arpoador",
    heroTitle: "Tu primera ola empieza aquí.",
    heroBody:
      "Del primer paso al mar, con seguridad, equipo incluido y la energía de quien nació y creció en Río.",
    heroCta: "Reservar por WhatsApp",
    heroLink: "Conoce las clases",
    heroNote: "Clases todos los días · Adultos y niños",
    trust: ["Equipo incluido", "Principiantes bienvenidos", "Clases en cuatro idiomas"],
    realKicker: "Naamã Surf en movimiento",
    realTitle: "Clases, sonrisas y primeras olas.",
    realBody:
      "Nada de fotos de archivo. Estos son momentos reales de alumnos aprendiendo en Arpoador, acompañados de cerca por Naamã y su equipo.",
    realVideoTitle: "Un día de clase en Posto 7",
    realVideoBody: "Desde las primeras indicaciones en la arena hasta la emoción de ponerse de pie en la tabla.",
    realVideoPlay: "Ver el video",
    realPhotoHint: "Toca una foto para ampliarla",
    realCaptions: [
      "El equipo de Naamã Surf en Arpoador",
      "Práctica de equilibrio con Dois Irmãos al fondo",
      "Primeros movimientos sobre la tabla, todavía en la arena",
      "Equipo y alumnos listos para entrar al mar",
      "Calentamiento y técnica antes de entrar al agua",
      "Acompañamiento lado a lado desde la primera remada",
      "Una primera ola con confianza",
      "La primera ola y una sonrisa que permanece",
      "Instructor y alumno camino al mar",
      "Preparación en grupo en la arena de Arpoador",
      "Naamã en el lugar que eligió para enseñar",
    ],
    introKicker: "Arpoador es nuestra aula",
    introTitle: "No soy Jesús, pero te hago caminar sobre las aguas.",
    introBody:
      "No necesitas experiencia, equipo ni formar un grupo. Solo tienes que llegar con ganas; nosotros nos encargamos del resto.",
    classesKicker: "Elige tu ola",
    classesTitle: "Una clase para tu momento",
    classesBody:
      "Todas las opciones incluyen tabla, lycra, leash, parafina y acompañamiento dentro y fuera del agua.",
    classCards: [
      {
        tag: "La más elegida",
        title: "Clase en grupo",
        subtitle: "Hasta 5 personas por horario",
        bullets: ["2 instructores", "1 hora de clase", "Adultos y niños", "No necesitas formar un grupo"],
      },
      {
        tag: "A tu ritmo",
        title: "Clase privada",
        subtitle: "Un instructor solo para ti",
        bullets: ["Atención individual", "1 hora de clase", "Adultos y niños", "Reserva con 1 día de anticipación"],
      },
      {
        tag: "Evolución continua",
        title: "Paquetes de clases",
        subtitle: "Más tiempo para evolucionar",
        bullets: ["Sin fecha de vencimiento", "Reserva cuando quieras", "1 hora por clase", "Equipo siempre incluido"],
      },
    ],
    extras: [
      ["Para niños", "Diversión, confianza y seguridad en el mar, con atención especial para los más pequeños."],
      ["Stand up paddle", "Un paseo tranquilo por el mar de Arpoador para descubrir Río desde otro ángulo."],
    ],
    cardCta: "Quiero esta experiencia",
    storyKicker: "Conoce a Naamã",
    storyTitle: "De Cantagalo a las olas de Hawái.",
    storyP1:
      "Nacido en el Morro do Cantagalo, Naamã creció rodeado de desafíos. El surf apareció como libertad, disciplina y una forma de ver un horizonte más amplio.",
    storyP2:
      "Cuando todavía era niño, su historia llegó a la televisión brasileña. Luciano Huck lo llevó a Hawái para vivir algo que parecía imposible: surfear con Kelly Slater, uno de los grandes nombres del deporte.",
    storyP3:
      "Hoy, Naamã transforma ese recorrido en una cálida bienvenida. Cada alumno es recibido sin juicios ni presión, porque toda gran historia en el mar comienza con una primera ola.",
    storyCta: "Quiero surfear con Naamã",
    pullQuote: "El mar se convirtió en camino. Ahora Naamã ayuda a otras personas a encontrar el suyo.",
    storyPhotoLabel: "Momento real · Hawái",
    storyPhotoCaptions: [
      "Naamã de niño junto a Kelly Slater: el encuentro que convirtió un sueño en un recuerdo para toda la vida.",
      "Kelly y Naamã camino al mar, cada uno con su tabla, compartiendo la experiencia de Hawái.",
      "Naamã preparándose para entrar al mar y vivir una de las olas más importantes de su historia.",
      "Luciano Huck, Kelly Slater y Naamã en la foto que hizo eterno aquel encuentro en Hawái.",
    ],
    storyPhotoAlts: [
      "Naamã de niño conversando con Kelly Slater en Hawái",
      "Kelly Slater y Naamã con sus tablas frente al mar en Hawái",
      "Naamã de niño llevando una tabla hacia el mar en Hawái",
      "Luciano Huck, Kelly Slater y Naamã juntos en Hawái",
    ],
    experienceKicker: "Tu primera clase",
    experienceTitle: "Simple, segura e inolvidable",
    steps: [
      ["01", "Escríbenos por WhatsApp", "Cuéntanos cuándo estarás en Río y cuántas personas quieren surfear."],
      ["02", "Encuéntranos en Posto 7", "Llega a Arpoador. Todo el equipo estará listo para ti."],
      ["03", "Entrenamiento en la arena", "Aprende postura, equilibrio, remada y seguridad antes de entrar al mar."],
      ["04", "Tu primera ola", "El instructor te acompaña dentro y fuera del agua durante toda la clase."],
    ],
    locationKicker: "Arpoador, Ipanema",
    locationTitle: "Posto 7. Donde la ciudad se detiene para mirar el mar.",
    locationBody:
      "Uno de los paisajes más emblemáticos de Río y un lugar perfecto para empezar. Escríbenos para confirmar el mejor horario según las condiciones del mar.",
    mapCta: "Abrir en el mapa",
    faqKicker: "Antes de entrar al mar",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      ["Nunca he surfeado. ¿Puedo tomar la clase?", "Claro. La mayoría de nuestros alumnos empieza desde cero y recibe orientación paso a paso."],
      ["¿Necesito llevar equipo?", "No. La tabla, la lycra, el leash y la parafina están incluidos en todas las clases."],
      ["¿Pueden participar niños?", "Sí. Recibimos adultos y niños y adaptamos la experiencia a la edad y al nivel de cada alumno."],
      ["¿Cuánto dura la clase?", "La clase dura 1 hora e incluye instrucción en la arena y acompañamiento dentro y fuera del agua."],
    ],
    finalKicker: "Río te está llamando",
    finalTitle: "¿Listo para vivir tu primera ola?",
    finalBody: "Envíanos un mensaje. Te ayudamos a elegir la mejor clase y el mejor horario.",
    finalCta: "Reservar mi clase",
    footer: "Surf con esencia carioca, de Cantagalo para el mundo.",
    photoCredit: "Foto de Arpoador: Wallace Fonseca / Unsplash",
    floating: "Reservar clase",
  },
  fr: {
    nav: ["Cours", "Découvrir Naamã", "Expérience", "Localisation"],
    navHref: ["#aulas", "#naama", "#experiencia", "#localizacao"],
    navCta: "Réserver",
    heroKicker: "École de surf · Posto 7 · Arpoador",
    heroTitle: "Votre première vague commence ici.",
    heroBody:
      "Des premiers pas jusqu’à l’océan, en toute sécurité, avec le matériel inclus et l’énergie d’un véritable Carioca.",
    heroCta: "Réserver sur WhatsApp",
    heroLink: "Découvrir les cours",
    heroNote: "Cours tous les jours · Adultes et enfants",
    trust: ["Matériel inclus", "Débutants bienvenus", "Cours en quatre langues"],
    realKicker: "Naamã Surf en mouvement",
    realTitle: "Cours, sourires et premières vagues.",
    realBody:
      "Aucune photo de banque d’images. Ce sont de vrais moments d’élèves qui apprennent à Arpoador, accompagnés de près par Naamã et son équipe.",
    realVideoTitle: "Une journée de cours au Posto 7",
    realVideoBody: "Des premières explications sur le sable jusqu’au plaisir de se mettre debout sur la planche.",
    realVideoPlay: "Voir la vidéo",
    realPhotoHint: "Touchez une photo pour l’agrandir",
    realCaptions: [
      "L’équipe Naamã Surf à Arpoador",
      "Exercice d’équilibre avec Dois Irmãos en arrière-plan",
      "Premiers mouvements sur la planche, encore sur le sable",
      "Équipe et élèves prêts à entrer dans l’océan",
      "Échauffement et technique avant d’aller dans l’eau",
      "Un accompagnement côte à côte dès les premiers coups de rame",
      "Une première vague en toute confiance",
      "Une première vague et un sourire qui reste",
      "Moniteur et élève en route vers l’océan",
      "Préparation en groupe sur le sable d’Arpoador",
      "Naamã dans le lieu qu’il a choisi pour enseigner",
    ],
    introKicker: "Arpoador est notre salle de classe",
    introTitle: "Je ne suis pas Jésus, mais je vous fais marcher sur l’eau.",
    introBody:
      "Vous n’avez besoin ni d’expérience, ni de matériel, ni de former un groupe. Venez simplement avec l’envie; nous nous occupons du reste.",
    classesKicker: "Choisissez votre vague",
    classesTitle: "Un cours adapté à votre moment",
    classesBody:
      "Toutes les formules comprennent la planche, le lycra, le leash, la wax et l’accompagnement dans et hors de l’eau.",
    classCards: [
      {
        tag: "Le plus choisi",
        title: "Cours en groupe",
        subtitle: "Jusqu’à 5 personnes par créneau",
        bullets: ["2 moniteurs", "Cours d’une heure", "Adultes et enfants", "Pas besoin de former un groupe"],
      },
      {
        tag: "À votre rythme",
        title: "Cours particulier",
        subtitle: "Un moniteur rien que pour vous",
        bullets: ["Attention individuelle", "Cours d’une heure", "Adultes et enfants", "Réservation un jour à l’avance"],
      },
      {
        tag: "Progression continue",
        title: "Forfaits de cours",
        subtitle: "Plus de temps pour progresser",
        bullets: ["Sans date d’expiration", "Réservez quand vous voulez", "1 heure par cours", "Matériel toujours inclus"],
      },
    ],
    extras: [
      ["Pour les enfants", "Plaisir, confiance et sécurité dans l’océan, avec une attention particulière pour les plus jeunes."],
      ["Stand up paddle", "Une balade tranquille au large d’Arpoador pour découvrir Rio sous un autre angle."],
    ],
    cardCta: "Je veux cette expérience",
    storyKicker: "Découvrir Naamã",
    storyTitle: "De Cantagalo aux vagues d’Hawaï.",
    storyP1:
      "Né au Morro do Cantagalo, Naamã a grandi entouré de défis. Le surf est devenu synonyme de liberté, de discipline et d’un horizon plus vaste.",
    storyP2:
      "Encore enfant, son histoire est arrivée à la télévision brésilienne. Luciano Huck l’a emmené à Hawaï pour vivre une rencontre qui semblait impossible: surfer avec Kelly Slater, l’un des plus grands noms de ce sport.",
    storyP3:
      "Aujourd’hui, Naamã transforme ce parcours en accueil chaleureux. Chaque élève est reçu sans jugement ni pression, car toute grande histoire dans l’océan commence par une première vague.",
    storyCta: "Surfer avec Naamã",
    pullQuote: "L’océan est devenu un chemin. Aujourd’hui, Naamã aide les autres à trouver le leur.",
    storyPhotoLabel: "Moment réel · Hawaï",
    storyPhotoCaptions: [
      "Naamã enfant aux côtés de Kelly Slater: la rencontre qui a transformé un rêve en souvenir pour la vie.",
      "Kelly et Naamã en route vers l’océan, chacun avec sa planche, partageant l’expérience hawaïenne.",
      "Naamã se préparant à entrer dans l’océan pour vivre l’une des vagues les plus importantes de son histoire.",
      "Luciano Huck, Kelly Slater et Naamã sur la photo qui a immortalisé leur rencontre à Hawaï.",
    ],
    storyPhotoAlts: [
      "Naamã enfant discutant avec Kelly Slater à Hawaï",
      "Kelly Slater et Naamã avec leurs planches face à l’océan à Hawaï",
      "Naamã enfant portant une planche vers l’océan à Hawaï",
      "Luciano Huck, Kelly Slater et Naamã ensemble à Hawaï",
    ],
    experienceKicker: "Votre premier cours",
    experienceTitle: "Simple, sûr et inoubliable",
    steps: [
      ["01", "Écrivez-nous sur WhatsApp", "Dites-nous quand vous serez à Rio et combien de personnes souhaitent surfer."],
      ["02", "Retrouvez-nous au Posto 7", "Venez à Arpoador. Tout le matériel sera prêt pour vous."],
      ["03", "Entraînement sur le sable", "Apprenez la position, l’équilibre, la rame et la sécurité avant d’entrer dans l’océan."],
      ["04", "Votre première vague", "Le moniteur vous accompagne dans et hors de l’eau pendant toute la durée du cours."],
    ],
    locationKicker: "Arpoador, Ipanema",
    locationTitle: "Posto 7. Là où la ville s’arrête pour regarder l’océan.",
    locationBody:
      "L’un des paysages les plus emblématiques de Rio et un lieu idéal pour débuter. Contactez-nous pour confirmer le meilleur horaire selon les conditions de l’océan.",
    mapCta: "Ouvrir dans Maps",
    faqKicker: "Avant d’entrer dans l’océan",
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Je n’ai jamais surfé. Puis-je suivre le cours?", "Bien sûr. La plupart de nos élèves commencent de zéro et sont guidés étape par étape."],
      ["Dois-je apporter du matériel?", "Non. La planche, le lycra, le leash et la wax sont inclus dans chaque cours."],
      ["Les enfants peuvent-ils participer?", "Oui. Nous accueillons adultes et enfants et adaptons l’expérience à l’âge et au niveau de chaque élève."],
      ["Combien de temps dure le cours?", "Le cours dure une heure et comprend l’enseignement sur le sable ainsi que l’accompagnement dans et hors de l’eau."],
    ],
    finalKicker: "Rio vous appelle",
    finalTitle: "Prêt à vivre votre première vague?",
    finalBody: "Envoyez-nous un message. Nous vous aiderons à choisir le cours et l’horaire qui vous conviennent.",
    finalCta: "Réserver mon cours",
    footer: "Le surf authentique de Rio, de Cantagalo au monde.",
    photoCredit: "Photo d’Arpoador: Wallace Fonseca / Unsplash",
    floating: "Réserver un cours",
  },
};

const interfaceCopy: Record<Language, {
  mainNavigation: string;
  languageSelector: string;
  highlights: string;
  choosePhoto: string;
  showPhoto: string;
  findKicker: string;
  findTitle: string;
  findBody: string;
  mapTitle: string;
  openMap: string;
  instagramLabel: string;
  closeImage: string;
  previousImage: string;
  nextImage: string;
  openMenu: string;
  closeMenu: string;
  contact: string;
  location: string;
}> = {
  pt: {
    mainNavigation: "Navegação principal",
    languageSelector: "Selecionar idioma",
    highlights: "Destaques",
    choosePhoto: "Escolha uma foto",
    showPhoto: "Exibir foto",
    findKicker: "Nos encontre no Rio",
    findTitle: "Seu ponto de encontro com o mar.",
    findBody: "Estamos no Posto 7, entre Ipanema e a Pedra do Arpoador. Confirme o horário da sua aula pelo WhatsApp e encontre a equipe na praia.",
    mapTitle: "Mapa do Posto 7 no Arpoador",
    openMap: "Abrir mapa",
    instagramLabel: "Instagram da Naamã Surf: @naama_surf",
    closeImage: "Fechar imagem",
    previousImage: "Imagem anterior",
    nextImage: "Próxima imagem",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    contact: "CONTATO",
    location: "LOCALIZAÇÃO",
  },
  en: {
    mainNavigation: "Main navigation",
    languageSelector: "Select language",
    highlights: "Highlights",
    choosePhoto: "Choose a photo",
    showPhoto: "Show photo",
    findKicker: "Find us in Rio",
    findTitle: "Your meeting point with the ocean.",
    findBody: "We are at Posto 7, between Ipanema and Arpoador Rock. Confirm your lesson time on WhatsApp and meet our team at the beach.",
    mapTitle: "Map of Posto 7 in Arpoador",
    openMap: "Open map",
    instagramLabel: "Naamã Surf on Instagram: @naama_surf",
    closeImage: "Close image",
    previousImage: "Previous image",
    nextImage: "Next image",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    contact: "CONTACT",
    location: "LOCATION",
  },
  es: {
    mainNavigation: "Navegación principal",
    languageSelector: "Seleccionar idioma",
    highlights: "Puntos destacados",
    choosePhoto: "Elige una foto",
    showPhoto: "Mostrar foto",
    findKicker: "Encuéntranos en Río",
    findTitle: "Tu punto de encuentro con el mar.",
    findBody: "Estamos en Posto 7, entre Ipanema y la Pedra do Arpoador. Confirma el horario de tu clase por WhatsApp y encuentra al equipo en la playa.",
    mapTitle: "Mapa de Posto 7 en Arpoador",
    openMap: "Abrir mapa",
    instagramLabel: "Naamã Surf en Instagram: @naama_surf",
    closeImage: "Cerrar imagen",
    previousImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    contact: "CONTACTO",
    location: "UBICACIÓN",
  },
  fr: {
    mainNavigation: "Navigation principale",
    languageSelector: "Choisir la langue",
    highlights: "Points forts",
    choosePhoto: "Choisissez une photo",
    showPhoto: "Afficher la photo",
    findKicker: "Retrouvez-nous à Rio",
    findTitle: "Votre point de rencontre avec l’océan.",
    findBody: "Nous sommes au Posto 7, entre Ipanema et la Pedra do Arpoador. Confirmez l’heure de votre cours sur WhatsApp et retrouvez l’équipe sur la plage.",
    mapTitle: "Carte du Posto 7 à Arpoador",
    openMap: "Ouvrir la carte",
    instagramLabel: "Naamã Surf sur Instagram: @naama_surf",
    closeImage: "Fermer l’image",
    previousImage: "Image précédente",
    nextImage: "Image suivante",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    contact: "CONTACT",
    location: "LOCALISATION",
  },
};

function WhatsAppIcon() {
  return <FaWhatsapp aria-hidden="true" className="wa-icon" />;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("pt");
  const [activeStoryPhoto, setActiveStoryPhoto] = useState(0);
  const [selectedExperiencePhoto, setSelectedExperiencePhoto] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const c = copy[language];
  const u = interfaceCopy[language];
  const whatsappUrl = WHATSAPP_URLS[language];
  const storyPhotos = [
    "/story/kelly-slater1.jpg",
    "/story/kelly-slater2.jpg",
    "/story/kelly-slater3.jpg",
    "/story/kelly-slater4.jpg",
  ];
  const experiencePhotos = Array.from(
    { length: 11 },
    (_, index) => `/experience/aula-${String(index + 1).padStart(2, "0")}.jpg`,
  );

  useEffect(() => {
    const browserLanguage = navigator.language?.toLowerCase() ?? "";
    const preferredLanguage: Language = browserLanguage.startsWith("en")
      ? "en"
      : browserLanguage.startsWith("es")
        ? "es"
        : browserLanguage.startsWith("fr")
          ? "fr"
          : "pt";
    const frame = window.requestAnimationFrame(() => setLanguage(preferredLanguage));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  }, [language]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 780) setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (selectedExperiencePhoto === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedExperiencePhoto(null);
      if (event.key === "ArrowLeft") {
        setSelectedExperiencePhoto((current) =>
          current === null ? 0 : (current - 1 + experiencePhotos.length) % experiencePhotos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedExperiencePhoto((current) =>
          current === null ? 0 : (current + 1) % experiencePhotos.length,
        );
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedExperiencePhoto, experiencePhotos.length]);

  return (
    <main>
      <header className="site-header" aria-label={u.mainNavigation}>
        <a href="#top" className="brand" aria-label="Naamã Surf — início">
          <img src="/brand/naama-surf-logo.png" alt="Naamã Surf" />
          <span>NAAMÃ SURF</span>
        </a>
        <nav className="desktop-nav">
          {c.nav.map((item, index) => (
            <a href={c.navHref[index]} key={item}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={u.languageSelector}>
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.code}
                className={language === option.code ? "active" : ""}
                onClick={() => setLanguage(option.code)}
                aria-label={option.label}
                title={option.label}
                aria-pressed={language === option.code}
              >
                <span aria-hidden="true" className={`flag flag-${option.code}`} />
              </button>
            ))}
          </div>
          <a href={whatsappUrl} className="header-cta" target="_blank" rel="noreferrer">
            <WhatsAppIcon /> <span className="cta-label">{c.navCta}</span>
          </a>
          <button
            type="button"
            className={`mobile-menu-button ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? u.closeMenu : u.openMenu}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label={u.closeMenu}
            tabIndex={-1}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="mobile-navigation" id="mobile-navigation" aria-label={u.mainNavigation}>
            <div className="mobile-nav-links">
              {c.nav.map((item, index) => (
                <a
                  href={c.navHref[index]}
                  key={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {item}
                  <b aria-hidden="true">↘</b>
                </a>
              ))}
            </div>
            <div className="mobile-nav-footer">
              <div className="mobile-language-switch" aria-label={u.languageSelector}>
                {LANGUAGE_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.code}
                    className={language === option.code ? "active" : ""}
                    onClick={() => {
                      setLanguage(option.code);
                      setIsMobileMenuOpen(false);
                    }}
                    aria-label={option.label}
                    aria-pressed={language === option.code}
                  >
                    <span aria-hidden="true" className={`flag flag-${option.code}`} />
                    <small>{option.code.toUpperCase()}</small>
                  </button>
                ))}
              </div>
              <a
                href={whatsappUrl}
                className="button button-yellow"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <WhatsAppIcon /> {c.navCta}
              </a>
            </div>
          </nav>
        </>
      )}

      <section className="hero" id="top">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="sun-disc" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">{c.heroKicker}</p>
            <h1>{c.heroTitle}</h1>
            <p className="hero-body">{c.heroBody}</p>
            <div className="hero-actions">
              <a href={whatsappUrl} className="button button-primary" target="_blank" rel="noreferrer">
                <WhatsAppIcon /> {c.heroCta}
              </a>
              <a href="#aulas" className="text-link">{c.heroLink} <span aria-hidden="true">↓</span></a>
            </div>
            <p className="hero-note"><span aria-hidden="true">●</span> {c.heroNote}</p>
          </div>
          <div className="hero-emblem" aria-hidden="true">
            <div className="emblem-orbit orbit-one" />
            <div className="emblem-orbit orbit-two" />
            <img src="/brand/naama-surf-logo.png" alt="" />
            <div className="floating-board"><span>ARPOADOR</span></div>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
      </section>

      <div className="trust-strip" aria-label={u.highlights}>
        {c.trust.map((item, index) => (
          <div key={item}><span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>{item}</div>
        ))}
      </div>

      <section className="intro-section section-pad">
        <div className="container intro-grid">
          <div>
            <p className="eyebrow">{c.introKicker}</p>
            <h2>{c.introTitle}</h2>
          </div>
          <p className="large-copy">{c.introBody}</p>
        </div>
        <div className="wave-marquee" aria-hidden="true">
          <span>PRIMEIRA ONDA · FIRST WAVE · ARPOADOR · RIO DE JANEIRO · </span>
          <span>PRIMEIRA ONDA · FIRST WAVE · ARPOADOR · RIO DE JANEIRO · </span>
        </div>
      </section>

      <section className="classes-section section-pad" id="aulas">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow light">{c.classesKicker}</p>
              <h2>{c.classesTitle}</h2>
            </div>
            <p>{c.classesBody}</p>
          </div>
          <div className="class-grid">
            {c.classCards.map((card, index) => (
              <article className={`class-card card-${index + 1}`} key={card.title}>
                <div className="card-topline"><span>{card.tag}</span><b>0{index + 1}</b></div>
                <h3>{card.title}</h3>
                <p className="card-subtitle">{card.subtitle}</p>
                <ul>
                  {card.bullets.map((bullet) => <li key={bullet}><span>✓</span>{bullet}</li>)}
                </ul>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span>{c.cardCta}</span><WhatsAppIcon />
                </a>
              </article>
            ))}
          </div>
          <div className="extras-grid">
            {c.extras.map((extra, index) => (
              <article key={extra[0]}>
                <span className="extra-number">0{index + 4}</span>
                <div><h3>{extra[0]}</h3><p>{extra[1]}</p></div>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`${c.cardCta}: ${extra[0]}`}>
                  <WhatsAppIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="real-moments-section" id="momentos">
        <div className="container real-moments-heading">
          <div>
            <p className="eyebrow">{c.realKicker}</p>
            <h2>{c.realTitle}</h2>
          </div>
          <div className="real-moments-intro">
            <p>{c.realBody}</p>
            <span>↘ {c.realPhotoHint}</span>
          </div>
        </div>

        <div className="container real-feature-grid">
          <button
            type="button"
            className="real-feature-photo real-feature-main"
            onClick={() => setSelectedExperiencePhoto(5)}
            aria-label={c.realCaptions[5]}
          >
            <img src={experiencePhotos[5]} alt={c.realCaptions[5]} loading="lazy" />
            <span><b>01</b>{c.realCaptions[5]}</span>
          </button>
          <div className="real-feature-side">
            <button
              type="button"
              className="real-feature-photo real-feature-portrait"
              onClick={() => setSelectedExperiencePhoto(10)}
              aria-label={c.realCaptions[10]}
            >
              <img src={experiencePhotos[10]} alt={c.realCaptions[10]} loading="lazy" />
              <span><b>02</b>{c.realCaptions[10]}</span>
            </button>
            <button
              type="button"
              className="real-feature-photo real-feature-team"
              onClick={() => setSelectedExperiencePhoto(0)}
              aria-label={c.realCaptions[0]}
            >
              <img src={experiencePhotos[0]} alt={c.realCaptions[0]} loading="lazy" />
              <span><b>03</b>{c.realCaptions[0]}</span>
            </button>
          </div>
        </div>

        <div className="container real-video-row">
          <div className="real-video-copy">
            <span>04 / VIDEO</span>
            <h3>{c.realVideoTitle}</h3>
            <p>{c.realVideoBody}</p>
          </div>
          <div className={`real-video-card ${isVideoPlaying ? "is-playing" : ""}`}>
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster="/experience/aula-07.jpg"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src="/experience/aulas-naama.mp4" type="video/mp4" />
            </video>
            <div aria-hidden="true"><span>▶</span>{c.realVideoPlay}</div>
          </div>
        </div>

        <div className="real-photo-reel" aria-label={c.realPhotoHint}>
          <div className="real-photo-reel-track">
            {experiencePhotos.map((photo, index) => (
              <button
                type="button"
                key={photo}
                className={index % 3 === 1 ? "reel-tall" : index % 3 === 2 ? "reel-wide" : ""}
                onClick={() => setSelectedExperiencePhoto(index)}
                aria-label={c.realCaptions[index]}
              >
                <img src={photo} alt={c.realCaptions[index]} loading="lazy" />
                <span><b>{String(index + 1).padStart(2, "0")}</b>{c.realCaptions[index]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section" id="naama">
        <div className="story-sticky" aria-hidden="true">
          <div className="story-sun" />
          <div className="story-board"><span>CANTAGALO</span><b>→</b><span>HAWAII</span></div>
          <div className="story-wave story-wave-one" />
          <div className="story-wave story-wave-two" />
        </div>
        <div className="container story-content">
          <div className="story-copy">
            <p className="eyebrow light">{c.storyKicker}</p>
            <h2>{c.storyTitle}</h2>
            <div className="story-paragraphs">
              <p>{c.storyP1}</p>
              <p>{c.storyP2}</p>
              <p>{c.storyP3}</p>
            </div>
            <a href={whatsappUrl} className="button button-yellow" target="_blank" rel="noreferrer">
              <WhatsAppIcon /> {c.storyCta}
            </a>
          </div>
          <div className="story-gallery" aria-label={c.storyPhotoLabel}>
            <figure className="story-gallery-main">
              <span className="story-photo-counter">0{activeStoryPhoto + 1} / 04</span>
              <img
                key={storyPhotos[activeStoryPhoto]}
                className="story-main-photo"
                src={storyPhotos[activeStoryPhoto]}
                alt={c.storyPhotoAlts[activeStoryPhoto]}
                loading="lazy"
              />
              <figcaption>
                <span>{c.storyPhotoLabel}</span>
                <p>{c.storyPhotoCaptions[activeStoryPhoto]}</p>
              </figcaption>
            </figure>
            <div className="story-thumbnails" aria-label={u.choosePhoto}>
              {storyPhotos.map((photo, index) => (
                <button
                  type="button"
                  key={photo}
                  className={activeStoryPhoto === index ? "active" : ""}
                  onClick={() => setActiveStoryPhoto(index)}
                  aria-label={`${u.showPhoto} ${index + 1}`}
                  aria-pressed={activeStoryPhoto === index}
                >
                  <img src={photo} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <blockquote>{c.pullQuote}</blockquote>
        </div>
      </section>

      <section className="experience-section section-pad" id="experiencia">
        <div className="container">
          <p className="eyebrow">{c.experienceKicker}</p>
          <div className="experience-title-row">
            <h2>{c.experienceTitle}</h2>
            <div className="mini-compass" aria-hidden="true">↗</div>
          </div>
          <div className="steps-grid">
            {c.steps.map((step) => (
              <article key={step[0]}>
                <span>{step[0]}</span>
                <div><h3>{step[1]}</h3><p>{step[2]}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="location-section" id="localizacao">
        <div className="location-photo" aria-hidden="true" />
        <div className="container location-grid">
          <div className="location-label"><span>22°59&apos;18.6&quot;S</span><span>43°11&apos;33.1&quot;W</span></div>
          <div className="location-copy">
            <p className="eyebrow light">{c.locationKicker}</p>
            <h2>{c.locationTitle}</h2>
            <p>{c.locationBody}</p>
            <a className="text-link light-link" href="https://www.google.com/maps/search/?api=1&query=Posto+7+Arpoador+Rio+de+Janeiro" target="_blank" rel="noreferrer">
              {c.mapCta} <span>↗</span>
            </a>
          </div>
          <div className="location-pin" aria-hidden="true"><span>7</span><b>POSTO</b></div>
        </div>
      </section>

      <section className="faq-section section-pad">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">{c.faqKicker}</p>
            <h2>{c.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {c.faqs.map((faq, index) => (
              <details key={faq[0]} open={index === 0}>
                <summary>{faq[0]}<span>+</span></summary>
                <p>{faq[1]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-rings" aria-hidden="true" />
        <div className="container final-inner">
          <img src="/brand/naama-surf-logo.png" alt="Naamã Surf" />
          <p className="eyebrow light">{c.finalKicker}</p>
          <h2>{c.finalTitle}</h2>
          <p>{c.finalBody}</p>
          <a href={whatsappUrl} className="button button-yellow button-large" target="_blank" rel="noreferrer">
            <WhatsAppIcon /> {c.finalCta}
          </a>
        </div>
      </section>

      <section className="map-social-section" aria-labelledby="map-social-title">
        <div className="container map-social-grid">
          <div className="map-social-copy">
            <p className="eyebrow">{u.findKicker}</p>
            <h2 id="map-social-title">{u.findTitle}</h2>
            <p>{u.findBody}</p>
            <div className="map-address">
              <span>22°59&apos;18.6&quot;S · 43°11&apos;33.1&quot;W</span>
              <strong>Posto 7 · Arpoador · Rio de Janeiro</strong>
            </div>
            <a
              className="instagram-link"
              href="https://www.instagram.com/naama_surf/"
              target="_blank"
              rel="noreferrer"
              aria-label={u.instagramLabel}
            >
              <span className="instagram-icon" aria-hidden="true"><FaInstagram /></span>
              <span><small>Instagram</small><strong>@naama_surf</strong></span>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
          <div className="mini-map-shell">
            <iframe
              title={u.mapTitle}
              src="https://www.google.com/maps?q=Posto%207%20Arpoador%20Rio%20de%20Janeiro&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-badge"><span>7</span><b>POSTO · ARPOADOR</b></div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Posto+7+Arpoador+Rio+de+Janeiro"
              target="_blank"
              rel="noreferrer"
            >
              {u.openMap} <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/brand/naama-surf-logo.png" alt="" /><div><strong>NAAMÃ SURF</strong><p>{c.footer}</p></div></div>
          <div><span>{u.contact}</span><a href={whatsappUrl} target="_blank" rel="noreferrer">+55 21 99097-0011</a><a href="https://www.instagram.com/naama_surf/" target="_blank" rel="noreferrer">@naama_surf ↗</a></div>
          <div><span>{u.location}</span><p>Posto 7 · Arpoador<br />Ipanema · Rio de Janeiro</p></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Naamã Surf School</span><a href="https://unsplash.com/photos/a-person-swimming-in-the-ocean-at-sunset-M_kAtJyxlAk" target="_blank" rel="noreferrer">{c.photoCredit}</a></div>
      </footer>

      {selectedExperiencePhoto !== null && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={c.realCaptions[selectedExperiencePhoto]}
          onClick={() => setSelectedExperiencePhoto(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedExperiencePhoto(null)}
            aria-label={u.closeImage}
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-arrow lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedExperiencePhoto((selectedExperiencePhoto - 1 + experiencePhotos.length) % experiencePhotos.length);
            }}
            aria-label={u.previousImage}
          >
            ←
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img
              key={experiencePhotos[selectedExperiencePhoto]}
              src={experiencePhotos[selectedExperiencePhoto]}
              alt={c.realCaptions[selectedExperiencePhoto]}
            />
            <figcaption>
              <span>{String(selectedExperiencePhoto + 1).padStart(2, "0")} / 11</span>
              <p>{c.realCaptions[selectedExperiencePhoto]}</p>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-arrow lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedExperiencePhoto((selectedExperiencePhoto + 1) % experiencePhotos.length);
            }}
            aria-label={u.nextImage}
          >
            →
          </button>
        </div>
      )}

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
        <WhatsAppIcon /> <span>{c.floating}</span>
      </a>
    </main>
  );
}
