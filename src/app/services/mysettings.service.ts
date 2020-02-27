import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MysettingsService {
  chargementOk = false;
  ecole = { name: 'مؤسسة ابتدائية', gresa: 'X5555'};

  filtreActive = {ascolaire: '', types: '', cycle: '', niveau: '', classe: ''};
  types = ['عام'];
  cycles = ['ابتدائي'];

  itemsSmartTableLink = {
    nmassar: 'رقم التلميذ',
    addconcat: {name: 'الاسم الكامل', concat: ['arnom', 'arprenom']},
    dnaissance: 'تاريخ الازدياد',
    genre: 'النوع',
    cla: 'القسم',
    addlink: {name: 'بطاقة التلميذ', path: 'ficheeleve'}
    };
    itemsSmartTableCheck = {
      addcheck: 'addcheck',
      nmassar: 'رقم التلميذ',
      addconcat: {name: 'الاسم الكامل', concat: ['arnom', 'arprenom']},
      genre: 'النوع',
      dnaissance: 'تاريخ الازدياد',
      addlink: {name: 'بيانات التلميذ', path: 'ficheeleve'}};

 /* myClasses: {cla: string, niveau: string, nbrPlan: number, nbrEnreg: number }[] = [
    {id: '1APG', name: 'الاولى ابتدائي عام', nbrPlan: 3, nbrEnreg: 3},
    {id: '2APG', name: 'الثاني ابتدائي عام', nbrPlan: 4, nbrEnreg: 4},
    {id: '3APG', name: 'الثالث ابتدائي عام', nbrPlan: 2, nbrEnreg: 2},
    {id: '4APG', name: 'الرابع ابتدائي عام', nbrPlan: 2, nbrEnreg: 2},
    {id: '5APG', name: 'الخامس ابتدائي عام', nbrPlan: 3, nbrEnreg: 3},
    {id: '6APG', name: 'السادس ابتدائي عام', nbrPlan: 2, nbrEnreg: 2}
  ];*/
  myClasses;
  listNumClasses: { niveau: string; numero: string }[];

   /*ListEleves = [
    {
        cla: '1APG-1', nmassar: 'G184060831',
        nom: 'LAKHDIRI',
        prenom: 'EL MAHDI',
        arnom: 'لخديري',
        arprenom: 'المهدي',
        genre: 'ذكر',
        dnaissance: '09-04-2012',
        lieunaissance: 'اسفي',
        adresse: ''
    },
    {
        cla: '2APG-1', nmassar: 'G176134691',
        nom: 'ABDELFATTAH',
        prenom: 'AABAYD',
        arnom: 'عبدالفتاح',
        arprenom: 'اعبيد',
        genre: 'ذكر',
        dnaissance: '27-01-2012',
        lieunaissance: 'جماعة حد الدرى',
        fadress: 'Commune had draa'
    },
    {
        cla: '', nmassar: 'G184075136',
        nom: 'ZEBRAR',
        prenom: 'IHAB',
        arnom: 'زبرار',
        arprenom: 'ايهاب',
        genre: 'ذكر',
        dnaissance: '23-02-2013',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G187132076',
        nom: 'ESSAHRAOUIUIUI',
        prenom: 'MARWA',
        arnom: 'الصحراوي',
        arprenom: 'مروى',
        genre: 'أنثى',
        dnaissance: '14-04-2010',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '2APG-1', nmassar: 'G188125364',
        nom: 'LAHMID',
        prenom: 'IKHLAS',
        arnom: 'لحمييد',
        arprenom: 'اخلاص',
        genre: 'أنثى',
        dnaissance: '20-03-2014',
        lieunaissance: 'آسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G190081613',
        nom: 'AYACH',
        prenom: 'INASS',
        arnom: 'عياش',
        arprenom: 'ايناس',
        genre: 'ذكر',
        dnaissance: '08-01-2014',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G194067470',
        nom: 'BAJRHAL',
        prenom: 'NABIL',
        arnom: 'بجغال',
        arprenom: 'نبيل',
        genre: 'ذكر',
        dnaissance: '17-06-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '2APG-1', nmassar: 'G194067476',
        nom: 'LAHNIDA',
        prenom: 'KAOUTAR',
        arnom: 'لهنيدة',
        arprenom: 'كوثر',
        genre: 'أنثى',
        dnaissance: '14-10-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G195067474',
        nom: 'SABAH',
        prenom: 'KHADIJA',
        arnom: 'صباح',
        arprenom: 'خديجة',
        genre: 'أنثى',
        dnaissance: '13-04-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '3APG-1', nmassar: 'G195067481',
        nom: 'BAZZAZE',
        prenom: 'AYMEN',
        arnom: 'البزاز',
        arprenom: 'ايمن',
        genre: 'ذكر',
        dnaissance: '29-08-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '3APG-1', nmassar: 'G195067485',
        nom: 'TAMTAM',
        prenom: 'AYOUB',
        arnom: 'التمتام',
        arprenom: 'ايوب',
        genre: 'ذكر',
        dnaissance: '03-04-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G195067488',
        nom: 'RAHATI',
        prenom: 'ALAE',
        arnom: 'الرحاطي',
        arprenom: 'الاء',
        genre: 'أنثى',
        dnaissance: '02-01-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '4APG-1', nmassar: 'G195067493',
        nom: 'SANDALI',
        prenom: 'FATIMA-EZZAHRA',
        arnom: 'السندالي',
        arprenom: 'فاطمة الزهراء',
        genre: 'أنثى',
        dnaissance: '04-08-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '5APG-1', nmassar: 'G195067496',
        nom: 'CHAHINE',
        prenom: 'MOHAMMED',
        arnom: 'شهين',
        arprenom: 'محمد',
        genre: 'ذكر',
        dnaissance: '04-03-2014',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '5APG-1', nmassar: 'G195067500',
        nom: 'BAALA',
        prenom: 'HIBA',
        arnom: 'ابعلة',
        arprenom: 'هبة',
        genre: 'أنثى',
        dnaissance: '03-01-2014',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '6APG-1', nmassar: 'G189108901',
        nom: 'ESSADIKI',
        prenom: 'SOUKAINA',
        arnom: 'الصديقي',
        arprenom: 'سكينة',
        genre: 'أنثى',
        dnaissance: '09-06-2011',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '6APG-1', nmassar: 'G195067505',
        nom: 'BOUDANESS',
        prenom: 'YASSINE',
        arnom: 'بودانس',
        arprenom: 'ياسين',
        genre: 'ذكر',
        dnaissance: '13-07-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '6APG-1', nmassar: 'G195067510',
        nom: 'JEDDAR',
        prenom: 'WAIL',
        arnom: 'جدار',
        arprenom: 'وائل',
        genre: 'ذكر',
        dnaissance: '15-01-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '6APG-1', nmassar: 'G195067511',
        nom: 'AZZAM',
        prenom: 'KAWTAR',
        arnom: 'عزام',
        arprenom: 'كوثر',
        genre: 'أنثى',
        dnaissance: '09-12-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '6APG-1', nmassar: 'G195067518',
        nom: 'BACHAR',
        prenom: 'SOULTANA',
        arnom: 'بشار',
        arprenom: 'سلطانة',
        genre: 'أنثى',
        dnaissance: '12-08-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '6APG-1', nmassar: 'G195067520',
        nom: 'KHARBOUCH',
        prenom: 'RAYANE',
        arnom: 'خربوش',
        arprenom: 'ريان',
        genre: 'ذكر',
        dnaissance: '22-10-2013',
        lieunaissance: 'اسفي',
        fadress: 'SAFI',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G195081624',
        nom: 'BAZOURIR',
        prenom: 'SIHAM',
        arnom: 'بزورير',
        arprenom: 'سهام',
        genre: 'أنثى',
        dnaissance: '03-11-2012',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G199081625',
        nom: 'TALIL',
        prenom: 'ZAINAB',
        arnom: 'تاليل',
        arprenom: 'زينب',
        genre: 'أنثى',
        dnaissance: '10-01-2014',
        adresse: ''
    },
    {
        cla: '', nmassar: 'G191073624',
        nom: 'LOUDINI',
        prenom: 'HAYAT',
        arnom: 'لوديني',
        arprenom: 'حياة',
        genre: 'أنثى',
        dnaissance: '23-09-2013',
        lieunaissance: 'أسفي',
        fadress: 'SAFI',
        adresse: ''
    }
];*/
  ListEleves;
  ListDeparts;
  ListSorties;
  ListScolarities;
  ListRedondances;

 constructor() {}


suspender = new Subject<{etat: string, message: string}>();
getsuspender(): Observable<{etat: string, message: string}> {
  return this.suspender.asObservable();
}
setsuspender(v: {etat: string, message: string} = {etat: '', message: ''}) {
  this.suspender.next(v);
}

  getNiveauFormCla(cla) {
    let r = '';
    cla = cla.indexOf('-') < 0 ? cla : cla.split('-')[0];
    this.myClasses.forEach(element => {
      if (element.cla == cla) {
        r = element.niveau;
        return r;
       }
    });
    return r;
  }

  getIdFromNameNiveau() {
      let x = '1APG';
      if (this.filtreActive.niveau != undefined) {
         x = this.myClasses.filter(i => i.niveau == this.filtreActive.niveau)[0].cla;
      }
      return x;
  }
  getlistNumClasses(): { niveau: string; numero: string }[] {
    this.listNumClasses = [];
    this.myClasses.forEach(element => {
      for (let index = 1; index <= element.nbrEnreg; index++) {
        this.listNumClasses.push({niveau: element.niveau, numero: element.cla + '-' + index});
      }
    });
    return this.listNumClasses;
  }

  getMenu(key = '') {

switch (key) {
      case 'التقييم':
        return [
          {name: 'الرئيسية', icon: 'fa-home', path: ''},
          {name: 'تهيئة المواد', icon: 'fa-edit', extension: [
              {name: 'المواد الغير معممة', icon: '' ,  path: ''},
              {name: 'المواد المعفية', icon: '' ,  path: ''},
              {name: 'توزيع الاساتذة على الاقسام', icon: '' ,  path: ''}
          ]},
          {name: 'نقط المراقبة المستمرة', icon: 'fa-users', extension: [
              {name: 'مسك النقط حسب المادة', icon: '' ,  path: ''},
              {name: 'مسك النقط حسب التلميذ', icon: '' ,  path: ''},
              {name: 'تصدير و استيراد النقط', icon: '' ,  path: ''},
              {name: 'تتبع مسك النقط', icon: '' ,  path: ''},
              {name: 'مطبوع المراقبة المستمرة', icon: '' ,  path: ''},
              {name: 'طباعة مجمل النقط', icon: '' ,  path: ''}
          ]},
          {name: 'الامتحان', icon: 'fa-edit', extension: [
            {name: 'تحديد المترشحين للامتحانات', icon: '' ,  path: ''},
            {name: 'مسك نقط الامتحان', icon: '' ,  path: ''},
            {name: 'تصدير و استيراد النقط', icon: '' ,  path: ''}
        ]},
         {name: 'الغياب', icon: 'fa-edit', extension: [
            {name: 'الغياب حسب القسم', icon: '' ,  path: ''},
            {name: 'الغياب حسب التلميذ', icon: '' ,  path: ''},
            {name: 'تصدير/استيراد الغياب اليومي حسب القسم', icon: '' ,  path: ''},
            {name: 'الغياب الشهري حسب القسم', icon: '' ,  path: ''},
            {name: 'تصدير/استيراد الغياب الشهري حسب القسم', icon: '' ,  path: ''},
            {name: 'مجمل الغيابات الشهرية حسب القسم', icon: '' ,  path: ''},
            {name: 'مجمل الغيابات السنوية حسب القسم', icon: '' ,  path: ''},
            {name: 'مجمل الغيابات لسنوية حسب المؤسسة', icon: '' ,  path: ''}
      ]},
      {name: 'بيان النتائج', icon: 'fa-edit', extension: [
        {name: 'حساب المعدلات', icon: '' ,  path: ''},
        {name: 'مطبوع معدلات المراقبة المستمرة', icon: '' ,  path: ''},
        {name: 'مطبوع نقط الامتحان', icon: '' ,  path: ''},
        {name: 'طبع بيان النتائج', icon: '' ,  path: ''},
        {name: 'المطبوع الاجمالي للنقط', icon: '' ,  path: ''},
        {name: 'مطبوع قرار مجلس القسم', icon: '' ,  path: ''}
  ]},
    {name: 'لوحات التحكم', icon: 'fa-edit', extension: [
        {name: 'حسب المواد', icon: '' ,  path: ''},
        {name: 'حسب الاساتذة', icon: '' ,  path: ''},
        {name: 'مقارنة نقط التلاميذ', icon: '' ,  path: ''},
        {name: 'مقارنة نقط الاساتذة', icon: '' ,  path: ''}
]},
    {name: 'الادارة', icon: 'fa-edit', extension: [
      {name: 'اقفال المواد و الاقسام', icon: '' ,  path: ''},
      {name: 'اقفال المستويات', icon: '' ,  path: ''}
]},
          ];
      case 'الموارد البشرية' :
        return [
          {name: 'الرئيسية', icon: 'fa-home', path: ''},
          {name: 'الموارد البشرية', icon: 'fa-edit', extension: [
              {name: 'لائحة الاساتذة المكلفين بقسم الادماج', icon: '' ,  path: ''},
              {name: 'لائحة الموظفين', icon: '' ,  path: ''},
              {name: 'الاساتذة اطر الاكاديمية', icon: '' ,  path: ''},
              {name: 'اللائحة العددية للاعوان و المستخدمين', icon: '' ,  path: ''},
              {name: 'جدول التغيباب', icon: '' ,  path: ''},
              {name: 'التراخيص الممنوحة', icon: '' ,  path: ''},
              {name: 'مؤشرات الغياب', icon: '' ,  path: ''},
              {name: 'المصادقة على غياب الاساتذة', icon: '' ,  path: ''},
          ]}
          ];
          case 'الدعم الاجتماعي و التربوي':
            return [
              {name: 'الرئيسية', icon: 'fa-home', path: ''},
              {name: 'مليون محفظة', icon: 'fa-edit', extension: [
                  {name: 'تحديد اللوازم حسب المؤسسة', icon: '' ,  path: ''},
                  {name: 'التلاميذ المستفيدين', icon: '' ,  path: ''},
                  {name: 'الكتب المسترجعة', icon: '' ,  path: ''},
                  {name: 'مجموع الكتب المسترجعة', icon: '' ,  path: ''},
                  {name: 'كتب في حالة جيدة', icon: '' ,  path: ''},
                  {name: 'حساب عدد الكتب اللازمة', icon: '' ,  path: ''},
                  {name: 'اللوازم المستلمة', icon: '' ,  path: ''},
              ]},
              {name: 'الداخلية', icon: 'fa-users', extension: [
                  {name: 'تسجيل طلب الداخلية', icon: '' ,  path: ''},
                  {name: 'التلاميذ المستفيدين من الداخلية', icon: '' ,  path: ''},
                  {name: 'طبع النتائج حسب مؤسسة الاستقبال', icon: '' ,  path: ''},
                  {name: 'طبع النتائج حسب المؤسسة', icon: '' ,  path: ''}
            ]},
             {name: 'الدعم المدرسي', icon: 'fa-edit', extension: [
                {name: 'خدمات الدعم', icon: '' ,  path: ''}
          ]},
          {name: 'الدعم التربوي', icon: 'fa-edit', extension: [
            {name: 'مسك تشخيص التعلمات', icon: '' ,  path: ''},
            {name: 'استيراد و تصدير نقط تشخيص التعلمات', icon: '' ,  path: ''},
            {name: 'تصدير مطبوع نقط الدعم', icon: '' ,  path: ''},
            {name: 'الموارد الخاجية', icon: '' ,  path: ''},
            {name: 'تحديد المستفيدين من الدعم', icon: '' ,  path: ''},
            {name: 'توزيع التلاميذ على الاقسام', icon: '' ,  path: ''}
           ]}
              ];
              case 'الحياة المدرسية':
            return [
              {name: '', icon: '', path: ''},
              ];
              case 'مشروع المؤسسة':
                return [
                  {name: '', icon: '', path: ''},
                  ];
      default:
        return [{name: 'الرئيسية', icon: 'fa-home', path: ''},
        {name: 'التسجيل الاولي للتلاميذ', icon: 'fa-edit', extension: [
         {name: 'التسجيل الاولي للتلاميذ', icon: '' ,  path: ''},
         {name: 'تصدير/استيراد لائحة التسجيلات الاولية', icon: '' ,  path: ''},
         {name: 'مصادقة على التسجيلات الاولية', icon: '' ,  path: ''},
         {name: 'تصدير/استيراد معلومات الولي', icon: '' ,  path: ''}
        ]},
        {name: 'البنية التربوية', icon: 'fa-users', extension: [
         {name: 'البنية التربوية المعدلة', icon: '' ,  path: ''},
         {name: 'مجمل البنية التربوية بالنيابة', icon: '' ,  path: ''},
         {name: 'اضافة الاقسام', icon: '' ,  path: 'ajoutclass'}
        ]},
        {name: 'البنية المادية', icon: 'fa-university', extension: [
         {name: 'اضافة الحجرات', icon: '' ,  path: ''},
         {name: 'لائحة الحجرات', icon: '' ,  path: ''},
         {name: 'مجمل الحجرات', icon: '' ,  path: ''}
        ]},
        {name: 'المسك الاولي', icon: 'fa-edit', extension: [
         {name: 'اضافة التلاميذ', icon: '' ,  path: 'saisieeleves'},
         {name: 'استيراد و تصدير بيانات التلاميذ', icon: '' ,  path: ''},
         {name: 'لائحة التلاميذ', icon: '' ,  path: 'prelisteleve'}
        ]},
        {name: 'قرار اخر السنة', icon: 'fa-graduation-cap', extension: [
         {name: 'لائحة النتائج', icon: '' ,  path: ''},
         {name: 'مسك النتائج', icon: '' ,  path: ''}
        ]},
        {name: 'الانتقالات', icon: 'fas fa-exchange-alt', extension: [
         {name: 'لائحة التحويلات', icon: '' ,  path: ''},
         {name: 'استقبال التلاميذ', icon: '' ,  path: ''},
         {name: 'لائحة الوافدين', icon: '' ,  path: ''}
        ]},
        {name: 'توزيع التلاميذ و اعادة التسجيل', icon: 'fa-edit', extension: [
         {name: 'توزيع التلاميذ على الاقسام', icon: '' ,  path: 'distributioneleves'},
         {name: 'انشاء الافواج', icon: '' ,  path: ''},
         {name: 'توزيع التلاميذ على الافواج', icon: '' ,  path: ''},
         {name: 'البنية التربوية بعد توزيع الاقسام', icon: '' ,  path: ''},
         {name: 'اعادة التسجيل', icon: '' ,  path: 'reinscription'}
        ]},
        {name: 'بطاقة التلميذ', icon: 'fa-user', extension: [
         {name: 'بحث فردي', icon: '' ,  path: 'findeleve'},
         {name: 'لائحة تلاميذ المؤسسة', icon: '' ,  path: 'listeleves'},
         {name: 'تصدير/استيراد معلومات الولي', icon: '' ,  path: ''}
        ]},
        {name: 'تدبير مداخيل التسجيل', icon: 'fa-edit', extension: [
         {name: 'تهيئة مبالغ المساهمات', icon: '' ,  path: ''},
         {name: 'مسك المساهمات', icon: '' ,  path: ''},
         {name: 'مسك التحويلات', icon: '' ,  path: ''},
         {name: 'المخرجات', icon: '' ,  path: ''}
        ]}
       ];
        break;
      }
  }

  /*getChartsAccueil() {
    return [
      {legend: 'مسك اولياء الامور', type: 'doughnut', label: ['مسك اولياء الامور'], data: [75, 25]},
      {legend: 'توزيع التلاميذ على الاقسام', type: 'doughnut', label: ['توزيع'], data: [99, 1]},
      {legend: 'اعادة التسجيل', type: 'doughnut', label: ['توزيع'], data: [88, 1]}];
  }*/
  getChartsAccueil() {
    return [
      {legend: 'اعادة التسجيل', data: this.getNBListElevesInscrits() / this.getTotalEleves()},
      {legend: 'توزيع التلاميذ على الاقسام', data: this.getNBListEleveDistribues() / this.getTotalEleves()},
      {legend: 'نتائج اخر السنة', data: 0}
    ];
  }


  getBoxAccueil(): {title: string, valeur: number, icon: string, path: string, bg: string}[] {
    return [
      {title: 'عدد التلاميذ', valeur: this.ListEleves.length, icon: 'fa-users', path: 'listeleves', bg: '#00c0ef'},
      {title: 'عدد الاقسام', valeur: this.getNBclasses(), icon: 'fa-university', path: 'ajoutclass', bg: '#00a65a'},
      {title: 'مجموع التلاميذ (الخريطة المعدلة)', valeur: 0, icon: 'fa-users', path: '', bg: '#f39c12'},
      {title: 'مجموع التلاميذ المسجلين', valeur: this.getNBListElevesInscrits(), icon: 'fa-edit', path: 'reinscription', bg: '#dd4b39'},
      {title: 'مجموع التلاميذ الموزعين', valeur: this.getNBListEleveDistribues(),
                             icon: 'fa-university', path: 'distributioneleves', bg: '#00c0ef'},
      {title: 'مجموع بيانات النتائج', valeur: 0, icon: 'fa-graduation-cap', path: '', bg: '#00a65a'},
    ];
  }

  getBoxAccueilErr(): {title: string, valeur: number, icon: string, path: string, bg: string}[] {
    return [
      {title: 'تلاميذ محولون و لم يتم استقبالهم', valeur: this.getNbTransferNonreception(),
                      icon: 'fa-users', path: 'anomalietransfer', bg: '#00c0ef'},
      {title: 'أخطاء في تحديد الجنسية', valeur: this.getNbsansNationalite(),
                      icon: 'fa-university', path: 'anomalienationalite', bg: '#00a65a'}
    ];
  }
getNbTransferNonreception() {
  return this.ListEleves.filter(i => i.situation == 'في طور التحويل' ).length;
}
getNbsansNationalite() {
  return this.ListEleves.filter(i => i.nationalite === '' ).length;
}
  getNBclasses() {
    return this.getlistNumClasses().length;
  }
  getTotalEleves() {
    return this.ListEleves.length;
  }
  getNBListEleveDistribues() {
   return this.ListEleves.filter(i => (i.cla as string).indexOf('-') > -1 ).length;
  }
  getNBListElevesInscrits() {
    return this.ListEleves.filter(i => (i.situation as string).indexOf('غير ملتحق') < 0 ).length;
  }
}
