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

  const startTask = async (taskId: number) => {
    setTaskInProgress(taskId);
    
    // Симуляция выполнения задачи
    const task = tasks.find(t => t.id === taskId);
    const timeInMs = parseInt(task?.time.replace(' мин', '') || '15') * 100; // ускоренное время для демо
    
    // Имитация процесса с обновлениями
    const steps = [
      'Анализирую задачу...',
      'Генерирую контент...',
      'Оптимизирую результат...',
      'Завершаю выполнение...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, timeInMs / steps.length));
      setTaskResults(prev => ({...prev, [taskId]: steps[i]}));
    }
    
    // Финальный результат
    const finalResults: {[key: number]: string} = {
      1: `✨ ГОТОВО! Создано описание товара:
"Революционный iPhone 15 Pro с титановым корпусом - ваш спутник в мире инноваций! ⚡

🔥 Ключевые преимущества:
• Титановый корпус - прочность космических технологий
• Камера Pro класса - профессиональные фото без усилий  
• A17 Pro чип - производительность нового уровня
• 48MP основная камера - детализация, которая впечатляет

Присоединитесь к 50+ млн пользователей, которые уже выбрали будущее. Закажите сейчас со скидкой 15%!"`,
      
      2: `📧 EMAIL-РАССЫЛКА СОЗДАНА:
Тема: "Анна, ваша корзина скучает без вас! 🛒💔"

Привет, Анна!

Мы заметили, что вы оставили несколько отличных товаров в корзине. Не упустите их!

🎯 Ваши избранные товары:
• Беспроводные наушники Sony - только сегодня -25%
• Умные часы Apple Watch - последние 3 шт.

⏰ Успейте до завтра! Скидка действует ограниченное время.

[ОФОРМИТЬ ЗАКАЗ СО СКИДКОЙ]

С любовью, команда TechStore ❤️`,
      
      3: `💡 100 ИДЕЙ КОНТЕНТА СГЕНЕРИРОВАНО:

📱 Посты для соцсетей:
1. "Покажите рабочее место вашей мечты"
2. "Опрос: Кофе или чай для продуктивности?"
3. "История успеха: От 0 до первой продажи"
4. "Лайфхак дня: Как сэкономить 2 часа"
5. "За кулисами: День из жизни основателя"

📊 Интерактив:
6. "Угадайте: до/после нашего продукта"
7. "Викторина: Насколько вы эксперт?"
8. "Челлендж 30 дней с нашим продуктом"

И еще 92 идеи готовы! 🚀`
    };
    
    setTaskResults(prev => ({...prev, [taskId]: finalResults[taskId] || `✅ Задача "${task?.title}" выполнена успешно!`}));
    setTaskInProgress(null);
    
    // Автоматически отмечаем задачу как выполненную
    setTimeout(() => {
      toggleTaskComplete(taskId);
    }, 1000);
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
                        {!taskResults[task.id] ? (
                          <>
                            <p className="text-sm font-medium mb-2">Пример результата:</p>
                            <p className="text-sm italic text-gray-700">"{task.example}"</p>
                            <Button 
                              size="sm" 
                              className="mt-3 w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                startTask(task.id);
                              }}
                              disabled={taskInProgress === task.id}
                            >
                              {taskInProgress === task.id ? (
                                <div className="flex items-center gap-2">
                                  <Icon name="Loader2" size={14} className="animate-spin" />
                                  Выполняется...
                                </div>
                              ) : (
                                'Начать задачу'
                              )}
                            </Button>
                          </>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Результат выполнения:</p>
                              <Badge className="bg-green-100 text-green-800">Готово</Badge>
                            </div>
                            <div className="bg-white p-3 rounded border text-sm whitespace-pre-line">
                              {taskResults[task.id]}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(taskResults[task.id]);
                                }}
                              >
                                <Icon name="Copy" size={12} className="mr-1" />
                                Копировать
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startTask(task.id);
                                }}
                              >
                                <Icon name="RefreshCw" size={12} className="mr-1" />
                                Пересоздать
                              </Button>
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