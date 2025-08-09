import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Профессиональный');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [taskInProgress, setTaskInProgress] = useState<number | null>(null);
  const [taskResults, setTaskResults] = useState<{[key: number]: string}>({});
  const [taskInputs, setTaskInputs] = useState<{[key: number]: any}>({});
  const [taskFeedback, setTaskFeedback] = useState<{[key: number]: {score: number, feedback: string}}>({});

  const tasks = [
    {
      id: 1,
      title: "Создание описаний товаров",
      description: "Генерация убедительных описаний для интернет-магазина",
      difficulty: "Легко",
      time: "15 мин",
      tools: ["ChatGPT", "Claude"],
      example: "Смартфон iPhone 15 Pro — революционный дизайн с титановым корпусом и камерой Pro класса"
    },
    {
      id: 2,
      title: "Написание email-рассылок",
      description: "Создание персонализированных писем для клиентов",
      difficulty: "Средне",
      time: "20 мин",
      tools: ["Jasper", "Copy.ai"],
      example: "Тема: Ваша скидка 25% истекает завтра! Не упустите возможность..."
    },
    {
      id: 3,
      title: "Генерация идей контента",
      description: "100 идей для постов в социальных сетях",
      difficulty: "Легко",
      time: "10 мин",
      tools: ["ChatGPT", "Notion AI"],
      example: "1. Покажите рабочее место команды 2. Опрос среди подписчиков 3. История успеха клиента"
    },
    {
      id: 4,
      title: "Создание сценариев видео",
      description: "Структурированные сценарии для YouTube и TikTok",
      difficulty: "Средне",
      time: "30 мин",
      tools: ["Synthesia", "Lumen5"],
      example: "КРЮЧОК (0-3 сек): Вы тратите 5 часов на то, что можно сделать за 15 минут..."
    },
    {
      id: 5,
      title: "Написание статей для блога",
      description: "SEO-оптимизированные статьи на 1500+ слов",
      difficulty: "Сложно",
      time: "45 мин",
      tools: ["Surfer", "MarketMuse"],
      example: "Заголовок: 7 секретов продуктивности, которые изменят вашу жизнь в 2024"
    },
    {
      id: 6,
      title: "Создание мемов и визуального контента",
      description: "Генерация вирусного визуального контента",
      difficulty: "Легко",
      time: "20 мин",
      tools: ["DALL-E", "Midjourney"],
      example: "Мем: Программист vs Обычный человек при виде ошибки 404"
    },
    {
      id: 7,
      title: "Анализ конкурентов",
      description: "Исследование стратегий конкурентов с помощью ИИ",
      difficulty: "Средне",
      time: "35 мин",
      tools: ["SEMrush", "Ahrefs"],
      example: "Конкурент использует 15 ключевых слов в заголовках, средняя длина поста 850 символов"
    },
    {
      id: 8,
      title: "Создание чат-ботов",
      description: "Разработка диалогов для автоматизации поддержки",
      difficulty: "Сложно",
      time: "60 мин",
      tools: ["Dialogflow", "Botpress"],
      example: "Приветствие: Привет! Я помогу найти нужный товар. Что вас интересует?"
    },
    {
      id: 9,
      title: "Оптимизация контента под голосовой поиск",
      description: "Адаптация текстов для Алисы и Google Assistant",
      difficulty: "Средне",
      time: "25 мин",
      tools: ["AnswerThePublic", "Also Asked"],
      example: "Как приготовить борщ быстро? → Рецепт борща за 30 минут в мультиварке"
    },
    {
      id: 10,
      title: "Создание квизов и опросов",
      description: "Интерактивный контент для увеличения вовлеченности",
      difficulty: "Легко",
      time: "25 мин",
      tools: ["Typeform", "Outgrow"],
      example: "Какой тип личности подходит вашему бренду? 8 вопросов с персонализацией"
    },
    {
      id: 11,
      title: "Генерация заголовков",
      description: "50 вариантов цепляющих заголовков для статей",
      difficulty: "Легко",
      time: "15 мин",
      tools: ["Headline Analyzer", "CoSchedule"],
      example: "До: Советы по SEO → После: 12 SEO-хаков, которые утроят ваш трафик за месяц"
    },
    {
      id: 12,
      title: "Создание инфографики",
      description: "Визуализация данных и процессов с помощью ИИ",
      difficulty: "Средне",
      time: "40 мин",
      tools: ["Canva AI", "Beautiful.ai"],
      example: "Инфографика: Эволюция интернет-маркетинга 2020-2024"
    },
    {
      id: 13,
      title: "Написание кейсов и историй успеха",
      description: "Структурированные case study для демонстрации результатов",
      difficulty: "Средне",
      time: "35 мин",
      tools: ["Grammarly", "Hemingway"],
      example: "Как агентство X увеличило конверсию клиента на 340% за 3 месяца"
    },
    {
      id: 14,
      title: "Создание подкастов и аудиоконтента",
      description: "Генерация сценариев и аудио с помощью ИИ",
      difficulty: "Сложно",
      time: "50 мин",
      tools: ["Descript", "Murf"],
      example: "Подкаст Эпизод #15: Интервью с экспертом по ИИ-маркетингу"
    },
    {
      id: 15,
      title: "Автоматизация публикации",
      description: "Настройка автопостинга в социальные сети",
      difficulty: "Средне",
      time: "30 мин",
      tools: ["Buffer", "Hootsuite"],
      example: "Автопост каждый вторник в 14:00: Совет недели + инфографика + хештеги"
    }
  ];

  const toggleTaskComplete = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const progressPercent = Math.round((completedTasks.length / tasks.length) * 100);

  const generatePrompt = () => {
    if (!product.trim() || !audience.trim()) {
      setGeneratedPrompt('Пожалуйста, заполните поля "Товар" и "Целевая аудитория"');
      return;
    }

    const toneMap: { [key: string]: string } = {
      'Профессиональный': 'деловом стиле',
      'Дружелюбный': 'дружелюбном тоне',
      'Энергичный': 'энергичном стиле', 
      'Элегантный': 'элегантном стиле'
    };

    const prompt = `Создай убедительное описание товара "${product}" для целевой аудитории "${audience}" в ${toneMap[tone]}. 

Структура описания:
1. Привлекающий заголовок
2. Ключевые преимущества (3-5 пунктов)
3. Эмоциональный призыв к действию

Требования:
- Используй конкретные цифры и факты
- Добавь социальные доказательства
- Подчеркни уникальность товара
- Длина: 150-200 слов`;

    setGeneratedPrompt(prompt);
  };

  const updateTaskInput = (taskId: number, field: string, value: string) => {
    setTaskInputs(prev => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value }
    }));
  };

  const evaluateTask = (taskId: number) => {
    const inputs = taskInputs[taskId] || {};
    let score = 0;
    let feedback = '';
    
    const evaluationRules: {[key: number]: () => void} = {
      1: () => {
        const { productName, targetAudience, keyBenefits } = inputs;
        if (productName?.length > 3) score += 35;
        if (targetAudience?.length > 8) score += 35;
        if (keyBenefits?.length > 20) score += 30;
        feedback = score >= 75 ? '🎉 Отличное описание товара! Все элементы присутствуют.' :
                  score >= 50 ? '👍 Хорошо! Добавьте больше деталей.' :
                  '📝 Заполните все поля подробнее.';
      },
      2: () => {
        const { subject, brand, offer } = inputs;
        if (subject?.length > 5 && subject?.length < 50) score += 35;
        if (brand?.length > 2) score += 30;
        if (offer?.length > 15) score += 35;
        feedback = score >= 75 ? '💌 Превосходная email-рассылка!' :
                  score >= 50 ? '📧 Неплохо! Улучшите предложение.' :
                  '✉️ Доработайте все поля.';
      },
      3: () => {
        const { niche, platform, audience } = inputs;
        if (niche?.length > 5) score += 35;
        if (platform) score += 30;
        if (audience?.length > 8) score += 35;
        feedback = score >= 75 ? '🚀 Отличные параметры для контента!' :
                  score >= 50 ? '💡 Хорошо! Уточните аудиторию.' :
                  '🎯 Заполните все обязательные поля.';
      },
      4: () => {
        const { topic, duration, message } = inputs;
        if (topic?.length > 5) score += 35;
        if (duration) score += 30;
        if (message?.length > 10) score += 35;
        feedback = score >= 75 ? '🎬 Отличная концепция видео!' :
                  score >= 50 ? '📹 Хорошо! Уточните сообщение.' :
                  '🎥 Доработайте концепцию.';
      },
      5: () => {
        const { title, keywords, mainPoints } = inputs;
        if (title?.length > 10) score += 35;
        if (keywords?.split(',').length >= 3) score += 30;
        if (mainPoints?.length > 30) score += 35;
        feedback = score >= 75 ? '📰 Отличная статья получится!' :
                  score >= 50 ? '✍️ Хорошо! Добавьте ключевые слова.' :
                  '📝 Проработайте структуру статьи.';
      },
      6: () => {
        const { theme, targetGroup, idea } = inputs;
        if (theme?.length > 5) score += 35;
        if (targetGroup?.length > 5) score += 30;
        if (idea?.length > 10) score += 35;
        feedback = score >= 75 ? '😄 Отличная идея для мема!' :
                  score >= 50 ? '🎭 Неплохо! Доработайте идею.' :
                  '🤔 Нужна более креативная концепция.';
      },
      7: () => {
        const { industry, competitors, analysisType } = inputs;
        if (industry?.length > 5) score += 35;
        if (competitors?.split(',').length >= 2) score += 30;
        if (analysisType) score += 35;
        feedback = score >= 75 ? '🔍 Отличный план анализа!' :
                  score >= 50 ? '📊 Хорошо! Добавьте конкурентов.' :
                  '📈 Уточните параметры анализа.';
      },
      8: () => {
        const { businessType, functions, botTone } = inputs;
        if (businessType?.length > 5) score += 35;
        if (functions?.length > 20) score += 30;
        if (botTone) score += 35;
        feedback = score >= 75 ? '🤖 Отличная концепция бота!' :
                  score >= 50 ? '💬 Хорошо! Опишите функции подробнее.' :
                  '🛠️ Доработайте техническое задание.';
      },
      9: () => {
        const { service, location, commonQuestions } = inputs;
        if (service?.length > 5) score += 35;
        if (location?.length > 3) score += 30;
        if (commonQuestions?.length > 20) score += 35;
        feedback = score >= 75 ? '🎙️ Отличная стратегия для голосового поиска!' :
                  score >= 50 ? '🔊 Хорошо! Добавьте больше вопросов.' :
                  '📍 Уточните параметры оптимизации.';
      },
      10: () => {
        const { quizTopic, quizGoal, quizNiche } = inputs;
        if (quizTopic?.length > 8) score += 35;
        if (quizGoal) score += 30;
        if (quizNiche?.length > 5) score += 35;
        feedback = score >= 75 ? '🎯 Отличная концепция квиза!' :
                  score >= 50 ? '📋 Хорошо! Уточните цель.' :
                  '❓ Доработайте идею квиза.';
      },
      11: () => {
        const { contentTopic, contentType, emotion } = inputs;
        if (contentTopic?.length > 5) score += 35;
        if (contentType) score += 30;
        if (emotion) score += 35;
        feedback = score >= 75 ? '✨ Отличные параметры для заголовков!' :
                  score >= 50 ? '📝 Хорошо! Выберите эмоцию.' :
                  '💭 Уточните тему контента.';
      },
      12: () => {
        const { infographicTopic, keyData, infographicAudience } = inputs;
        if (infographicTopic?.length > 8) score += 35;
        if (keyData?.length > 30) score += 30;
        if (infographicAudience?.length > 8) score += 35;
        feedback = score >= 75 ? '📊 Отличная концепция инфографики!' :
                  score >= 50 ? '📈 Хорошо! Добавьте данные.' :
                  '📉 Доработайте структуру данных.';
      },
      13: () => {
        const { caseIndustry, problem, result } = inputs;
        if (caseIndustry?.length > 5) score += 35;
        if (problem?.length > 10) score += 30;
        if (result?.length > 10) score += 35;
        feedback = score >= 75 ? '🏆 Отличная история успеха!' :
                  score >= 50 ? '📖 Хорошо! Уточните результаты.' :
                  '📚 Доработайте кейс.';
      },
      14: () => {
        const { podcastName, episodeTopic, podcastFormat } = inputs;
        if (podcastName?.length > 5) score += 35;
        if (episodeTopic?.length > 8) score += 30;
        if (podcastFormat) score += 35;
        feedback = score >= 75 ? '🎙️ Отличная концепция подкаста!' :
                  score >= 50 ? '🎧 Хорошо! Уточните тему выпуска.' :
                  '📻 Доработайте концепцию.';
      },
      15: () => {
        const { businessNiche, platforms, frequency } = inputs;
        if (businessNiche?.length > 5) score += 35;
        if (platforms?.split(',').length >= 2) score += 30;
        if (frequency) score += 35;
        feedback = score >= 75 ? '⚙️ Отличный план автоматизации!' :
                  score >= 50 ? '🔄 Хорошо! Добавьте платформы.' :
                  '📅 Доработайте стратегию публикаций.';
      }
    };
    
    const evaluateFunction = evaluationRules[taskId];
    if (evaluateFunction) {
      evaluateFunction();
    } else {
      score = 50;
      feedback = 'Оценка для этой задачи в разработке.';
    }
    
    setTaskFeedback(prev => ({ ...prev, [taskId]: { score, feedback } }));
    
    if (score >= 75) {
      setTimeout(() => toggleTaskComplete(taskId), 1000);
    }
  };

  const getTaskForm = (taskId: number) => {
    const inputs = taskInputs[taskId] || {};
    
    const taskForms: {[key: number]: JSX.Element} = {
      1: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте описание товара:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Название товара*</label>
            <input type="text" placeholder="Например: iPhone 15 Pro" className="w-full p-2 border rounded-md text-sm" value={inputs.productName || ''} onChange={(e) => updateTaskInput(taskId, 'productName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Целевая аудитория*</label>
            <input type="text" placeholder="Например: Молодые профессионалы 25-35 лет" className="w-full p-2 border rounded-md text-sm" value={inputs.targetAudience || ''} onChange={(e) => updateTaskInput(taskId, 'targetAudience', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ключевые преимущества*</label>
            <Textarea placeholder="Например: Титановый корпус, Камера Pro класса..." className="w-full text-sm min-h-[60px]" value={inputs.keyBenefits || ''} onChange={(e) => updateTaskInput(taskId, 'keyBenefits', e.target.value)} />
          </div>
        </div>
      ),
      2: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте email-рассылку:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Тема письма*</label>
            <input type="text" placeholder="Например: Анна, ваша скидка ждёт!" className="w-full p-2 border rounded-md text-sm" value={inputs.subject || ''} onChange={(e) => updateTaskInput(taskId, 'subject', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ваш бренд/компания*</label>
            <input type="text" placeholder="Например: TechStore" className="w-full p-2 border rounded-md text-sm" value={inputs.brand || ''} onChange={(e) => updateTaskInput(taskId, 'brand', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Основное предложение*</label>
            <Textarea placeholder="Что предлагаете клиенту..." className="w-full text-sm min-h-[60px]" value={inputs.offer || ''} onChange={(e) => updateTaskInput(taskId, 'offer', e.target.value)} />
          </div>
        </div>
      ),
      3: (
        <div className="space-y-3">
          <h4 className="font-semibold">Генерируйте идеи контента:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Ваша ниша*</label>
            <input type="text" placeholder="Например: Фитнес и здоровье" className="w-full p-2 border rounded-md text-sm" value={inputs.niche || ''} onChange={(e) => updateTaskInput(taskId, 'niche', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Основная платформа*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.platform || ''} onChange={(e) => updateTaskInput(taskId, 'platform', e.target.value)}>
              <option value="">Выберите платформу</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="telegram">Telegram</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Целевая аудитория*</label>
            <input type="text" placeholder="Например: Женщины 25-40 лет" className="w-full p-2 border rounded-md text-sm" value={inputs.audience || ''} onChange={(e) => updateTaskInput(taskId, 'audience', e.target.value)} />
          </div>
        </div>
      ),
      4: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте сценарий видео:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Тема видео*</label>
            <input type="text" placeholder="Например: 5 секретов продуктивности" className="w-full p-2 border rounded-md text-sm" value={inputs.topic || ''} onChange={(e) => updateTaskInput(taskId, 'topic', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Длительность*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.duration || ''} onChange={(e) => updateTaskInput(taskId, 'duration', e.target.value)}>
              <option value="">Выберите длительность</option>
              <option value="15-30 сек">15-30 секунд (TikTok/Reels)</option>
              <option value="1-3 мин">1-3 минуты (YouTube Shorts)</option>
              <option value="5-10 мин">5-10 минут (YouTube)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ключевое сообщение*</label>
            <input type="text" placeholder="Что хотите донести до зрителей?" className="w-full p-2 border rounded-md text-sm" value={inputs.message || ''} onChange={(e) => updateTaskInput(taskId, 'message', e.target.value)} />
          </div>
        </div>
      ),
      5: (
        <div className="space-y-3">
          <h4 className="font-semibold">Напишите статью для блога:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Заголовок статьи*</label>
            <input type="text" placeholder="Например: 7 способов увеличить продажи в 2024" className="w-full p-2 border rounded-md text-sm" value={inputs.title || ''} onChange={(e) => updateTaskInput(taskId, 'title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ключевые слова для SEO*</label>
            <input type="text" placeholder="Через запятую: продажи, маркетинг, бизнес" className="w-full p-2 border rounded-md text-sm" value={inputs.keywords || ''} onChange={(e) => updateTaskInput(taskId, 'keywords', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Основные тезисы*</label>
            <Textarea placeholder="Перечислите ключевые идеи статьи..." className="w-full text-sm min-h-[60px]" value={inputs.mainPoints || ''} onChange={(e) => updateTaskInput(taskId, 'mainPoints', e.target.value)} />
          </div>
        </div>
      ),
      6: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте мем/визуальный контент:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Тема мема*</label>
            <input type="text" placeholder="Например: Удаленная работа vs офис" className="w-full p-2 border rounded-md text-sm" value={inputs.theme || ''} onChange={(e) => updateTaskInput(taskId, 'theme', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Целевая аудитория*</label>
            <input type="text" placeholder="Например: IT-специалисты" className="w-full p-2 border rounded-md text-sm" value={inputs.targetGroup || ''} onChange={(e) => updateTaskInput(taskId, 'targetGroup', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Основная идея/шутка*</label>
            <input type="text" placeholder="В чем суть мема?" className="w-full p-2 border rounded-md text-sm" value={inputs.idea || ''} onChange={(e) => updateTaskInput(taskId, 'idea', e.target.value)} />
          </div>
        </div>
      ),
      7: (
        <div className="space-y-3">
          <h4 className="font-semibold">Анализ конкурентов:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Ваша ниша*</label>
            <input type="text" placeholder="Например: Онлайн-образование" className="w-full p-2 border rounded-md text-sm" value={inputs.industry || ''} onChange={(e) => updateTaskInput(taskId, 'industry', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Главные конкуренты*</label>
            <input type="text" placeholder="Перечислите через запятую" className="w-full p-2 border rounded-md text-sm" value={inputs.competitors || ''} onChange={(e) => updateTaskInput(taskId, 'competitors', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Что хотите проанализировать*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.analysisType || ''} onChange={(e) => updateTaskInput(taskId, 'analysisType', e.target.value)}>
              <option value="">Выберите тип анализа</option>
              <option value="content">Контент-стратегия</option>
              <option value="pricing">Ценообразование</option>
              <option value="social">Социальные сети</option>
              <option value="seo">SEO-стратегия</option>
            </select>
          </div>
        </div>
      ),
      8: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте чат-бота:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Сфера применения*</label>
            <input type="text" placeholder="Например: Интернет-магазин одежды" className="w-full p-2 border rounded-md text-sm" value={inputs.businessType || ''} onChange={(e) => updateTaskInput(taskId, 'businessType', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Основные функции бота*</label>
            <Textarea placeholder="Например: консультация, прием заказов, FAQ..." className="w-full text-sm min-h-[60px]" value={inputs.functions || ''} onChange={(e) => updateTaskInput(taskId, 'functions', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Тон общения*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.botTone || ''} onChange={(e) => updateTaskInput(taskId, 'botTone', e.target.value)}>
              <option value="">Выберите тон</option>
              <option value="friendly">Дружелюбный</option>
              <option value="professional">Профессиональный</option>
              <option value="casual">Неформальный</option>
            </select>
          </div>
        </div>
      ),
      9: (
        <div className="space-y-3">
          <h4 className="font-semibold">Оптимизация для голосового поиска:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Основная услуга/товар*</label>
            <input type="text" placeholder="Например: Доставка еды" className="w-full p-2 border rounded-md text-sm" value={inputs.service || ''} onChange={(e) => updateTaskInput(taskId, 'service', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Целевой регион*</label>
            <input type="text" placeholder="Например: Москва" className="w-full p-2 border rounded-md text-sm" value={inputs.location || ''} onChange={(e) => updateTaskInput(taskId, 'location', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Частые вопросы клиентов*</label>
            <Textarea placeholder="Какие вопросы задают ваши клиенты?" className="w-full text-sm min-h-[60px]" value={inputs.commonQuestions || ''} onChange={(e) => updateTaskInput(taskId, 'commonQuestions', e.target.value)} />
          </div>
        </div>
      ),
      10: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте квиз/опрос:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Тема квиза*</label>
            <input type="text" placeholder="Например: Какой тип питания вам подходит?" className="w-full p-2 border rounded-md text-sm" value={inputs.quizTopic || ''} onChange={(e) => updateTaskInput(taskId, 'quizTopic', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Цель квиза*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.quizGoal || ''} onChange={(e) => updateTaskInput(taskId, 'quizGoal', e.target.value)}>
              <option value="">Выберите цель</option>
              <option value="lead-generation">Сбор контактов</option>
              <option value="engagement">Увеличение вовлеченности</option>
              <option value="education">Обучение аудитории</option>
              <option value="product-recommendation">Рекомендация товаров</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ваша ниша*</label>
            <input type="text" placeholder="Например: Здоровое питание" className="w-full p-2 border rounded-md text-sm" value={inputs.quizNiche || ''} onChange={(e) => updateTaskInput(taskId, 'quizNiche', e.target.value)} />
          </div>
        </div>
      ),
      11: (
        <div className="space-y-3">
          <h4 className="font-semibold">Генерация заголовков:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Тема контента*</label>
            <input type="text" placeholder="Например: Инвестиции для начинающих" className="w-full p-2 border rounded-md text-sm" value={inputs.contentTopic || ''} onChange={(e) => updateTaskInput(taskId, 'contentTopic', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Тип контента*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.contentType || ''} onChange={(e) => updateTaskInput(taskId, 'contentType', e.target.value)}>
              <option value="">Выберите тип</option>
              <option value="article">Статья</option>
              <option value="video">Видео</option>
              <option value="social-post">Пост в соцсетях</option>
              <option value="email">Email-рассылка</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Желаемая эмоция*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.emotion || ''} onChange={(e) => updateTaskInput(taskId, 'emotion', e.target.value)}>
              <option value="">Выберите эмоцию</option>
              <option value="curiosity">Любопытство</option>
              <option value="urgency">Срочность</option>
              <option value="benefit">Выгода</option>
              <option value="surprise">Удивление</option>
            </select>
          </div>
        </div>
      ),
      12: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте инфографику:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Тема инфографики*</label>
            <input type="text" placeholder="Например: Статистика e-commerce 2024" className="w-full p-2 border rounded-md text-sm" value={inputs.infographicTopic || ''} onChange={(e) => updateTaskInput(taskId, 'infographicTopic', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ключевые данные*</label>
            <Textarea placeholder="Перечислите цифры, факты, статистику..." className="w-full text-sm min-h-[60px]" value={inputs.keyData || ''} onChange={(e) => updateTaskInput(taskId, 'keyData', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Целевая аудитория*</label>
            <input type="text" placeholder="Например: Владельцы интернет-магазинов" className="w-full p-2 border rounded-md text-sm" value={inputs.infographicAudience || ''} onChange={(e) => updateTaskInput(taskId, 'infographicAudience', e.target.value)} />
          </div>
        </div>
      ),
      13: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте кейс/историю успеха:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Сфера деятельности*</label>
            <input type="text" placeholder="Например: Маркетинговое агентство" className="w-full p-2 border rounded-md text-sm" value={inputs.caseIndustry || ''} onChange={(e) => updateTaskInput(taskId, 'caseIndustry', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Проблема клиента*</label>
            <input type="text" placeholder="С какой проблемой обратился клиент?" className="w-full p-2 border rounded-md text-sm" value={inputs.problem || ''} onChange={(e) => updateTaskInput(taskId, 'problem', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Достигнутый результат*</label>
            <input type="text" placeholder="Например: Увеличение продаж на 300%" className="w-full p-2 border rounded-md text-sm" value={inputs.result || ''} onChange={(e) => updateTaskInput(taskId, 'result', e.target.value)} />
          </div>
        </div>
      ),
      14: (
        <div className="space-y-3">
          <h4 className="font-semibold">Создайте подкаст:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Название подкаста*</label>
            <input type="text" placeholder="Например: Секреты успешного бизнеса" className="w-full p-2 border rounded-md text-sm" value={inputs.podcastName || ''} onChange={(e) => updateTaskInput(taskId, 'podcastName', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Тема выпуска*</label>
            <input type="text" placeholder="Например: Как масштабировать стартап" className="w-full p-2 border rounded-md text-sm" value={inputs.episodeTopic || ''} onChange={(e) => updateTaskInput(taskId, 'episodeTopic', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Формат*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.podcastFormat || ''} onChange={(e) => updateTaskInput(taskId, 'podcastFormat', e.target.value)}>
              <option value="">Выберите формат</option>
              <option value="solo">Сольный выпуск</option>
              <option value="interview">Интервью с экспертом</option>
              <option value="panel">Панельная дискуссия</option>
            </select>
          </div>
        </div>
      ),
      15: (
        <div className="space-y-3">
          <h4 className="font-semibold">Автоматизация публикации:</h4>
          <div>
            <label className="block text-sm font-medium mb-1">Ваша ниша*</label>
            <input type="text" placeholder="Например: Фитнес-тренер" className="w-full p-2 border rounded-md text-sm" value={inputs.businessNiche || ''} onChange={(e) => updateTaskInput(taskId, 'businessNiche', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Основные платформы*</label>
            <input type="text" placeholder="Например: Instagram, Facebook, Telegram" className="w-full p-2 border rounded-md text-sm" value={inputs.platforms || ''} onChange={(e) => updateTaskInput(taskId, 'platforms', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Частота публикаций*</label>
            <select className="w-full p-2 border rounded-md text-sm" value={inputs.frequency || ''} onChange={(e) => updateTaskInput(taskId, 'frequency', e.target.value)}>
              <option value="">Выберите частоту</option>
              <option value="daily">Каждый день</option>
              <option value="3-times-week">3 раза в неделю</option>
              <option value="weekly">Еженедельно</option>
              <option value="bi-weekly">Раз в две недели</option>
            </select>
          </div>
        </div>
      )
    };
    
    return taskForms[taskId] || <div>Форма для этой задачи в разработке...</div>;
  };

  const difficultyColors = {
    "Легко": "bg-green-100 text-green-800",
    "Средне": "bg-yellow-100 text-yellow-800", 
    "Сложно": "bg-red-100 text-red-800"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Brain" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Content Guide</h1>
                <p className="text-sm text-gray-600">15 практических задач с ИИ</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Прогресс</p>
                <div className="flex items-center gap-2">
                  <Progress value={progressPercent} className="w-24" />
                  <span className="text-sm font-medium">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Icon name="CheckSquare" size={16} />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Icon name="Target" size={16} />
              Упражнения
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              Примеры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Card 
                  key={task.id} 
                  className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    completedTasks.includes(task.id) ? 'ring-2 ring-green-500 bg-green-50' : 'hover:scale-105'
                  } ${activeTask === task.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveTask(activeTask === task.id ? null : task.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={completedTasks.includes(task.id)}
                          onCheckedChange={() => toggleTaskComplete(task.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                      </div>
                      <Badge className={difficultyColors[task.difficulty as keyof typeof difficultyColors]}>
                        {task.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon name="Clock" size={14} />
                        {task.time}
                      </div>
                      <div className="flex gap-1">
                        {task.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {activeTask === task.id && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-md animate-accordion-down">
                        {!taskFeedback[task.id] ? (
                          <div className="space-y-4">
                            <div className="text-xs text-gray-600 mb-3">
                              💡 <strong>Подсказка:</strong> {task.example}
                            </div>
                            
                            {getTaskForm(task.id)}
                            
                            <Button 
                              size="sm" 
                              className="w-full mt-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                evaluateTask(task.id);
                              }}
                            >
                              Проверить работу
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Оценка работы:</p>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  className={
                                    taskFeedback[task.id].score >= 75 ? 'bg-green-100 text-green-800' :
                                    taskFeedback[task.id].score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }
                                >
                                  {taskFeedback[task.id].score}/100
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="bg-white p-3 rounded border text-sm">
                              {taskFeedback[task.id].feedback}
                            </div>
                            
                            {taskFeedback[task.id].score >= 75 && (
                              <div className="bg-green-50 border border-green-200 p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                  <Icon name="Trophy" size={16} className="text-green-600" />
                                  <span className="text-sm font-medium text-green-800">
                                    Поздравляем! Задача выполнена успешно!
                                  </span>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTaskFeedback(prev => {
                                    const newFeedback = { ...prev };
                                    delete newFeedback[task.id];
                                    return newFeedback;
                                  });
                                }}
                              >
                                <Icon name="RefreshCw" size={12} className="mr-1" />
                                Попробовать снова
                              </Button>
                              {taskFeedback[task.id].score >= 75 && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const result = Object.values(taskInputs[task.id] || {}).join('\n\n');
                                    navigator.clipboard.writeText(result);
                                  }}
                                >
                                  <Icon name="Copy" size={12} className="mr-1" />
                                  Копировать результат
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PenTool" size={20} />
                    Интерактивное упражнение: Создание промпта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Создайте эффективный промпт для генерации описания товара:</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Товар:</label>
                      <input 
                        type="text" 
                        placeholder="Например: Беспроводные наушники"
                        className="w-full p-2 border rounded-md"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Целевая аудитория:</label>
                      <input 
                        type="text" 
                        placeholder="Например: Спортсмены 25-40 лет"
                        className="w-full p-2 border rounded-md"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Тон:</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                      >
                        <option>Профессиональный</option>
                        <option>Дружелюбный</option>
                        <option>Энергичный</option>
                        <option>Элегантный</option>
                      </select>
                    </div>
                    <Button className="w-full" onClick={generatePrompt}>
                      Генерировать промпт
                    </Button>
                    
                    {generatedPrompt && (
                      <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">Сгенерированный промпт:</label>
                        <Textarea 
                          value={generatedPrompt}
                          readOnly
                          className="min-h-[200px] bg-gray-50"
                          placeholder="Здесь появится сгенерированный промпт..."
                        />
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                          >
                            <Icon name="Copy" size={14} className="mr-1" />
                            Копировать
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setGeneratedPrompt('')}
                          >
                            <Icon name="Trash2" size={14} className="mr-1" />
                            Очистить
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={20} />
                    Анализ результатов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Сравните эффективность разных подходов:</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Обычное описание</span>
                      <div className="flex items-center gap-2">
                        <Progress value={40} className="w-16" />
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ИИ + базовый промпт</span>
                      <div className="flex items-center gap-2">
                        <Progress value={70} className="w-16" />
                        <span className="text-sm">70%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>ИИ + детальный промпт</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-16" />
                        <span className="text-sm">95%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" size={20} />
                    Готовые решения и шаблоны
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Email-рассылка для e-commerce</h4>
                      <p className="text-sm text-gray-600 mb-2">Увеличение открываемости на 45%</p>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <strong>Тема:</strong> [Имя], ваша корзина скучает! 🛒<br/>
                        <strong>Превью:</strong> Не забудьте про свои избранные товары...
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Пост для Instagram</h4>
                      <p className="text-sm text-gray-600 mb-2">Средний охват: 15,000 показов</p>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <strong>Текст:</strong> За этой картинкой стоят 3 месяца работы...<br/>
                        <strong>Хештеги:</strong> #бизнес #стартап #мотивация
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;