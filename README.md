# 🫶 FOR THE TWINGO 🫶

Chces dostavat notifikacni maily jakmile na bazosi pribydou inzeraty na **Renault Twingo** v cenovem rozsahu **10-50k** v **999km okoli Brna**?

Pokud jo tak vitej v klubiku a klidne si to forkni 💅

### Jak a proc???
> TLDR; chci OG twingo a jsem linej.

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

V akci ti pobezi cron, ktery kazdych 30 minut zjisti, jestli bazos nema nahodou nejake nove inzeraty na twingo, a pri kazdem zjisteni si ulozi vsechny inzeraty co nasel, tzn pushne ti to primo do repa.
Jakmile najde nejake twingo, ktere nema v "databazi", tak ti posle mail, ve kterem jsou vylistovane ty nove inzeraty.
Cely script je postaveny na hodne maly pocet vysledku. Pokud pozmenis filtry a budes chtit projizdet tisice zaznamu, tak je dost mozne ze to bazos ani nedovoli a blokne to.

<sup><sub>enjoy</sup></sub>


### 🫶 FOR THE TWINGO 🫶
