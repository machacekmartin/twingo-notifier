# 🫶 FOR THE TWINGO 🫶

Chces dostavat notifikacni maily jakmile pribydou inzeraty na **MK1 Renault Twingo**, anizby ti to muselo bezet na pozadi na kompu / serveru?

Pokud jo tak vitej v klubiku a klidne si to forkni 💅
<br/>

> Aktualne to kontroluje jen Bazos a Sbazar a Sauto, ale prolly jich pridam vic, zalezi jestli do te doby nejake nekoupim. Oboji ma limit na cenovy rozsah 10k - 50k.
> Pod 10k by to byla sebevrazda a nad 50k je to pro takove trhadlo rodidel prilis overkill.

<sup><sub>Btw -- Twingo jsem si už koupil, tak jsem pozastavil scheduler, aby mi to furt nehledalo nové a nové inzeráty. Pro zapnutí si v .github/workflows/cron.yml odkomentuj řádky 5 a 6, aby ti to fungovalo.</sup></sub>

### Jak a proc???
> TLDR; chci OG MK1 twingo a jsem linej.

Nechce se mi klikat na bazosi a furt zjistovat jestli nejaka kraska nepribyla, tak jsem stvoril tuhle nadheru, ktera nepotrebuje ani hosting.
Jakmile si to forknes tak musis nastavit par veci na githubu. 
Aby ti mohly chodit maily z akci, tak se pouzivaji

tyto repo variables:

  - ```MAIL_SERVER_ADDRESS```: smtp server (icloud smtp.mail.me.com)
  - ```MAIL_SERVER_PORT```: smtp port (icloud 587)
  - ```MAIL_TO```: mailova adresa kam ti maji chodit maily


a tyto repo secrets:

 - ```MAIL_USERNAME```: tvoje mailova adresa ze ktere budou chodit emaily
 - ```MAIL_PASSWORD```: tvoje heslo na mail (google a icloud si musis vytvorit nejaky ten special app-specific password)


Mimo pristupove udaje na smtp budes potrebovat jeste dat pravo ke zmenam repozitare z github akci:

```/ Repo / Settings / Actions / General / Workflow permissions - read and write```

V github akci ti pobezi cron, ktery kazdych 30 minut spusti skript a zjisti, jestli nenasel nahodou nejake nove inzeraty, a vsechny nove twinga prida do json filu, tzn pushne ti to primo do repa.
Jakmile najde nejake twingo, ktere nema v "databazi", tak ti posle mail, ve kterem jsou vylistovane ty nove inzeraty.
Cely skript je postaveny na hodne maly pocet vysledku. Pokud pozmenis filtry a budes chtit projizdet tisice zaznamu, tak je dost mozne ze to bazos/sbazar ani nedovoli a bude to blokovat.

<sup><sub>enjoy</sup></sub>


### 🫶 FOR THE TWINGO 🫶
