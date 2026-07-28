export interface ShowcaseExample {
  id: string
  title: string
  description: string
  category: string
  icon: string
  schema: Record<string, unknown>
  uischema: Record<string, unknown>
  data: unknown
}

export interface ExampleCategory {
  id: string
  label: string
  icon: string
}

const examplesData: ShowcaseExample[] = [
  // ==================== BASIC CONTROLS ====================
  {
    id: 'basic',
    title: 'Basic',
    description: 'Minimal object with all primitive types',
    category: 'Basic Controls',
    icon: 'i-heroicons-cube',
    schema: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, age: { type: 'integer', title: 'Age' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/name' }, { type: 'Control', scope: '#/properties/age' }] },
    data: { name: '', age: 0 }
  },
  {
    id: 'basic-types',
    title: 'Basic Types',
    description: 'All JSON Schema primitive types',
    category: 'Basic Controls',
    icon: 'i-heroicons-variable',
    schema: { type: 'object', properties: { str: { type: 'string', title: 'String' }, num: { type: 'number', title: 'Number' }, int: { type: 'integer', title: 'Integer' }, bool: { type: 'boolean', title: 'Boolean' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/str' }, { type: 'Control', scope: '#/properties/num' }, { type: 'Control', scope: '#/properties/int' }, { type: 'Control', scope: '#/properties/bool' }] },
    data: { str: '', num: 0, int: 0, bool: false }
  },
  {
    id: 'string-type',
    title: 'String Type',
    description: 'String field with min/max length',
    category: 'Basic Controls',
    icon: 'i-heroicons-pencil',
    schema: { type: 'object', properties: { username: { type: 'string', title: 'Username', minLength: 3, maxLength: 20 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/username' }] },
    data: { username: '' }
  },
  {
    id: 'number-type',
    title: 'Number Type',
    description: 'Number field with min/max/multipleOf',
    category: 'Basic Controls',
    icon: 'i-heroicons-scale',
    schema: { type: 'object', properties: { price: { type: 'number', title: 'Price', minimum: 0, maximum: 1000, multipleOf: 0.5 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/price' }] },
    data: { price: 0 }
  },
  {
    id: 'integer-type',
    title: 'Integer Type',
    description: 'Integer field with constraints',
    category: 'Basic Controls',
    icon: 'i-heroicons-hashtag',
    schema: { type: 'object', properties: { count: { type: 'integer', title: 'Count', minimum: 0, maximum: 100 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/count' }] },
    data: { count: 0 }
  },
  {
    id: 'boolean-type',
    title: 'Boolean Type',
    description: 'Boolean toggle field',
    category: 'Basic Controls',
    icon: 'i-heroicons-adjustments-horizontal',
    schema: { type: 'object', properties: { active: { type: 'boolean', title: 'Active', default: false } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/active' }] },
    data: { active: false }
  },
  {
    id: 'null-type',
    title: 'Null Type',
    description: 'Nullable string field',
    category: 'Basic Controls',
    icon: 'i-heroicons-minus-circle',
    schema: { type: 'object', properties: { nickname: { type: ['string', 'null'], title: 'Nickname' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/nickname' }] },
    data: { nickname: null }
  },
  {
    id: 'text-input',
    title: 'Text Input',
    description: 'Single-line text input with validation',
    category: 'Basic Controls',
    icon: 'i-heroicons-pencil',
    schema: { type: 'object', properties: { name: { type: 'string', title: 'Full Name', minLength: 2, maxLength: 100 }, email: { type: 'string', title: 'Email', format: 'email' }, website: { type: 'string', title: 'Website', format: 'uri' }, notes: { type: 'string', title: 'Notes' } }, required: ['name', 'email'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/name' }, { type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/website' }, { type: 'Control', scope: '#/properties/notes' }] },
    data: { name: '', email: '', website: '', notes: '' }
  },
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Multi-line text with character limit',
    category: 'Basic Controls',
    icon: 'i-heroicons-document-text',
    schema: { type: 'object', properties: { bio: { type: 'string', title: 'About Me', maxLength: 500 }, address: { type: 'string', title: 'Address', maxLength: 1000 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/bio', options: { multi: true, rows: 4 } }, { type: 'Control', scope: '#/properties/address', options: { multi: true, rows: 3 } }] },
    data: { bio: '', address: '' }
  },
  {
    id: 'control',
    title: 'Control',
    description: 'Basic control element usage',
    category: 'Basic Controls',
    icon: 'i-heroicons-cpu-chip',
    schema: { type: 'object', properties: { field: { type: 'string', title: 'Field' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/field' }] },
    data: { field: '' }
  },
  {
    id: 'control-options',
    title: 'Control Options',
    description: 'Control with placeholder and formatting',
    category: 'Basic Controls',
    icon: 'i-heroicons-adjustments-vertical',
    schema: { type: 'object', properties: { search: { type: 'string', title: 'Search' }, min: { type: 'number', title: 'Min' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/search', options: { placeholder: 'Type to search...' } }, { type: 'Control', scope: '#/properties/min', options: { placeholder: '0.00' } }] },
    data: { search: '', min: 0 }
  },
  {
    id: 'text-control-options',
    title: 'Text Control Options',
    description: 'Text field with custom options',
    category: 'Basic Controls',
    icon: 'i-heroicons-document',
    schema: { type: 'object', properties: { comment: { type: 'string', title: 'Comment', maxLength: 200 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/comment', options: { multi: true, rows: 3, placeholder: 'Write a comment...' } }] },
    data: { comment: '' }
  },
  {
    id: 'number-integer',
    title: 'Number (Integer)',
    description: 'Integer input with min/max/step',
    category: 'Basic Controls',
    icon: 'i-heroicons-hashtag',
    schema: { type: 'object', properties: { age: { type: 'integer', title: 'Age', minimum: 0, maximum: 150 }, quantity: { type: 'integer', title: 'Quantity', minimum: 1, maximum: 9999 }, year: { type: 'integer', title: 'Year', minimum: 1900, maximum: 2100 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/age' }, { type: 'Control', scope: '#/properties/quantity' }, { type: 'Control', scope: '#/properties/year' }] },
    data: { age: 25, quantity: 1, year: 2024 }
  },
  {
    id: 'number-decimal',
    title: 'Number (Decimal)',
    description: 'Decimal number with precision',
    category: 'Basic Controls',
    icon: 'i-heroicons-scale',
    schema: { type: 'object', properties: { price: { type: 'number', title: 'Price', minimum: 0, maximum: 999999, multipleOf: 0.01 }, rating: { type: 'number', title: 'Rating', minimum: 0, maximum: 10, multipleOf: 0.1 }, tax: { type: 'number', title: 'Tax Rate (%)', minimum: 0, maximum: 100, multipleOf: 0.01 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/price' }, { type: 'Control', scope: '#/properties/rating' }, { type: 'Control', scope: '#/properties/tax' }] },
    data: { price: 49.99, rating: 7.5, tax: 18.0 }
  },
  {
    id: 'boolean-switch',
    title: 'Boolean (Switch)',
    description: 'Toggle switch for yes/no choices',
    category: 'Basic Controls',
    icon: 'i-heroicons-adjustments-horizontal',
    schema: { type: 'object', properties: { newsletter: { type: 'boolean', title: 'Newsletter', default: false }, notifications: { type: 'boolean', title: 'Notifications', default: true }, darkMode: { type: 'boolean', title: 'Dark Mode', default: false } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/newsletter' }, { type: 'Control', scope: '#/properties/notifications' }, { type: 'Control', scope: '#/properties/darkMode' }] },
    data: { newsletter: false, notifications: true, darkMode: false }
  },
  {
    id: 'boolean-checkbox',
    title: 'Boolean (Checkbox)',
    description: 'Checkbox for terms and agreements',
    category: 'Basic Controls',
    icon: 'i-heroicons-check-circle',
    schema: { type: 'object', properties: { terms: { type: 'boolean', title: 'I Accept the Terms of Use', default: false }, kvkk: { type: 'boolean', title: 'GDPR Consent', default: false }, marketing: { type: 'boolean', title: 'Marketing Permissions', default: false } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/terms', options: { format: 'checkbox' } }, { type: 'Control', scope: '#/properties/kvkk', options: { format: 'checkbox' } }, { type: 'Control', scope: '#/properties/marketing', options: { format: 'checkbox' } }] },
    data: { terms: false, kvkk: false, marketing: false }
  },
  {
    id: 'date',
    title: 'Date',
    description: 'Date picker with min/max constraints',
    category: 'Basic Controls',
    icon: 'i-heroicons-calendar-days',
    schema: { type: 'object', properties: { birthDate: { type: 'string', title: 'Birth Date', format: 'date' }, startDate: { type: 'string', title: 'Start Date', format: 'date' }, endDate: { type: 'string', title: 'End Date', format: 'date' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/birthDate' }, { type: 'Control', scope: '#/properties/startDate' }, { type: 'Control', scope: '#/properties/endDate' }] },
    data: { birthDate: '', startDate: '', endDate: '' }
  },
  {
    id: 'time',
    title: 'Time',
    description: 'Time picker for hours and minutes',
    category: 'Basic Controls',
    icon: 'i-heroicons-clock',
    schema: { type: 'object', properties: { alarm: { type: 'string', title: 'Alarm Time', format: 'time' }, start: { type: 'string', title: 'Work Start', format: 'time' }, end: { type: 'string', title: 'Work End', format: 'time' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/alarm' }, { type: 'Control', scope: '#/properties/start' }, { type: 'Control', scope: '#/properties/end' }] },
    data: { alarm: '07:00', start: '09:00', end: '18:00' }
  },
  {
    id: 'datetime',
    title: 'DateTime',
    description: 'Combined date and time picker',
    category: 'Basic Controls',
    icon: 'i-heroicons-clock',
    schema: { type: 'object', properties: { appointment: { type: 'string', title: 'Appointment', format: 'date-time' }, meeting: { type: 'string', title: 'Meeting', format: 'date-time' }, reminder: { type: 'string', title: 'Reminder', format: 'date-time' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/appointment' }, { type: 'Control', scope: '#/properties/meeting' }, { type: 'Control', scope: '#/properties/reminder' }] },
    data: { appointment: '', meeting: '', reminder: '' }
  },
  {
    id: 'duration',
    title: 'Duration',
    description: 'Duration / time period input',
    category: 'Basic Controls',
    icon: 'i-heroicons-clock',
    schema: { type: 'object', properties: { travelTime: { type: 'string', title: 'Travel Time', format: 'duration' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/travelTime' }] },
    data: { travelTime: '' }
  },
  {
    id: 'file',
    title: 'File',
    description: 'File upload field',
    category: 'Basic Controls',
    icon: 'i-heroicons-document-arrow-up',
    schema: { type: 'object', properties: { resume: { type: 'string', title: 'Resume' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/resume' }] },
    data: { resume: '' }
  },
  {
    id: 'readonly',
    title: 'Readonly Form',
    description: 'All fields in read-only mode',
    category: 'Basic Controls',
    icon: 'i-heroicons-eye-slash',
    schema: { type: 'object', properties: { name: { type: 'string', title: 'Full Name' }, email: { type: 'string', title: 'Email', format: 'email' }, role: { type: 'string', title: 'Role', enum: ['Admin', 'User', 'Viewer'] }, createdAt: { type: 'string', title: 'Created', format: 'date' }, active: { type: 'boolean', title: 'Active' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/name' }, { type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/role' }, { type: 'Control', scope: '#/properties/createdAt' }, { type: 'Control', scope: '#/properties/active' }] },
    data: { name: 'John Doe', email: 'john@example.com', role: 'Admin', createdAt: '2024-01-15', active: true }
  },
  {
    id: 'custom-renderer',
    title: 'Custom Renderer',
    description: 'Example using custom renderer registration',
    category: 'Basic Controls',
    icon: 'i-heroicons-sparkles',
    schema: { type: 'object', properties: { custom: { type: 'string', title: 'Custom Field' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/custom' }] },
    data: { custom: '' }
  },

  // ==================== ENUMS & SELECTION ====================
  {
    id: 'enum-select',
    title: 'Enum (Single Select)',
    description: 'Single selection from predefined options',
    category: 'Enums & Selection',
    icon: 'i-heroicons-chevron-down',
    schema: { type: 'object', properties: { country: { type: 'string', title: 'Country', enum: ['Turkey', 'USA', 'Germany', 'France', 'United Kingdom', 'Japan', 'China', 'Brazil', 'India', 'Canada'] }, city: { type: 'string', title: 'City', enum: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya', 'Adana', 'Trabzon', 'Eskisehir'] }, timezone: { type: 'string', title: 'Timezone', enum: ['UTC-5', 'UTC', 'UTC+3', 'UTC+8'] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/country' }, { type: 'Control', scope: '#/properties/city' }] }, { type: 'Control', scope: '#/properties/timezone' }] },
    data: { country: 'Turkey', city: 'Istanbul', timezone: 'UTC+3' }
  },
  {
    id: 'enum-in-array',
    title: 'Enum in Array',
    description: 'Array items constrained by enum',
    category: 'Enums & Selection',
    icon: 'i-heroicons-list-bullet',
    schema: { type: 'object', properties: { roles: { type: 'array', title: 'Roles', items: { type: 'string', enum: ['Admin', 'User', 'Viewer', 'Editor'] }, uniqueItems: true } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/roles', options: { format: 'array-tags' } }] },
    data: { roles: ['User'] }
  },
  {
    id: 'enum-multi',
    title: 'Multi Enum (Tags)',
    description: 'Multi-select with tags / chips',
    category: 'Enums & Selection',
    icon: 'i-heroicons-tag',
    schema: { type: 'object', properties: { skills: { type: 'array', title: 'Skills', items: { type: 'string', enum: ['Vue.js', 'React', 'Angular', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL'] }, uniqueItems: true }, interests: { type: 'array', title: 'Interests', items: { type: 'string', enum: ['Technology', 'Sports', 'Music', 'Cinema', 'Travel', 'Food', 'Art', 'Science'] }, uniqueItems: true } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/skills', options: { format: 'select-multiple' } }, { type: 'Control', scope: '#/properties/interests', options: { format: 'checkbox-group' } }] },
    data: { skills: ['Vue.js', 'TypeScript'], interests: ['Technology'] }
  },
  {
    id: 'enum-multi-selection',
    title: 'Enum Multi Selection',
    description: 'Multi-selection with labels',
    category: 'Enums & Selection',
    icon: 'i-heroicons-tag',
    schema: { type: 'object', properties: { colors: { type: 'array', title: 'Colors', items: { type: 'string', enum: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'] }, uniqueItems: true } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/colors', options: { format: 'select-multiple' } }] },
    data: { colors: ['Red', 'Blue'] }
  },
  {
    id: 'radio-group',
    title: 'Radio Group',
    description: 'Radio button group for single choice',
    category: 'Enums & Selection',
    icon: 'i-heroicons-circle-stack',
    schema: { type: 'object', properties: { plan: { type: 'string', title: 'Plan', enum: ['free', 'pro', 'enterprise'] }, size: { type: 'string', title: 'Boyut', enum: ['small', 'medium', 'large', 'xlarge'] }, color: { type: 'string', title: 'Renk', enum: ['blue', 'green', 'purple', 'orange', 'red'] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/plan', options: { format: 'radio-group' } }, { type: 'Control', scope: '#/properties/size', options: { format: 'radio-group' } }, { type: 'Control', scope: '#/properties/color', options: { format: 'radio-group' } }] },
    data: { plan: 'pro', size: 'medium', color: 'blue' }
  },
  {
    id: 'radio',
    title: 'Radio',
    description: 'Basic radio button single choice',
    category: 'Enums & Selection',
    icon: 'i-heroicons-circle-stack',
    schema: { type: 'object', properties: { choice: { type: 'string', title: 'Choice', enum: ['Option A', 'Option B', 'Option C'] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/choice', options: { format: 'radio-group' } }] },
    data: { choice: 'Option A' }
  },

  // ==================== COMPLEX CONTROLS ====================
  {
    id: 'slider',
    title: 'Slider',
    description: 'Range slider with min/max/step',
    category: 'Complex Controls',
    icon: 'i-heroicons-adjustments-horizontal',
    schema: { type: 'object', properties: { volume: { type: 'integer', title: 'Volume', minimum: 0, maximum: 100 }, brightness: { type: 'integer', title: 'Brightness', minimum: 0, maximum: 100, multipleOf: 5 }, contrast: { type: 'number', title: 'Contrast', minimum: 0, maximum: 2, multipleOf: 0.1 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/volume', options: { format: 'slider' } }, { type: 'Control', scope: '#/properties/brightness', options: { format: 'slider' } }, { type: 'Control', scope: '#/properties/contrast', options: { format: 'slider' } }] },
    data: { volume: 75, brightness: 50, contrast: 1 }
  },
  {
    id: 'rating',
    title: 'Rating',
    description: 'Star rating with half-point support',
    category: 'Complex Controls',
    icon: 'i-heroicons-star',
    schema: { type: 'object', properties: { satisfaction: { type: 'number', title: 'Satisfaction', minimum: 1, maximum: 5 }, quality: { type: 'number', title: 'Quality', minimum: 0, maximum: 10, multipleOf: 0.5 }, design: { type: 'number', title: 'Design', minimum: 1, maximum: 5 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/satisfaction', options: { format: 'rating' } }, { type: 'Control', scope: '#/properties/quality', options: { format: 'rating' } }, { type: 'Control', scope: '#/properties/design', options: { format: 'rating' } }] },
    data: { satisfaction: 4, quality: 7.5, design: 5 }
  },
  {
    id: 'color-picker',
    title: 'Color Picker',
    description: 'Color selection with HEX preview',
    category: 'Complex Controls',
    icon: 'i-heroicons-swatch',
    schema: { type: 'object', properties: { primary: { type: 'string', title: 'Primary Color' }, secondary: { type: 'string', title: 'Secondary Color' }, accent: { type: 'string', title: 'Accent Color' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/primary', options: { format: 'color' } }, { type: 'Control', scope: '#/properties/secondary', options: { format: 'color' } }, { type: 'Control', scope: '#/properties/accent', options: { format: 'color' } }] },
    data: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#F59E0B' }
  },

  // ==================== LAYOUTS ====================
  {
    id: 'layout-vertical',
    title: 'Vertical Layout',
    description: 'Stacked form fields in vertical arrangement',
    category: 'Layouts',
    icon: 'i-heroicons-bars-3',
    schema: { type: 'object', properties: { field1: { type: 'string', title: 'Field 1' }, field2: { type: 'string', title: 'Field 2' }, field3: { type: 'string', title: 'Field 3' }, field4: { type: 'string', title: 'Field 4' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/field1' }, { type: 'Control', scope: '#/properties/field2' }, { type: 'Control', scope: '#/properties/field3' }, { type: 'Control', scope: '#/properties/field4' }] },
    data: { field1: '', field2: '', field3: '', field4: '' }
  },
  {
    id: 'layout-horizontal',
    title: 'Horizontal Layout',
    description: 'Side-by-side fields in a row',
    category: 'Layouts',
    icon: 'i-heroicons-bars-4',
    schema: { type: 'object', properties: { first: { type: 'string', title: 'First Name' }, last: { type: 'string', title: 'Last Name' }, email: { type: 'string', title: 'Email', format: 'email' }, phone: { type: 'string', title: 'Phone' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/first' }, { type: 'Control', scope: '#/properties/last' }] }, { type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/phone' }] }] },
    data: { first: '', last: '', email: '', phone: '' }
  },
  {
    id: 'layout-group',
    title: 'Group Layout',
    description: 'Grouped fields with section labels',
    category: 'Layouts',
    icon: 'i-heroicons-rectangle-group',
    schema: { type: 'object', properties: { company: { type: 'string', title: 'Company' }, position: { type: 'string', title: 'Position' }, city: { type: 'string', title: 'City' }, country: { type: 'string', title: 'Country' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'GroupLayout', label: 'Job Information', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/company' }, { type: 'Control', scope: '#/properties/position' }] }] }, { type: 'GroupLayout', label: 'Address', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/city' }, { type: 'Control', scope: '#/properties/country' }] }] }] },
    data: { company: '', position: '', city: '', country: '' }
  },
  {
    id: 'layout-complex',
    title: 'Complex Layout',
    description: 'Combination of multiple layout types',
    category: 'Layouts',
    icon: 'i-heroicons-squares-2x2',
    schema: { type: 'object', properties: { first: { type: 'string', title: 'First' }, last: { type: 'string', title: 'Last' }, email: { type: 'string', title: 'Email', format: 'email' }, phone: { type: 'string', title: 'Phone' }, address: { type: 'string', title: 'Address' }, city: { type: 'string', title: 'City' }, zip: { type: 'string', title: 'ZIP' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'GroupLayout', label: 'Personal', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/first' }, { type: 'Control', scope: '#/properties/last' }] }, { type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/phone' }] }] }, { type: 'GroupLayout', label: 'Address', elements: [{ type: 'Control', scope: '#/properties/address' }, { type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/city' }, { type: 'Control', scope: '#/properties/zip' }] }] }] },
    data: { first: '', last: '', email: '', phone: '', address: '', city: '', zip: '' }
  },
  {
    id: 'layout-tabs',
    title: 'Tabs (Categorization)',
    description: 'Categorized form with tab navigation',
    category: 'Layouts',
    icon: 'i-heroicons-squares-2x2',
    schema: { type: 'object', properties: { personal: { type: 'string', title: 'Full Name' }, email: { type: 'string', title: 'Email', format: 'email' }, phone: { type: 'string', title: 'Phone' }, address: { type: 'string', title: 'Address' }, city: { type: 'string', title: 'City' }, postalCode: { type: 'string', title: 'Postal Code' }, company: { type: 'string', title: 'Company' }, position: { type: 'string', title: 'Position' } } },
    uischema: { type: 'Categorization', elements: [{ type: 'Category', label: 'Personal', elements: [{ type: 'GroupLayout', label: 'Basic Information', elements: [{ type: 'Control', scope: '#/properties/personal' }, { type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/phone' }] }] }, { type: 'Category', label: 'Address', elements: [{ type: 'GroupLayout', label: 'Contact Address', elements: [{ type: 'Control', scope: '#/properties/address' }, { type: 'Control', scope: '#/properties/city' }, { type: 'Control', scope: '#/properties/postalCode' }] }] }, { type: 'Category', label: 'Job/Work', elements: [{ type: 'GroupLayout', label: 'Job Information', elements: [{ type: 'Control', scope: '#/properties/company' }, { type: 'Control', scope: '#/properties/position' }] }] }] },
    data: { personal: '', email: '', phone: '', address: '', city: '', postalCode: '', company: '', position: '' }
  },
  {
    id: 'layout-stepper',
    title: 'Stepper (Multi-step Wizard)',
    description: 'Step-by-step form wizard with progress',
    category: 'Layouts',
    icon: 'i-heroicons-arrow-path-rounded-square',
    schema: { type: 'object', properties: { firstName: { type: 'string', title: 'First Name', minLength: 2 }, lastName: { type: 'string', title: 'Last Name', minLength: 2 }, email: { type: 'string', title: 'Email', format: 'email' }, address: { type: 'string', title: 'Address' }, city: { type: 'string', title: 'City' }, company: { type: 'string', title: 'Company' }, position: { type: 'string', title: 'Position' }, experience: { type: 'integer', title: 'Experience (years)', minimum: 0 }, terms: { type: 'boolean', title: 'I Accept the Terms' } }, required: ['firstName', 'lastName', 'email', 'terms'] },
    uischema: { type: 'Categorization', elements: [{ type: 'Category', label: 'Personal', elements: [{ type: 'GroupLayout', label: 'Basic Information', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/firstName' }, { type: 'Control', scope: '#/properties/lastName' }] }, { type: 'Control', scope: '#/properties/email' }] }] }, { type: 'Category', label: 'Address', elements: [{ type: 'GroupLayout', label: 'Address Information', elements: [{ type: 'Control', scope: '#/properties/address' }, { type: 'Control', scope: '#/properties/city' }] }] }, { type: 'Category', label: 'Job/Work', elements: [{ type: 'GroupLayout', label: 'Job Information', elements: [{ type: 'Control', scope: '#/properties/company' }, { type: 'Control', scope: '#/properties/position' }, { type: 'Control', scope: '#/properties/experience' }] }] }, { type: 'Category', label: 'Approval', elements: [{ type: 'GroupLayout', label: 'Final Approval', elements: [{ type: 'Control', scope: '#/properties/terms', options: { format: 'checkbox' } }] }] }] },
    data: { firstName: '', lastName: '', email: '', address: '', city: '', company: '', position: '', experience: 0, terms: false }
  },
  {
    id: 'categorization-stepper',
    title: 'Categorization Stepper',
    description: 'Step-by-step categorized form',
    category: 'Layouts',
    icon: 'i-heroicons-arrow-path-rounded-square',
    schema: { type: 'object', properties: { step1: { type: 'string', title: 'Step 1' }, step2: { type: 'string', title: 'Step 2' }, step3: { type: 'string', title: 'Step 3' } } },
    uischema: { type: 'Categorization', elements: [{ type: 'Category', label: 'Step 1', elements: [{ type: 'Control', scope: '#/properties/step1' }] }, { type: 'Category', label: 'Step 2', elements: [{ type: 'Control', scope: '#/properties/step2' }] }, { type: 'Category', label: 'Step 3', elements: [{ type: 'Control', scope: '#/properties/step3' }] }] },
    data: { step1: '', step2: '', step3: '' }
  },
  {
    id: 'nested-layout',
    title: 'Nested Layout',
    description: 'Layouts nested inside each other',
    category: 'Layouts',
    icon: 'i-heroicons-table-cells',
    schema: { type: 'object', properties: { a: { type: 'string', title: 'A' }, b: { type: 'string', title: 'B' }, c: { type: 'string', title: 'C' }, d: { type: 'string', title: 'D' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/a' }, { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/b' }, { type: 'Control', scope: '#/properties/c' }] }] }, { type: 'Control', scope: '#/properties/d' }] },
    data: { a: '', b: '', c: '', d: '' }
  },

  // ==================== COMBINATORS & RULES ====================
  {
    id: 'oneof-contact',
    title: 'oneOf (Contact Method)',
    description: 'Select one of several contact methods',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-arrow-path',
    schema: { type: 'object', properties: { contactType: { title: 'Contact Method', oneOf: [{ type: 'object', title: 'Email', properties: { method: { type: 'string', const: 'email' }, emailAddress: { type: 'string', title: 'Email Address', format: 'email' }, subject: { type: 'string', title: 'Subject' } }, required: ['method', 'emailAddress'] }, { type: 'object', title: 'Phone', properties: { method: { type: 'string', const: 'phone' }, phoneNumber: { type: 'string', title: 'Phone Number' }, availableHours: { type: 'string', title: 'Available Hours' } }, required: ['method', 'phoneNumber'] }, { type: 'object', title: 'Address', properties: { method: { type: 'string', const: 'mail' }, fullAddress: { type: 'string', title: 'Full Address' }, city: { type: 'string', title: 'City' }, zipCode: { type: 'string', title: 'Postal Code' } }, required: ['method', 'fullAddress'] }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/contactType' }] },
    data: { contactType: { method: 'email', emailAddress: '', subject: '' } }
  },
  {
    id: 'oneof-payment',
    title: 'oneOf (Payment Method)',
    description: 'Choose between payment method variants',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-credit-card',
    schema: { type: 'object', properties: { payment: { title: 'Payment Method', oneOf: [{ type: 'object', title: 'Credit Card', properties: { type: { type: 'string', const: 'card' }, cardNumber: { type: 'string', title: 'Card Number', pattern: '^[0-9]{16}$' }, expiryDate: { type: 'string', title: 'Expiry Date', format: 'date' }, cvv: { type: 'string', title: 'CVV', pattern: '^[0-9]{3}$' } }, required: ['type', 'cardNumber', 'expiryDate', 'cvv'] }, { type: 'object', title: 'Bank Transfer', properties: { type: { type: 'string', const: 'transfer' }, bankName: { type: 'string', title: 'Bank Name' }, accountNumber: { type: 'string', title: 'Account Number' }, iban: { type: 'string', title: 'IBAN' } }, required: ['type', 'bankName', 'accountNumber'] }, { type: 'object', title: 'Digital Wallet', properties: { type: { type: 'string', const: 'wallet' }, walletProvider: { type: 'string', title: 'Wallet Provider', enum: ['PayPal', 'Apple Pay', 'Google Pay', 'Venmo'] }, walletEmail: { type: 'string', title: 'Wallet Email', format: 'email' } }, required: ['type', 'walletProvider', 'walletEmail'] }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/payment' }] },
    data: { payment: { type: 'card', cardNumber: '', expiryDate: '', cvv: '' } }
  },
  {
    id: 'oneof-with-props',
    title: 'oneOf with Props',
    description: 'oneOf using discriminated object properties',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-arrow-path',
    schema: { type: 'object', properties: { delivery: { title: 'Delivery', oneOf: [{ type: 'object', title: 'Parcel', properties: { kind: { type: 'string', const: 'parcel' }, weight: { type: 'number', title: 'Weight (kg)' }, dimensions: { type: 'string', title: 'Dimensions' } }, required: ['kind', 'weight'] }, { type: 'object', title: 'Document', properties: { kind: { type: 'string', const: 'document' }, pages: { type: 'integer', title: 'Pages' }, isUrgent: { type: 'boolean', title: 'Urgent' } }, required: ['kind', 'pages'] }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/delivery' }] },
    data: { delivery: { kind: 'parcel', weight: 0, dimensions: '' } }
  },
  {
    id: 'oneof-tab',
    title: 'oneOf Tab',
    description: 'oneOf options displayed as tabs',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-arrow-path-rounded-square',
    schema: { type: 'object', properties: { contact: { title: 'Contact', oneOf: [{ type: 'object', title: 'Email', properties: { type: { type: 'string', const: 'email' }, addr: { type: 'string', title: 'Address', format: 'email' } }, required: ['type', 'addr'] }, { type: 'object', title: 'Phone', properties: { type: { type: 'string', const: 'phone' }, number: { type: 'string', title: 'Number' } }, required: ['type', 'number'] }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/contact' }] },
    data: { contact: { type: 'email', addr: '' } }
  },
  {
    id: 'oneof-recursive',
    title: 'oneOf Recursive',
    description: 'Nested oneOf with self-referencing structure',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-arrow-uturn-right',
    schema: { type: 'object', properties: { node: { type: 'object', title: 'Node', oneOf: [{ type: 'object', title: 'Leaf', properties: { kind: { type: 'string', const: 'leaf' }, value: { type: 'string', title: 'Value' } }, required: ['kind', 'value'] }, { type: 'object', title: 'Branch', properties: { kind: { type: 'string', const: 'branch' }, label: { type: 'string', title: 'Label' }, children: { type: 'array', title: 'Children', items: { type: 'string' } } }, required: ['kind', 'label'] }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/node' }] },
    data: { node: { kind: 'leaf', value: '' } }
  },
  {
    id: 'anyof-identifier',
    title: 'anyOf (Identifier)',
    description: 'Field that accepts multiple types',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-variable',
    schema: { type: 'object', properties: { identifier: { title: 'Identifier', anyOf: [{ type: 'string', title: 'Username', minLength: 3 }, { type: 'integer', title: 'User ID', minimum: 1 }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/identifier' }] },
    data: { identifier: '' }
  },
  {
    id: 'anyof-simple',
    title: 'anyOf Simple',
    description: 'Simple anyOf with primitive alternatives',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-variable',
    schema: { type: 'object', properties: { value: { title: 'Value', anyOf: [{ type: 'string', title: 'Text' }, { type: 'number', title: 'Number' }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/value' }] },
    data: { value: '' }
  },
  {
    id: 'anyof-with-props',
    title: 'anyOf with Props',
    description: 'anyOf with object properties',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-variable',
    schema: { type: 'object', properties: { item: { title: 'Item', anyOf: [{ type: 'object', title: 'Book', properties: { title: { type: 'string', title: 'Title' }, author: { type: 'string', title: 'Author' } }, required: ['title', 'author'] }, { type: 'object', title: 'Movie', properties: { title: { type: 'string', title: 'Title' }, duration: { type: 'integer', title: 'Duration (min)' }, director: { type: 'string', title: 'Director' } }, required: ['title', 'director'] }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/item' }] },
    data: { item: { title: '', author: '' } }
  },
  {
    id: 'allof-combined',
    title: 'allOf (Combined)',
    description: 'Schema composition from multiple parts',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-variable',
    schema: { type: 'object', title: 'Person', allOf: [{ type: 'object', properties: { name: { type: 'string', title: 'First Name' }, age: { type: 'integer', title: 'Age', minimum: 0 } } }, { type: 'object', properties: { email: { type: 'string', title: 'Email', format: 'email' } } }], required: ['name', 'email'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/name' }, { type: 'Control', scope: '#/properties/age' }, { type: 'Control', scope: '#/properties/email' }] },
    data: { name: '', age: 0, email: '' }
  },
  {
    id: 'allof-with-props',
    title: 'allOf with Props',
    description: 'allOf combining multiple property groups',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-variable',
    schema: { type: 'object', allOf: [{ type: 'object', properties: { username: { type: 'string', title: 'Username', minLength: 3 } } }, { type: 'object', properties: { displayName: { type: 'string', title: 'Display Name' }, avatar: { type: 'string', title: 'Avatar URL', format: 'uri' } } }], required: ['username'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/username' }, { type: 'Control', scope: '#/properties/displayName' }, { type: 'Control', scope: '#/properties/avatar' }] },
    data: { username: '', displayName: '', avatar: '' }
  },
  {
    id: 'ifthenelse',
    title: 'If-Then-Else',
    description: 'Conditional fields based on a toggle',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-arrow-uturn-right',
    schema: { type: 'object', properties: { hasVehicle: { type: 'boolean', title: 'Do You Have a Vehicle?', default: false }, vehicleType: { type: 'string', title: 'Vehicle Type', enum: ['Car', 'Motorcycle', 'Van', 'Other'] }, licensePlate: { type: 'string', title: 'License Plate' }, licenseYears: { type: 'integer', title: 'License Years', minimum: 0 }, preferredTransport: { type: 'string', title: 'Preferred Transport', enum: ['Public Transport', 'Bicycle', 'Walking', 'Taxi'] } }, required: ['hasVehicle'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/hasVehicle' }, { type: 'GroupLayout', label: 'Vehicle Information', rule: { effect: 'SHOW', condition: { scope: '#/properties/hasVehicle', expectedValue: true } }, elements: [{ type: 'Control', scope: '#/properties/vehicleType' }, { type: 'Control', scope: '#/properties/licensePlate' }, { type: 'Control', scope: '#/properties/licenseYears' }] }, { type: 'GroupLayout', label: 'Transport Preference', rule: { effect: 'SHOW', condition: { scope: '#/properties/hasVehicle', expectedValue: false } }, elements: [{ type: 'Control', scope: '#/properties/preferredTransport' }] }] },
    data: { hasVehicle: false, vehicleType: '', licensePlate: '', licenseYears: 0, preferredTransport: '' }
  },
  {
    id: 'conditional-schema',
    title: 'Conditional Schema',
    description: 'Schema-level condition with if/then/else',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-shield-exclamation',
    schema: { type: 'object', properties: { isStudent: { type: 'boolean', title: 'Is Student?', default: false }, schoolName: { type: 'string', title: 'School Name' }, grade: { type: 'string', title: 'Grade' }, employer: { type: 'string', title: 'Employer' } }, required: ['isStudent'], if: { properties: { isStudent: { const: true } } }, then: { required: ['schoolName', 'grade'] }, else: { required: ['employer'] } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/isStudent' }, { type: 'Control', scope: '#/properties/schoolName' }, { type: 'Control', scope: '#/properties/grade' }, { type: 'Control', scope: '#/properties/employer' }] },
    data: { isStudent: false, schoolName: '', grade: '', employer: '' }
  },
  {
    id: 'dynamic-rules',
    title: 'Dynamic Rules',
    description: 'Fields that show/hide based on selections',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-shield-exclamation',
    schema: { type: 'object', properties: { employmentStatus: { type: 'string', title: 'Employment Status', enum: ['employed', 'self-employed', 'unemployed', 'retired', 'student'] }, employerName: { type: 'string', title: 'Employer Name' }, jobTitle: { type: 'string', title: 'Position' }, businessName: { type: 'string', title: 'Business Name' }, businessType: { type: 'string', title: 'Business Type', enum: ['Freelance', 'Business Owner', 'Tradesman'] }, lastJobTitle: { type: 'string', title: 'Last Job Position' }, yearsSinceEmployment: { type: 'integer', title: 'Years Since Employment', minimum: 0 }, pensionYears: { type: 'integer', title: 'Retirement Years', minimum: 0 }, schoolName: { type: 'string', title: 'School Name' }, grade: { type: 'string', title: 'Grade/Class' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/employmentStatus' }, { type: 'GroupLayout', label: 'Employee Information', rule: { effect: 'SHOW', condition: { scope: '#/properties/employmentStatus', expectedValue: 'employed' } }, elements: [{ type: 'Control', scope: '#/properties/employerName' }, { type: 'Control', scope: '#/properties/jobTitle' }] }, { type: 'GroupLayout', label: 'Freelancer Information', rule: { effect: 'SHOW', condition: { scope: '#/properties/employmentStatus', expectedValue: 'self-employed' } }, elements: [{ type: 'Control', scope: '#/properties/businessName' }, { type: 'Control', scope: '#/properties/businessType' }] }, { type: 'GroupLayout', label: 'Unemployed Information', rule: { effect: 'SHOW', condition: { scope: '#/properties/employmentStatus', expectedValue: 'unemployed' } }, elements: [{ type: 'Control', scope: '#/properties/lastJobTitle' }, { type: 'Control', scope: '#/properties/yearsSinceEmployment' }] }, { type: 'GroupLayout', label: 'Retired Information', rule: { effect: 'SHOW', condition: { scope: '#/properties/employmentStatus', expectedValue: 'retired' } }, elements: [{ type: 'Control', scope: '#/properties/pensionYears' }] }, { type: 'GroupLayout', label: 'Student Information', rule: { effect: 'SHOW', condition: { scope: '#/properties/employmentStatus', expectedValue: 'student' } }, elements: [{ type: 'Control', scope: '#/properties/schoolName' }, { type: 'Control', scope: '#/properties/grade' }] }] },
    data: { employmentStatus: 'employed', employerName: '', jobTitle: '', businessName: '', businessType: '', lastJobTitle: '', yearsSinceEmployment: 0, pensionYears: 0, schoolName: '', grade: '' }
  },
  {
    id: 'rule-inheritance',
    title: 'Rule Inheritance',
    description: 'Rules inherited through nested layouts',
    category: 'Combinators & Rules',
    icon: 'i-heroicons-shield-exclamation',
    schema: { type: 'object', properties: { showGroup: { type: 'boolean', title: 'Show Group?', default: false }, fieldA: { type: 'string', title: 'Field A' }, fieldB: { type: 'string', title: 'Field B' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/showGroup' }, { type: 'GroupLayout', label: 'Conditional Group', rule: { effect: 'SHOW', condition: { scope: '#/properties/showGroup', expectedValue: true } }, elements: [{ type: 'Control', scope: '#/properties/fieldA' }, { type: 'GroupLayout', label: 'Nested Group', elements: [{ type: 'Control', scope: '#/properties/fieldB' }] }] }] },
    data: { showGroup: false, fieldA: '', fieldB: '' }
  },

  // ==================== ARRAYS & OBJECTS ====================
  {
    id: 'array-simple',
    title: 'Simple Array',
    description: 'Array of primitive strings with add/remove',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-list-bullet',
    schema: { type: 'object', properties: { tags: { type: 'array', title: 'Tags', items: { type: 'string' }, maxItems: 10, uniqueItems: true }, phoneNumbers: { type: 'array', title: 'Phone Numbers', items: { type: 'string', pattern: '^[0-9+\\s-]{10,}$' }, maxItems: 5 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/tags', options: { format: 'array-tags' } }, { type: 'Control', scope: '#/properties/phoneNumbers', options: { format: 'array-simple' } }] },
    data: { tags: ['vue', 'nuxt', 'typescript'], phoneNumbers: [] }
  },
  {
    id: 'array-objects',
    title: 'Array of Objects',
    description: 'Array of structured object items',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-rectangle-group',
    schema: { type: 'object', properties: { experiences: { type: 'array', title: 'Work Experience', items: { type: 'object', properties: { company: { type: 'string', title: 'Company' }, position: { type: 'string', title: 'Position' }, startDate: { type: 'string', title: 'Start Date', format: 'date' }, endDate: { type: 'string', title: 'End Date', format: 'date' }, current: { type: 'boolean', title: 'Currently Working', default: false }, description: { type: 'string', title: 'Description' } }, required: ['company', 'position', 'startDate'] } }, education: { type: 'array', title: 'Education', items: { type: 'object', properties: { school: { type: 'string', title: 'School' }, degree: { type: 'string', title: 'Degree', enum: ['High School', 'Associate Degree', 'Bachelor\'s', 'Master\'s', 'PhD'] }, field: { type: 'string', title: 'Department' }, graduationYear: { type: 'integer', title: 'Graduation Year', minimum: 1950, maximum: 2030 } }, required: ['school', 'degree', 'field'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/experiences', options: { format: 'array-objects' } }, { type: 'Control', scope: '#/properties/education', options: { format: 'array-objects' } }] },
    data: { experiences: [{ company: '', position: '', startDate: '', endDate: '', current: false, description: '' }], education: [] }
  },
  {
    id: 'array-nested',
    title: 'Nested Array',
    description: 'Array with nested object arrays',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-table-cells',
    schema: { type: 'object', properties: { projects: { type: 'array', title: 'Projects', items: { type: 'object', properties: { projectName: { type: 'string', title: 'Project Name' }, role: { type: 'string', title: 'My Role' }, technologies: { type: 'array', title: 'Technologies Used', items: { type: 'string' } }, teamMembers: { type: 'array', title: 'Team Members', items: { type: 'object', properties: { name: { type: 'string', title: 'First Name' }, role: { type: 'string', title: 'Role' } }, required: ['name', 'role'] } } }, required: ['projectName'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/projects', options: { format: 'array-objects' } }] },
    data: { projects: [{ projectName: '', role: '', technologies: [], teamMembers: [] }] }
  },
  {
    id: 'nested-minmax',
    title: 'Nested Array Min/Max',
    description: 'Nested array with min/max constraints',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-table-cells',
    schema: { type: 'object', properties: { groups: { type: 'array', title: 'Groups', items: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, members: { type: 'array', title: 'Members', items: { type: 'string' }, minItems: 1, maxItems: 10 } } }, minItems: 1, maxItems: 5 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/groups', options: { format: 'array-objects' } }] },
    data: { groups: [{ name: '', members: [''] }] }
  },
  {
    id: 'nested-reorder',
    title: 'Nested Array Reorder',
    description: 'Nested array with reorder support',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-bars-arrow-up',
    schema: { type: 'object', properties: { sections: { type: 'array', title: 'Sections', items: { type: 'object', properties: { title: { type: 'string', title: 'Title' }, items: { type: 'array', title: 'Items', items: { type: 'string' } } }, required: ['title'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/sections', options: { format: 'array-objects', reorder: true } }] },
    data: { sections: [{ title: 'Section 1', items: ['a', 'b'] }] }
  },
  {
    id: 'array-minmax',
    title: 'Array Min/Max Items',
    description: 'Array with min/max item constraints',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-list-bullet',
    schema: { type: 'object', properties: { priorities: { type: 'array', title: 'Priorities', items: { type: 'string' }, minItems: 1, maxItems: 5 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/priorities', options: { format: 'array-simple' } }] },
    data: { priorities: ['Important', 'Urgent'] }
  },
  {
    id: 'array-reorder',
    title: 'Array with Reorder',
    description: 'Drag-and-drop reorderable list',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-bars-arrow-up',
    schema: { type: 'object', properties: { priorities: { type: 'array', title: 'Priority Order', items: { type: 'object', properties: { task: { type: 'string', title: 'Task' }, priority: { type: 'integer', title: 'Priority', minimum: 1, maximum: 5 } }, required: ['task', 'priority'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/priorities', options: { format: 'array-objects', reorder: true } }] },
    data: { priorities: [{ task: 'Start project', priority: 1 }, { task: 'Gather requirements', priority: 2 }, { task: 'Design', priority: 3 }] }
  },
  {
    id: 'array-enums',
    title: 'Array Enums',
    description: 'Array containing enum string items',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-list-bullet',
    schema: { type: 'object', properties: { tags: { type: 'array', title: 'Tags', items: { type: 'string', enum: ['Urgent', 'Important', 'Low', 'Completed', 'Review'] }, uniqueItems: true } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/tags', options: { format: 'array-tags' } }] },
    data: { tags: ['Important'] }
  },
  {
    id: 'array-of-strings',
    title: 'Array of Strings',
    description: 'Simple string array with validation',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-list-bullet',
    schema: { type: 'object', properties: { aliases: { type: 'array', title: 'Aliases', items: { type: 'string', minLength: 2 } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/aliases', options: { format: 'array-simple' } }] },
    data: { aliases: [] }
  },
  {
    id: 'array-custom-label',
    title: 'Array Custom Label',
    description: 'Array items with custom element labels',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-rectangle-group',
    schema: { type: 'object', properties: { items: { type: 'array', title: 'Items', items: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, value: { type: 'string', title: 'Value' } }, required: ['name'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/items', options: { format: 'array-objects' } }] },
    data: { items: [{ name: '', value: '' }] }
  },
  {
    id: 'array-with-detail',
    title: 'Array with Detail',
    description: 'Array with detail panel for each item',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-rectangle-group',
    schema: { type: 'object', properties: { entries: { type: 'array', title: 'Entries', items: { type: 'object', properties: { title: { type: 'string', title: 'Title' }, description: { type: 'string', title: 'Description' }, completed: { type: 'boolean', title: 'Completed' } }, required: ['title'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/entries', options: { format: 'array-objects' } }] },
    data: { entries: [{ title: '', description: '', completed: false }] }
  },
  {
    id: 'array-with-detail-rule',
    title: 'Array with Detail & Rule',
    description: 'Array detail with conditional visibility',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-rectangle-group',
    schema: { type: 'object', properties: { items: { type: 'array', title: 'Items', items: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, showDetails: { type: 'boolean', title: 'Show Details', default: false }, detail: { type: 'string', title: 'Detail' } }, required: ['name'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/items', options: { format: 'array-objects' } }] },
    data: { items: [{ name: '', showDetails: false, detail: '' }] }
  },
  {
    id: 'list-with-details',
    title: 'List with Details',
    description: 'Master-detail list view',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-rectangle-group',
    schema: { type: 'object', properties: { people: { type: 'array', title: 'People', items: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, email: { type: 'string', title: 'Email', format: 'email' }, phone: { type: 'string', title: 'Phone' } }, required: ['name'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/people', options: { format: 'array-objects' } }] },
    data: { people: [{ name: '', email: '', phone: '' }] }
  },
  {
    id: 'list-with-details-reorder',
    title: 'List with Details & Reorder',
    description: 'Reorderable master-detail list',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-bars-arrow-up',
    schema: { type: 'object', properties: { items: { type: 'array', title: 'Items', items: { type: 'object', properties: { label: { type: 'string', title: 'Label' }, value: { type: 'string', title: 'Value' } }, required: ['label'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/items', options: { format: 'array-objects', reorder: true } }] },
    data: { items: [{ label: 'First', value: '1' }, { label: 'Second', value: '2' }] }
  },
  {
    id: 'object-nested',
    title: 'Nested Object',
    description: 'Object within an object',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-cube-transparent',
    schema: { type: 'object', properties: { profile: { type: 'object', title: 'Profile', properties: { username: { type: 'string', title: 'Username' }, avatar: { type: 'string', title: 'Avatar' }, settings: { type: 'object', title: 'Settings', properties: { theme: { type: 'string', title: 'Theme', enum: ['light', 'dark', 'system'] }, notifications: { type: 'boolean', title: 'Notifications', default: true } } } }, required: ['username'] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/profile' }] },
    data: { profile: { username: '', avatar: '', settings: { theme: 'system', notifications: true } } }
  },
  {
    id: 'additional-properties',
    title: 'Additional Properties',
    description: 'Dynamic key-value data',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-sparkles',
    schema: { type: 'object', properties: { metadata: { type: 'object', title: 'Metadata', additionalProperties: { type: 'string' } }, customFields: { type: 'object', title: 'Custom Fields', additionalProperties: { type: 'string' } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'GroupLayout', label: 'Metadata', elements: [{ type: 'Control', scope: '#/properties/metadata', options: { format: 'key-value' } }] }, { type: 'GroupLayout', label: 'Custom Fields', elements: [{ type: 'Control', scope: '#/properties/customFields', options: { format: 'key-value' } }] }] },
    data: { metadata: { author: 'John', version: '1.0' }, customFields: {} }
  },
  {
    id: 'dynamic-object',
    title: 'Dynamic Object',
    description: 'Schema with dynamic property generation',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-cube-transparent',
    schema: { type: 'object', properties: { dynamicData: { type: 'object', title: 'Dynamic Data', additionalProperties: { type: 'string' }, default: {} } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/dynamicData', options: { format: 'key-value' } }] },
    data: { dynamicData: { key1: 'value1', key2: 'value2' } }
  },
  {
    id: 'mixed-object',
    title: 'Mixed Object',
    description: 'Object with mixed required/optional fields',
    category: 'Arrays & Objects',
    icon: 'i-heroicons-cube-transparent',
    schema: { type: 'object', properties: { config: { type: 'object', title: 'Config', properties: { host: { type: 'string', title: 'Host' }, port: { type: 'integer', title: 'Port', minimum: 1, maximum: 65535, default: 8080 }, ssl: { type: 'boolean', title: 'SSL', default: true }, options: { type: 'object', title: 'Options', additionalProperties: { type: 'string' } } }, required: ['host'] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/config' }] },
    data: { config: { host: 'localhost', port: 8080, ssl: true, options: {} } }
  },

  // ==================== JSON FORMS DEEP DIVES ====================
  {
    id: 'custom-options',
    title: 'Custom Options',
    description: 'Fields with custom placeholder and formatting',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-adjustments-vertical',
    schema: { type: 'object', properties: { searchQuery: { type: 'string', title: 'Search' }, minPrice: { type: 'number', title: 'Min. Price', minimum: 0 }, maxPrice: { type: 'number', title: 'Max. Price', minimum: 0 }, sortBy: { type: 'string', title: 'Sort By', enum: ['Price Ascending', 'Price Descending', 'Name (A-Z)', 'Name (Z-A)', 'Date'] }, itemsPerPage: { type: 'integer', title: 'Per Page', minimum: 10, maximum: 100, multipleOf: 10 } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/searchQuery', options: { placeholder: 'Search product, category or brand...' } }, { type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/minPrice', options: { placeholder: '$0' } }, { type: 'Control', scope: '#/properties/maxPrice', options: { placeholder: '∞' } }] }, { type: 'Control', scope: '#/properties/sortBy', options: { placeholder: 'Choose sorting...' } }, { type: 'Control', scope: '#/properties/itemsPerPage' }] },
    data: { searchQuery: '', minPrice: 0, maxPrice: 0, sortBy: 'Price Ascending', itemsPerPage: 20 }
  },
  {
    id: 'i18n',
    title: 'i18n Demo',
    description: 'Locale labels and messages',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-language',
    schema: { type: 'object', properties: { ad: { type: 'string', title: 'First Name', minLength: 2 }, soyad: { type: 'string', title: 'Last Name', minLength: 2 }, eposta: { type: 'string', title: 'Email', format: 'email' }, telefon: { type: 'string', title: 'Phone' }, dogumTarihi: { type: 'string', title: 'Birth Date', format: 'date' }, cinsiyet: { type: 'string', title: 'Gender', enum: ['Male', 'Female', 'Prefer Not to Say'] }, haberler: { type: 'boolean', title: 'Newsletter', default: false } }, required: ['ad', 'soyad', 'eposta'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/ad' }, { type: 'Control', scope: '#/properties/soyad' }] }, { type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/eposta' }, { type: 'Control', scope: '#/properties/telefon' }] }, { type: 'Control', scope: '#/properties/dogumTarihi' }, { type: 'Control', scope: '#/properties/cinsiyet', options: { format: 'radio-group' } }, { type: 'Control', scope: '#/properties/haberler' }] },
    data: { ad: '', soyad: '', eposta: '', telefon: '', dogumTarihi: '', cinsiyet: '', haberler: false }
  },
  {
    id: 'error-message',
    title: 'Error Message',
    description: 'Custom error message display',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-exclamation-triangle',
    schema: { type: 'object', properties: { email: { type: 'string', title: 'Email', format: 'email' }, url: { type: 'string', title: 'URL', format: 'uri' }, age: { type: 'integer', title: 'Age', minimum: 18, maximum: 99 } }, required: ['email', 'age'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/url' }, { type: 'Control', scope: '#/properties/age' }] },
    data: { email: '', url: '', age: 20 }
  },
  {
    id: 'person',
    title: 'Person',
    description: 'Person form with contact details',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-user',
    schema: { type: 'object', properties: { firstName: { type: 'string', title: 'First Name', minLength: 2 }, lastName: { type: 'string', title: 'Last Name', minLength: 2 }, birthDate: { type: 'string', title: 'Birth Date', format: 'date' }, email: { type: 'string', title: 'Email', format: 'email' }, phone: { type: 'string', title: 'Phone' }, address: { type: 'string', title: 'Address' } }, required: ['firstName', 'lastName', 'email'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/firstName' }, { type: 'Control', scope: '#/properties/lastName' }] }, { type: 'Control', scope: '#/properties/birthDate' }, { type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/phone' }] }, { type: 'Control', scope: '#/properties/address' }] },
    data: { firstName: '', lastName: '', birthDate: '', email: '', phone: '', address: '' }
  },
  {
    id: 'login-form',
    title: 'Login Form',
    description: 'Simple login form',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-lock-closed',
    schema: { type: 'object', properties: { email: { type: 'string', title: 'Email', format: 'email' }, password: { type: 'string', title: 'Password', minLength: 6 }, rememberMe: { type: 'boolean', title: 'Remember Me' } }, required: ['email', 'password'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/email' }, { type: 'Control', scope: '#/properties/password' }, { type: 'Control', scope: '#/properties/rememberMe' }] },
    data: { email: '', password: '', rememberMe: false }
  },
  {
    id: 'job-application',
    title: 'Job Application',
    description: 'Detailed job application form',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-document-text',
    schema: { type: 'object', properties: { fullName: { type: 'string', title: 'Full Name', minLength: 3 }, email: { type: 'string', title: 'Email', format: 'email' }, phone: { type: 'string', title: 'Phone' }, position: { type: 'string', title: 'Position', enum: ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Designer'] }, experience: { type: 'integer', title: 'Years of Experience', minimum: 0, maximum: 50 }, skills: { type: 'array', title: 'Skills', items: { type: 'string' } }, coverLetter: { type: 'string', title: 'Cover Letter', maxLength: 2000 }, startDate: { type: 'string', title: 'Available From', format: 'date' } }, required: ['fullName', 'email', 'position'] },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'GroupLayout', label: 'Personal Info', elements: [{ type: 'HorizontalLayout', elements: [{ type: 'Control', scope: '#/properties/fullName' }, { type: 'Control', scope: '#/properties/email' }] }, { type: 'Control', scope: '#/properties/phone' }] }, { type: 'GroupLayout', label: 'Application', elements: [{ type: 'Control', scope: '#/properties/position' }, { type: 'Control', scope: '#/properties/experience' }, { type: 'Control', scope: '#/properties/skills' }] }, { type: 'GroupLayout', label: 'Documents', elements: [{ type: 'Control', scope: '#/properties/coverLetter', options: { multi: true, rows: 4 } }, { type: 'Control', scope: '#/properties/startDate' }] }] },
    data: { fullName: '', email: '', phone: '', position: 'Frontend', experience: 0, skills: [], coverLetter: '', startDate: '' }
  },
  {
    id: 'bug-scenarios',
    title: 'Bug & Edge Cases',
    description: 'Common JSON Forms issues: defaults, empty arrays, nulls',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-bug-ant',
    schema: { type: 'object', properties: { defaultValue: { type: 'string', title: 'Default Value', default: 'test' }, emptyOnPurpose: { type: 'string', title: 'Leave Empty' }, zeroNumber: { type: 'number', title: 'Zero Value', default: 0 }, falseBoolean: { type: 'boolean', title: 'False Value', default: false }, emptyArray: { type: 'array', title: 'Empty Array', items: { type: 'string' } }, nullObject: { type: 'object', title: 'Null Object', properties: { key: { type: 'string', title: 'Key' } }, default: {} }, veryLongLabel: { type: 'string', title: 'This is a very very long label field used to test overflow behavior' }, specialChars: { type: 'string', title: 'Special Characters (special chars test)' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/defaultValue' }, { type: 'Control', scope: '#/properties/emptyOnPurpose' }, { type: 'Control', scope: '#/properties/zeroNumber' }, { type: 'Control', scope: '#/properties/falseBoolean' }, { type: 'Control', scope: '#/properties/emptyArray' }, { type: 'Control', scope: '#/properties/nullObject' }, { type: 'Control', scope: '#/properties/veryLongLabel' }, { type: 'Control', scope: '#/properties/specialChars' }] },
    data: { defaultValue: 'test', emptyOnPurpose: '', zeroNumber: 0, falseBoolean: false, emptyArray: [], nullObject: {}, veryLongLabel: '', specialChars: '' }
  },
  {
    id: 'issue-1273',
    title: 'Issue 1273 - oneOf Preselection',
    description: 'oneOf with preselected default value',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-bug-ant',
    schema: { type: 'object', properties: { contact: { title: 'Contact', oneOf: [{ type: 'object', title: 'Email', properties: { method: { type: 'string', const: 'email' }, address: { type: 'string', title: 'Email', format: 'email' } } }, { type: 'object', title: 'Phone', properties: { method: { type: 'string', const: 'phone' }, number: { type: 'string', title: 'Number' } } }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/contact' }] },
    data: { contact: { method: 'email', address: '' } }
  },
  {
    id: 'issue-1265',
    title: 'Issue 1265 - oneOf Validation',
    description: 'oneOf validation for arrays/objects/primitives',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-bug-ant',
    schema: { type: 'object', properties: { payload: { title: 'Payload', oneOf: [{ type: 'object', title: 'Text', properties: { kind: { type: 'string', const: 'text' }, content: { type: 'string', title: 'Content' } } }, { type: 'array', title: 'Numbers', items: { type: 'number' } }] } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/payload' }] },
    data: { payload: { kind: 'text', content: '' } }
  },
  {
    id: 'issue-1884',
    title: 'Issue 1884 - Nested enable/disable',
    description: 'Nested conditional enable/disable behavior',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-bug-ant',
    schema: { type: 'object', properties: { enableGroup: { type: 'boolean', title: 'Enable Extended Fields?', default: false }, name: { type: 'string', title: 'Name' }, extendedField: { type: 'string', title: 'Extended Field' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/enableGroup' }, { type: 'Control', scope: '#/properties/name' }, { type: 'GroupLayout', label: 'Extended', rule: { effect: 'SHOW', condition: { scope: '#/properties/enableGroup', expectedValue: true } }, elements: [{ type: 'Control', scope: '#/properties/extendedField' }] }] },
    data: { enableGroup: false, name: '', extendedField: '' }
  },
  {
    id: 'issue-1948',
    title: 'Issue 1948 - Array Renderer Selection',
    description: 'Array renderer selection with/without schema',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-bug-ant',
    schema: { type: 'object', properties: { simpleItems: { type: 'array', title: 'Simple Items', items: { type: 'string' } }, complexItems: { type: 'array', title: 'Complex Items', items: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, value: { type: 'string', title: 'Value' } }, required: ['name'] } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/simpleItems', options: { format: 'array-simple' } }, { type: 'Control', scope: '#/properties/complexItems', options: { format: 'array-objects' } }] },
    data: { simpleItems: ['a', 'b'], complexItems: [{ name: '', value: '' }] }
  },
  {
    id: 'issue-1713',
    title: 'Issue 1713',
    description: 'Array rendering with specific constraints',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-bug-ant',
    schema: { type: 'object', properties: { items: { type: 'array', title: 'Items', items: { type: 'string' } } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/items', options: { format: 'array-simple' } }] },
    data: { items: ['item1', 'item2'] }
  },
  {
    id: 'scope',
    title: 'Scope',
    description: 'Demonstrates different scope resolutions',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-magnifying-glass',
    schema: { type: 'object', properties: { a: { type: 'string', title: 'Field A' }, b: { type: 'string', title: 'Field B' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/a', label: 'From Scope A' }, { type: 'Control', scope: '#/properties/b', label: 'From Scope B' }] },
    data: { a: '', b: '' }
  },
  {
    id: 'configuration-default',
    title: 'Configuration (Default)',
    description: 'Form with default configuration settings',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-cog-6-tooth',
    schema: { type: 'object', properties: { name: { type: 'string', title: 'Name' }, showExtra: { type: 'boolean', title: 'Show Extra' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/name' }, { type: 'Control', scope: '#/properties/showExtra' }] },
    data: { name: '', showExtra: false }
  },
  {
    id: 'prepend-append-slots',
    title: 'Prepend/Append Slots',
    description: 'Fields with prepend/append slot content',
    category: 'JSON Forms Deep Dives',
    icon: 'i-heroicons-view-columns',
    schema: { type: 'object', properties: { amount: { type: 'number', title: 'Amount', minimum: 0 }, unit: { type: 'string', title: 'Unit' } } },
    uischema: { type: 'VerticalLayout', elements: [{ type: 'Control', scope: '#/properties/amount' }, { type: 'Control', scope: '#/properties/unit' }] },
    data: { amount: 0, unit: '' }
  }
]

export const categories: ExampleCategory[] = [
  { id: 'basic', label: 'Basic Controls', icon: 'i-heroicons-pencil-square' },
  { id: 'enums', label: 'Enums & Selection', icon: 'i-heroicons-chevron-down' },
  { id: 'complex', label: 'Complex Controls', icon: 'i-heroicons-cog-6-tooth' },
  { id: 'layouts', label: 'Layouts', icon: 'i-heroicons-squares-2x2' },
  { id: 'combinators', label: 'Combinators & Rules', icon: 'i-heroicons-arrow-path' },
  { id: 'arrays', label: 'Arrays & Objects', icon: 'i-heroicons-list-bullet' },
  { id: 'deep-dives', label: 'JSON Forms Deep Dives', icon: 'i-heroicons-beaker' }
]

export const examples: ShowcaseExample[] = examplesData
export const examplesById: Record<string, ShowcaseExample> = Object.fromEntries(examplesData.map(e => [e.id, e]))
