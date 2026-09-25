import { getOptimizedUrl } from "@/lib/images";

export interface PasoServicio {
    titulo: string;
    descripcion: string;
}

export interface Servicio {
    slug: string;
    titulo: string;
    descripcion: string[];
    beneficios: string[];
    comoLoHacemos: PasoServicio[];
    heroImage: string;
    featureImage: string;
}

export const servicesSpanish: Servicio[] = [
    {
        slug: "desarrollo-de-aplicaciones-moviles",
        titulo: "Desarrollo de Aplicaciones Móviles",
        descripcion: [
            "Creamos aplicaciones móviles intuitivas y funcionales para iOS y Android.",
            "Nuestros desarrolladores utilizan las últimas tecnologías para garantizar que tu aplicación no solo sea atractiva, sino también robusta y escalable. Trabajamos estrechamente contigo para entender tus necesidades y entregar una solución que superará tus expectativas",
        ],
        beneficios: [
            "Aplicaciones personalizadas a tus necesidades específicas.",
            "Mayor alcance a tu audiencia objetivo.",
            "Incremento en la eficiencia operativa.",
            "Soluciones escalables que crecen con tu negocio.",
            "Interfaces de usuario intuitivas y atractivas.",
            "Soporte continuo y actualizaciones regulares.",
        ],
        comoLoHacemos: [
            {
                titulo: "Investigación y planificación:",
                descripcion:
                    "Analizamos tus necesidades y planificamos la mejor estrategia para alcanzar tus objetivos. Nuestro enfoque personalizado asegura que cada solución esté alineada con tus metas y recursos, garantizando así resultados efectivos y sostenibles.",
            },
            {
                titulo: "Diseño de interfaz:",
                descripcion:
                    "Creamos prototipos y diseños atractivos que no sólo captarán la atención, sino que también ofrecen una experiencia intuitiva y funcional. Nuestro equipo se enfoca en cada detalle para asegurar que el producto final refleje la identidad de tu marca y cumpla con las expectativas de tus usuarios.",
            },
            {
                titulo: "Desarrollo:",
                descripcion:
                    "Codificamos y desarrollamos la aplicación con las tecnologías más avanzadas, garantizando un rendimiento óptimo y una experiencia de usuario fluida. Nuestro equipo se asegura de que cada línea de código esté alineada con los estándares de calidad más altos, ofreciendo un producto final robusto, seguro y escalable.",
            },
            {
                titulo: "Pruebas:",
                descripcion:
                    "Realizamos pruebas exhaustivas para asegurar la calidad, identificando y corrigiendo cualquier error o inconsistencia antes del lanzamiento. Nuestro enfoque riguroso incluye pruebas de funcionalidad, rendimiento, seguridad y usabilidad, garantizando que el producto final cumpla con los más altos estándares y ofrezca una experiencia impecable a los usuarios.",
            },
            {
                titulo: "Lanzamiento:",
                descripcion:
                    "Publicamos la aplicación en las tiendas correspondientes, asegurando que cumpla con todas las normas y requisitos necesarios para una aprobación sin contratiempos. Nos encargamos de todo el proceso de lanzamiento, desde la preparación de los recursos hasta la gestión de la publicación, para que tu aplicación esté disponible para el público de manera rápida y eficiente.",
            },
            {
                titulo: "Mantenimiento:",
                descripcion:
                    "Ofrecemos soporte y actualizaciones continuas para garantizar que tu aplicación siga funcionando sin problemas y se mantenga al día con las últimas tendencias y tecnologías. Nuestro equipo está siempre disponible para resolver cualquier problema técnico, implementar nuevas funciones y mejorar la experiencia del usuario, asegurando que tu aplicación se mantenga competitiva y relevante.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "desarrollo-de-software-a-medida",
        titulo: "Desarrollo de Software a Medida",
        descripcion: [
            "Creamos aplicaciones móviles intuitivas y funcionales para iOS y Android.",
            "Nuestros desarrolladores utilizan las últimas tecnologías para garantizar que tu aplicación no solo sea atractiva, sino también robusta y escalable. Trabajamos estrechamente contigo para entender tus necesidades y entregar una solución que superará tus expectativas.",
        ],
        beneficios: [
            "Aplicaciones personalizadas a tus necesidades específicas.",
            "Mayor alcance a tu audiencia objetivo.",
            "Incremento en la eficiencia operativa.",
            "Soluciones escalables que crecen con tu negocio.",
            "Interfaces de usuario intuitivas y atractivas.",
            "Soporte continuo y actualizaciones regulares.",
        ],
        comoLoHacemos: [
            {
                titulo: "Investigación y planificación:",
                descripcion:
                    "Analizamos tus necesidades y planificamos la mejor estrategia para alcanzar tus objetivos. Nuestro enfoque personalizado asegura que cada solución esté alineada con tus metas y recursos, garantizando así resultados efectivos y sostenibles.",
            },
            {
                titulo: "Diseño de interfaz:",
                descripcion:
                    "Creamos prototipos y diseños atractivos que no sólo captarán la atención, sino que también ofrecerán una experiencia intuitiva y funcional. Nuestro equipo se enfoca en cada detalle para asegurar que el producto final refleje la identidad de tu marca y cumpla con las expectativas de tus usuarios.",
            },
            {
                titulo: "Desarrollo:",
                descripcion:
                    "Codificamos y desarrollamos la aplicación con las tecnologías más avanzadas, garantizando un rendimiento óptimo y una experiencia de usuario fluida. Nuestro equipo se asegura de que cada línea de código esté alineada con los estándares de calidad más altos, ofreciendo un producto final robusto, seguro y escalable.",
            },
            {
                titulo: "Pruebas:",
                descripcion:
                    "Realizamos pruebas exhaustivas para asegurar la calidad, identificando y corrigiendo cualquier error o inconsistencia antes del lanzamiento. Nuestro enfoque riguroso incluye pruebas de funcionalidad, rendimiento, seguridad y usabilidad, garantizando que el producto final cumpla con los más altos estándares y ofrezca una experiencia impecable a los usuarios.",
            },
            {
                titulo: "Lanzamiento:",
                descripcion:
                    "Publicamos la aplicación en las tiendas correspondientes, asegurando que cumpla con todas las normas y requisitos necesarios para una aprobación sin contratiempos. Nos encargamos de todo el proceso de lanzamiento, desde la preparación de los recursos hasta la gestión de la publicación, para que tu aplicación esté disponible para el público de manera rápida y eficiente.",
            },
            {
                titulo: "Mantenimiento:",
                descripcion:
                    "Nuestro equipo está siempre disponible para resolver cualquier problema técnico, implementar nuevas funciones y mejorar la experiencia del usuario, asegurando que tu aplicación se mantenga competitiva y relevante.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "integracion-de-sistemas",
        titulo: "Integración de Sistemas",
        descripcion: [
            "Facilitamos la integración de diferentes sistemas y aplicaciones para mejorar la eficiencia y coherencia operativa.",
            "Nuestro objetivo es unificar las plataformas tecnológicas para que trabajen juntas sin problemas. Esto resulta en una mayor productividad y menor redundancia.",
        ],
        beneficios: [
            "Mejora en la eficiencia operativa.",
            "Reducción de redundancias.",
            "Mayor coherencia en los datos.",
            "Incremento en la productividad.",
            "Mejora en la toma de decisiones.",
            "Soporte continuo.",
        ],
        comoLoHacemos: [
            {
                titulo: "Evaluación inicial:",
                descripcion:
                    "Analizamos tu situación actual para comprender en profundidad tus desafíos y oportunidades. Evaluamos todos los aspectos relevantes, desde tus objetivos y recursos hasta el entorno competitivo, para desarrollar una visión clara y precisa que nos permita diseñar soluciones efectivas y personalizadas que impulsen tu crecimiento.",
            },
            {
                titulo: "Recomendaciones:",
                descripcion:
                    "Proporcionamos estrategias y herramientas recomendadas para optimizar tus procesos y alcanzar tus metas de manera eficiente. Nuestras recomendaciones se basan en un análisis detallado de tu situación y están diseñadas para maximizar el rendimiento, mejorar la productividad y asegurar un crecimiento sostenible. Te ofrecemos un enfoque integral que incluye orientación, capacitación y recursos específicos para implementar con éxito las estrategias propuestas.",
            },
            {
                titulo: "Planificación:",
                descripcion:
                    "Ayudamos a planificar la implementación, asegurando que cada paso esté claramente definido y alineado con tus objetivos estratégicos. Te acompañamos en cada fase del proceso, brindando el apoyo necesario para garantizar un resultado exitoso.",
            },
            {
                titulo: "Implementación",
                descripcion:
                    "Asistimos en la implementación de las recomendaciones, trabajando estrechamente contigo para poner en práctica las estrategias propuestas. Nuestro equipo ofrece soporte práctico, desde la capacitación de tu personal hasta la supervisión de los cambios necesarios, asegurando una transición suave y efectiva. Nos comprometemos a estar a tu lado en cada etapa, adaptándonos a tus necesidades y garantizando que los resultados obtenidos sean acordes a tus expectativas y objetivos.",
            },
            {
                titulo: "Monitoreo:",
                descripcion:
                    "Supervisamos los resultados y hacemos ajustes continuos para garantizar que las estrategias implementadas están logrando el impacto deseado.",
            },
            {
                titulo: "Soporte:",
                descripcion:
                    "Ofrecemos asesoramiento continuo para garantizar que siempre tengas el apoyo necesario en cada etapa de tu proyecto. Nuestro equipo está disponible para resolver dudas, proporcionar recomendaciones adicionales y adaptar las estrategias a medida que evolucionan tus necesidades y el entorno del mercado. Nos comprometemos a ser tu socio estratégico a largo plazo, brindando orientación experta y apoyo constante para ayudarte a alcanzar el éxito.",
            },
        ],
        heroImage: getOptimizedUrl("https://plus.unsplash.com/premium_photo-1684225765169-2c46196bcca6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "consultoria-tecnologica",
        titulo: "Consultoría Tecnológica",
        descripcion: [
            "Ofrecemos consultoría para ayudarte a tomar decisiones informadas sobre tecnología.",
            "Nuestro equipo de expertos te asesora en la elección de herramientas y estrategias tecnológicas que mejor se adapten a tus objetivos. Nos aseguramos de que tu inversión en tecnología sea eficaz y rentable.",
        ],
        beneficios: [
            "Asesoramiento experto y personalizado.",
            "Mejora en la estrategia tecnológica.",
            "Reducción de costos operativos.",
            "Incremento en la eficiencia.",
            "Planificación a largo plazo.",
            "Soporte continuo.",
        ],
        comoLoHacemos: [
            {
                titulo: "Evaluación inicial:",
                descripcion:
                    "Analizamos tu situación actual para comprender en profundidad tus desafíos y oportunidades. Evaluamos todos los aspectos relevantes, desde tus objetivos y recursos hasta el entorno competitivo, para desarrollar una visión clara y precisa que nos permita diseñar soluciones efectivas y personalizadas que impulsen tu crecimiento.",
            },
            {
                titulo: "Recomendaciones:",
                descripcion:
                    "Proporcionamos estrategias y herramientas recomendadas para optimizar tus procesos y alcanzar tus metas de manera eficiente. Nuestras recomendaciones se basan en un análisis detallado de tu situación y están diseñadas para maximizar el rendimiento, mejorar la productividad y asegurar un crecimiento sostenible. Te ofrecemos un enfoque integral que incluye orientación, capacitación y recursos específicos para implementar con éxito las estrategias propuestas.",
            },
            {
                titulo: "Planificación:",
                descripcion:
                    "Ayudamos a planificar la implementación, asegurando que cada paso esté claramente definido y alineado con tus objetivos estratégicos. Te acompañamos en cada fase del proceso, brindando el apoyo necesario para garantizar un resultado exitoso.",
            },
            {
                titulo: "Implementación:",
                descripcion:
                    "Asistimos en la implementación de las recomendaciones, trabajando estrechamente contigo para poner en práctica las estrategias propuestas. Nuestro equipo ofrece soporte práctico, desde la capacitación de tu personal hasta la supervisión de los cambios necesarios, asegurando una transición suave y efectiva. Nos comprometemos a estar a tu lado en cada etapa, adaptándonos a tus necesidades y garantizando que los resultados obtenidos sean acordes a tus expectativas y objetivos.",
            },
            {
                titulo: "Monitoreo:",
                descripcion:
                    "Supervisamos los resultados y hacemos ajustes continuos para garantizar que las estrategias implementadas están logrando el impacto deseado.",
            },
            {
                titulo: "Soporte:",
                descripcion:
                    "Ofrecemos asesoramiento continuo para garantizar que siempre tengas el apoyo necesario en cada etapa de tu proyecto. Nuestro equipo está disponible para resolver dudas, proporcionar recomendaciones adicionales y adaptar las estrategias a medida que evolucionan tus necesidades y el entorno del mercado. Nos comprometemos a ser tu socio estratégico a largo plazo, brindando orientación experta y apoyo constante para ayudarte a alcanzar el éxito.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "automatizacion-de-procesos",
        titulo: "Automatización de Procesos",
        descripcion: [
            "Automatizamos los procesos empresariales para mejorar la eficiencia y reducir errores.",
            "Implementamos soluciones que agilizan tareas repetitivas y liberan a tu equipo para centrarse en actividades estratégicas. Esto se traduce en ahorro de tiempo y costos.",
        ],
        beneficios: [
            "Incremento en la eficiencia.",
            "Reducción de errores humanos.",
            "Ahorro de tiempo y costos.",
            "Mejora en la productividad.",
            "Trazabilidad y control.",
            "Soporte continuo",
        ],
        comoLoHacemos: [
            {
                titulo: "Análisis de procesos:",
                descripcion:
                    "Evaluamos tus procesos actuales para identificar áreas de mejora y optimización. Analizamos en detalle cada etapa de tus operaciones, desde la gestión de recursos hasta la ejecución de tareas, para comprender cómo se están llevando a cabo y detectar posibles ineficiencias. Esta evaluación nos permite recomendar ajustes específicos y soluciones que incrementen la eficacia, reduzcan costos y mejoren el rendimiento general de tu organización.",
            },
            {
                titulo: "Diseño de automatización:",
                descripcion:
                    "Diseñamos soluciones específicas adaptadas a tus necesidades y objetivos únicos. Basándonos en la evaluación de tus procesos y en un análisis detallado de tus requerimientos, creamos estrategias y herramientas personalizadas que abordan directamente los desafíos identificados. Nuestro enfoque garantiza que las soluciones propuestas sean prácticas, efectivas y alineadas con tu visión y metas a largo plazo.",
            },
            {
                titulo: "Desarrollo:",
                descripcion:
                    "Codificamos las soluciones de automatización con precisión y eficiencia, utilizando las últimas tecnologías y mejores prácticas en desarrollo. Nuestro equipo se encarga de transformar las soluciones diseñadas en sistemas funcionales y escalables, asegurando que la automatización mejore tus procesos, reduzca errores y optimice el rendimiento.",
            },
            {
                titulo: "Pruebas:",
                descripcion:
                    "Cada componente es sometido a rigurosos procedimientos de prueba que incluyen pruebas de funcionalidad, rendimiento, integración y seguridad. Este proceso minucioso nos permite identificar y corregir cualquier defecto antes de la implementación final, asegurando que las soluciones funcionen de manera óptima y cumplan con los más altos estándares de calidad.",
            },
            {
                titulo: "Implementación:",
                descripcion:
                    "Desplegamos las soluciones en tu entorno de manera organizada y eficiente, asegurando una transición suave desde el desarrollo hasta la producción. Nuestro equipo coordina todos los aspectos del despliegue, desde la configuración del sistema hasta la integración con tus procesos existentes. Nos aseguramos de que todo esté correctamente implementado y funcional, minimizando cualquier interrupción en tus operaciones y garantizando que las soluciones se adapten perfectamente a tu entorno.",
            },
            {
                titulo: "Soporte:",
                descripcion:
                    "Ofrecemos soporte y ajustes continuos para asegurar que las soluciones desplegadas sigan funcionando de manera óptima a lo largo del tiempo. Nuestro equipo está disponible para resolver cualquier incidencia, realizar actualizaciones necesarias y adaptar las soluciones a cambios en tus requerimientos o en el entorno operativo.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "soporte-y-mantenimiento",
        titulo: "Soporte y Mantenimiento",
        descripcion: [
            "Proveemos soporte y mantenimiento para garantizar que tus sistemas funcionen sin interrupciones",
            "Nuestro equipo está disponible para resolver cualquier problema y realizar actualizaciones necesarias, asegurando que tus operaciones continúen de manera eficiente.",
        ],
        beneficios: [
            "Sistemas operativos siempre actualizados.",
            "Reducción de tiempos de inactividad.",
            "Respuesta rápida a problemas.",
            "Mejora en la seguridad del sistema.",
            "Mayor vida útil de tus sistemas.",
            "Tranquilidad y confianza.",
        ],
        comoLoHacemos: [
            {
                titulo: "Monitoreo continuo:",
                descripcion:
                    "Supervisamos tus sistemas de forma constante para garantizar su funcionamiento ininterrumpido y detectar cualquier problema potencial antes de que afecte tus operaciones. Esta vigilancia proactiva nos permite tomar medidas preventivas y correctivas rápidamente, asegurando que tus sistemas siempre estén optimizados y protegidos contra posibles amenazas o fallos.",
            },
            {
                titulo: "Respuesta rápida:",
                descripcion:
                    "Actuamos rápidamente ante cualquier problema, implementando soluciones efectivas y minimizando el impacto en tus operaciones. Nuestro equipo de expertos está siempre disponible para responder a emergencias, proporcionando soporte técnico ágil y resolutivo. Nos aseguramos de identificar la raíz del problema, aplicar las correcciones necesarias y evitar que se repitan en el futuro, todo ello con el objetivo de garantizar la continuidad de tu negocio y la satisfacción de tus clientes.",
            },
            {
                titulo: "Actualizaciones regulares:",
                descripcion:
                    "Mantenemos tus sistemas actualizados para asegurar que siempre cuentes con las últimas mejoras en funcionalidad, seguridad y rendimiento. Este enfoque proactivo no solo protege tus sistemas contra vulnerabilidades, sino que también optimiza su desempeño y extiende su vida útil.",
            },
            {
                titulo: "Optimización:",
                descripcion:
                    "Realizamos ajustes para mejorar el rendimiento de tus sistemas y garantizar que operen con la máxima eficiencia. Analizamos continuamente los datos de rendimiento e identificamos áreas donde se pueden hacer mejoras.",
            },
            {
                titulo: "Seguridad:",
                descripcion:
                    "Implementamos medidas de seguridad proactivas para proteger tus sistemas y datos contra posibles amenazas. Con estas medidas, garantizamos un entorno seguro y confiable, protegiendo tu información sensible y asegurando la continuidad de tus operaciones.",
            },
            {
                titulo: "Asistencia:",
                descripcion:
                    "Ofrecemos soporte técnico cuando lo necesites, asegurando que siempre tengas acceso a la ayuda especializada para resolver cualquier problema o inquietud. Ya sea que necesites ayuda con la resolución de problemas, la configuración de sistemas o la capacitación de usuarios, estamos aquí para apoyarte en todo momento y garantizar que tus operaciones se desarrollen sin interrupciones.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
];

export const servicesEnglish: Servicio[] = [
    {
        slug: "desarrollo-de-aplicaciones-moviles",
        titulo: "Mobile App Development",
        descripcion: [
            "We create intuitive and functional mobile applications for iOS and Android.",
            "Our developers use the latest technologies to ensure that your application is not only attractive, but also robust and scalable. We work closely with you to understand your needs and deliver a solution that will exceed your expectations",
        ],
        beneficios: [
            "Customized applications tailored to your specific needs.",
            "Greater reach to your target audience.",
            "Increased operational efficiency.",
            "Scalable solutions that grow with your business.",
            "Intuitive and attractive user interfaces.",
            "Ongoing support and regular updates.",
        ],
        comoLoHacemos: [
            {
                titulo: "Research and planning:",
                descripcion:
                    "We analyze your needs and plan the best strategy to achieve your goals. Our personalized approach ensures that each solution is aligned with your objectives and resources, thus guaranteeing effective and sustainable results.",
            },
            {
                titulo: "Interface design:",
                descripcion:
                    "We create prototypes and attractive designs that will not only capture attention, but also provide an intuitive and functional experience. Our team focuses on every detail to ensure that the final product reflects your brand identity and meets your users' expectations.",
            },
            {
                titulo: "Development:",
                descripcion:
                    "We code and develop the application with the most advanced technologies, guaranteeing optimal performance and a smooth user experience. Our team ensures that every line of code is aligned with the highest quality standards, delivering a robust, secure, and scalable final product.",
            },
            {
                titulo: "Testing:",
                descripcion:
                    "We conduct exhaustive tests to ensure quality, identifying and correcting any errors or inconsistencies before launch. Our rigorous approach includes functionality, performance, security, and usability testing, guaranteeing that the final product meets the highest standards and offers users an impeccable experience.",
            },
            {
                titulo: "Launch:",
                descripcion:
                    "We publish the application in the corresponding stores, ensuring that it meets all the necessary rules and requirements for a smooth approval. We take care of the entire launch process, from preparing the assets to managing the publication, so that your application is available to the public quickly and efficiently.",
            },
            {
                titulo: "Maintenance:",
                descripcion:
                    "We offer ongoing support and updates to ensure that your application continues to function smoothly and stays up to date with the latest trends and technologies. Our team is always available to resolve any technical issue, implement new features, and improve the user experience, ensuring that your application remains competitive and relevant.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "desarrollo-de-software-a-medida",
        titulo: "Custom Software Development",
        descripcion: [
            "We create intuitive and functional mobile applications for iOS and Android.",
            "Our developers use the latest technologies to ensure that your application is not only attractive, but also robust and scalable. We work closely with you to understand your needs and deliver a solution that will exceed your expectations.",
        ],
        beneficios: [
            "Customized applications tailored to your specific needs.",
            "Greater reach to your target audience.",
            "Increased operational efficiency.",
            "Scalable solutions that grow with your business.",
            "Intuitive and attractive user interfaces.",
            "Ongoing support and regular updates.",
        ],
        comoLoHacemos: [
            {
                titulo: "Research and planning:",
                descripcion:
                    "We analyze your needs and plan the best strategy to achieve your goals. Our personalized approach ensures that each solution is aligned with your objectives and resources, thus guaranteeing effective and sustainable results.",
            },
            {
                titulo: "Interface design:",
                descripcion:
                    "We create prototypes and attractive designs that will not only capture attention, but also offer an intuitive and functional experience. Our team focuses on every detail to ensure that the final product reflects your brand identity and meets your users' expectations.",
            },
            {
                titulo: "Development:",
                descripcion:
                    "We code and develop the application with the most advanced technologies, guaranteeing optimal performance and a smooth user experience. Our team ensures that every line of code is aligned with the highest quality standards, delivering a robust, secure, and scalable final product.",
            },
            {
                titulo: "Testing:",
                descripcion:
                    "We conduct exhaustive tests to ensure quality, identifying and correcting any errors or inconsistencies before launch. Our rigorous approach includes functionality, performance, security, and usability testing, guaranteeing that the final product meets the highest standards and offers users an impeccable experience.",
            },
            {
                titulo: "Launch:",
                descripcion:
                    "We publish the application in the corresponding stores, ensuring that it meets all the necessary rules and requirements for a smooth approval. We take care of the entire launch process, from preparing the assets to managing the publication, so that your application is available to the public quickly and efficiently.",
            },
            {
                titulo: "Maintenance:",
                descripcion:
                    "Our team is always available to resolve any technical issue, implement new features, and improve the user experience, ensuring that your application remains competitive and relevant.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "integracion-de-sistemas",
        titulo: "Systems Integration",
        descripcion: [
            "We facilitate the integration of different systems and applications to improve efficiency and operational coherence.",
            "Our goal is to unify technological platforms so they work together seamlessly. This results in greater productivity and less redundancy.",
        ],
        beneficios: [
            "Improved operational efficiency.",
            "Reduction of redundancies.",
            "Greater data coherence.",
            "Increased productivity.",
            "Improved decision-making.",
            "Ongoing support.",
        ],
        comoLoHacemos: [
            {
                titulo: "Initial assessment:",
                descripcion:
                    "We analyze your current situation to gain a deep understanding of your challenges and opportunities. We evaluate all relevant aspects, from your goals and resources to the competitive environment, in order to develop a clear and accurate vision that allows us to design effective, personalized solutions that drive your growth.",
            },
            {
                titulo: "Recommendations:",
                descripcion:
                    "We provide recommended strategies and tools to optimize your processes and achieve your goals efficiently. Our recommendations are based on a detailed analysis of your situation and are designed to maximize performance, improve productivity, and ensure sustainable growth. We offer a comprehensive approach that includes guidance, training, and specific resources to successfully implement the proposed strategies.",
            },
            {
                titulo: "Planning:",
                descripcion:
                    "We help plan the implementation, ensuring that each step is clearly defined and aligned with your strategic objectives. We support you through each phase of the process, providing the necessary assistance to guarantee a successful outcome.",
            },
            {
                titulo: "Implementation",
                descripcion:
                    "We assist in implementing the recommendations, working closely with you to put the proposed strategies into practice. Our team provides hands-on support, from training your staff to overseeing the necessary changes, ensuring a smooth and effective transition. We are committed to being by your side at every stage, adapting to your needs and ensuring that the results achieved align with your expectations and objectives.",
            },
            {
                titulo: "Monitoring:",
                descripcion:
                    "We monitor the results and make continuous adjustments to ensure that the implemented strategies are achieving the desired impact.",
            },
            {
                titulo: "Support:",
                descripcion:
                    "We offer ongoing advice to ensure that you always have the support needed at every stage of your project. Our team is available to answer questions, provide additional recommendations, and adapt strategies as your needs and the market environment evolve. We are committed to being your long-term strategic partner, providing expert guidance and constant support to help you achieve success.",
            },
        ],
        heroImage: getOptimizedUrl("https://plus.unsplash.com/premium_photo-1684225765169-2c46196bcca6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "consultoria-tecnologica",
        titulo: "Technology Consulting",
        descripcion: [
            "We offer consulting to help you make informed technology decisions.",
            "Our team of experts advises you on choosing the technological tools and strategies that best fit your objectives. We ensure that your investment in technology is effective and profitable.",
        ],
        beneficios: [
            "Expert and personalized advice.",
            "Improved technology strategy.",
            "Reduction of operating costs.",
            "Increased efficiency.",
            "Long-term planning.",
            "Ongoing support.",
        ],
        comoLoHacemos: [
            {
                titulo: "Initial assessment:",
                descripcion:
                    "We analyze your current situation to gain a deep understanding of your challenges and opportunities. We evaluate all relevant aspects, from your goals and resources to the competitive environment, in order to develop a clear and accurate vision that allows us to design effective, personalized solutions that drive your growth.",
            },
            {
                titulo: "Recommendations:",
                descripcion:
                    "We provide recommended strategies and tools to optimize your processes and achieve your goals efficiently. Our recommendations are based on a detailed analysis of your situation and are designed to maximize performance, improve productivity, and ensure sustainable growth. We offer a comprehensive approach that includes guidance, training, and specific resources to successfully implement the proposed strategies.",
            },
            {
                titulo: "Planning:",
                descripcion:
                    "We help plan the implementation, ensuring that each step is clearly defined and aligned with your strategic objectives. We support you through each phase of the process, providing the necessary assistance to guarantee a successful outcome.",
            },
            {
                titulo: "Implementation:",
                descripcion:
                    "We assist in implementing the recommendations, working closely with you to put the proposed strategies into practice. Our team provides hands-on support, from training your staff to overseeing the necessary changes, ensuring a smooth and effective transition. We are committed to being by your side at every stage, adapting to your needs and ensuring that the results achieved align with your expectations and objectives.",
            },
            {
                titulo: "Monitoring:",
                descripcion:
                    "We monitor the results and make continuous adjustments to ensure that the implemented strategies are achieving the desired impact.",
            },
            {
                titulo: "Support:",
                descripcion:
                    "We offer ongoing advice to ensure that you always have the support needed at every stage of your project. Our team is available to answer questions, provide additional recommendations, and adapt strategies as your needs and the market environment evolve. We are committed to being your long-term strategic partner, providing expert guidance and constant support to help you achieve success.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "automatizacion-de-procesos",
        titulo: "Process Automation",
        descripcion: [
            "We automate business processes to improve efficiency and reduce errors.",
            "We implement solutions that streamline repetitive tasks and free up your team to focus on strategic activities. This translates into time and cost savings.",
        ],
        beneficios: [
            "Increased efficiency.",
            "Reduction of human errors.",
            "Time and cost savings.",
            "Improved productivity.",
            "Traceability and control.",
            "Ongoing support",
        ],
        comoLoHacemos: [
            {
                titulo: "Process analysis:",
                descripcion:
                    "We evaluate your current processes to identify areas for improvement and optimization. We analyze each stage of your operations in detail, from resource management to task execution, to understand how they are carried out and detect possible inefficiencies. This assessment allows us to recommend specific adjustments and solutions that increase efficiency, reduce costs, and improve the overall performance of your organization.",
            },
            {
                titulo: "Automation design:",
                descripcion:
                    "We design specific solutions tailored to your unique needs and objectives. Based on the evaluation of your processes and a detailed analysis of your requirements, we create customized strategies and tools that directly address the identified challenges. Our approach ensures that the proposed solutions are practical, effective, and aligned with your long-term vision and goals.",
            },
            {
                titulo: "Development:",
                descripcion:
                    "We code the automation solutions with precision and efficiency, using the latest technologies and best practices in development. Our team is responsible for transforming the designed solutions into functional and scalable systems, ensuring that automation improves your processes, reduces errors, and optimizes performance.",
            },
            {
                titulo: "Testing:",
                descripcion:
                    "Each component is subjected to rigorous testing procedures, including functionality, performance, integration, and security testing. This thorough process allows us to identify and correct any defects before final implementation, ensuring that the solutions work optimally and meet the highest quality standards.",
            },
            {
                titulo: "Implementation:",
                descripcion:
                    "We deploy the solutions in your environment in an organized and efficient manner, ensuring a smooth transition from development to production. Our team coordinates all aspects of the deployment, from system configuration to integration with your existing processes. We make sure everything is properly implemented and functional, minimizing any disruption to your operations and ensuring that the solutions fit your environment perfectly.",
            },
            {
                titulo: "Support:",
                descripcion:
                    "We provide ongoing support and adjustments to ensure that the deployed solutions continue to function optimally over time. Our team is available to resolve any incidents, perform necessary updates, and adapt the solutions to changes in your requirements or in the operating environment.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1106&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
    {
        slug: "soporte-y-mantenimiento",
        titulo: "Support and Maintenance",
        descripcion: [
            "We provide support and maintenance to ensure that your systems operate without interruptions",
            "Our team is available to resolve any issues and perform the necessary updates, ensuring that your operations continue efficiently.",
        ],
        beneficios: [
            "Always up-to-date operating systems.",
            "Reduction of downtime.",
            "Fast response to issues.",
            "Improved system security.",
            "Longer lifespan for your systems.",
            "Peace of mind and confidence.",
        ],
        comoLoHacemos: [
            {
                titulo: "Continuous monitoring:",
                descripcion:
                    "We continuously monitor your systems to ensure uninterrupted operation and detect any potential issues before they affect your operations. This proactive vigilance allows us to take preventive and corrective action quickly, ensuring that your systems are always optimized and protected against possible threats or failures.",
            },
            {
                titulo: "Fast response:",
                descripcion:
                    "We act quickly in the face of any problem, implementing effective solutions and minimizing the impact on your operations. Our team of experts is always available to respond to emergencies, providing agile and effective technical support. We ensure that we identify the root cause of the problem, apply the necessary fixes, and prevent recurrence in the future, all with the goal of guaranteeing business continuity and customer satisfaction.",
            },
            {
                titulo: "Regular updates:",
                descripcion:
                    "We keep your systems updated to ensure that you always have the latest improvements in functionality, security, and performance. This proactive approach not only protects your systems against vulnerabilities, but also optimizes their performance and extends their useful life.",
            },
            {
                titulo: "Optimization:",
                descripcion:
                    "We make adjustments to improve the performance of your systems and ensure they operate at maximum efficiency. We continuously analyze performance data and identify areas where improvements can be made.",
            },
            {
                titulo: "Security:",
                descripcion:
                    "We implement proactive security measures to protect your systems and data against possible threats. With these measures, we guarantee a secure and reliable environment, protecting your sensitive information and ensuring the continuity of your operations.",
            },
            {
                titulo: "Assistance:",
                descripcion:
                    "We offer technical support whenever you need it, ensuring that you always have access to specialized help to resolve any issue or concern. Whether you need help with troubleshooting, system configuration, or user training, we are here to support you at all times and ensure that your operations run without interruptions.",
            },
        ],
        heroImage: getOptimizedUrl("https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
        featureImage: getOptimizedUrl("https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    },
];
