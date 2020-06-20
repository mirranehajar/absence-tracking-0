import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import * as XLSX from 'xlsx';
import {Departement} from '../../controller/model/departement';
import {Enseignant} from '../../controller/model/enseignant.model';
import {TypeSession} from '../../controller/model/type-session';
import {EnseignantService} from '../../controller/service/enseignant.service';
import {TypeSessionService} from '../../controller/service/type-session.service';

type AOA = any[][];

@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.scss'],
  providers: [ConfirmationService, MessageService],
})

export class EnseignantComponent implements OnInit {
  importProfessors: Enseignant[] = new Array<Enseignant>();
  msgs: Message[] = [];
  displayBasic: boolean;
  displayBasic2: boolean;
  displayBasic3: boolean;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  data: AOA = [['N°SOM', 'Cin', 'Prénom', 'Nom', 'Sexe', 'J.Naissance', 'N°tél', 'Ville', 'Département']];
  fileName = 'Example-enseignant.xlsx';
  private _url = 'http://localhost:8090/absence-tracking/enseignant/';
  selectedFile: File;
  retrievedImage: any;
  message: string;
  numeroSOM: number;
  cols: any[];
  cols2: any[];
  city: any;
  enseignantSelected: Enseignant;
  cities: any[] = [
    {
      id: '1',
      ville: 'Aïn Harrouda',
    },
    {
      id: '2',
      ville: 'Ben Yakhlef',
      region: '6',
    },
    {
      id: '3',
      ville: 'Bouskoura',
      region: '6',
    },
    {
      id: '4',
      ville: 'Casablanca',
      region: '6',
    },
    {
      id: '5',
      ville: 'Médiouna',
      region: '6',
    },
    {
      id: '6',
      ville: 'Mohammadia',
      region: '6',
    },
    {
      id: '7',
      ville: 'Tit Mellil',
      region: '6',
    },
    {
      id: '8',
      ville: 'Ben Yakhlef',
      region: '6',
    },
    {
      id: '9',
      ville: 'Bejaâd',
      region: '5',
    },
    {
      id: '10',
      ville: 'Ben Ahmed',
      region: '6',
    },
    {
      id: '11',
      ville: 'Benslimane',
      region: '6',
    },
    {
      id: '12',
      ville: 'Berrechid',
      region: '6',
    },
    {
      id: '13',
      ville: 'Boujniba',
      region: '5',
    },
    {
      id: '14',
      ville: 'Boulanouare',
      region: '5',
    },
    {
      id: '15',
      ville: 'Bouznika',
      region: '6',
    },
    {
      id: '16',
      ville: 'Deroua',
      region: '6',
    },
    {
      id: '17',
      ville: 'El Borouj',
      region: '6',
    },
    {
      id: '18',
      ville: 'El Gara',
      region: '6',
    },
    {
      id: '19',
      ville: 'Guisser',
      region: '6',
    },
    {
      id: '20',
      ville: 'Hattane',
      region: '5',
    },
    {
      id: '21',
      ville: 'Khouribga',
      region: '5',
    },
    {
      id: '22',
      ville: 'Loulad',
      region: '6',
    },
    {
      id: '23',
      ville: 'Oued Zem',
      region: '5',
    },
    {
      id: '24',
      ville: 'Oulad Abbou',
      region: '6',
    },
    {
      id: '25',
      ville: 'Oulad H\'Riz Sahel',
      region: '6',
    },
    {
      id: '26',
      ville: 'Oulad M\'rah',
      region: '6',
    },
    {
      id: '27',
      ville: 'Oulad Saïd',
      region: '6',
    },
    {
      id: '28',
      ville: 'Oulad Sidi Ben Daoud',
      region: '6',
    },
    {
      id: '29',
      ville: 'Ras El Aïn',
      region: '6',
    },
    {
      id: '30',
      ville: 'Settat',
      region: '6',
    },
    {
      id: '31',
      ville: 'Sidi Rahhal Chataï',
      region: '6',
    },
    {
      id: '32',
      ville: 'Soualem',
      region: '6',
    },
    {
      id: '33',
      ville: 'Azemmour',
      region: '6',
    },
    {
      id: '34',
      ville: 'Bir Jdid',
      region: '6',
    },
    {
      id: '35',
      ville: 'Bouguedra',
      region: '7',
    },
    {
      id: '36',
      ville: 'Echemmaia',
      region: '7',
    },
    {
      id: '37',
      ville: 'El Jadida',
      region: '6',
    },
    {
      id: '38',
      ville: 'Hrara',
      region: '7',
    },
    {
      id: '39',
      ville: 'Ighoud',
      region: '7',
    },
    {
      id: '40',
      ville: 'Jamâat Shaim',
      region: '7',
    },
    {
      id: '41',
      ville: 'Jorf Lasfar',
      region: '6',
    },
    {
      id: '42',
      ville: 'Khemis Zemamra',
      region: '6',
    },
    {
      id: '43',
      ville: 'Laaounate',
      region: '6',
    },
    {
      id: '44',
      ville: 'Moulay Abdallah',
      region: '6',
    },
    {
      id: '45',
      ville: 'Oualidia',
      region: '6',
    },
    {
      id: '46',
      ville: 'Oulad Amrane',
      region: '6',
    },
    {
      id: '47',
      ville: 'Oulad Frej',
      region: '6',
    },
    {
      id: '48',
      ville: 'Oulad Ghadbane',
      region: '6',
    },
    {
      id: '49',
      ville: 'Safi',
      region: '7',
    },
    {
      id: '50',
      ville: 'Sebt El Maârif',
      region: '6',
    },
    {
      id: '51',
      ville: 'Sebt Gzoula',
      region: '7',
    },
    {
      id: '52',
      ville: 'Sidi Ahmed',
      region: '7',
    },
    {
      id: '53',
      ville: 'Sidi Ali Ban Hamdouche',
      region: '6',
    },
    {
      id: '54',
      ville: 'Sidi Bennour',
      region: '6',
    },
    {
      id: '55',
      ville: 'Sidi Bouzid',
      region: '6',
    },
    {
      id: '56',
      ville: 'Sidi Smaïl',
      region: '6',
    },
    {
      id: '57',
      ville: 'Youssoufia',
      region: '7',
    },
    {
      id: '58',
      ville: 'Fès',
      region: '3',
    },
    {
      id: '59',
      ville: 'Aïn Cheggag',
      region: '3',
    },
    {
      id: '60',
      ville: 'Bhalil',
      region: '3',
    },
    {
      id: '61',
      ville: 'Boulemane',
      region: '3',
    },
    {
      id: '62',
      ville: 'El Menzel',
      region: '3',
    },
    {
      id: '63',
      ville: 'Guigou',
      region: '3',
    },
    {
      id: '64',
      ville: 'Imouzzer Kandar',
      region: '3',
    },
    {
      id: '65',
      ville: 'Imouzzer Marmoucha',
      region: '3',
    },
    {
      id: '66',
      ville: 'Missour',
      region: '3',
    },
    {
      id: '67',
      ville: 'Moulay Yaâcoub',
      region: '3',
    },
    {
      id: '68',
      ville: 'Ouled Tayeb',
      region: '3',
    },
    {
      id: '69',
      ville: 'Outat El Haj',
      region: '3',
    },
    {
      id: '70',
      ville: 'Ribate El Kheir',
      region: '3',
    },
    {
      id: '71',
      ville: 'Séfrou',
      region: '3',
    },
    {
      id: '72',
      ville: 'Skhinate',
      region: '3',
    },
    {
      id: '73',
      ville: 'Tafajight',
      region: '3',
    },
    {
      id: '74',
      ville: 'Arbaoua',
      region: '4',
    },
    {
      id: '75',
      ville: 'Aïn Dorij',
      region: '1',
    },
    {
      id: '76',
      ville: 'Dar Gueddari',
      region: '4',
    },
    {
      id: '77',
      ville: 'Had Kourt',
      region: '4',
    },
    {
      id: '78',
      ville: 'Jorf El Melha',
      region: '4',
    },
    {
      id: '79',
      ville: 'Kénitra',
      region: '4',
    },
    {
      id: '80',
      ville: 'Khenichet',
      region: '4',
    },
    {
      id: '81',
      ville: 'Lalla Mimouna',
      region: '4',
    },
    {
      id: '82',
      ville: 'Mechra Bel Ksiri',
      region: '4',
    },
    {
      id: '83',
      ville: 'Mehdia',
      region: '4',
    },
    {
      id: '84',
      ville: 'Moulay Bousselham',
      region: '4',
    },
    {
      id: '85',
      ville: 'Sidi Allal Tazi',
      region: '4',
    },
    {
      id: '86',
      ville: 'Sidi Kacem',
      region: '4',
    },
    {
      id: '87',
      ville: 'Sidi Slimane',
      region: '4',
    },
    {
      id: '88',
      ville: 'Sidi Taibi',
      region: '4',
    },
    {
      id: '89',
      ville: 'Sidi Yahya El Gharb',
      region: '4',
    },
    {
      id: '90',
      ville: 'Souk El Arbaa',
      region: '4',
    },
    {
      id: '91',
      ville: 'Akka',
      region: '9',
    },
    {
      id: '92',
      ville: 'Assa',
      region: '10',
    },
    {
      id: '93',
      ville: 'Bouizakarne',
      region: '10',
    },
    {
      id: '94',
      ville: 'El Ouatia',
      region: '10',
    },
    {
      id: '95',
      ville: 'Es-Semara',
      region: '11',
    },
    {
      id: '96',
      ville: 'Fam El Hisn',
      region: '9',
    },
    {
      id: '97',
      ville: 'Foum Zguid',
      region: '9',
    },
    {
      id: '98',
      ville: 'Guelmim',
      region: '10',
    },
    {
      id: '99',
      ville: 'Taghjijt',
      region: '10',
    },
    {
      id: '100',
      ville: 'Tan-Tan',
      region: '10',
    },
    {
      id: '101',
      ville: 'Tata',
      region: '9',
    },
    {
      id: '102',
      ville: 'Zag',
      region: '10',
    },
    {
      id: '103',
      ville: 'Marrakech',
      region: '7',
    },
    {
      id: '104',
      ville: 'Ait Daoud',
      region: '7',
    },
    {
      id: '115',
      ville: 'Amizmiz',
      region: '7',
    },
    {
      id: '116',
      ville: 'Assahrij',
      region: '7',
    },
    {
      id: '117',
      ville: 'Aït Ourir',
      region: '7',
    },
    {
      id: '118',
      ville: 'Ben Guerir',
      region: '7',
    },
    {
      id: '119',
      ville: 'Chichaoua',
      region: '7',
    },
    {
      id: '120',
      ville: 'El Hanchane',
      region: '7',
    },
    {
      id: '121',
      ville: 'El Kelaâ des Sraghna',
      region: '7',
    },
    {
      id: '122',
      ville: 'Essaouira',
      region: '7',
    },
    {
      id: '123',
      ville: 'Fraïta',
      region: '7',
    },
    {
      id: '124',
      ville: 'Ghmate',
      region: '7',
    },
    {
      id: '125',
      ville: 'Ighounane',
      region: '8',
    },
    {
      id: '126',
      ville: 'Imintanoute',
      region: '7',
    },
    {
      id: '127',
      ville: 'Kattara',
      region: '7',
    },
    {
      id: '128',
      ville: 'Lalla Takerkoust',
      region: '7',
    },
    {
      id: '129',
      ville: 'Loudaya',
      region: '7',
    },
    {
      id: '130',
      ville: 'Lâattaouia',
      region: '7',
    },
    {
      id: '131',
      ville: 'Moulay Brahim',
      region: '7',
    },
    {
      id: '132',
      ville: 'Mzouda',
      region: '7',
    },
    {
      id: '133',
      ville: 'Ounagha',
      region: '7',
    },
    {
      id: '134',
      ville: 'Sid L\'Mokhtar',
      region: '7',
    },
    {
      id: '135',
      ville: 'Sid Zouin',
      region: '7',
    },
    {
      id: '136',
      ville: 'Sidi Abdallah Ghiat',
      region: '7',
    },
    {
      id: '137',
      ville: 'Sidi Bou Othmane',
      region: '7',
    },
    {
      id: '138',
      ville: 'Sidi Rahhal',
      region: '7',
    },
    {
      id: '139',
      ville: 'Skhour Rehamna',
      region: '7',
    },
    {
      id: '140',
      ville: 'Smimou',
      region: '7',
    },
    {
      id: '141',
      ville: 'Tafetachte',
      region: '7',
    },
    {
      id: '142',
      ville: 'Tahannaout',
      region: '7',
    },
    {
      id: '143',
      ville: 'Talmest',
      region: '7',
    },
    {
      id: '144',
      ville: 'Tamallalt',
      region: '7',
    },
    {
      id: '145',
      ville: 'Tamanar',
      region: '7',
    },
    {
      id: '146',
      ville: 'Tamansourt',
      region: '7',
    },
    {
      id: '147',
      ville: 'Tameslouht',
      region: '7',
    },
    {
      id: '148',
      ville: 'Tanalt',
      region: '9',
    },
    {
      id: '149',
      ville: 'Zeubelemok',
      region: '7',
    },
    {
      id: '150',
      ville: 'Meknès‎',
      region: '3',
    },
    {
      id: '151',
      ville: 'Khénifra',
      region: '5',
    },
    {
      id: '152',
      ville: 'Agourai',
      region: '3',
    },
    {
      id: '153',
      ville: 'Ain Taoujdate',
      region: '3',
    },
    {
      id: '154',
      ville: 'MyAliCherif',
      region: '8',
    },
    {
      id: '155',
      ville: 'Rissani',
      region: '8',
    },
    {
      id: '156',
      ville: 'Amalou Ighriben',
      region: '5',
    },
    {
      id: '157',
      ville: 'Aoufous',
      region: '8',
    },
    {
      id: '158',
      ville: 'Arfoud',
      region: '8',
    },
    {
      id: '159',
      ville: 'Azrou',
      region: '3',
    },
    {
      id: '160',
      ville: 'Aïn Jemaa',
      region: '3',
    },
    {
      id: '161',
      ville: 'Aïn Karma',
      region: '3',
    },
    {
      id: '162',
      ville: 'Aïn Leuh',
      region: '3',
    },
    {
      id: '163',
      ville: 'Aït Boubidmane',
      region: '3',
    },
    {
      id: '164',
      ville: 'Aït Ishaq',
      region: '5',
    },
    {
      id: '165',
      ville: 'Boudnib',
      region: '8',
    },
    {
      id: '166',
      ville: 'Boufakrane',
      region: '3',
    },
    {
      id: '167',
      ville: 'Boumia',
      region: '8',
    },
    {
      id: '168',
      ville: 'El Hajeb',
      region: '3',
    },
    {
      id: '169',
      ville: 'Elkbab',
      region: '5',
    },
    {
      id: '170',
      ville: 'Er-Rich',
      region: '5',
    },
    {
      id: '171',
      ville: 'Errachidia',
      region: '8',
    },
    {
      id: '172',
      ville: 'Gardmit',
      region: '8',
    },
    {
      id: '173',
      ville: 'Goulmima',
      region: '8',
    },
    {
      id: '174',
      ville: 'Gourrama',
      region: '8',
    },
    {
      id: '175',
      ville: 'Had Bouhssoussen',
      region: '5',
    },
    {
      id: '176',
      ville: 'Haj Kaddour',
      region: '3',
    },
    {
      id: '177',
      ville: 'Ifrane',
      region: '3',
    },
    {
      id: '178',
      ville: 'Itzer',
      region: '8',
    },
    {
      id: '179',
      ville: 'Jorf',
      region: '8',
    },
    {
      id: '180',
      ville: 'Kehf Nsour',
      region: '5',
    },
    {
      id: '181',
      ville: 'Kerrouchen',
      region: '5',
    },
    {
      id: '182',
      ville: 'M\'haya',
      region: '3',
    },
    {
      id: '183',
      ville: 'M\'rirt',
      region: '5',
    },
    {
      id: '184',
      ville: 'Midelt',
      region: '8',
    },
    {
      id: '185',
      ville: 'Moulay Ali Cherif',
      region: '8',
    },
    {
      id: '186',
      ville: 'Moulay Bouazza',
      region: '5',
    },
    {
      id: '187',
      ville: 'Moulay Idriss Zerhoun',
      region: '3',
    },
    {
      id: '188',
      ville: 'Moussaoua',
      region: '3',
    },
    {
      id: '189',
      ville: 'N\'Zalat Bni Amar',
      region: '3',
    },
    {
      id: '190',
      ville: 'Ouaoumana',
      region: '5',
    },
    {
      id: '191',
      ville: 'Oued Ifrane',
      region: '3',
    },
    {
      id: '192',
      ville: 'Sabaa Aiyoun',
      region: '3',
    },
    {
      id: '193',
      ville: 'Sebt Jahjouh',
      region: '3',
    },
    {
      id: '194',
      ville: 'Sidi Addi',
      region: '3',
    },
    {
      id: '195',
      ville: 'Tichoute',
      region: '8',
    },
    {
      id: '196',
      ville: 'Tighassaline',
      region: '5',
    },
    {
      id: '197',
      ville: 'Tighza',
      region: '5',
    },
    {
      id: '198',
      ville: 'Timahdite',
      region: '3',
    },
    {
      id: '199',
      ville: 'Tinejdad',
      region: '8',
    },
    {
      id: '200',
      ville: 'Tizguite',
      region: '3',
    },
    {
      id: '201',
      ville: 'Toulal',
      region: '3',
    },
    {
      id: '202',
      ville: 'Tounfite',
      region: '8',
    },
    {
      id: '203',
      ville: 'Zaouia d\'Ifrane',
      region: '3',
    },
    {
      id: '204',
      ville: 'Zaïda',
      region: '8',
    },
    {
      id: '205',
      ville: 'Ahfir',
      region: '2',
    },
    {
      id: '206',
      ville: 'Aklim',
      region: '2',
    },
    {
      id: '207',
      ville: 'Al Aroui',
      region: '2',
    },
    {
      id: '208',
      ville: 'Aïn Bni Mathar',
      region: '2',
    },
    {
      id: '209',
      ville: 'Aïn Erreggada',
      region: '2',
    },
    {
      id: '210',
      ville: 'Ben Taïeb',
      region: '2',
    },
    {
      id: '211',
      ville: 'Berkane',
      region: '2',
    },
    {
      id: '212',
      ville: 'Bni Ansar',
      region: '2',
    },
    {
      id: '213',
      ville: 'Bni Chiker',
      region: '2',
    },
    {
      id: '214',
      ville: 'Bni Drar',
      region: '2',
    },
    {
      id: '215',
      ville: 'Bni Tadjite',
      region: '2',
    },
    {
      id: '216',
      ville: 'Bouanane',
      region: '2',
    },
    {
      id: '217',
      ville: 'Bouarfa',
      region: '2',
    },
    {
      id: '218',
      ville: 'Bouhdila',
      region: '2',
    },
    {
      id: '219',
      ville: 'Dar El Kebdani',
      region: '2',
    },
    {
      id: '220',
      ville: 'Debdou',
      region: '2',
    },
    {
      id: '221',
      ville: 'Douar Kannine',
      region: '2',
    },
    {
      id: '222',
      ville: 'Driouch',
      region: '2',
    },
    {
      id: '223',
      ville: 'El Aïoun Sidi Mellouk',
      region: '2',
    },
    {
      id: '224',
      ville: 'Farkhana',
      region: '2',
    },
    {
      id: '225',
      ville: 'Figuig',
      region: '2',
    },
    {
      id: '226',
      ville: 'Ihddaden',
      region: '2',
    },
    {
      id: '227',
      ville: 'Jaâdar',
      region: '2',
    },
    {
      id: '228',
      ville: 'Jerada',
      region: '2',
    },
    {
      id: '229',
      ville: 'Kariat Arekmane',
      region: '2',
    },
    {
      id: '230',
      ville: 'Kassita',
      region: '2',
    },
    {
      id: '231',
      ville: 'Kerouna',
      region: '2',
    },
    {
      id: '232',
      ville: 'Laâtamna',
      region: '2',
    },
    {
      id: '233',
      ville: 'Madagh',
      region: '2',
    },
    {
      id: '234',
      ville: 'Midar',
      region: '2',
    },
    {
      id: '235',
      ville: 'Nador',
      region: '2',
    },
    {
      id: '236',
      ville: 'Naima',
      region: '2',
    },
    {
      id: '237',
      ville: 'Oued Heimer',
      region: '2',
    },
    {
      id: '238',
      ville: 'Oujda',
      region: '2',
    },
    {
      id: '239',
      ville: 'Ras El Ma',
      region: '2',
    },
    {
      id: '240',
      ville: 'Saïdia',
      region: '2',
    },
    {
      id: '241',
      ville: 'Selouane',
      region: '2',
    },
    {
      id: '242',
      ville: 'Sidi Boubker',
      region: '2',
    },
    {
      id: '243',
      ville: 'Sidi Slimane Echcharaa',
      region: '2',
    },
    {
      id: '244',
      ville: 'Talsint',
      region: '2',
    },
    {
      id: '245',
      ville: 'Taourirt',
      region: '2',
    },
    {
      id: '246',
      ville: 'Tendrara',
      region: '2',
    },
    {
      id: '247',
      ville: 'Tiztoutine',
      region: '2',
    },
    {
      id: '248',
      ville: 'Touima',
      region: '2',
    },
    {
      id: '249',
      ville: 'Touissit',
      region: '2',
    },
    {
      id: '250',
      ville: 'Zaïo',
      region: '2',
    },
    {
      id: '251',
      ville: 'Zeghanghane',
      region: '2',
    },
    {
      id: '252',
      ville: 'Rabat',
      region: '4',
    },
    {
      id: '253',
      ville: 'Salé',
      region: '4',
    },
    {
      id: '254',
      ville: 'Ain El Aouda',
      region: '4',
    },
    {
      id: '255',
      ville: 'Harhoura',
      region: '4',
    },
    {
      id: '256',
      ville: 'Khémisset',
      region: '4',
    },
    {
      id: '257',
      ville: 'Oulmès',
      region: '4',
    },
    {
      id: '258',
      ville: 'Rommani',
      region: '4',
    },
    {
      id: '259',
      ville: 'Sidi Allal El Bahraoui',
      region: '4',
    },
    {
      id: '260',
      ville: 'Sidi Bouknadel',
      region: '4',
    },
    {
      id: '261',
      ville: 'Skhirate',
      region: '4',
    },
    {
      id: '262',
      ville: 'Tamesna',
      region: '4',
    },
    {
      id: '263',
      ville: 'Témara',
      region: '4',
    },
    {
      id: '264',
      ville: 'Tiddas',
      region: '4',
    },
    {
      id: '265',
      ville: 'Tiflet',
      region: '4',
    },
    {
      id: '266',
      ville: 'Touarga',
      region: '4',
    },
    {
      id: '267',
      ville: 'Agadir',
      region: '9',
    },
    {
      id: '268',
      ville: 'Agdz',
      region: '8',
    },
    {
      id: '269',
      ville: 'Agni Izimmer',
      region: '9',
    },
    {
      id: '270',
      ville: 'Aït Melloul',
      region: '9',
    },
    {
      id: '271',
      ville: 'Alnif',
      region: '8',
    },
    {
      id: '272',
      ville: 'Anzi',
      region: '9',
    },
    {
      id: '273',
      ville: 'Aoulouz',
      region: '9',
    },
    {
      id: '274',
      ville: 'Aourir',
      region: '9',
    },
    {
      id: '275',
      ville: 'Arazane',
      region: '9',
    },
    {
      id: '276',
      ville: 'Aït Baha',
      region: '9',
    },
    {
      id: '277',
      ville: 'Aït Iaâza',
      region: '9',
    },
    {
      id: '278',
      ville: 'Aït Yalla',
      region: '8',
    },
    {
      id: '279',
      ville: 'Ben Sergao',
      region: '9',
    },
    {
      id: '280',
      ville: 'Biougra',
      region: '9',
    },
    {
      id: '281',
      ville: 'Boumalne-Dadès',
      region: '8',
    },
    {
      id: '282',
      ville: 'Dcheira El Jihadia',
      region: '9',
    },
    {
      id: '283',
      ville: 'Drargua',
      region: '9',
    },
    {
      id: '284',
      ville: 'El Guerdane',
      region: '9',
    },
    {
      id: '285',
      ville: 'Harte Lyamine',
      region: '8',
    },
    {
      id: '286',
      ville: 'Ida Ougnidif',
      region: '9',
    },
    {
      id: '287',
      ville: 'Ifri',
      region: '8',
    },
    {
      id: '288',
      ville: 'Igdamen',
      region: '9',
    },
    {
      id: '289',
      ville: 'Ighil n\'Oumgoun',
      region: '8',
    },
    {
      id: '290',
      ville: 'Imassine',
      region: '8',
    },
    {
      id: '291',
      ville: 'Inezgane',
      region: '9',
    },
    {
      id: '292',
      ville: 'Irherm',
      region: '9',
    },
    {
      id: '293',
      ville: 'Kelaat-M\'Gouna',
      region: '8',
    },
    {
      id: '294',
      ville: 'Lakhsas',
      region: '9',
    },
    {
      id: '295',
      ville: 'Lakhsass',
      region: '9',
    },
    {
      id: '296',
      ville: 'Lqliâa',
      region: '9',
    },
    {
      id: '297',
      ville: 'M\'semrir',
      region: '8',
    },
    {
      id: '298',
      ville: 'Massa (Maroc)',
      region: '9',
    },
    {
      id: '299',
      ville: 'Megousse',
      region: '9',
    },
    {
      id: '300',
      ville: 'Ouarzazate',
      region: '8',
    },
    {
      id: '301',
      ville: 'Oulad Berhil',
      region: '9',
    },
    {
      id: '302',
      ville: 'Oulad Teïma',
      region: '9',
    },
    {
      id: '303',
      ville: 'Sarghine',
      region: '8',
    },
    {
      id: '304',
      ville: 'Sidi Ifni',
      region: '10',
    },
    {
      id: '305',
      ville: 'Skoura',
      region: '8',
    },
    {
      id: '306',
      ville: 'Tabounte',
      region: '8',
    },
    {
      id: '307',
      ville: 'Tafraout',
      region: '9',
    },
    {
      id: '308',
      ville: 'Taghzout',
      region: '1',
    },
    {
      id: '309',
      ville: 'Tagzen',
      region: '9',
    },
    {
      id: '310',
      ville: 'Taliouine',
      region: '9',
    },
    {
      id: '311',
      ville: 'Tamegroute',
      region: '8',
    },
    {
      id: '312',
      ville: 'Tamraght',
      region: '9',
    },
    {
      id: '313',
      ville: 'Tanoumrite Nkob Zagora',
      region: '8',
    },
    {
      id: '314',
      ville: 'Taourirt ait zaghar',
      region: '8',
    },
    {
      id: '315',
      ville: 'Taroudannt',
      region: '9',
    },
    {
      id: '316',
      ville: 'Temsia',
      region: '9',
    },
    {
      id: '317',
      ville: 'Tifnit',
      region: '9',
    },
    {
      id: '318',
      ville: 'Tisgdal',
      region: '9',
    },
    {
      id: '319',
      ville: 'Tiznit',
      region: '9',
    },
    {
      id: '320',
      ville: 'Toundoute',
      region: '8',
    },
    {
      id: '321',
      ville: 'Zagora',
      region: '8',
    },
    {
      id: '322',
      ville: 'Afourar',
      region: '5',
    },
    {
      id: '323',
      ville: 'Aghbala',
      region: '5',
    },
    {
      id: '324',
      ville: 'Azilal',
      region: '5',
    },
    {
      id: '325',
      ville: 'Aït Majden',
      region: '5',
    },
    {
      id: '326',
      ville: 'Beni Ayat',
      region: '5',
    },
    {
      id: '327',
      ville: 'Béni Mellal',
      region: '5',
    },
    {
      id: '328',
      ville: 'Bin elouidane',
      region: '5',
    },
    {
      id: '329',
      ville: 'Bradia',
      region: '5',
    },
    {
      id: '330',
      ville: 'Bzou',
      region: '5',
    },
    {
      id: '331',
      ville: 'Dar Oulad Zidouh',
      region: '5',
    },
    {
      id: '332',
      ville: 'Demnate',
      region: '5',
    },
    {
      id: '333',
      ville: 'Dra\'a',
      region: '8',
    },
    {
      id: '334',
      ville: 'El Ksiba',
      region: '5',
    },
    {
      id: '335',
      ville: 'Foum Jamaa',
      region: '5',
    },
    {
      id: '336',
      ville: 'Fquih Ben Salah',
      region: '5',
    },
    {
      id: '337',
      ville: 'Kasba Tadla',
      region: '5',
    },
    {
      id: '338',
      ville: 'Ouaouizeght',
      region: '5',
    },
    {
      id: '339',
      ville: 'Oulad Ayad',
      region: '5',
    },
    {
      id: '340',
      ville: 'Oulad M\'Barek',
      region: '5',
    },
    {
      id: '341',
      ville: 'Oulad Yaich',
      region: '5',
    },
    {
      id: '342',
      ville: 'Sidi Jaber',
      region: '5',
    },
    {
      id: '343',
      ville: 'Souk Sebt Oulad Nemma',
      region: '5',
    },
    {
      id: '344',
      ville: 'Zaouïat Cheikh',
      region: '5',
    },
    {
      id: '345',
      ville: 'Tanger‎',
      region: '1',
    },
    {
      id: '346',
      ville: 'Tétouan‎',
      region: '1',
    },
    {
      id: '347',
      ville: 'Akchour',
      region: '1',
    },
    {
      id: '348',
      ville: 'Assilah',
      region: '1',
    },
    {
      id: '349',
      ville: 'Bab Berred',
      region: '1',
    },
    {
      id: '350',
      ville: 'Bab Taza',
      region: '1',
    },
    {
      id: '351',
      ville: 'Brikcha',
      region: '1',
    },
    {
      id: '352',
      ville: 'Chefchaouen',
      region: '1',
    },
    {
      id: '353',
      ville: 'Dar Bni Karrich',
      region: '1',
    },
    {
      id: '354',
      ville: 'Dar Chaoui',
      region: '1',
    },
    {
      id: '355',
      ville: 'Fnideq',
      region: '1',
    },
    {
      id: '356',
      ville: 'Gueznaia',
      region: '1',
    },
    {
      id: '357',
      ville: 'Jebha',
      region: '1',
    },
    {
      id: '358',
      ville: 'Karia',
      region: '3',
    },
    {
      id: '359',
      ville: 'Khémis Sahel',
      region: '1',
    },
    {
      id: '360',
      ville: 'Ksar El Kébir',
      region: '1',
    },
    {
      id: '361',
      ville: 'Larache',
      region: '1',
    },
    {
      id: '362',
      ville: 'M\'diq',
      region: '1',
    },
    {
      id: '363',
      ville: 'Martil',
      region: '1',
    },
    {
      id: '364',
      ville: 'Moqrisset',
      region: '1',
    },
    {
      id: '365',
      ville: 'Oued Laou',
      region: '1',
    },
    {
      id: '366',
      ville: 'Oued Rmel',
      region: '1',
    },
    {
      id: '367',
      ville: 'Ouazzane',
      region: '1',
    },
    {
      id: '368',
      ville: 'Point Cires',
      region: '1',
    },
    {
      id: '369',
      ville: 'Sidi Lyamani',
      region: '1',
    },
    {
      id: '370',
      ville: 'Sidi Mohamed ben Abdallah el-Raisuni',
      region: '1',
    },
    {
      id: '371',
      ville: 'Zinat',
      region: '1',
    },
    {
      id: '372',
      ville: 'Ajdir‎',
      region: '1',
    },
    {
      id: '373',
      ville: 'Aknoul‎',
      region: '3',
    },
    {
      id: '374',
      ville: 'Al Hoceïma‎',
      region: '1',
    },
    {
      id: '375',
      ville: 'Aït Hichem‎',
      region: '1',
    },
    {
      id: '376',
      ville: 'Bni Bouayach‎',
      region: '1',
    },
    {
      id: '377',
      ville: 'Bni Hadifa‎',
      region: '1',
    },
    {
      id: '378',
      ville: 'Ghafsai‎',
      region: '3',
    },
    {
      id: '379',
      ville: 'Guercif‎',
      region: '2',
    },
    {
      id: '380',
      ville: 'Imzouren‎',
      region: '1',
    },
    {
      id: '381',
      ville: 'Inahnahen‎',
      region: '1',
    },
    {
      id: '382',
      ville: 'Issaguen (Ketama)‎',
      region: '1',
    },
    {
      id: '383',
      ville: 'Karia (El Jadida)‎',
      region: '6',
    },
    {
      id: '384',
      ville: 'Karia Ba Mohamed‎',
      region: '3',
    },
    {
      id: '385',
      ville: 'Oued Amlil‎',
      region: '3',
    },
    {
      id: '386',
      ville: 'Oulad Zbair‎',
      region: '3',
    },
    {
      id: '387',
      ville: 'Tahla‎',
      region: '3',
    },
    {
      id: '388',
      ville: 'Tala Tazegwaght‎',
      region: '1',
    },
    {
      id: '389',
      ville: 'Tamassint‎',
      region: '1',
    },
    {
      id: '390',
      ville: 'Taounate‎',
      region: '3',
    },
    {
      id: '391',
      ville: 'Targuist‎',
      region: '1',
    },
    {
      id: '392',
      ville: 'Taza‎',
      region: '3',
    },
    {
      id: '393',
      ville: 'Taïnaste‎',
      region: '3',
    },
    {
      id: '394',
      ville: 'Thar Es-Souk‎',
      region: '3',
    },
    {
      id: '395',
      ville: 'Tissa‎',
      region: '3',
    },
    {
      id: '396',
      ville: 'Tizi Ouasli‎',
      region: '3',
    },
    {
      id: '397',
      ville: 'Laayoune‎',
      region: '11',
    },
    {
      id: '398',
      ville: 'El Marsa‎',
      region: '11',
    },
    {
      id: '399',
      ville: 'Tarfaya‎',
      region: '11',
    },
    {
      id: '400',
      ville: 'Boujdour‎',
      region: '11',
    },
    {
      id: '401',
      ville: 'Awsard',
      region: '12',
    },
    {
      id: '402',
      ville: 'Oued-Eddahab',
      region: '12',
    },
    {
      id: '403',
      ville: 'Stehat',
      region: '1',
    },
    {
      id: '404',
      ville: 'Aït Attab',
      region: '5',
    },
  ];
  constructor(private http: HttpClient, private enseignantService: EnseignantService,
              private messageService: MessageService, private typeSessionService: TypeSessionService) { }

  async ngOnInit(): Promise<void> {
    this.findAll();
    await this.enseignantService.findAll();
    for ( const e of this.enseignants) {
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
    this.cols = [
      { field: 'numeroSOM', header: 'N°SOM' },
      { field: 'cin', header: 'Cin' },
      { field: 'lastName', header: 'Nom' },
      { field: 'firstName', header: 'Prénom' },
      { field: 'sex', header: 'Sexe' },
      { field: 'birthDay', header: 'D.Naissance' },
      { field: 'mail', header: 'Email' },
      { field: 'tel', header: 'Tel' },
      { field: 'ville', header: 'Ville' },
    ];
    this.cols2 = [
      {field: 'libelle', header: 'Libelle'},
    ];
  }
  public deleteByNumeroSOM(enseignant: Enseignant) {
    this.enseignantService.deleteByNumeroSOM(enseignant);
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  async showBasicDialog2(enseignantFounded: Enseignant) {
    await  this.findByNumeroSOM(enseignantFounded);
    console.log(this.enseignantFounded);
    this.city = this.enseignantFounded.ville;
    console.log(this.city);
    this.displayBasic2 = true;
  }
  public async findByNumeroSOM(enseignantFounded: Enseignant) {
    await  this.enseignantService.findByNumeroSOM(enseignantFounded);
  }
  public async save() {
    this.enseignantService.enseignant.ville = this.city.ville;
    await this.enseignantService.save();
    this.displayBasic = false;
    await this.enseignantService.findAll();
    for ( const e of this.enseignants) {
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
  }
  public async update() {
    this.enseignantService.enseignantFounded.ville = this.city.ville;
    await this.enseignantService.update();
    this.displayBasic2 = false;
    await this.enseignantService.findAll();
    for ( const e of this.enseignants) {
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
  }
  get enseignant(): Enseignant {
    return this.enseignantService.enseignant;
  }
  get enseignants(): Enseignant[] {
    return this.enseignantService.enseignants;
  }
  get enseignantFounded(): Enseignant {
    return this.enseignantService.enseignantFounded;
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = async  (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importProfessors = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as Enseignant[];
      for (const prof of this.importProfessors) {
        this.enseignant.numeroSOM = prof[0];
        this.enseignant.birthDay = new Date((prof[5] - (25567 + 2)) * 86400 * 1000);
        this.enseignant.firstName = prof[3];
        this.enseignant.sex = prof[4];
        this.enseignant.lastName = prof[2];
        this.enseignant.cin = prof[1];
        this.enseignant.tel = prof[6];
        this.enseignant.ville = prof[7];
        await this.findByLibelle(prof[8]);
        this.enseignant.departement = this.departement;
        console.log(this.enseignant);
        await this.enseignantService.save();
      }
      await this.enseignantService.findAll();
      // tslint:disable-next-line:no-shadowed-variable
      for ( const e of this.enseignants) {
        await this.getImage(e.cin);
        e.src = this.retrievedImage;
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  // Gets called when the user selects an image
  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }
  // Gets called when the user clicks on submit to upload the image
  public upload() {
    console.log(this.selectedFile);
    // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.http.post(this._url + 'upload/' + this.numeroSOM , uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        },
      );
  }
  // Gets called when the user clicks on retrieved image button to get the image from back end
  async getImage(cin: string): Promise<any> {
    // Make a call to Spring Boot to get the Image Bytes.
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password')) });
    await this.http.get<Enseignant>(this._url + 'get/' + cin, {headers})
      .toPromise().then(
        (res) => {
          this.retrievedImage = 'data:image/jpeg;base64,' + res.image;
          console.log(this.retrievedImage);
        },
      );
  }
  get enseignantConnected(): Enseignant {
    return this.enseignantService.enseignantConnected;
  }
  findAll() {
   this.http.get<Departement[]>('http://localhost:8090/absence-tracking/departement/').subscribe(
      (data) => {
        this.enseignantService.departements = data;
      },
    );
  }
  public async findByLibelle(departement: string) {
    await this.http.get<Departement>('http://localhost:8090/absence-tracking/departement/libelle/' + departement).toPromise().then(
      (data) => {
        this.enseignantService.departement = data;
      },
    );
  }
  get departements(): Departement[] {
    return this.enseignantService.departements;
  }
  get departement(): Departement {
    return this.enseignantService.departement;
  }
  select(event) {
    console.log(event.data);
    this.typeSessionService.findByEnseignant(event.data);
    console.log(this.typeSessionService.typeSessionsFounded);
    this.displayBasic3 = true;
  }
  get typeSessionsFounded(): TypeSession[] {
    return this.typeSessionService.typeSessionsFounded;
  }
  async password(enseignant: Enseignant) {
    this.enseignantService.enseignantFounded = enseignant;
    this.enseignantService.enseignantFounded.password = this.enseignantService.enseignantFounded.cin;
    await this.enseignantService.password();
    await this.enseignantService.findAll();
    for ( const e of this.enseignants) {
      await this.getImage(e.cin);
      e.src = this.retrievedImage;
    }
  }
}
