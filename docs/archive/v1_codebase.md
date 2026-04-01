===== FILE: C:\git\apl\med\.cursorrules =====


# GLOBAL AI RULES FOR MEDICAL BOOKING WIDGET

You are an expert Senior Frontend Engineer and System Architect.

## 1. PROJECT INTEGRITY & SSOT
- **Registry First:** Always consult `docs/PROJECT_REGISTRY.md` before creating or deleting files. This file is the Single Source of Truth for the project structure.
- **No Wipeouts:** Never output a truncated file with comments like "// ... rest of code". Always output the FULL content of the file being modified unless specifically asked for a diff.
- **Preserve Architecture:** Do not revert the "Actor vs Offering" architecture in `types.ts`.

## 2. MODULAR CONFIGURATION STRATEGY (PHP)
- We use a "Lego" strategy for the backend configuration.
- **Do NOT edit** `php_backend/config.php` directly for logic changes. It is only a loader.
- **Edit Parts:** Make changes in `php_backend/config_parts/*.php`.
- **Atomic Edits:** If you need to add a city, edit `02_topology.php`. If you need to change a color, edit `04_theme.php`.

## 3. FRONTEND STANDARDS
- **No Hardcoded Strings:** Use `src/config/theme.ts` for labels and colors.
- **Strict Types:** `src/types.ts` is the Data Contract. Do not change interfaces without checking `docs/ARCHITECTURE_2025.md`.
- **Components:** Use `src/components/ui/` for primitives (Button, Card) and `src/components/modules/` for business logic (DoctorCard).

## 4. PROCESS
1. Read the user request.
2. Check `PROJECT_REGISTRY.md` to locate relevant files.
3. If modifying config, identify the correct `_part` file.
4. Output strict XML.



===== FILE: C:\git\apl\med\.git\config =====

[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[submodule]
	active = .
[remote "origin"]
	url = https://github.com/smitxv-sketch/med_booking.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[lfs]
	repositoryformatversion = 0



===== FILE: C:\git\apl\med\.git\description =====

Unnamed repository; edit this file 'description' to name the repository.



===== FILE: C:\git\apl\med\.git\FETCH_HEAD =====

f393b1c3064ab3fc45344c66ca017d0cb08b597f		branch 'main' of https://github.com/smitxv-sketch/med_booking



===== FILE: C:\git\apl\med\.git\HEAD =====

ref: refs/heads/main



===== FILE: C:\git\apl\med\.git\index =====

DIRC      ЖiћкЭ.ЛЎрiћкЭ.ЛЎр          Ѓ¤          
7ЖZm:u‰ь^”дЁ¬ШПвЭaХ .cursorrules      iћкЭ.ЛЎрiћкЭ.ЛЎр          Ѓ¤          -I9tёeЅA\5zњ¬tзЕRЯх 
.gitignore        iћкЭ.к04iћкЭ.к04          Ѓ¤           ™ќј ът ЉPxNwЩ†xщ1/?/Ы .vite/deps/_metadata.json iћкЭ/ї¤iћкЭ/ї¤          Ѓ¤           =јҐ‘АU~5¶ JлўPж§Vг .vite/deps/package.json   iћкЭ/ї¤iћкЭ/ї¤          Ѓ¤          GрvћҐЉП…|-9G!ЩYњ­?ШwA App.tsx   iћкЭ/'M iћкЭ/'M           Ѓ¤          nЎ~оћ'і„В‚›/'кФ#EЏч CONFIG_GUIDE.md   iћкЭ/'M iћкЭ/'M           Ѓ¤          Э=ѓЎх™б?љ®щъю‰,ЯQ€ј 	DEPLOY.md iћкЭ/'M iћкЭ/'M           Ѓ¤          
–rЈЇ%Т†{’="§Ђьr№fГ 	README.md iћкЭ/EЬфiћкЭ/EЬф          Ѓ¤          .ю?lpє–нCnЦY…«Ј-ђЅ‚ор #benchmarks/antipatterns_registry.md       iћкЭ/EЬфiћкЭ/EЬф          Ѓ¤          vtќдым?fюѕ`пвwVо‰'> #benchmarks/capabilities_registry.md       iћкЭ/dldiћкЭ/dld          Ѓ¤          LЇНkХ†<0У`vУ‘µ¬mн U benchmarks/lotos_analysis.md      iћкЭ/dldiћкЭ/dld          Ѓ¤          iК{к€\пKЂ{q|ЮИм'з1 benchmarks/medsi_analysis.md      iћкЭ/‚ьњiћкЭ/‚ьњ          Ѓ¤          §кхђVµdQ6тZ…Щ9ЇW" "benchmarks/scandinavia_analysis.md        iћкЭ/‚ьњiћкЭ/‚ьњ          Ѓ¤          _Ыiіє“5ю{yбІ8мpl«ГE benchmarks/smclinic_analysis.md   iћкЭ/ќ”iћкЭ/ќ”          Ѓ¤          ЌDMБО~ЖµЭТ^ghxнЮЖСДўћ "components/ArchitecturePreview.tsx        iћкЭ/ј$¤iћкЭ/ј$¤          Ѓ¤          ЕО#€1‡ЖЂИХутRFV8в dist/assets/index.css     iћкЭ/ј$¤iћкЭ/ј$¤          Ѓ¤         ‹/3ляzЌ?JRоЋ4&Y€№|v dist/assets/index.js      iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤         ЄЪ*ШЯZЁ@
ц~1Vb±x{;Уп dist/assets/sentry.js     iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤         ®„I*ТmЩг'.т=FЬВ€3ыЙ dist/assets/vendor.js     iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤          р8В"–oHђшўЖH¬Мр‚§2 dist/index.html   iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤          7Y—А33«Ѕ»П¦ѕii·xЉM( dist/manifest.json        iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤          °© fђоЇЈ›Z—ј™ЊЬЙ«O docker-compose.yml        iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤          ‚Ы АЗ"?hћ ЦpтЂйфаD‰™ docs/00_CODE_AUDIT_PLAN.md        iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤          DXTЩ—Д1в
ЯY(q_L"§rИ docs/00_MASTER_PLAN.md    iћкЭ/ьtґiћкЭ/ьtґ          Ѓ¤          
™q*ЉД“< џґZ|XёW—Џ¶~пS docs/00_MIGRATION_PLAN.md iћкЭ0ЋuDiћкЭ0ЋuD          Ѓ¤          AСµЃL€Њ,Ъ_<yD¬lј,=2 docs/00_SYSTEM_PASSPORT.md        iћкЭ0ЋuDiћкЭ0ЋuD          Ѓ¤          ‰‹V–aц­юЕPЂ/tОђL; docs/01_STRATEGY_PRODUCT.md       iћкЭ0ЋuDiћкЭ0ЋuD          Ѓ¤          ЂьЩҐ Pµыз—>є;Јм%Ѓє‘[ docs/01_STRATEGY_SEPARATION.md    iћкЭ0­iћкЭ0­          Ѓ¤          ™Ійvћѓ+bлjҐѕ«jжяк docs/02_ARCHITECTURE_CMS.md       iћкЭ0­iћкЭ0­          Ѓ¤          F
AЬ5|pG‹Ь™UF*,„0в "docs/02_ARCHITECTURE_COMPLIANCE.md        iћкЭ0­iћкЭ0­          Ѓ¤          пdёСдРЩNшg@юп†лpl docs/02_ARCHITECTURE_CORE.md      iћкЭ0­iћкЭ0­          Ѓ¤          €>1і3Уу&Ѓ‹ѓv-fЎ¶ҐЛ docs/03_SPEC_CONFIG.md    iћкЭ0­iћкЭ0­          Ѓ¤          #>;(kбT$ЖИ|8Ўµ_/µn docs/03_SPEC_DATA_REQ.md  iћкЭ0­iћкЭ0­          Ѓ¤          ъ%‚CАз>!1П®Ь=фьђ± docs/03_SPEC_FEATURES.md  iћкЭ0­iћкЭ0­          Ѓ¤          FЁ‰TpэШ{ЮlІґТ€‘Щxє docs/03_SPEC_WP_SCHEMA.json       iћкЭ0­iћкЭ0­          Ѓ¤          *ля”/Ће
sХ¬¶4U}НЉ>D‚ docs/04_RESEARCH_ANALYSIS.md      iћкЭ0­iћкЭ0­          Ѓ¤          -esoЋЎ›ЪІ?&нл5}зу	 docs/04_RESEARCH_AUDIT.md iћкЭ0­iћкЭ0­          Ѓ¤          ѕсФђo€?љб§ѓ-єPLzXѓь docs/04_RESEARCH_BRIEF.md iћкЭ0­iћкЭ0­          Ѓ¤          …«ъ~XжѕPУРк…њЏ94м© docs/04_RESEARCH_SUMMARY.md       iћкЭ0­iћкЭ0­          Ѓ¤          §тХ‰КЋ¦ХIК±µ1иЩ_vгцѕ[ docs/05_LOGS_BRANCHES.txt iћкЭ0­iћкЭ0­          Ѓ¤          ќ†уъЭт‘ЇѕЙGsm†N°•© docs/05_LOGS_MAIN.txt     iћкЭ0­iћкЭ1NёМ          Ѓ¤          iуЖ»№8Ѕ™}зµ	зfЎвQ«J docs/06_CONSULTATION_BRIEF.md     iћкЭ1NёМiћкЭ1NёМ          Ѓ¤          БВ`Щї° &ПXШVЕ`ЃЉrЎҐ docs/07_API_FOR_AI_AGENT.md       iћкЭ1NёМiћкЭ1NёМ          Ѓ¤          nН]Й—Ьё\ЌћM
7&FЊл docs/2_00_PRODUCT_STRATEGY.md     iћкЭ1NёМiћкЭ1NёМ          Ѓ¤          Ъ3ОRiъDьXmEє‚RyЯ  docs/2_01_ARCHITECTURE_CORE.md    iћкЭ1~ђШiћкЭ1~ђШ          Ѓ¤          
ЋCф¤}d“{	,­‘ЛЭЗ&­ docs/2_02_UX_MECHANICS.md iћкЭ1~ђШiћкЭ1~ђШ          Ѓ¤          њ•=f{љU>МО‡ЯeоцkдQ docs/2_03_TECH_STACK.md   iћкЭ1›6ФiћкЭ1›6Ф          Ѓ¤          jP;~љH@ХџС}ъ>Х&AAV docs/2_04_ROADMAP.md      iћкЭ1›6ФiћкЭ1›6Ф          Ѓ¤          E„ґjзVЛвкЗЄDјэі"b #docs/LLM_CONFIG_GENERATOR_PROMPT.md       iћкЭ1›6ФiћкЭ1›6Ф          Ѓ¤          ћ4>¦К, ‘•ЂЎ

Ѓ4•tJС  docs/LLM_DRIVER_MAPPER_PROMPT.md  iћкЭ1№ЗpiћкЭ1№Зp          Ѓ¤          ’!іЗ“D~–ёО_ЙЪ–мр$@ћ "docs/LLM_THEME_GENERATOR_PROMPT.md        iћкЭ1№ЗpiћкЭ1ШVа          Ѓ¤          fk\‡@­АSфЫБtяPі docs/PROJECT_REGISTRY.md  iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          
ег§СЙР№€|=©Њ *©Йљы« docs/README.md    iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          KЩЖюЂ]ШY
Иzk€ЂСиЁv[•Ж 
index.html        iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          klҐ6`‡}ОЋ@щ°#Я–Е= 	index.tsx iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          (‘Нц0«jzЦ#
‰ю9^ф7хря 
metadata.json     iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          —F"ЫPЈ6ў^оєGsњ»%.Dѓ node_modules/.bin/nanoid  iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          Fњ@|eFPҐќЬРґa node_modules/.bin/nanoid.cmd      iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          EШ¤Ч­!Щ-®(
&®ЂјџЦаVk node_modules/.bin/nanoid.ps1      iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          “АCЛ 	ёрjН
eы$—a>aу node_modules/.bin/resolve iћкЭ1ШVаiћкЭ1ШVа          Ѓ¤          D|@:`…«Ѓы¬$…нА– node_modules/.bin/resolve.cmd     iћкЭ2MЄliћкЭ2MЄl          Ѓ¤          =т+-1~фO`iэЇ6\)эµ"'5 node_modules/.bin/resolve.ps1     iћкЭ2MЄliћкЭ2MЄl          Ѓ¤          ™™ЏБdПЉљU]ГdЕ¦‰ node_modules/.bin/rollup  iћкЭ2MЄliћкЭ2mГњ          Ѓ¤          GісігEзюoю)?д|Аb®М& node_modules/.bin/rollup.cmd      iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          IцWЧ&љm;$ХБч\m$бщЁ node_modules/.bin/rollup.ps1      iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          •—Е2yф<@‘•±(JTЧvY node_modules/.bin/semver  iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          E™ъќ¬НМИ
(АП"7· node_modules/.bin/semver.cmd      iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          A1G­H(є(fЗ]Q)/НTpp node_modules/.bin/semver.ps1      iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          “lXўдMѓ‹©Ѕ ъЮ–V­Nтф!Љ node_modules/.bin/sucrase iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          ќы;¶ВQчґ'6ЈЅ’ЗЯщ.* node_modules/.bin/sucrase-node    iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          Isу«	‚#H]еЮТ н–ѕDујa "node_modules/.bin/sucrase-node.cmd        iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          QћАg+їбХ9њљ{ R	sigЁy "node_modules/.bin/sucrase-node.ps1        iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          D<Ш’‹иМЁХґZ#‡]#бюь“Л node_modules/.bin/sucrase.cmd     iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          =f{ё@Ћ’юЗ)ЭjM¶_ЪpДsц node_modules/.bin/sucrase.ps1     iћкЭ2mГњiћкЭ2mГњ          Ѓ¤          ™дuУ.«`Љ§µMAдз†	Є…Xч node_modules/.bin/tailwind        iћкЭ2фsLiћкЭ2фsL          Ѓ¤          G3ЃvЁКЪдчж®$0Y—’r° node_modules/.bin/tailwind.cmd    iћкЭ2фsLiћкЭ3и          Ѓ¤          I]`ѕъI‹м·\р#MЋаB¤П?з node_modules/.bin/tailwind.ps1    iћкЭ3иiћкЭ3и          Ѓ¤          ™дuУ.«`Љ§µMAдз†	Є…Xч node_modules/.bin/tailwindcss     iћкЭ3иiћкЭ3и          Ѓ¤          G3ЃvЁКЪдчж®$0Y—’r° !node_modules/.bin/tailwindcss.cmd iћкЭ3иiћкЭ3и          Ѓ¤          I]`ѕъI‹м·\р#MЋаB¤П?з !node_modules/.bin/tailwindcss.ps1 iћкЭ31ђњiћкЭ31ђњ          Ѓ¤          ‘Д†Kљ"ќ99…»«г5MЅ ѕ? node_modules/.bin/tsc     iћкЭ31ђњiћкЭ31ђњ          Ѓ¤          C@ї„UL1V1BЯї‘=^-ќЯ,D node_modules/.bin/tsc.cmd iћкЭ31ђњiћкЭ3PЁ          Ѓ¤          9$µ„nѕfЏoXкаШ;oбю node_modules/.bin/tsc.ps1 iћкЭ3PЁiћкЭ3PЁ          Ѓ¤          ›lО=HK¤г"GGЅ:ї —Џ~O node_modules/.bin/tsserver        iћкЭ3_yXiћкЭ3_yX          Ѓ¤          HWшQэJЭ[  ¶¬ё¤Д© node_modules/.bin/tsserver.cmd    iћкЭ3_yXiћкЭ3_yX          Ѓ¤          M$џA}'в|E>С^ц
яЂЃ node_modules/.bin/tsserver.ps1    iћкЭ3_yXiћкЭ3_yX          Ѓ¤          §МнcДo­x‡мs/ђX©
чґXtf (node_modules/.bin/update-browserslist-db  iћкЭ3~	ђiћкЭ3~	ђ          Ѓ¤          N.ђ_іУ©t/F:ь“&¤± ( ,node_modules/.bin/update-browserslist-db.cmd      iћкЭ3~	ђiћкЭ3~	ђ          Ѓ¤          ezЅтm¬хі_ЛЇ7TЅ:ю^:4 ,node_modules/.bin/update-browserslist-db.ps1      iћкЭ3~	ђiћкЭ3~	ђ          Ѓ¤          ЌDcщbщЫЪd,ЬГ:kїГМ№ў node_modules/.bin/vite    iћкЭ3њљђiћкЭ3њљђ          Ѓ¤          Aц.–mК›­[ЊѕL‹FњЕxч node_modules/.bin/vite.cmd        iћкЭ3њљђiћкЭ3њљђ          Ѓ¤          1§u›П.?Н85Я|1‹*ю7ї¬ node_modules/.bin/vite.ps1        iћкЭ3»,XiћкЭ3»,X          Ѓ¤         ^
ѓўѕоl^‘QRкИ»\ґGH node_modules/.package-lock.json   iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤         їјљќ]‹8!-Nq…F”ўЕ*МґдO package-lock.json iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤          §:Ј‘°Ad[7Ф“ъЙрKс'“›K
 package.json      iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤           Л“(ёёkO‹&µ#†=юk·iNS› php_backend/.gitignore    iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤          kAБ¶bTkфёix‹ь#Ђ›ьx php_backend/.htaccess     iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤           ^_lґLSЌ,H«ЗhєkЮёІД1 php_backend/QmsGateway.php        iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤          O‡¶xМ»К9EѕЋцЮф?Ч2[Д php_backend/api.php       iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤          
іС–HQt
АЏAЩhdrЌ)Pож php_backend/check_setup.php       iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤          „ЌЬн~·¤ћq|D№Sи_НЕ†Ќ php_backend/config.php    iћкЭ3Щ»diћкЭ3Щ»d          Ѓ¤          †СХнЬDNЎЌїеЩ›н<3‡dП %php_backend/config_access.example.php     iћкЭ4NiћкЭ4N          Ѓ¤          
G©Б±раЋ;EЙ¬R•z‡ДК©х .php_backend/config_parts/01_infrastructure.php    iћкЭ4NiћкЭ4N          Ѓ¤          	‹]яQKnуД—¤W \ҐдЕ^‹Љ (php_backend/config_parts/02_topology.php  iћкЭ4NiћкЭ4N          Ѓ¤           Ѓiюцм^0–¶:Y›%lW}µщ %php_backend/config_parts/03_logic.php     iћкЭ4ѓЄ„iћкЭ4ѓЄ„          Ѓ¤            ЋкRї1SН:°‡ЦЖ•НІq9h %php_backend/config_parts/04_theme.php     iћкЭ4ѓЄ„iћкЭ4ѓЄ„          Ѓ¤          *_A[zҐчттЕ[В0µ¤Ic=k *php_backend/config_parts/05_compliance.php        iћкЭ4ѓЄ„iћкЭ4ѓЄ„          Ѓ¤           @vQпU2ЉмБhЪiџДФ#ќЄ 'php_backend/config_parts/99_helpers.php   iћкЭ4АШ iћкЭ4АШ           Ѓ¤          Н€ЯUЗ)ьHЈQ§5„л*hѓw -php_backend/controllers/BookingController.php     iћкЭ4АШ iћкЭ4АШ           Ѓ¤          6Б7|}­3ћќЃiьYФШ oЁз ,php_backend/controllers/SearchController.php      iћкЭ4АШ iћкЭ4АШ           Ѓ¤          ш‚ирЕїІҐоD©ч?я9` php_backend/core/Cache.php        iћкЭ4АШ iћкЭ4АШ           Ѓ¤          	Щ
§vb+ЁД·1эNд$]-?‰ php_backend/core/Logger.php       iћкЭ4АШ iћкЭ4АШ           Ѓ¤          	,tѓ&EоBчU@Ѕ{шЄйЄTJ  php_backend/core/RateLimiter.php  iћкЭ4АШ iћкЭ4АШ           Ѓ¤          і¬[fа•`A3™ђъ'tv±д php_backend/core/Router.php       iћкЭ4АШ iћкЭ4АШ           Ѓ¤          ?ЎЃ
h!ђП‹yzJьлМ.…¶м &php_backend/data/doctors_registry.json    iћкЭ4АШ iћкЭ4АШ           Ѓ¤          .Ъяёя°5&«жљ›Х#о php_backend/debug_doctors.php     iћкЭ4АШ iћкЭ4АШ           Ѓ¤          Бц­зег™3gгI–ъDЏ vFS php_backend/debug_search.php      iћкЭ5AG$iћкЭ5AG$          Ѓ¤          "™ tё@їЅ®Рy>cЏУ
 z$пџ php_backend/dev_api_test.php      iћкЭ5AG$iћкЭ5AG$          Ѓ¤          @5Юr9pёjЎGџr¤ѓHѓnР)“Ї php_backend/dev_cms_sync.php      iћкЭ5AG$iћкЭ5_Pь          Ѓ¤          
ьrBHиV4љђЗL`dЛ"ЛзC php_backend/dev_dashboard.php     iћкЭ5_PьiћкЭ5_Pь          Ѓ¤          7	”!o!™nѓрt§kgМЩ“d:¶ "php_backend/drivers/BaseDriver.php        iћкЭ5_PьiћкЭ5_Pь          Ѓ¤          ц•/
"YCКђяј%KМжUЅa¤2 "php_backend/drivers/OneCDriver.php        iћкЭ5}вДiћкЭ5}вД          Ѓ¤          :HФ-ёРЂПЭ7rтIюЕ!I¬ф !php_backend/drivers/QmsDriver.php iћкЭ5њqРiћкЭ5њqР          Ѓ¤          яХ!}ЂT)ZІЋ« ~ќ з—wи 'php_backend/helpers/DoctorFormatter.php   iћкЭ5њqРiћкЭ5њqР          Ѓ¤          .EЫюZдўMЂ“!п:и<HфЮЕл php_backend/index.php     iћкЭ5» xiћкЭ5» x          Ѓ¤          ВтНъЂ$ЎЂn¦)|ЕЄtю1Xmќ 'php_backend/interfaces/MisInterface.php   iћкЭ5» xiћкЭ5» x          Ѓ¤          &‡з©T†•nG“RL–‚_Пf@ php_backend/qms_debug.php iћкЭ5ЩЋјiћкЭ5ЩЋј          Ѓ¤          bфJ©Iпх77 9ЃhmПж(§° )php_backend/services/AsyncHttpService.php iћкЭ5ЩЋјiћкЭ5ЩЋј          Ѓ¤           ЂыAµ®яЗ!¤LkёЎа¶к0 %php_backend/services/OpenAiClient.php     iћкЭ5ЩЋјiћкЭ5шИ          Ѓ¤          ХГЙњЈ?кытТdU:вkГЯ—us )php_backend/services/RecaptchaService.php iћкЭ5шИiћкЭ5шИ          Ѓ¤           щUъ>—|Љ1“р…WІl•H &php_backend/services/VectorService.php    iћкЭ5шИiћкЭ5шИ          Ѓ¤          
Ц9»НeМЦц$№ЧЮ.iЃgZL php_backend/setup_db.php  iћкЭ5шИiћкЭ5шИ          Ѓ¤          MСC*Е|?э«lЛѓ*Z`dY*ЏЌ !php_backend/setup_qms_mapping.sql iћкЭ5шИiћкЭ5шИ          Ѓ¤          УѓІZ ЇкGk^
ШZPUі±  php_backend/supabase_setup.sql    iћкЭ61» iћкЭ61»           Ѓ¤          
ґј_иЯБі‡{N5іб бa В php_backend/tools/README.md       iћкЭ61» iћкЭ61»           Ѓ¤          у›™·еjCчW›^
sэИЫ #php_backend/tools/fix_structure.php       iћкЭ6R2ёiћкЭ6R2ё          Ѓ¤          %Итјдгцzчm:Ыj|“vК`¦Л‘Ш +php_backend/tools/generate_requirements.php       iћкЭ6R2ёiћкЭ6pЖ          Ѓ¤          N6v„z§°
'O
IЭЫ’i&dх_K php_backend/tools/sync_tool.php   iћкЭ6pЖiћкЭ6pЖ          Ѓ¤          ~јќХ-Ш10ЯюГGОю?™яёц &php_backend/tools/wizard/generator.php    iћкЭ6ЏX<iћкЭ6ЏX<          Ѓ¤          g^Њ}–ҐKю]эќ6дуЂJЁШ|ї #php_backend/tools/wizard/index.html       iћкЭ6ЏX<iћкЭ6­й           Ѓ¤          8/Bh]”Eд’НЦUcF…х "php_backend/tools/wizard/reset.php        iћкЭ6­й iћкЭ6­й           Ѓ¤          dШIдNҐЯs	IЂ‰FўyЄби !php_backend/tools/wizard/save.php iћкЭ6ХpДiћкЭ6ХpД          Ѓ¤          йюљї іjЕWњГЭг–Iл+A &php_backend/tools/wizard/scan_site.php    iћкЭ6ф(iћкЭ6ф(          Ѓ¤          ®њZ9ЕY“ЫЈЮ2jЗ+ФмЯ
б— 3php_backend/tools/wordpress_integration_snippet.php       iћкЭ6ф(iћкЭ6ф(          Ѓ¤          dЛо»з^—Ѕi
2­ОЗтV?Цѕі php_backend/troubleshoot.php      iћкЭ7іаiћкЭ7іа          Ѓ¤          Ы`OЏJ¶9СФRpҐ№хЬ%—} php_backend/whoami.php    iћкЭ7іаiћкЭ7іа          Ѓ¤           Tйћј, М7ЮLпо+тЈ2«·=Ќ postcss.config.js iћкЭ7:G8iћкЭ7:G8          Ѓ¤          7Y—А33«Ѕ»П¦ѕii·xЉM( public/manifest.json      iћкЭ7XЬ„iћкЭ7XЬ„          Ѓ¤          ЄФе.®¬РSрЌћеЬѓgTќУ•И services/api.ts   iћкЭ7t
ёiћкЭ7t
ё          Ѓ¤            жќв›ІСЦCK‹)®wZШВдЊS‘ services/mockQmsApi.ts    iћкЭ7t
ёiћкЭ7t
ё          Ѓ¤          мКч){†„П›Fn§oB ђomKF src/App.tsx       iћкЭ7t
ёiћкЭ7t
ё          Ѓ¤          eёН„ѓ%јцЅ—lЁМҐЄ7л8z!е src/Presentation.tsx      iћкЭ7°~дiћкЭ7°~д          Ѓ¤          ЌDMБО~ЖµЭТ^ghxнЮЖСДўћ &src/components/ArchitecturePreview.tsx    iћкЭ7АР<iћкЭ7Р'0          Ѓ¤          	nџ?;Ѕ‘1—Ш&&й s<ЬMcM  src/components/ErrorBoundary.tsx  iћкЭ7Р'0iћкЭ7Р'0          Ѓ¤          -wzИ¤lUљ‡Sal‰РKS)B src/components/WizardLayout.tsx   iћкЭ7аjiћкЭ7аj          Ѓ¤          †гrZЄ?t…¤3ђДЋгPЫЩЁР~ $src/components/admin/AdminLayout.tsx      iћкЭ7п»ђiћкЭ7п»ђ          Ѓ¤          ®Sy·кxАd^7:gй(ЏЕУ  )src/components/modules/BranchSwitcher.tsx iћкЭ8
<iћкЭ8
<          Ѓ¤          гr’жGЏw°хёuИя°	‚6 ,src/components/modules/DimensionSelector.tsx      iћкЭ8
<iћкЭ8ўа          Ѓ¤          z.}p№Eп°ЧZб™†чs]yй® %src/components/modules/DoctorCard.tsx     iћкЭ8+Ъ”iћкЭ8+Ъ”          Ѓ¤           h§«'nЬ5g‡~GчФЂїЏ>џ, )src/components/modules/DoctorChatCard.tsx iћкЭ8+Ъ”iћкЭ8+Ъ”          Ѓ¤          хЁіH‚Аб®тPЃкК@жъ¦,·Б .src/components/modules/DoctorProfileHeader.tsx    iћкЭ8>HЊiћкЭ8M–           Ѓ¤          ysюA†‡ЦА|еѕ3Іь¶kz‡ (src/components/presentation/Features.tsx  iћкЭ8M– iћкЭ8M–           Ѓ¤          ‚Uчk]І‡[”ТXXѕ¦Y-¶И &src/components/presentation/Footer.tsx    iћкЭ8]	ьiћкЭ8]	ь          Ѓ¤          1¤|=_dюГж]Шf=ђ?P§Я, $src/components/presentation/Hero.tsx      iћкЭ8l\¤iћкЭ8l\¤          Ѓ¤          „OлЉЋйу~ЖшҐ‰„ЩЁR» &src/components/presentation/Navbar.tsx    iћкЭ8l\¤iћкЭ8l\¤          Ѓ¤          %1мШм+БПi<„OТ~љqHxж
 'src/components/presentation/Roadmap.tsx   iћкЭ8{А|iћкЭ8{А|          Ѓ¤           ѕќэPэхSоҐ_оЛОм™® src/components/steps/StepAI.tsx   iћкЭ8ђ54iћкЭ8ђ54          Ѓ¤          
ёќщ“±‰^`“Жdq`.щТщ %src/components/steps/StepBranches.tsx     iћкЭ8ћVИiћкЭ8ћVИ          Ѓ¤          	ЌюClBё]{`eЕјЃЗлМ8uј
 'src/components/steps/StepDimensions.tsx   iћкЭ8ћVИiћкЭ8°юђ          Ѓ¤          GuъВИcyEЭIЙ«!™ЫvyRђ $src/components/steps/StepDoctors.tsx      iћкЭ8Бх$iћкЭ8Бх$          Ѓ¤          A|#QSёeбNsћ_Јб5б°iz !src/components/steps/StepForm.tsx iћкЭ8Ш”(iћкЭ8Ш”(          Ѓ¤          +1 гDї‰S*‚й•сцр„Н”M« !src/components/steps/StepHome.tsx iћкЭ8Ш”(iћкЭ8Ш”(          Ѓ¤          6~С*hкЙZaяѓВHu“И’ц (src/components/steps/StepPatientType.tsx  iћкЭ8зэiћкЭ8зэ          Ѓ¤          0ImIЬј[ )в8	ќ§h»я±Д "src/components/steps/StepSlots.tsx        iћкЭ8зэiћкЭ8чф0          Ѓ¤          YЙOиэђї5aѓЬ>$№<Ѓ_X| $src/components/steps/StepSuccess.tsx      iћкЭ8чф0iћкЭ8чф0          Ѓ¤          2Оёd­LёЯыС‹aНЙщмs src/components/ui/Button.tsx      iћкЭ9
БpiћкЭ9
Бp          Ѓ¤          ЌЫЙтМлtsцBк
›ѕ&!…3 src/components/ui/Card.tsx        iћкЭ9
БpiћкЭ9
Бp          Ѓ¤          ЪееТЬ.џ+Ю~"хzg:З·1• src/components/ui/Skeleton.tsx    iћкЭ9№ФiћкЭ9№Ф          Ѓ¤          ґO+іs(l”Дѕх•Z
`0­ src/config/schema.ts      iћкЭ93ЃЂiћкЭ93ЃЂ          Ѓ¤          и†H‰В5RБўПТ©ф€сЎEцД  src/config/theme.ts       iћкЭ9IЊiћкЭ9IЊ          Ѓ¤          тЇ`„ЊЈz•‹Z ”t<A*ъ` src/declarations.d.ts     iћкЭ9XўшiћкЭ9Xўш          Ѓ¤          	Эьъ)кќЦBЉбј$)ЏYЮa src/hooks/useDoctors.ts   iћкЭ9h°iћкЭ9h°          Ѓ¤          ­Џz,‰‹и—WAЫ%2µ"s3†Е« src/hooks/usePhoneMask.ts iћкЭ9h°iћкЭ9h°          Ѓ¤          Ечј@ї©`AiZ+¬‡
Іu  src/hooks/useRecaptcha.ts iћкЭ9|«0iћкЭ9|«0          Ѓ¤          	™ВУопtKФ’FЦ+Ихw	(Щ
 src/hooks/useSmartSearch.ts       iћкЭ9‹эtiћкЭ9‹эt          Ѓ¤          ¶Х—„TнЕ®<#У"vя”д›p‚ 
src/index.css     iћкЭ9‹эtiћкЭ9ћ/D          Ѓ¤          ›я)mЙ "*("ҐД°4ЉІwяЭ 
src/index.tsx     iћкЭ9ћ/DiћкЭ9ћ/D          Ѓ¤          G4~§	;т]'ЏјуЭMm[—*и›ћ src/services/analytics.ts iћкЭ9±mpiћкЭ9±mp          Ѓ¤          ЯЪAHjРФзҐYSuдmГ7И
_ src/services/api.ts       iћкЭ9±mpiћкЭ9±mp          Ѓ¤          Cznлrxљ§и~Ъm_ч‡]IW src/services/session.ts   iћкЭ9±mpiћкЭ9±mp          Ѓ¤          #^к:hD#НЭA)ц1ЏХ‡Ћ src/store/bookingStore.ts iћкЭ9±mpiћкЭ9±mp          Ѓ¤          ќцJ€"ыѓ\‘Ь°КЁ"ц©Бл\Ї src/types.ts      iћкЭ9±mpiћкЭ9±mp          Ѓ¤          )v1oHЏяFhх€‘\ІiЇЊ
Ѓ src/utils/uiHelpers.tsx   iћкЭ9±mpiћкЭ9±mp          Ѓ¤          w"іIN+}CyQW•!lІЎ‘х tailwind.config.js        iћкЭ9±mpiћкЭ9±mp          Ѓ¤          Ookўђз•?zѓдЊЯЈХм-Јь 
tsconfig.json     iћкЭ9±mpiћкЭ9±mp          Ѓ¤          >	Ѕ7 ЄџВ>Љи$TyЮ types.ts  iћкЭ9±mpiћкЭ9±mp          Ѓ¤            жќв›ІСЦCK‹)®wZШВдЊS‘ untitled.tsx      iћкЭ:0JdiћкЭ:0Jd          Ѓ¤          Х;Ш.PГJNи|iњ=ЉаК°ДјП vite.config.ts    TREE  \ 198 10
SєёюpЗkяBОЋ–g!¤џ.Mсsrc 43 6
YМ™Q±ЮR0 ’‰D€тіиэhooks 4 0
ЕOЬнеBЃЬъ\aЯVCDёL{Bstore 1 0
;а”;[ЅZYц—ІwJ8hutils 1 0
ЌяЊЇх0yGћ!{р¦p«‘yconfig 2 0
sЄЂЧТс"“ҐDтРxХю¤[&services 3 0
и	—ШCZnэЧGµxA1ЋІFcomponents 26 5
6	аЮ*СHZд4„oўn|цui 3 0
&#¬тѓ'3Й–ЂµH ь6#n}Юadmin 1 0
`ћ`XК¬sНмњЬcк)©ХЂзsteps 9 0
j+‡i4Ш8°3±°2Ш™*C{ќ}ћmodules 5 0
Иm9B {еVМ‚1ЎUЗЪЉ/presentation 5 0
GЋk%Ѕn5mњЊmSђМРdist 6 1
r[ж;=—RОйr°ЋР„Ь©assets 4 0
Ш3ЁU5yснЛ¬­оїCSINdocs 31 0
¬ІkЩ5И…^J€БЛcЫm|OЭ.vite 2 1
®#фјЭx™u­–¤№тѕFЂЫVwЌdeps 2 0
ыѓе_С@vЎФA/Lyх№ИІpublic 1 0
—R-)Hфњж
rhP`л®Uservices 2 0
B8ѓд_пЮ7А”gѓҐЦдџ*ы3benchmarks 6 0
КЎ$ЕТ мA+rфs
Tаcomponents 1 0
]3ІЙХsOЁkХсуnјЦ*™Ѓpphp_backend 51 9
ІМҐ@%пЯцеXъ®cfСєїл•core 4 0
Й•Љ;µЛT±…|,ЩUЛ†йдљdata 1 0
­ХZ»V=¶&:СFlю@xх5Ygtools 10 1
цк,FЩЃйzbІЭ¦¶©Н›mЖ!wizard 5 0
•…БЇmёWy@o“(БС[ujdrivers 3 0
RM^†|¶єД%Ш—‰џГЬF—helpers 1 0
µi	Е¦x•јq98fЇ»ф*Њ‚›Ѓservices 4 0
аФСи»Ь hУ–ш=1vї"iinterfaces 1 0
ъ¦ЂТРfYt:Х»щ°ЪОь›controllers 2 0
gЃrD°Ђщl]ћзНЂЊи”©ґЌconfig_parts 6 0
њэ1z)в™ФКEцЯѕ|Пђn>йнnode_modules 37 1
Ю©ЇHWihХзgсX1@.bin 36 0
——]MЗ  ъ@X‘чY)(І¶aхЎ;&WП*j·ЯЎk9eиbK


===== FILE: C:\git\apl\med\.git\packed-refs =====

# pack-refs with: peeled fully-peeled sorted 
f393b1c3064ab3fc45344c66ca017d0cb08b597f refs/remotes/origin/main



===== FILE: C:\git\apl\med\.gitignore =====

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Р’РЅРёРјР°РЅРёРµ: РњС‹ СЃРїРµС†РёР°Р»СЊРЅРѕ РќР• РёРіРЅРѕСЂРёСЂСѓРµРј РїР°РїРєСѓ /dist, 
# С‚Р°Рє РєР°Рє Р±СѓРґРµРј РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РµС‘ РґР»СЏ РґРµРїР»РѕСЏ РЅР° С…РѕСЃС‚РёРЅРі Р±РµР· Node.js
# /dist



===== FILE: C:\git\apl\med\.vite\deps\_metadata.json =====

{
  "hash": "022e0c58",
  "configHash": "0e0b03b7",
  "lockfileHash": "e3b0c442",
  "browserHash": "f2e2c1ee",
  "optimized": {},
  "chunks": {}
}


===== FILE: C:\git\apl\med\.vite\deps\package.json =====

{
  "type": "module"
}



===== FILE: C:\git\apl\med\1.ps1 =====

$root = (Get-Location).Path
$out  = Join-Path $root "all_code.txt"

$skipDirNames = @('node_modules', '.git', 'dist', 'build', '.next', '.turbo', 'coverage')

$enc = New-Object System.Text.UTF8Encoding($false)  # UTF-8 Р±РµР· BOM
$sw  = New-Object System.IO.StreamWriter($out, $false, $enc)

try {
  Get-ChildItem -Path $root -Recurse -File -Force |
    Where-Object { $_.DirectoryName -notmatch '\\(' + ($skipDirNames -join '|') + ')\\' } |
    Sort-Object FullName |
    ForEach-Object {
      $sw.WriteLine("===== FILE: $($_.FullName) =====")
      $sw.WriteLine()

      try {
        $text = Get-Content -LiteralPath $_.FullName -Raw -ErrorAction Stop
        $sw.WriteLine($text)
      } catch {
        $sw.WriteLine("<<SKIPPED: cannot read as text>>")
      }

      $sw.WriteLine()
      $sw.WriteLine()
    }
}
finally {
  $sw.Close()
}


===== FILE: C:\git\apl\med\all_code.txt =====

===== FILE: C:\git\apl\med\.cursorrules =====


# GLOBAL AI RULES FOR MEDICAL BOOKING WIDGET

You are an expert Senior Frontend Engineer and System Architect.

## 1. PROJECT INTEGRITY & SSOT
- **Registry First:** Always consult `docs/PROJECT_REGISTRY.md` before creating or deleting files. This file is the Single Source of Truth for the project structure.
- **No Wipeouts:** Never output a truncated file with comments like "// ... rest of code". Always output the FULL content of the file being modified unless specifically asked for a diff.
- **Preserve Architecture:** Do not revert the "Actor vs Offering" architecture in `types.ts`.

## 2. MODULAR CONFIGURATION STRATEGY (PHP)
- We use a "Lego" strategy for the backend configuration.
- **Do NOT edit** `php_backend/config.php` directly for logic changes. It is only a loader.
- **Edit Parts:** Make changes in `php_backend/config_parts/*.php`.
- **Atomic Edits:** If you need to add a city, edit `02_topology.php`. If you need to change a color, edit `04_theme.php`.

## 3. FRONTEND STANDARDS
- **No Hardcoded Strings:** Use `src/config/theme.ts` for labels and colors.
- **Strict Types:** `src/types.ts` is the Data Contract. Do not change interfaces without checking `docs/ARCHITECTURE_2025.md`.
- **Components:** Use `src/components/ui/` for primitives (Button, Card) and `src/components/modules/` for business logic (DoctorCard).

## 4. PROCESS
1. Read the user request.
2. Check `PROJECT_REGISTRY.md` to locate relevant files.
3. If modifying config, identify the correct `_part` file.
4. Output strict XML.



===== FILE: C:\git\apl\med\.git\config =====

[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[submodule]
	active = .
[remote "origin"]
	url = https://github.com/smitxv-sketch/med_booking.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[lfs]
	repositoryformatversion = 0



===== FILE: C:\git\apl\med\.git\description =====

Unnamed repository; edit this file 'description' to name the repository.



===== FILE: C:\git\apl\med\.git\FETCH_HEAD =====

f393b1c3064ab3fc45344c66ca017d0cb08b597f		branch 'main' of https://github.com/smitxv-sketch/med_booking



===== FILE: C:\git\apl\med\.git\HEAD =====

ref: refs/heads/main



===== FILE: C:\git\apl\med\.git\index =====

DIRC      Р–iС›РєР­.Р›РЋСЂiС›РєР­.Р›РЋСЂ          РѓВ¤          
7Р–Zm:uвЂ°СЊ^вЂќРґРЃВ¬РЁРџРІР­aРҐ .cursorrules      iС›РєР­.Р›РЋСЂiС›РєР­.Р›РЋСЂ          РѓВ¤          -I9tС‘eР…A\5zСљВ¬tР·Р•RРЇС… 
.gitignore        iС›РєР­.Рє04iС›РєР­.Рє04          РѓВ¤           в„ўСњС СЉС‚ Р‰PxNwР©вЂ xС‰1/?/Р« .vite/deps/_metadata.json iС›РєР­/С—В¤iС›РєР­/С—В¤          РѓВ¤           =СТђвЂРђU~5В¶ JР»СћPР¶В§VРі .vite/deps/package.json   iС›РєР­/С—В¤iС›РєР­/С—В¤          РѓВ¤          GСЂvС›ТђР‰РџвЂ¦|-9G!Р©YСљВ­?РЁwA App.tsx   iС›РєР­/'M iС›РєР­/'M           РѓВ¤          nРЋ~РѕС›'С–вЂћР’вЂљвЂє/'РєВР¤#EРЏС‡ CONFIG_GUIDE.md   iС›РєР­/'M iС›РєР­/'M           РѓВ¤          Р­=С“РЋС…в„ўР±?С™В®С‰СЉСЋвЂ°,РЇQв‚¬С 	DEPLOY.md iС›РєР­/'M iС›РєР­/'M           РѓВ¤          
вЂ“rР€Р‡%РўвЂ {вЂ™="В§Р‚СЊrв„–fР“ 	README.md iС›РєР­/EР¬С„iС›РєР­/EР¬С„          РѓВ¤          .СЋ?lpС”вЂ“РЅCnР¦YвЂ¦В«Р€-С’Р…вЂљРѕСЂ #benchmarks/antipatterns_registry.md       iС›РєР­/EР¬С„iС›РєР­/EР¬С„          РѓВ¤          vtСњРґС‹Рј?fСЋС•`РїРІwVРѕвЂ°'> #benchmarks/capabilities_registry.md       iС›РєР­/dldiС›РєР­/dld          РѓВ¤          LР‡РќkРҐвЂ <0РЈ`vРЈвЂВµВ¬mРЅ U benchmarks/lotos_analysis.md      iС›РєР­/dldiС›РєР­/dld          РѓВ¤          iРљ{Рєв‚¬\РїKР‚{q|Р®РРј'Р·В1 benchmarks/medsi_analysis.md      iС›РєР­/вЂљСЊСљiС›РєР­/вЂљСЊСљ          РѓВ¤          В§РєС…С’VВµdQ6С‚ZвЂ¦Р©9Р‡W" "benchmarks/scandinavia_analysis.md        iС›РєР­/вЂљСЊСљiС›РєР­/вЂљСЊСљ          РѓВ¤          _Р«iС–С”вЂњ5СЋ{yР±Р†8РјplВ«Р“E benchmarks/smclinic_analysis.md   iС›РєР­/СњвЂќiС›РєР­/СњвЂќ          РѓВ¤          РЊDMР‘Рћ~Р–ВµР­Рў^ghxРЅР®Р–РЎР”СћС› "components/ArchitecturePreview.tsx        iС›РєР­/С$В¤iС›РєР­/С$В¤          РѓВ¤          Р•Рћ#в‚¬1вЂЎР–Р‚РРҐСѓС‚RFV8РІ dist/assets/index.css     iС›РєР­/С$В¤iС›РєР­/С$В¤          РѓВ¤         вЂ№/3Р»СЏzРЊ?JRРѕР‹4&Yв‚¬в„–|v dist/assets/index.js      iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤         Р„РЄ*РЁРЇZРЃ@
С†~1VbВ±x{;РЈРї dist/assets/sentry.js     iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤         В®вЂћI*РўmР©Рі'.С‚=FР¬Р’в‚¬3С‹Р™ dist/assets/vendor.js     iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤          СЂ8Р’"вЂ“oHС’С€СћР–HВ¬РњСЂвЂљВ§2 dist/index.html   iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤          7YвЂ”Рђ33В«Р…В»РџВ¦С•iiВ·xР‰M( dist/manifest.json        iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤          В°В©В fС’РѕР‡Р€вЂєZвЂ”Св„ўРЉР¬Р™В«O docker-compose.yml        iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤          вЂљР« РђР—"?hС› Р¦pС‚Р‚Р№С„Р°DвЂ°в„ў docs/00_CODE_AUDIT_PLAN.md        iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤          DXTР©вЂ”Р”1РІ
РЇY(q_L"В§rР docs/00_MASTER_PLAN.md    iС›РєР­/СЊtТ‘iС›РєР­/СЊtТ‘          РѓВ¤          
в„ўq*Р‰Р”вЂњ< СџТ‘Z|XС‘WвЂ”РЏВ¶~РїS docs/00_MIGRATION_PLAN.md iС›РєР­0Р‹uDiС›РєР­0Р‹uD          РѓВ¤          AРЎВµРѓLв‚¬РЉ,РЄ_<yDВ¬lС,=2 docs/00_SYSTEM_PASSPORT.md        iС›РєР­0Р‹uDiС›РєР­0Р‹uD          РѓВ¤          вЂ°вЂ№VвЂ“aС†В­СЋВР•PР‚/tРћС’L; docs/01_STRATEGY_PRODUCT.md       iС›РєР­0Р‹uDiС›РєР­0Р‹uD          РѓВ¤          Р‚СЊР©ТђВ PВµС‹Р·вЂ”>С”;Р€Рј%РѓС”вЂ[ docs/01_STRATEGY_SEPARATION.md    iС›РєР­0В­iС›РєР­0В­          РѓВ¤          в„ўР†Р№vС›С“+bР»jТђС•В«jР¶СЏРє docs/02_ARCHITECTURE_CMS.md       iС›РєР­0В­iС›РєР­0В­          РѓВ¤          F
AР¬5|pGвЂ№Р¬в„ўUF*,вЂћ0РІ "docs/02_ARCHITECTURE_COMPLIANCE.md        iС›РєР­0В­iС›РєР­0В­          РѓВ¤          РїdС‘РЎРґР Р©NС€g@СЋРївЂ Р»pl docs/02_ARCHITECTURE_CORE.md      iС›РєР­0В­iС›РєР­0В­          РѓВ¤          в‚¬>1С–3РЈСѓ&РѓвЂ№С“v-fРЋВ¶ТђР› docs/03_SPEC_CONFIG.md    iС›РєР­0В­iС›РєР­0В­          РѓВ¤          #>;(kР±T$Р–Р|8РЋВµ_/Вµn docs/03_SPEC_DATA_REQ.md  iС›РєР­0В­iС›РєР­0В­          РѓВ¤          СЉ%вЂљCРђР·>!1РџВ®Р¬=С„СЊС’В± docs/03_SPEC_FEATURES.md  iС›РєР­0В­iС›РєР­0В­          РѓВ¤          FРЃвЂ°TpСЌРЁ{Р®lР†Т‘Рўв‚¬вЂР©xС” docs/03_SPEC_WP_SCHEMA.json       iС›РєР­0В­iС›РєР­0В­          РѓВ¤          *Р»СЏвЂќ/Р‹Рµ
sРҐВ¬В¶4U}РќР‰>DвЂљ docs/04_RESEARCH_ANALYSIS.md      iС›РєР­0В­iС›РєР­0В­          РѓВ¤          -esoР‹РЋвЂєРЄР†?&РЅР»5}Р·Сѓ	 docs/04_RESEARCH_AUDIT.md iС›РєР­0В­iС›РєР­0В­          РѓВ¤          С•СЃР¤С’oв‚¬?С™Р±В§С“-С”PLzXС“СЊ docs/04_RESEARCH_BRIEF.md iС›РєР­0В­iС›РєР­0В­          РѓВ¤          вЂ¦В«СЉ~XР¶С•PРЈР РєвЂ¦СљРЏ94РјВ© docs/04_RESEARCH_SUMMARY.md       iС›РєР­0В­iС›РєР­0В­          РѓВ¤          В§С‚РҐвЂ°РљР‹В¦РҐIРљВ±Вµ1РёР©_vРіС†С•[ docs/05_LOGS_BRANCHES.txt iС›РєР­0В­iС›РєР­0В­          РѓВ¤          СњвЂ СѓВСЉР­С‚вЂР‡С•Р™GsmвЂ NВ°вЂўВ© docs/05_LOGS_MAIN.txt     iС›РєР­0В­iС›РєР­1NС‘Рњ          РѓВ¤          iСѓР–В»в„–8Р…в„ў}Р·Вµ	Р·fРЋРІQВ«J docs/06_CONSULTATION_BRIEF.md     iС›РєР­1NС‘РњiС›РєР­1NС‘Рњ          РѓВ¤          Р‘Р’`Р©С—В° &РџXРЁVР•`РѓР‰rРЋТђ docs/07_API_FOR_AI_AGENT.md       iС›РєР­1NС‘РњiС›РєР­1NС‘Рњ          РѓВ¤          nРќ]Р™вЂ”Р¬С‘\РЊС›M
7&FРЉР» docs/2_00_PRODUCT_STRATEGY.md     iС›РєР­1NС‘РњiС›РєР­1NС‘Рњ          РѓВ¤          РЄ3РћRiСЉDСЊXmEС”вЂљRyРЇВ  docs/2_01_ARCHITECTURE_CORE.md    iС›РєР­1~С’РЁiС›РєР­1~С’РЁ          РѓВ¤          
Р‹CС„В¤}dвЂњ{	,В­вЂР›Р­Р—&В­ docs/2_02_UX_MECHANICS.md iС›РєР­1~С’РЁiС›РєР­1~С’РЁ          РѓВ¤          СљвЂў=f{С™U>РњРћвЂЎРЇeРѕС†kРґQ docs/2_03_TECH_STACK.md   iС›РєР­1вЂє6Р¤iС›РєР­1вЂє6Р¤          РѓВ¤          jP;~С™H@РҐСџРЎ}СЉ>РҐ&AAV docs/2_04_ROADMAP.md      iС›РєР­1вЂє6Р¤iС›РєР­1вЂє6Р¤          РѓВ¤          EвЂћТ‘jР·VР›РІРєР—Р„DССЌС–"b #docs/LLM_CONFIG_GENERATOR_PROMPT.md       iС›РєР­1вЂє6Р¤iС›РєР­1вЂє6Р¤          РѓВ¤          С›4>В¦Рљ,В вЂвЂўР‚РЋ

Рѓ4вЂўtJРЎ  docs/LLM_DRIVER_MAPPER_PROMPT.md  iС›РєР­1в„–Р—piС›РєР­1в„–Р—p          РѓВ¤          вЂ™!С–Р—вЂњD~вЂ“С‘Рћ_Р™РЄвЂ“РјСЂ$@С› "docs/LLM_THEME_GENERATOR_PROMPT.md        iС›РєР­1в„–Р—piС›РєР­1РЁVР°          РѓВ¤          fk\вЂЎ@В­РђSС„Р«Р‘tСЏPС– docs/PROJECT_REGISTRY.md  iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          
РµРіВ§РЎР™Р в„–в‚¬|=В©РЉ *В©Р™С™С‹В« docs/README.md    iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          KР©Р–СЋР‚]РЁY
Рzkв‚¬Р‚РЎРёРЃv[вЂўР– 
index.html        iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          klТђ6`вЂЎ}РћР‹@С‰В°#РЇвЂ“Р•= 	index.tsx iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          (вЂРќС†0В«jzР¦#
вЂ°СЋ9^С„7С…СЂСЏ 
metadata.json     iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          вЂ”F"Р«PР€6Сћ^РѕС”GsСљВ»%.DС“ node_modules/.bin/nanoid  iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          FСљ@|eFPТђСњР¬Р Т‘a node_modules/.bin/nanoid.cmd      iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          EРЁВ¤Р§В­!Р©-В®(
&В®Р‚ССџР¦Р°Vk node_modules/.bin/nanoid.ps1      iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          вЂњРђCР›В 	С‘СЂjРќ
eС‹$вЂ”a>aСѓ node_modules/.bin/resolve iС›РєР­1РЁVР°iС›РєР­1РЁVР°          РѓВ¤          D|@:`вЂ¦В«РѓС‹В¬$вЂ¦РЅВРђвЂ“ node_modules/.bin/resolve.cmd     iС›РєР­2MР„liС›РєР­2MР„l          РѓВ¤          =С‚+-1~С„O`iСЌР‡6\)СЌВµ"'5 node_modules/.bin/resolve.ps1     iС›РєР­2MР„liС›РєР­2MР„l          РѓВ¤          в„ўв„ўРЏР‘dРџР‰С™U]Р“dР•В¦вЂ° node_modules/.bin/rollup  iС›РєР­2MР„liС›РєР­2mР“Сљ          РѓВ¤          GС–СЃС–РіEР·СЋoСЋ)?Рґ|РђbВ®Рњ& node_modules/.bin/rollup.cmd      iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          IС†WР§&С™m;$РҐР‘С‡\m$Р±С‰РЃ node_modules/.bin/rollup.ps1      iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          вЂўвЂ”Р•2yС„<@вЂвЂўВ±(JTР§vY node_modules/.bin/semver  iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          Eв„ўСЉСњВ¬РќРњР
(РђРџ"7В· node_modules/.bin/semver.cmd      iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          A1GВ­H(С”(fР—]Q)/РќTpp node_modules/.bin/semver.ps1      iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          вЂњlXСћРґMС“вЂ№В©Р… СЉР®вЂ“VВ­NС‚С„!Р‰ node_modules/.bin/sucrase iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          СњС‹;В¶Р’QС‡Т‘'6Р€Р…вЂ™Р—РЇС‰.* node_modules/.bin/sucrase-node    iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          IsСѓВ«	вЂљ#H]РµР®РўВ РЅвЂ“С•DСѓСa "node_modules/.bin/sucrase-node.cmd        iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          QС›Рђg+С—Р±РҐ9СљС™{ R	sigРЃy "node_modules/.bin/sucrase-node.ps1        iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          D<РЁвЂ™вЂ№РёРњРЃРҐТ‘Z#вЂЎ]#Р±СЋСЊвЂњР› node_modules/.bin/sucrase.cmd     iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          =f{С‘@Р‹вЂ™СЋР—)Р­jMВ¶_РЄpР”sС† node_modules/.bin/sucrase.ps1     iС›РєР­2mР“СљiС›РєР­2mР“Сљ          РѓВ¤          в„ўРґuРЈ.В«`Р‰В§ВµMAРґР·вЂ 	Р„вЂ¦XС‡ node_modules/.bin/tailwind        iС›РєР­2С„sLiС›РєР­2С„sL          РѓВ¤          G3РѓvРЃРљРЄРґС‡Р¶В®$0YвЂ”вЂ™rВ° node_modules/.bin/tailwind.cmd    iС›РєР­2С„sLiС›РєР­3Рё          РѓВ¤          I]`С•СЉIвЂ№РјВ·\СЂ#MР‹Р°BВ¤Рџ?Р· node_modules/.bin/tailwind.ps1    iС›РєР­3РёiС›РєР­3Рё          РѓВ¤          в„ўРґuРЈ.В«`Р‰В§ВµMAРґР·вЂ 	Р„вЂ¦XС‡ node_modules/.bin/tailwindcss     iС›РєР­3РёiС›РєР­3Рё          РѓВ¤          G3РѓvРЃРљРЄРґС‡Р¶В®$0YвЂ”вЂ™rВ° !node_modules/.bin/tailwindcss.cmd iС›РєР­3РёiС›РєР­3Рё          РѓВ¤          I]`С•СЉIвЂ№РјВ·\СЂ#MР‹Р°BВ¤Рџ?Р· !node_modules/.bin/tailwindcss.ps1 iС›РєР­31С’СљiС›РєР­31С’Сљ          РѓВ¤          вЂР”вЂ KС™"Сњ99вЂ¦В»В«Рі5MР…В С•?В node_modules/.bin/tsc     iС›РєР­31С’СљiС›РєР­31С’Сљ          РѓВ¤          C@С—вЂћUL1V1BРЇС—вЂ=^-СњРЇ,D node_modules/.bin/tsc.cmd iС›РєР­31С’СљiС›РєР­3PРЃ          РѓВ¤          9$ВµвЂћnС•fРЏoXРєР°РЁ;oР±СЋ node_modules/.bin/tsc.ps1 iС›РєР­3PРЃiС›РєР­3PРЃ          РѓВ¤          вЂєlРћ=HKВ¤Рі"GGР…:С—В вЂ”РЏ~O node_modules/.bin/tsserver        iС›РєР­3_yXiС›РєР­3_yX          РѓВ¤          HWС€QСЌJР­[  В¶В¬С‘В¤Р”В© node_modules/.bin/tsserver.cmd    iС›РєР­3_yXiС›РєР­3_yX          РѓВ¤          M$СџA}'РІ|E>РЎ^С†
СЏР‚Рѓ node_modules/.bin/tsserver.ps1    iС›РєР­3_yXiС›РєР­3_yX          РѓВ¤          В§РњРЅcР”oВ­xвЂЎРјs/С’XВ©
С‡Т‘Xtf (node_modules/.bin/update-browserslist-db  iС›РєР­3~	С’iС›РєР­3~	С’          РѓВ¤          N.С’_С–РЈВ©t/F:СЊвЂњ&В¤В± ( ,node_modules/.bin/update-browserslist-db.cmd      iС›РєР­3~	С’iС›РєР­3~	С’          РѓВ¤          ezР…С‚mВ¬С…С–_Р›Р‡7TР…:СЋ^:4 ,node_modules/.bin/update-browserslist-db.ps1      iС›РєР­3~	С’iС›РєР­3~	С’          РѓВ¤          РЊDcС‰bС‰Р«РЄd,Р¬Р“:kС—Р“Рњв„–Сћ node_modules/.bin/vite    iС›РєР­3СљС™С’iС›РєР­3СљС™С’          РѓВ¤          AС†.вЂ“mРљвЂєВ­[РЉС•LвЂ№FСљР•xС‡ node_modules/.bin/vite.cmd        iС›РєР­3СљС™С’iС›РєР­3СљС™С’          РѓВ¤          1В§uвЂєРџ.?Рќ85РЇ|1вЂ№*СЋ7С—В¬ node_modules/.bin/vite.ps1        iС›РєР­3В»,XiС›РєР­3В»,X          РѓВ¤         ^
С“СћС•Рѕl^вЂQRРєРВ»\Т‘GH node_modules/.package-lock.json   iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤         С—СС™Сњ]вЂ№8!-NqвЂ¦FвЂќСћР•*РњТ‘РґO package-lock.json iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤          В§:Р€вЂВ°Ad[7Р¤вЂњСЉР™СЂKСЃ'вЂњвЂєK
 package.json      iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤           Р›вЂњ(С‘С‘kOвЂ№&Вµ#вЂ =СЋkВ·iNSвЂє php_backend/.gitignore    iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤          kAР‘В¶bTkС„С‘ixвЂ№СЊ#Р‚вЂєСЊx php_backend/.htaccess     iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤           ^_lТ‘LSРЊ,HВ«Р—hС”kР®С‘Р†Р”1 php_backend/QmsGateway.php        iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤          OвЂЎВ¶xРњВ»Рљ9EС•Р‹С†Р®С„?Р§2[Р” php_backend/api.php       iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤          
С–РЎвЂ“HВQt
РђРЏAР©hdrРЊ)PРѕР¶ php_backend/check_setup.php       iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤          вЂћРЊР¬РЅ~В·В¤С›q|Dв„–SРё_РќР•вЂ РЊ php_backend/config.php    iС›РєР­3Р©В»diС›РєР­3Р©В»d          РѓВ¤          вЂ РЎРҐРЅР¬DNРЋРЊС—ВРµР©вЂєРЅ<3вЂЎdРџ %php_backend/config_access.example.php     iС›РєР­4NiС›РєР­4N          РѓВ¤          
GВ©Р‘В±СЂР°Р‹;EР™В¬RвЂўzвЂЎР”РљВ©С… .php_backend/config_parts/01_infrastructure.php    iС›РєР­4NiС›РєР­4N          РѓВ¤          	вЂ№]СЏQKnСѓР”вЂ”В¤W \ТђРґР•^вЂ№Р‰ (php_backend/config_parts/02_topology.php  iС›РєР­4NiС›РєР­4N          РѓВ¤          В РѓiСЋС†Рј^0вЂ“В¶:YвЂє%lW}ВµС‰ %php_backend/config_parts/03_logic.php     iС›РєР­4С“Р„вЂћiС›РєР­4С“Р„вЂћ          РѓВ¤          В  Р‹РєRС—1SРќ:В°вЂЎР¦Р–вЂўРќР†q9h %php_backend/config_parts/04_theme.php     iС›РєР­4С“Р„вЂћiС›РєР­4С“Р„вЂћ          РѓВ¤          *_A[zТђС‡С‚С‚Р•[Р’0ВµВ¤Ic=k *php_backend/config_parts/05_compliance.php        iС›РєР­4С“Р„вЂћiС›РєР­4С“Р„вЂћ          РѓВ¤           @vQРїU2Р‰ВРјР‘hРЄiСџР”Р¤#СњР„ 'php_backend/config_parts/99_helpers.php   iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          Рќв‚¬РЇUР—)СЊHР€QВ§5вЂћР»*hС“w -php_backend/controllers/BookingController.php     iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          6Р‘7|}В­3С›СњРѓiСЊYР¤РЁВ oРЃР· ,php_backend/controllers/SearchController.php      iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          С€вЂљРёСЂР•С—Р†ТђРѕDВ©С‡?СЏ9` php_backend/core/Cache.php        iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          	Р©
В§vb+РЃР”В·1СЌNРґ$]-?вЂ° php_backend/core/Logger.php       iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          	,tС“&EРѕBС‡U@Р…{С€Р„Р№Р„TJ  php_backend/core/RateLimiter.php  iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          С–В¬[fР°вЂў`A3в„ўС’СЉ'tВvВ±Рґ php_backend/core/Router.php       iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          ?РЋРѓ
h!С’РџвЂ№yzJСЊР»Рњ.вЂ¦В¶Рј &php_backend/data/doctors_registry.json    iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          .РЄСЏС‘СЏВ°5&В«Р¶С™вЂєРҐ#Рѕ php_backend/debug_doctors.php     iС›РєР­4РђРЁВ iС›РєР­4РђРЁВ           РѓВ¤          Р‘С†В­Р·РµРів„ў3gРіIвЂ“СЉDРЏ vFS php_backend/debug_search.php      iС›РєР­5AG$iС›РєР­5AG$          РѓВ¤          "в„ўВ tС‘@С—Р…В®Р y>cРЏРЈ
 z$РїСџ php_backend/dev_api_test.php      iС›РєР­5AG$iС›РєР­5AG$          РѓВ¤          @5Р®r9pС‘jРЋGСџrВ¤С“HС“nР )вЂњР‡ php_backend/dev_cms_sync.php      iС›РєР­5AG$iС›РєР­5_PСЊ          РѓВ¤          
СЊrBHРёV4С™С’Р—L`dР›"Р›Р·C php_backend/dev_dashboard.php     iС›РєР­5_PСЊiС›РєР­5_PСЊ          РѓВ¤          7	вЂќ!o!в„ўnС“СЂtВ§kgРњР©вЂњd:В¶ "php_backend/drivers/BaseDriver.php        iС›РєР­5_PСЊiС›РєР­5_PСЊ          РѓВ¤          С†вЂў/
"YCРљС’СЏС%KРњР¶UР…aВ¤2 "php_backend/drivers/OneCDriver.php        iС›РєР­5}РІР”iС›РєР­5}РІР”          РѓВ¤          :HР¤-С‘Р Р‚РџР­7rС‚IСЋР•!IВ¬С„ !php_backend/drivers/QmsDriver.php iС›РєР­5СљqР iС›РєР­5СљqР           РѓВ¤          СЏРҐ!}Р‚T)ZР†Р‹В«В ~Сњ Р·вЂ”wРё 'php_backend/helpers/DoctorFormatter.php   iС›РєР­5СљqР iС›РєР­5СљqР           РѓВ¤          .EР«СЋZРґСћMР‚вЂњ!Рї:Рё<HС„Р®Р•Р» php_backend/index.php     iС›РєР­5В» xiС›РєР­5В» x          РѓВ¤          Р’С‚РќСЉР‚$РЋР‚nВ¦)|Р•Р„tСЋ1XmСњ 'php_backend/interfaces/MisInterface.php   iС›РєР­5В» xiС›РєР­5В» x          РѓВ¤          &вЂЎР·В©TвЂ вЂўnGвЂњRLвЂ“вЂљ_Рџf@ php_backend/qms_debug.php iС›РєР­5Р©Р‹СiС›РєР­5Р©Р‹С          РѓВ¤          bС„JВ©IРїС…77В 9РѓhmРџР¶(В§В° )php_backend/services/AsyncHttpService.php iС›РєР­5Р©Р‹СiС›РєР­5Р©Р‹С          РѓВ¤           Р‚С‹AВµВ®СЏР—!В¤LkС‘РЋР°В¶Рє0 %php_backend/services/OpenAiClient.php     iС›РєР­5Р©Р‹СiС›РєР­5С€Р          РѓВ¤          РҐР“Р™СљР€?РєС‹С‚РўdU:РІkР“РЇвЂ”us )php_backend/services/RecaptchaService.php iС›РєР­5С€РiС›РєР­5С€Р          РѓВ¤           С‰UСЉ>ВвЂ”|Р‰1вЂњСЂвЂ¦WР†lвЂўH &php_backend/services/VectorService.php    iС›РєР­5С€РiС›РєР­5С€Р          РѓВ¤          
Р¦9В»РќeРњР¦С†$в„–Р§Р®.iРѓgZL php_backend/setup_db.php  iС›РєР­5С€РiС›РєР­5С€Р          РѓВ¤          MРЎC*Р•|?СЌВ«lР›С“*Z`dY*РЏРЊ !php_backend/setup_qms_mapping.sql iС›РєР­5С€РiС›РєР­5С€Р          РѓВ¤          РЈС“Р†Z Р‡РєGk^
РЁZPUС–В±  php_backend/supabase_setup.sql    iС›РєР­61В» iС›РєР­61В»           РѓВ¤          
Т‘С_РёРЇР‘С–вЂЎ{N5С–Р±В Р±aВ Р’ php_backend/tools/README.md       iС›РєР­61В» iС›РєР­61В»           РѓВ¤          СѓвЂєв„ўВ·РµjCС‡WвЂє^
sСЌРР« #php_backend/tools/fix_structure.php       iС›РєР­6R2С‘iС›РєР­6R2С‘          РѓВ¤          %РС‚СРґРіС†zС‡m:Р«j|вЂњvРљ`В¦Р›вЂРЁ +php_backend/tools/generate_requirements.php       iС›РєР­6R2С‘iС›РєР­6pР–          РѓВ¤          N6vвЂћzВ§В°
'O
IР­Р«вЂ™i&dС…_K php_backend/tools/sync_tool.php   iС›РєР­6pР–iС›РєР­6pР–          РѓВ¤          ~ССњРҐ-РЁ10РЇСЋР“GРћСЋ?в„ўСЏС‘С† &php_backend/tools/wizard/generator.php    iС›РєР­6РЏX<iС›РєР­6РЏX<          РѓВ¤          g^РЉ}вЂ“ТђKСЋ]СЌСњ6РґСѓР‚JРЃРЁ|С— #php_backend/tools/wizard/index.html       iС›РєР­6РЏX<iС›РєР­6В­Р№В           РѓВ¤          8/Bh]вЂќEРґвЂ™РќР¦UcFвЂ¦С… "php_backend/tools/wizard/reset.php        iС›РєР­6В­Р№В iС›РєР­6В­Р№В           РѓВ¤          dРЁIРґВNТђРЇs	IР‚вЂ°FСћyР„Р±Рё !php_backend/tools/wizard/save.php iС›РєР­6РҐpР”iС›РєР­6РҐpР”          РѓВ¤          Р№СЋС™С— С–jР•WСљР“Р­РівЂ“ВIР»+A &php_backend/tools/wizard/scan_site.php    iС›РєР­6С„(iС›РєР­6С„(          РѓВ¤          В®СљZ9Р•YвЂњР«Р€Р®2jР—+Р¤РјРЇ
Р±вЂ” 3php_backend/tools/wordpress_integration_snippet.php       iС›РєР­6С„(iС›РєР­6С„(          РѓВ¤          dР›РѕВ»Р·^вЂ”Р…i
2В­РћР—С‚V?Р¦С•С– php_backend/troubleshoot.php      iС›РєР­7С–Р°iС›РєР­7С–Р°          РѓВ¤          Р«`OРЏJВ¶9РЎР¤RpТђв„–С…Р¬%вЂ”} php_backend/whoami.php    iС›РєР­7С–Р°iС›РєР­7С–Р°          РѓВ¤           TР№С›С, Рњ7Р®LРїРѕ+С‚Р€2В«В·=РЊ postcss.config.js iС›РєР­7:G8iС›РєР­7:G8          РѓВ¤          7YвЂ”Рђ33В«Р…В»РџВ¦С•iiВ·xР‰M( public/manifest.json      iС›РєР­7XР¬вЂћiС›РєР­7XР¬вЂћ          РѓВ¤          Р„Р¤Рµ.В®В¬Р SСЂРЊС›РµР¬С“gTСњРЈвЂўР services/api.ts   iС›РєР­7t
С‘iС›РєР­7t
С‘          РѓВ¤            Р¶СњРІвЂєР†РЎР¦CKвЂ№)В®wZРЁР’РґРЉSвЂ services/mockQmsApi.ts    iС›РєР­7t
С‘iС›РєР­7t
С‘          РѓВ¤          РјРљС‡){вЂ вЂћРџвЂєFnВ§oB С’omKF src/App.tsx       iС›РєР­7t
С‘iС›РєР­7t
С‘          РѓВ¤          eС‘РќвЂћС“%СС†Р…вЂ”lРЃРњТђР„7Р»8z!Рµ src/Presentation.tsx      iС›РєР­7В°~РґiС›РєР­7В°~Рґ          РѓВ¤          РЊDMР‘Рћ~Р–ВµР­Рў^ghxРЅР®Р–РЎР”СћС› &src/components/ArchitecturePreview.tsx    iС›РєР­7РђР <iС›РєР­7Р '0          РѓВ¤          	nСџ?;Р…вЂ1вЂ”РЁ&&Р№ s<Р¬McM  src/components/ErrorBoundary.tsx  iС›РєР­7Р '0iС›РєР­7Р '0          РѓВ¤          -wzРВ¤lUС™вЂЎSalвЂ°Р KS)B src/components/WizardLayout.tsx   iС›РєР­7Р°jiС›РєР­7Р°j          РѓВ¤          вЂ РіrZР„?tвЂ¦В¤3С’Р”Р‹РіPР«Р©РЃР ~ $src/components/admin/AdminLayout.tsx      iС›РєР­7РїВ»С’iС›РєР­7РїВ»С’          РѓВ¤          В®SyВ·РєxРђd^7:gР№(РЏР•РЈ  )src/components/modules/BranchSwitcher.tsx iС›РєР­8
<iС›РєР­8
<          РѓВ¤          РіrвЂ™Р¶GРЏwВ°С…С‘ВuРСЏВ°	вЂљ6 ,src/components/modules/DimensionSelector.tsx      iС›РєР­8
<iС›РєР­8СћР°          РѓВ¤          Вz.}pв„–EРїВ°Р§ZР±в„ўвЂ С‡s]yР№В® %src/components/modules/DoctorCard.tsx     iС›РєР­8+РЄвЂќiС›РєР­8+РЄвЂќ          РѓВ¤           hВ§В«'nР¬5gвЂЎ~GС‡Р¤Р‚С—РЏ>Сџ, )src/components/modules/DoctorChatCard.tsx iС›РєР­8+РЄвЂќiС›РєР­8+РЄвЂќ          РѓВ¤          С…РЃС–HвЂљРђР±В®С‚PРѓРєРљ@Р¶СЉВ¦,В·Р‘ .src/components/modules/DoctorProfileHeader.tsx    iС›РєР­8>HРЉiС›РєР­8MвЂ“           РѓВ¤          ysСЋAвЂ вЂЎР¦Рђ|РµС•3Р†СЊВ¶kzвЂЎ (src/components/presentation/Features.tsx  iС›РєР­8MвЂ“ iС›РєР­8MвЂ“           РѓВ¤          вЂљUС‡k]Р†вЂЎ[вЂќРўXXС•В¦Y-В¶Р &src/components/presentation/Footer.tsx    iС›РєР­8]	СЊiС›РєР­8]	СЊ          РѓВ¤          1В¤|=_dСЋР“Р¶]РЁf=С’?PВ§РЇ, $src/components/presentation/Hero.tsx      iС›РєР­8l\В¤iС›РєР­8l\В¤          РѓВ¤          вЂћOР»Р‰Р‹Р№Сѓ~Р–С€ТђвЂ°вЂћР©РЃRВ» &src/components/presentation/Navbar.tsx    iС›РєР­8l\В¤iС›РєР­8l\В¤          РѓВ¤          %1РјРЁРј+Р‘Рџi<вЂћOРў~С™qHxР¶
 'src/components/presentation/Roadmap.tsx   iС›РєР­8{Рђ|iС›РєР­8{Рђ|          РѓВ¤           С•СњСЌPСЌС…SРѕТђ_РѕР›РћРјв„ўВ® src/components/steps/StepAI.tsx   iС›РєР­8С’54iС›РєР­8С’54          РѓВ¤          
С‘СњС‰вЂњВ±вЂ°^`вЂњР–dq`.С‰РўС‰ %src/components/steps/StepBranches.tsx     iС›РєР­8С›VРiС›РєР­8С›VР          РѓВ¤          	РЊСЋClBС‘]{`eР•СРѓР—Р»Рњ8uС
 'src/components/steps/StepDimensions.tsx   iС›РєР­8С›VРiС›РєР­8В°СЋС’          РѓВ¤          GuСЉР’РcyEР­IР™В«!в„ўР«vyRС’ $src/components/steps/StepDoctors.tsx      iС›РєР­8Р‘С…$iС›РєР­8Р‘С…$          РѓВ¤          A|#QSС‘eР±NsС›_Р€Р±5Р±В°iz !src/components/steps/StepForm.tsx iС›РєР­8РЁвЂќ(iС›РєР­8РЁвЂќ(          РѓВ¤          +1 РіDС—вЂ°S*вЂљР№вЂўСЃС†СЂвЂћРќвЂќMВ« !src/components/steps/StepHome.tsx iС›РєР­8РЁвЂќ(iС›РєР­8РЁвЂќ(          РѓВ¤          6~РЎ*hРєР™ВZaСЏС“Р’HuвЂњРвЂ™ВС† (src/components/steps/StepPatientType.tsx  iС›РєР­8Р·СЌiС›РєР­8Р·СЌ          РѓВ¤          0ImIР¬С[ )РІ8	СњВ§hВ»СЏВ±Р” "src/components/steps/StepSlots.tsx        iС›РєР­8Р·СЌiС›РєР­8С‡С„0          РѓВ¤          YР™OРёСЌС’С—5aВС“Р¬>$в„–<Рѓ_X| $src/components/steps/StepSuccess.tsx      iС›РєР­8С‡С„0iС›РєР­8С‡С„0          РѓВ¤          2РћС‘dВ­LС‘РЇС‹РЎвЂ№aРќР™С‰Рјs src/components/ui/Button.tsx      iС›РєР­9
Р‘piС›РєР­9
Р‘p          РѓВ¤          РЊР«Р™С‚РњР»tsС†BРє
вЂєС•&!вЂ¦3 src/components/ui/Card.tsx        iС›РєР­9
Р‘piС›РєР­9
Р‘p          РѓВ¤          РЄРµРµРўР¬.Сџ+Р®~"С…zg:Р—В·1вЂў src/components/ui/Skeleton.tsx    iС›РєР­9в„–Р¤iС›РєР­9в„–Р¤          РѓВ¤          Т‘O+С–s(lвЂќР”С•С…вЂўZ
`0В­ src/config/schema.ts      iС›РєР­93РѓР‚iС›РєР­93РѓР‚          РѓВ¤          РёвЂ HвЂ°Р’5RР‘СћРџРўВ©С„в‚¬СЃРЋEС†Р”  src/config/theme.ts       iС›РєР­9IРЉiС›РєР­9IРЉ          РѓВ¤          С‚Р‡`вЂћРЉР€zвЂўвЂ№ZВ вЂќt<A*СЉ` src/declarations.d.ts     iС›РєР­9XСћС€iС›РєР­9XСћС€          РѓВ¤          	Р­СЊСЉ)РєСњР¦BР‰Р±С$)РЏYР®a src/hooks/useDoctors.ts   iС›РєР­9hВ°iС›РєР­9hВ°          РѓВ¤          В­РЏz,вЂ°вЂ№РёвЂ”WAР«%2Вµ"s3вЂ Р•В« src/hooks/usePhoneMask.ts iС›РєР­9hВ°iС›РєР­9hВ°          РѓВ¤          Р•С‡С@С—В©`AiZ+В¬вЂЎ
Р†uВ  src/hooks/useRecaptcha.ts iС›РєР­9|В«0iС›РєР­9|В«0          РѓВ¤          	в„ўР’РЈРѕРїtKР¤вЂ™FР¦+РС…w	(Р©
 src/hooks/useSmartSearch.ts       iС›РєР­9вЂ№СЌtiС›РєР­9вЂ№СЌt          РѓВ¤          В¶РҐвЂ”вЂћTРЅР•В®<#РЈ"vСЏвЂќРґвЂєpвЂљ 
src/index.css     iС›РєР­9вЂ№СЌtiС›РєР­9С›/D          РѓВ¤          вЂєСЏ)mР™В "*("ТђР”В°4Р‰Р†wСЏР­ 
src/index.tsx     iС›РєР­9С›/DiС›РєР­9С›/D          РѓВ¤          G4~В§	;С‚]'РЏССѓР­Mm[вЂ”*РёвЂєС› src/services/analytics.ts iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          РЇРЄAHjР Р¤Р·ТђYSuРґmР“7Р
_ src/services/api.ts       iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          CznР»rxС™В§Рё~РЄm_С‡вЂЎ]IW src/services/session.ts   iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          #^Рє:hD#РќР­A)С†1РЏРҐвЂЎР‹ src/store/bookingStore.ts iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          СњС†Jв‚¬"С‹С“\вЂР¬В°РљРЃ"С†В©Р‘Р»\Р‡ src/types.ts      iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          )v1oHРЏСЏFhС…в‚¬вЂ\Р†iР‡РЉ
Рѓ src/utils/uiHelpers.tsx   iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          w"С–IN+}CyQWвЂў!lР†РЋвЂС… tailwind.config.js        iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          OokСћС’Р·вЂў?zС“РґРЉРЇР€РҐРј-Р€СЊ 
tsconfig.json     iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤          >	Р…7 Р„СџР’>Р‰Рё$TyР® types.ts  iС›РєР­9В±mpiС›РєР­9В±mp          РѓВ¤            Р¶СњРІвЂєР†РЎР¦CKвЂ№)В®wZРЁР’РґРЉSвЂ untitled.tsx      iС›РєР­:0JdiС›РєР­:0Jd          РѓВ¤          РҐ;РЁ.PР“JNРё|iСљ=Р‰Р°РљВ°Р”СРџ vite.config.ts    TREE  \ 198 10
SС”С‘СЋpР—kСЏBРћР‹вЂ“g!В¤Сџ.MСЃsrc 43 6
YРњв„ўQВ±Р®R0 вЂ™вЂ°Dв‚¬С‚С–РёСЌhooks 4 0
Р•OР¬РЅРµBРѓР¬СЉ\aРЇVCDС‘L{Bstore 1 0
;Р°вЂќ;[Р…ZYС†вЂ”Р†wJ8hutils 1 0
РЊСЏРЉР‡С…0yGС›!{СЂВ¦pВ«вЂyconfig 2 0
sР„Р‚Р§РўСЃ"вЂњТђDС‚Р xРҐСЋВ¤[&services 3 0
Рё	вЂ”РЁCZnСЌР§GВµxA1Р‹Р†Fcomponents 26 5
6	Р°Р®*РЎHZРґ4вЂћoСћn|С†ui 3 0
&#В¬С‚С“'3Р™вЂ“Р‚ВµH СЊ6#n}Р®admin 1 0
`С›`XРљВ¬sРќРјСљР¬cРє)В©РҐР‚Р·steps 9 0
j+вЂЎi4РЁ8В°3В±В°2РЁв„ў*C{Сњ}С›modules 5 0
Рm9B {РµVРњвЂљ1РЋUР—РЄР‰/presentation 5 0
GР‹k%Р…n5mСљРЉmSС’РњР dist 6 1
r[Р¶;=вЂ”RРћР№rВ°Р‹Р вЂћР¬В©assets 4 0
РЁ3РЃU5yСЃРЅР›В¬В­РѕС—CSINdocs 31 0
В¬Р†kР©5РвЂ¦^Jв‚¬Р‘Р›cР«m|OР­.vite 2 1
В®#С„СР­xв„ўuВ­вЂ“В¤в„–С‚С•FР‚Р«VwРЊdeps 2 0
С‹С“Рµ_РЎ@vРЋР¤A/LyС…в„–РР†public 1 0
вЂ”R-)HС„СљР¶
rhP`Р»В®Uservices 2 0
B8С“Рґ_РїР®7РђвЂќgС“ТђР¦РґСџ*С‹3benchmarks 6 0
РљРЋ$Р•РўВ РјA+rС„s
TР°components 1 0
]3Р†Р™РҐsOРЃkРҐСЃСѓnСР¦*в„ўРѓpphp_backend 51 9
Р†ВРњТђ@%РїРЇС†РµXСЉВ®cfРЎС”С—Р»вЂўcore 4 0
Р™вЂўР‰;ВµР›TВ±вЂ¦|,Р©UР›вЂ Р№РґС™data 1 0
В­РҐZВ»V=В¶&:РЎFlСЋ@xС…5Ygtools 10 1
С†Рє,FР©РѓР№zbР†Р­В¦В¶В©РќвЂєmР–!wizard 5 0
вЂўвЂ¦Р‘Р‡mС‘Wy@oвЂњ(Р‘РЎ[ujdrivers 3 0
RM^вЂ |В¶С”Р”%РЁвЂ”вЂ°СџР“Р¬FвЂ”helpers 1 0
Вµi	Р•В¦xвЂўСq98fР‡В»С„*РЉвЂљвЂєРѓservices 4 0
Р°Р¤РЎРёВ»Р¬В hРЈвЂ“С€=1vС—"iinterfaces 1 0
СЉВ¦Р‚РўР fYt:РҐВ»С‰В°РЄРћСЊвЂєcontrollers 2 0
gРѓrDВ°Р‚С‰l]С›Р·РќР‚РЉРёвЂќВ©Т‘РЊconfig_parts 6 0
СљСЌ1z)РІв„ўР¤РљEС†РЇС•|РџС’n>Р№РЅnode_modules 37 1
Р®В©Р‡HWihРҐР·gСЃX1@.bin 36 0
вЂ”вЂ”]MР—В  СЉ@XвЂС‡Y)(Р†В¶aС…РЋ;&WРџ*jВ·РЇРЋk9eРёbВK


===== FILE: C:\git\apl\med\.git\packed-refs =====

# pack-refs with: peeled fully-peeled sorted 
f393b1c3064ab3fc45344c66ca017d0cb08b597f refs/remotes/origin/main



===== FILE: C:\git\apl\med\.gitignore =====

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Р вЂ™Р Р…Р С‘Р СР В°Р Р…Р С‘Р Вµ: Р СљРЎвЂ№ РЎРѓР С—Р ВµРЎвЂ Р С‘Р В°Р В»РЎРЉР Р…Р С• Р СњР вЂў Р С‘Р С–Р Р…Р С•РЎР‚Р С‘РЎР‚РЎС“Р ВµР С Р С—Р В°Р С—Р С”РЎС“ /dist, 
# РЎвЂљР В°Р С” Р С”Р В°Р С” Р В±РЎС“Р Т‘Р ВµР С Р С‘РЎРѓР С—Р С•Р В»РЎРЉР В·Р С•Р Р†Р В°РЎвЂљРЎРЉ Р ВµРЎвЂ Р Т‘Р В»РЎРЏ Р Т‘Р ВµР С—Р В»Р С•РЎРЏ Р Р…Р В° РЎвЂ¦Р С•РЎРѓРЎвЂљР С‘Р Р…Р С– Р В±Р ВµР В· Node.js
# /dist



===== FILE: C:\git\apl\med\.vite\deps\_metadata.json =====

{
  "hash": "022e0c58",
  "configHash": "0e0b03b7",
  "lockfileHash": "e3b0c442",
  "browserHash": "f2e2c1ee",
  "optimized": {},
  "chunks": {}
}


===== FILE: C:\git\apl\med\.vite\deps\package.json =====

{
  "type": "module"
}



===== FILE:


===== FILE: C:\git\apl\med\App.tsx =====

import React, { useState, useEffect } from 'react';
import { Doctor, City, BookingDraft, ServiceCategory, PatientType, TimeSlot, Branch } from './types';
import { apiService } from './services/api';
import { 
  MapPin, Stethoscope, Calendar, Search, 
  ChevronLeft, Check, User, Baby, Activity, 
  Smile, Pill, ArrowRight, Clock, Phone, Mail, UserCircle 
} from 'lucide-react';

// --- CONSTANTS ---
const CATEGORIES: {id: ServiceCategory, label: string, icon: any, color: string}[] = [
  { id: 'consultation', label: 'РљРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ РІ РєР»РёРЅРёРєРµ', icon: User, color: 'bg-green-100 text-green-700' },
  { id: 'diagnostics', label: 'Р”РёР°РіРЅРѕСЃС‚РёРєР°', icon: Activity, color: 'bg-blue-100 text-blue-700' },
  { id: 'cosmetology', label: 'РљРѕСЃРјРµС‚РѕР»РѕРіРёСЏ', icon: Smile, color: 'bg-pink-100 text-pink-700' },
  { id: 'stomatology', label: 'РЎС‚РѕРјР°С‚РѕР»РѕРіРёСЏ', icon: Pill, color: 'bg-teal-100 text-teal-700' },
];

const CHEL_BRANCHES: Branch[] = [
  { id: 'chel_main', name: 'Р¦РµРЅС‚СЂР°Р»СЊРЅР°СЏ РєР»РёРЅРёРєР°', city: City.CHEL, address: 'СѓР». Р›РµРЅРёРЅР°, 10', databaseId: 'DB_CHEL_MAIN' },
  { id: 'chel_north', name: 'Р¤РёР»РёР°Р» РЎРµРІРµСЂРЅС‹Р№', city: City.CHEL, address: 'СѓР». РњРёСЂР°, 45', databaseId: 'DB_CHEL_MAIN' },
  { id: 'chel_special', name: 'РћР±РѕСЃРѕР±Р»РµРЅРЅРѕРµ РїРѕРґСЂР°Р·РґРµР»РµРЅРёРµ', city: City.CHEL, address: 'СѓР». РўСЂСѓРґР°, 100', databaseId: 'DB_CHEL_EXTRA' },
];

export default function App() {
  // --- STATE ---
  const [draft, setDraft] = useState<BookingDraft>({
    step: 0,
    city: City.CHEL, // Default to Chel based on request context
    category: null,
    patientType: null,
    searchQuery: '',
    selectedBranch: null,
    selectedDoctor: null,
    selectedSlot: null,
    patientData: { firstName: '', lastName: '', middleName: '', phone: '', birthDate: '', email: '' }
  });

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // --- ACTIONS ---

  const nextStep = () => setDraft(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setDraft(prev => ({ ...prev, step: Math.max(0, prev.step - 1) }));

  const selectCategory = (category: ServiceCategory) => {
    setDraft(prev => ({ ...prev, category, step: 1 }));
  };

  const selectPatientType = (type: PatientType) => {
    // Р•СЃР»Рё Р§РµР»СЏР±РёРЅСЃРє - РёРґРµРј РІС‹Р±РёСЂР°С‚СЊ С„РёР»РёР°Р» (С€Р°Рі 2), РµСЃР»Рё РЎРџР‘ - СЃСЂР°Р·Сѓ Рє РІСЂР°С‡Р°Рј (С€Р°Рі 3)
    const nextStepIdx = draft.city === City.CHEL ? 2 : 3;
    setDraft(prev => ({ ...prev, patientType: type, step: nextStepIdx }));
  };

  const selectBranch = (branch: Branch) => {
    setDraft(prev => ({ ...prev, selectedBranch: branch, step: 3 }));
  };

  const selectDoctor = (doctor: Doctor) => {
    setDraft(prev => ({ ...prev, selectedDoctor: doctor, step: 4 }));
    loadSlots(doctor);
  };

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const allDocs = await apiService.getDoctorsByCity(draft.city);
      // Filter Logic
      let filtered = allDocs;
      
      // Filter by Branch (Database) if selected
      if (draft.selectedBranch) {
        filtered = filtered.filter(d => d.databaseId === draft.selectedBranch?.databaseId);
      }
      
      // Filter by Patient Type (Mock logic as API doesn't return this yet)
      if (draft.patientType === 'child') {
        // Mock filtering for pediatricians
        // filtered = filtered.filter(d => d.isPediatrician);
      }

      setDoctors(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadSlots = async (doctor: Doctor) => {
    setLoading(true);
    try {
      // Mock date for now
      const today = new Date().toISOString().split('T')[0];
      const data = await apiService.getSlots(doctor, today);
      setSlots(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (draft.step === 3) {
      loadDoctors();
    }
  }, [draft.step]);

  // --- RENDERERS ---

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {draft.step > 0 && (
          <button onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <h2 className="text-xl font-bold text-slate-800">
          {draft.step === 0 && 'Р—Р°РїРёСЃСЊ РЅР° РїСЂРёРµРј'}
          {draft.step === 1 && 'РљС‚Рѕ РїРѕР№РґРµС‚ РЅР° РїСЂРёРµРј?'}
          {draft.step === 2 && 'Р’С‹Р±РµСЂРёС‚Рµ РєР»РёРЅРёРєСѓ'}
          {draft.step === 3 && 'Р’С‹Р±РµСЂРёС‚Рµ РІСЂР°С‡Р°'}
          {draft.step === 4 && 'Р’С‹Р±РµСЂРёС‚Рµ РІСЂРµРјСЏ'}
          {draft.step === 5 && 'Р’Р°С€Рё РґР°РЅРЅС‹Рµ'}
          {draft.step === 6 && 'Р“РѕС‚РѕРІРѕ!'}
        </h2>
      </div>
      
      {/* City Switcher only on home */}
      {draft.step === 0 && (
        <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-medium">
          <button 
            onClick={() => setDraft(prev => ({...prev, city: City.SPB}))}
            className={`px-3 py-1.5 rounded-md transition-all ${draft.city === City.SPB ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            РЎРџР±
          </button>
          <button 
            onClick={() => setDraft(prev => ({...prev, city: City.CHEL}))}
            className={`px-3 py-1.5 rounded-md transition-all ${draft.city === City.CHEL ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
          >
            Р§РµР»СЏР±РёРЅСЃРє
          </button>
        </div>
      )}
    </div>
  );

  // STEP 0: HOME
  const renderHome = () => (
    <div className="space-y-6">
      {/* Omnibox */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Р’СЂР°С‡, СѓСЃР»СѓРіР°, СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          value={draft.searchQuery}
          onChange={(e) => setDraft(p => ({...p, searchQuery: e.target.value}))}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            onClick={() => selectCategory(cat.id)}
            className="flex items-center p-6 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all group text-left"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${cat.color} group-hover:scale-110 transition-transform`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{cat.label}</h3>
              <p className="text-slate-400 text-sm mt-0.5">РџРµСЂРµР№С‚Рё Рє РІС‹Р±РѕСЂСѓ</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // STEP 1: PATIENT TYPE
  const renderPatientType = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button 
        onClick={() => selectPatientType('adult')}
        className="p-8 bg-white border-2 border-transparent hover:border-blue-500 rounded-2xl shadow-sm flex flex-col items-center gap-4 transition-all"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
           <User className="w-10 h-10" />
        </div>
        <span className="text-xl font-semibold text-slate-800">Р’Р·СЂРѕСЃР»С‹Р№</span>
      </button>
      
      <button 
        onClick={() => selectPatientType('child')}
        className="p-8 bg-white border-2 border-transparent hover:border-green-500 rounded-2xl shadow-sm flex flex-col items-center gap-4 transition-all"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600">
           <Baby className="w-10 h-10" />
        </div>
        <span className="text-xl font-semibold text-slate-800">Р РµР±РµРЅРѕРє</span>
      </button>
    </div>
  );

  // STEP 2: BRANCH (CHELYABINSK ONLY)
  const renderBranches = () => (
    <div className="space-y-3">
      {CHEL_BRANCHES.map(branch => (
        <button
          key={branch.id}
          onClick={() => selectBranch(branch)}
          className="w-full p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 flex items-center justify-between group transition-all"
        >
          <div className="text-left">
            <h3 className="font-bold text-slate-800">{branch.name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
              <MapPin className="w-4 h-4" /> {branch.address}
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
        </button>
      ))}
    </div>
  );

  // STEP 3: DOCTOR LIST
  const renderDoctors = () => (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-10"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div></div>
      ) : (
        doctors.map(doc => (
          <div key={doc.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4">
             <img src={doc.photoUrl} className="w-20 h-20 rounded-lg object-cover bg-slate-100" />
             <div className="flex-1">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold text-lg text-slate-800">{doc.name}</h3>
                   <p className="text-blue-600 text-sm font-medium">{doc.specialty}</p>
                 </div>
                 <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                   {doc.rating} в…
                 </span>
               </div>
               
               <div className="mt-3 flex items-center justify-between">
                 <div className="text-xs text-slate-500">
                    РЎС‚Р°Р¶ {doc.experienceYears} Р»РµС‚
                 </div>
                 <button 
                   onClick={() => selectDoctor(doc)}
                   className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                 >
                   Р’С‹Р±СЂР°С‚СЊ РІСЂРµРјСЏ
                 </button>
               </div>
             </div>
          </div>
        ))
      )}
    </div>
  );

  // STEP 4: TIME SLOTS
  const renderSlots = () => (
    <div>
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 flex items-center gap-4">
        <img src={draft.selectedDoctor?.photoUrl} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="font-bold text-slate-800">{draft.selectedDoctor?.name}</h3>
          <p className="text-sm text-slate-500">{draft.selectedDoctor?.specialty}</p>
        </div>
      </div>

      <h3 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4" /> Р”РѕСЃС‚СѓРїРЅРѕРµ РІСЂРµРјСЏ (СЃРµРіРѕРґРЅСЏ)
      </h3>
      
      {loading ? (
         <div className="text-center py-10 text-slate-400">Р—Р°РіСЂСѓР·РєР° СЂР°СЃРїРёСЃР°РЅРёСЏ...</div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {slots.map(slot => (
            <button
              key={slot.id}
              disabled={!slot.isAvailable}
              onClick={() => {
                setDraft(p => ({...p, selectedSlot: slot, step: 5}));
              }}
              className={`py-2 px-1 rounded-lg text-sm font-medium border ${
                slot.isAvailable 
                  ? 'bg-white border-slate-200 text-blue-600 hover:border-blue-500 hover:bg-blue-50' 
                  : 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // STEP 5: FORM
  const renderForm = () => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-bold text-lg mb-4">Р”Р°РЅРЅС‹Рµ РїР°С†РёРµРЅС‚Р°</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Р¤Р°РјРёР»РёСЏ</label>
          <input 
             value={draft.patientData.lastName}
             onChange={e => setDraft(p => ({...p, patientData: {...p.patientData, lastName: e.target.value}}))}
             className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
             placeholder="РРІР°РЅРѕРІ"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">РРјСЏ</label>
          <input 
             value={draft.patientData.firstName}
             onChange={e => setDraft(p => ({...p, patientData: {...p.patientData, firstName: e.target.value}}))}
             className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
             placeholder="РРІР°РЅ"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">РўРµР»РµС„РѕРЅ</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
          <input 
             value={draft.patientData.phone}
             onChange={e => setDraft(p => ({...p, patientData: {...p.patientData, phone: e.target.value}}))}
             className="w-full p-3 pl-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
             placeholder="+7 (999) 000-00-00"
          />
        </div>
      </div>

      <button 
        onClick={() => setDraft(p => ({...p, step: 6}))}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 mt-4"
      >
        РџРѕРґС‚РІРµСЂРґРёС‚СЊ Р·Р°РїРёСЃСЊ
      </button>

      <p className="text-xs text-slate-400 text-center mt-2">
        РќР°Р¶РёРјР°СЏ РєРЅРѕРїРєСѓ, РІС‹ СЃРѕРіР»Р°С€Р°РµС‚РµСЃСЊ СЃ СѓСЃР»РѕРІРёСЏРјРё РѕР±СЂР°Р±РѕС‚РєРё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…
      </p>
    </div>
  );

  // STEP 6: SUCCESS
  const renderSuccess = () => (
    <div className="text-center py-10 bg-white rounded-xl border border-green-200 shadow-sm">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
        <Check className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Р’С‹ Р·Р°РїРёСЃР°РЅС‹!</h2>
      <p className="text-slate-500 max-w-xs mx-auto mb-6">
        РњС‹ РѕС‚РїСЂР°РІРёР»Рё РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ РЅР° РІР°С€ РЅРѕРјРµСЂ. Р–РґРµРј РІР°СЃ РІ РєР»РёРЅРёРєРµ.
      </p>
      
      <div className="bg-slate-50 p-4 rounded-lg inline-block text-left text-sm text-slate-600 mb-6">
        <div className="flex gap-2 mb-1"><Calendar className="w-4 h-4" /> {draft.selectedSlot?.date} РІ {draft.selectedSlot?.time}</div>
        <div className="flex gap-2 mb-1"><MapPin className="w-4 h-4" /> {draft.selectedBranch?.name || draft.city}</div>
        <div className="flex gap-2"><UserCircle className="w-4 h-4" /> {draft.selectedDoctor?.name}</div>
      </div>

      <div>
        <button onClick={() => window.location.reload()} className="text-blue-600 font-medium hover:underline">
          Р’РµСЂРЅСѓС‚СЊСЃСЏ РЅР° РіР»Р°РІРЅСѓСЋ
        </button>
      </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {[0,1,2,3,4,5].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= draft.step ? 'bg-blue-500' : 'bg-slate-200'}`} />
          ))}
        </div>

        {renderHeader()}

        <div className="transition-all duration-300">
          {draft.step === 0 && renderHome()}
          {draft.step === 1 && renderPatientType()}
          {draft.step === 2 && renderBranches()}
          {draft.step === 3 && renderDoctors()}
          {draft.step === 4 && renderSlots()}
          {draft.step === 5 && renderForm()}
          {draft.step === 6 && renderSuccess()}
        </div>

        {/* Sticky Summary (Scandinavia Style Footer) - only visible deep in process */}
        {draft.step > 2 && draft.step < 6 && (
           <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:static md:shadow-none md:border-0 md:bg-transparent md:mt-8 md:p-0">
             <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-slate-500">
                <div>
                   <span className="block font-bold text-slate-800 text-sm">{draft.selectedDoctor?.name || 'Р’С‹Р±РѕСЂ РІСЂР°С‡Р°'}</span>
                   {draft.selectedBranch?.name}
                </div>
                {draft.selectedSlot && (
                  <div className="text-right">
                    <span className="block font-bold text-blue-600 text-lg">{draft.selectedSlot.time}</span>
                    {draft.selectedSlot.date}
                  </div>
                )}
             </div>
           </div>
        )}

      </div>
    </div>
  );
}



===== FILE: C:\git\apl\med\benchmarks\antipatterns_registry.md =====

# Р РµРµСЃС‚СЂ РђРЅС‚Рё-РїР°С‚С‚РµСЂРЅРѕРІ (UX Mistakes Registry)

РЎРїРёСЃРѕРє СЂРµС€РµРЅРёР№, РєРѕС‚РѕСЂС‹С… СЃР»РµРґСѓРµС‚ РёР·Р±РµРіР°С‚СЊ РїСЂРё СЂР°Р·СЂР°Р±РѕС‚РєРµ РІРёРґР¶РµС‚Р°.

## 1. РџРѕС‚РµСЂСЏ РєРѕРЅС‚РµРєСЃС‚Р° (Data Amnesia)
*   **РџСЂРѕР±Р»РµРјР°:** РЎР±СЂРѕСЃ РІРІРµРґРµРЅРЅС‹С… РґР°РЅРЅС‹С… (С„РёР»СЊС‚СЂРѕРІ, С‚РёРїР° РїР°С†РёРµРЅС‚Р°) РїСЂРё РЅР°РІРёРіР°С†РёРё "РќР°Р·Р°Рґ" РёР»Рё РїРµСЂРµРєР»СЋС‡РµРЅРёРё РІРєР»Р°РґРѕРє "РЎРїРёСЃРѕРє/РљР°СЂС‚Р°".
*   **РџСЂРёРјРµСЂ:** РЎРњ-РљР»РёРЅРёРєР°.
*   **Р РµС€РµРЅРёРµ:** РҐСЂР°РЅРёС‚СЊ СЃРѕСЃС‚РѕСЏРЅРёРµ `draft` РІ РіР»РѕР±Р°Р»СЊРЅРѕРј СЃС‚РµР№С‚Рµ (Context/Redux) РёР»Рё URL-РїР°СЂР°РјРµС‚СЂР°С…, С‡С‚РѕР±С‹ РѕРЅРѕ Р¶РёР»Рѕ РІСЃРµ РІСЂРµРјСЏ СЃРµСЃСЃРёРё.

## 2. РџСЂРµР¶РґРµРІСЂРµРјРµРЅРЅС‹Р№ РґРѕРїСЂРѕСЃ (Interrogation First)
*   **РџСЂРѕР±Р»РµРјР°:** РўСЂРµР±РѕРІР°РЅРёРµ РІРІРµСЃС‚Рё Р”Р°С‚Сѓ Р РѕР¶РґРµРЅРёСЏ, Email РёР»Рё РџР°СЃРїРѕСЂС‚ *РґРѕ* С‚РѕРіРѕ, РєР°Рє РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ СѓРІРёРґРµР» СЂР°СЃРїРёСЃР°РЅРёРµ РёР»Рё С†РµРЅСѓ.
*   **РџСЂРёРјРµСЂ:** РЎРњ-РљР»РёРЅРёРєР° (РІРІРѕРґ Р”Р ).
*   **Р’Р»РёСЏРЅРёРµ:** Р РµР·РєРѕРµ РїР°РґРµРЅРёРµ РєРѕРЅРІРµСЂСЃРёРё ("РЇ РїСЂРѕСЃС‚Рѕ СЃРјРѕС‚СЂСЋ").
*   **Р РµС€РµРЅРёРµ:** РЎРїСЂР°С€РёРІР°С‚СЊ С‚РѕР»СЊРєРѕ РЅРµРѕР±С…РѕРґРёРјС‹Р№ РјРёРЅРёРјСѓРј (Р’Р·СЂРѕСЃР»С‹Р№/Р РµР±РµРЅРѕРє) РїРµСЂРµРєР»СЋС‡Р°С‚РµР»РµРј. РџРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ вЂ” С‚РѕР»СЊРєРѕ РЅР° СЌС‚Р°РїРµ РѕС„РѕСЂРјР»РµРЅРёСЏ Р±СЂРѕРЅРё.

## 3. РўСѓРїРёРєРѕРІС‹Рµ СЃС†РµРЅР°СЂРёРё (Dead Ends)
*   **РџСЂРѕР±Р»РµРјР°:** Р­РєСЂР°РЅ "РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ" Р±РµР· СЂРµРєРѕРјРµРЅРґР°С†РёР№.
*   **РџСЂРёРјРµСЂ:** Р’С‹Р±РѕСЂ С„РёР»РёР°Р»Р°, РіРґРµ РЅРµС‚ РЅСѓР¶РЅРѕРіРѕ СЃРїРµС†РёР°Р»РёСЃС‚Р°.
*   **Р РµС€РµРЅРёРµ:**
    1.  РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ "РћР±СЂР°С‚РЅСѓСЋ Р»РѕРіРёРєСѓ" (СЃРЅР°С‡Р°Р»Р° РІСЂР°С‡, РїРѕС‚РѕРј С„РёР»РёР°Р»).
    2.  Р•СЃР»Рё РІСЂР°С‡Р° РЅРµС‚ вЂ” РїРѕРєР°Р·С‹РІР°С‚СЊ "Р‘Р»РёР¶Р°Р№С€Р°СЏ Р·Р°РїРёСЃСЊ РІ РґСЂСѓРіРѕРј С„РёР»РёР°Р»Рµ".
    3.  РџРѕРєР°Р·С‹РІР°С‚СЊ РєРЅРѕРїРєСѓ "Р›РёСЃС‚ РѕР¶РёРґР°РЅРёСЏ" РёР»Рё "РџРѕР·РІРѕРЅРёС‚СЊ".

## 4. РЎРєСЂС‹С‚Р°СЏ С†РµРЅР°
*   **РџСЂРѕР±Р»РµРјР°:** Р§С‚РѕР±С‹ СѓР·РЅР°С‚СЊ С†РµРЅСѓ, РЅСѓР¶РЅРѕ РєР»РёРєРЅСѓС‚СЊ РЅР° РІСЂР°С‡Р° РёР»Рё РЅР°С‡Р°С‚СЊ Р·Р°РїРёСЃСЊ.
*   **Р’Р»РёСЏРЅРёРµ:** РќРµРґРѕРІРµСЂРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ.
*   **Р РµС€РµРЅРёРµ:** Р’С‹РІРѕРґРёС‚СЊ С†РµРЅСѓ "РѕС‚ X СЂСѓР±." РїСЂСЏРјРѕ РІ РєР°СЂС‚РѕС‡РєРµ (РґР°РЅРЅС‹Рµ Р±РµСЂРµРј РёР· qMS РёР»Рё РїСЂР°Р№СЃР° WP).

## 5. Р”РІРѕР№РЅР°СЏ СЂРµР°Р»СЊРЅРѕСЃС‚СЊ
*   **РџСЂРѕР±Р»РµРјР°:** РќР° СЃР°Р№С‚Рµ РІСЂР°С‡ РµСЃС‚СЊ, Р° РїСЂРё РїРѕРїС‹С‚РєРµ Р·Р°РїРёСЃРё вЂ” "РћС€РёР±РєР°, СЂР°СЃРїРёСЃР°РЅРёРµ РЅРµ Р°РєС‚СѓР°Р»СЊРЅРѕ".
*   **Р РµС€РµРЅРёРµ:** Р РµР°Р»РёР·Р°С†РёСЏ С‡РµРєРёРЅРіР° СЃР»РѕС‚Р° РїРµСЂРµРґ С„РёРЅР°Р»СЊРЅС‹Рј РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµРј (Optimistic UI with Rollback).



===== FILE: C:\git\apl\med\benchmarks\capabilities_registry.md =====

# Р РµРµСЃС‚СЂ Р’РѕР·РјРѕР¶РЅРѕСЃС‚РµР№ (UI/UX Mechanics Registry)

Р”РѕРєСѓРјРµРЅС‚ РєРѕРЅСЃРѕР»РёРґРёСЂСѓРµС‚ РјРµС…Р°РЅРёРєРё РєРѕРЅРєСѓСЂРµРЅС‚РѕРІ РґР»СЏ РїРѕСЃР»РµРґСѓСЋС‰РµРіРѕ РїСЂРѕРµРєС‚РёСЂРѕРІР°РЅРёСЏ РёРЅС‚РµСЂС„РµР№СЃР°.

## 1. РРґРµРЅС‚РёС„РёРєР°С†РёСЏ РїР°С†РёРµРЅС‚Р° (РљС‚Рѕ?)

### Рђ. РЇРІРЅС‹Р№ РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ (Toggle)
*   **РњРµС…Р°РЅРёРєР°:** Р”РІРµ РєСЂСѓРїРЅС‹Рµ РєРЅРѕРїРєРё "Р’Р·СЂРѕСЃР»С‹Р№" / "Р РµР±РµРЅРѕРє" РЅР° СЃС‚Р°СЂС‚Рµ.
*   **Р РµС„РµСЂРµРЅСЃ:** РЎРєР°РЅРґРёРЅР°РІРёСЏ.
*   **РџР»СЋСЃС‹:** РњРіРЅРѕРІРµРЅРЅРѕРµ РґРµР№СЃС‚РІРёРµ, РЅРѕР»СЊ СѓСЃРёР»РёР№.
*   **РњРёРЅСѓСЃС‹:** РљР»РёРµРЅС‚ РјРѕР¶РµС‚ РѕС€РёР±РёС‚СЊСЃСЏ (Р·Р°РїРёСЃР°С‚СЊ СЂРµР±РµРЅРєР° РЅР° СЃРІРѕР№ РїСЂРѕС„РёР»СЊ).
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** **Р’С‹СЃРѕРєР°СЏ**. РЈС‡РёС‚С‹РІР°СЏ, С‡С‚Рѕ РІ qMS С‡Р°СЃС‚Рѕ СЂР°Р·РґРµР»РµРЅС‹ Р±Р°Р·С‹ (Р”РµС‚СЃС‚РІРѕ/Р’Р·СЂРѕСЃР»С‹Рµ), РЅР°Рј РЅСѓР¶РЅРѕ Р·РЅР°С‚СЊ СЌС‚Рѕ *РґРѕ* Р·Р°РїСЂРѕСЃР° Рє API.

### Р‘. Р Р°СЃС‡РµС‚ РїРѕ Р”Р°С‚Рµ Р РѕР¶РґРµРЅРёСЏ (DOB Check)
*   **РњРµС…Р°РЅРёРєР°:** РџРѕР»Рµ РІРІРѕРґР° РґР°С‚С‹ СЂРѕР¶РґРµРЅРёСЏ РґРѕ РїРѕРєР°Р·Р° СЃРїРёСЃРєР° РІСЂР°С‡РµР№. РЎРёСЃС‚РµРјР° СЃР°РјР° СЃРєСЂС‹РІР°РµС‚ "РЅРµРїРѕРґС…РѕРґСЏС‰РёС…" РІСЂР°С‡РµР№.
*   **Р РµС„РµСЂРµРЅСЃ:** РњРµРґСЃРё, РЎРњ-РљР»РёРЅРёРєР° (С‡Р°СЃС‚РёС‡РЅРѕ).
*   **РџР»СЋСЃС‹:** РўРѕС‡РЅРѕСЃС‚СЊ. РСЃРєР»СЋС‡Р°РµС‚ Р·Р°РїРёСЃСЊ 17-Р»РµС‚РЅРµРіРѕ Рє РїРµРґРёР°С‚СЂСѓ, РµСЃР»Рё РєР»РёРЅРёРєР° РїСЂРёРЅРёРјР°РµС‚ С‚РѕР»СЊРєРѕ РґРѕ 16.
*   **РњРёРЅСѓСЃС‹:** Р’С‹СЃРѕРєРёР№ Р±Р°СЂСЊРµСЂ РІС…РѕРґР° (Friction). Р›СЋРґРё РЅРµ Р»СЋР±СЏС‚ РІРІРѕРґРёС‚СЊ Р»РёС‡РЅС‹Рµ РґР°РЅРЅС‹Рµ "РїСЂРѕСЃС‚Рѕ С‡С‚РѕР±С‹ РїРѕСЃРјРѕС‚СЂРµС‚СЊ".
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** **РЎСЂРµРґРЅСЏСЏ**. РњРѕР¶РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ С‚РѕР»СЊРєРѕ РІ СЂРµР¶РёРјРµ "РЎС‚СЂРѕРіРѕР№ Р°РІС‚РѕСЂРёР·Р°С†РёРё".

### Р’. РђРІС‚Рѕ-РѕРїСЂРµРґРµР»РµРЅРёРµ (Profile Based)
*   **РњРµС…Р°РЅРёРєР°:** РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РёСЂР°РµС‚ "Р—Р°РїРёСЃР°С‚СЊ: РЎРµР±СЏ" РёР»Рё "Р”РѕР±Р°РІРёС‚СЊ С‡Р»РµРЅР° СЃРµРјСЊРё" РёР· СЃРїРёСЃРєР° РїСЂРѕС„РёР»РµР№.
*   **Р РµС„РµСЂРµРЅСЃ:** РњРµРґСЃРё (SmartMed).
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** РўРѕР»СЊРєРѕ РґР»СЏ СЃС†РµРЅР°СЂРёСЏ "SuperApp" (Р°РІС‚РѕСЂРёР·Р°С†РёСЏ РІ РЅР°С‡Р°Р»Рµ).

---

## 2. Р“РµРѕРіСЂР°С„РёСЏ Рё Р’С‹Р±РѕСЂ С„РёР»РёР°Р»Р° (Р“РґРµ?)

### Рђ. РРµСЂР°СЂС…РёС‡РµСЃРєРёР№ РІС‹Р±РѕСЂ (City -> Branch -> Doctor)
*   **РњРµС…Р°РЅРёРєР°:** Р–РµСЃС‚РєР°СЏ РїРѕСЃР»РµРґРѕРІР°С‚РµР»СЊРЅРѕСЃС‚СЊ. РЎРЅР°С‡Р°Р»Р° РІС‹Р±РµСЂРё РєР»РёРЅРёРєСѓ, РїРѕС‚РѕРј СѓРІРёРґРёС€СЊ РІСЂР°С‡РµР№.
*   **Р РµС„РµСЂРµРЅСЃ:** РљР»Р°СЃСЃРёС‡РµСЃРєРёРµ РІРёРґР¶РµС‚С‹.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** **РќРёР·РєР°СЏ**. Р’ Р§РµР»СЏР±РёРЅСЃРєРµ 4 С„РёР»РёР°Р»Р°. Р•СЃР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РµСЂРµС‚ С„РёР»РёР°Р» в„–1, Р° РЅСѓР¶РЅС‹Р№ РІСЂР°С‡ РІ С„РёР»РёР°Р»Рµ в„–2 (РґСЂСѓРіР°СЏ Р±Р°Р·Р°), РјС‹ РїРѕС‚РµСЂСЏРµРј РєР»РёРµРЅС‚Р°.

### Р‘. РћР±СЂР°С‚РЅР°СЏ/РЎРєРІРѕР·РЅР°СЏ Р»РѕРіРёРєР° (Doctor -> Available Branches)
*   **РњРµС…Р°РЅРёРєР°:** РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РёСЂР°РµС‚ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ. РЎРёСЃС‚РµРјР° РїРѕРєР°Р·С‹РІР°РµС‚ СЃР»РѕС‚С‹ РІРѕ РІСЃРµС… С„РёР»РёР°Р»Р°С… СЃСЂР°Р·Сѓ.
*   **Р РµС„РµСЂРµРЅСЃ:** Р›РѕС‚РѕСЃ.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** **РљСЂРёС‚РёС‡РµСЃРєРё РІР°Р¶РЅР°СЏ**. РџРѕР·РІРѕР»СЏРµС‚ СЃРєР»РµРёС‚СЊ 3 Р±Р°Р·С‹ (Chel Main + Chel Extra) РІ РµРґРёРЅСѓСЋ РІС‹РґР°С‡Сѓ. Р’РёР·СѓР°Р»СЊРЅРѕ РіСЂСѓРїРїРёСЂСѓРµРј СЃР»РѕС‚С‹ РїРѕ Р°РґСЂРµСЃР°Рј.

### Р’. РљР°СЂС‚Р° СЃ РєР»Р°СЃС‚РµСЂРёР·Р°С†РёРµР№
*   **РњРµС…Р°РЅРёРєР°:** РРЅС‚РµСЂР°РєС‚РёРІРЅР°СЏ РєР°СЂС‚Р° РЇРЅРґРµРєСЃ/Google.
*   **Р РµС„РµСЂРµРЅСЃ:** РЎРњ-РљР»РёРЅРёРєР°.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** РћРїС†РёРѕРЅР°Р»СЊРЅРѕ РґР»СЏ РІРєР»Р°РґРєРё "РљРѕРЅС‚Р°РєС‚С‹", РЅРѕ РЅРµ РєР°Рє РѕСЃРЅРѕРІРЅРѕР№ СЃРїРѕСЃРѕР± РІС‹Р±РѕСЂР° РІСЂР°С‡Р° (СЃР»РёС€РєРѕРј СЃР»РѕР¶РЅРѕ РґР»СЏ РјРѕР±РёР»СЊРЅС‹С…).

---

## 3. РџРѕРёСЃРє Рё РќР°РІРёРіР°С†РёСЏ (Р§С‚Рѕ?)

### Рђ. РЈРјРЅС‹Р№ РџРѕРёСЃРє (Omnibox)
*   **РњРµС…Р°РЅРёРєР°:** Р•РґРёРЅРѕРµ РїРѕР»Рµ РёС‰РµС‚ РїРѕ: Р¤РРћ, РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё, РЎРёРјРїС‚РѕРјСѓ ("Р‘РѕР»РёС‚ СѓС…Рѕ"), РќР°Р·РІР°РЅРёСЋ СѓСЃР»СѓРіРё.
*   **Р РµС„РµСЂРµРЅСЃ:** РЎРєР°РЅРґРёРЅР°РІРёСЏ.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** **Р’С‹СЃРѕРєР°СЏ**. РЈ РЅР°СЃ WP + qMS, РјС‹ РјРѕР¶РµРј РёРЅРґРµРєСЃРёСЂРѕРІР°С‚СЊ Рё С‚Рѕ Рё РґСЂСѓРіРѕРµ.

### Р‘. Р’РёС‚СЂРёРЅР° СѓСЃР»СѓРі (РџР»РёС‚РєРё)
*   **РњРµС…Р°РЅРёРєР°:** РРєРѕРЅРєРё "Р“РёРЅРµРєРѕР»РѕРіРёСЏ", "РЈСЂРѕР»РѕРіРёСЏ".
*   **Р РµС„РµСЂРµРЅСЃ:** РЎРєР°РЅРґРёРЅР°РІРёСЏ, Р”РѕРєР”РѕРє.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** РҐРѕСЂРѕС€Рѕ РґР»СЏ РіР»Р°РІРЅРѕР№ СЃС‚СЂР°РЅРёС†С‹ РІРёРґР¶РµС‚Р°.

---

## 4. Р Р°СЃРїРёСЃР°РЅРёРµ Рё РЎР»РѕС‚С‹ (РљРѕРіРґР°?)

### Рђ. РЎР»РѕС‚С‹ РІ РєР°СЂС‚РѕС‡РєРµ (Quick View)
*   **РњРµС…Р°РЅРёРєР°:** РџРѕРєР°Р·С‹РІР°РµРј 3-4 Р±Р»РёР¶Р°Р№С€РёС… "С‚Р°Р±Р»РµС‚РєРё" РІСЂРµРјРµРЅРё РїСЂСЏРјРѕ РІ СЃРїРёСЃРєРµ РІСЂР°С‡РµР№.
*   **Р РµС„РµСЂРµРЅСЃ:** РЎРєР°РЅРґРёРЅР°РІРёСЏ, РџСЂРѕР”РѕРєС‚РѕСЂРѕРІ.
*   **РџР»СЋСЃС‹:** РЎРѕРєСЂР°С‰Р°РµС‚ РїСѓС‚СЊ РЅР° 1 РєР»РёРє.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** **Р’С‹СЃРѕРєР°СЏ**.

### Р‘. РљР°Р»РµРЅРґР°СЂСЊ-СЃРµС‚РєР° (Full View)
*   **РњРµС…Р°РЅРёРєР°:** РўР°Р±Р»РёС†Р° РЅР° РЅРµРґРµР»СЋ.
*   **Р РµС„РµСЂРµРЅСЃ:** РЎРњ-РљР»РёРЅРёРєР°.
*   **РњРёРЅСѓСЃС‹:** Р—Р°РЅРёРјР°РµС‚ РјРЅРѕРіРѕ РјРµСЃС‚Р°, РЅР° РјРѕР±РёР»СЊРЅРѕРј РЅРµСѓРґРѕР±РЅРѕ.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:** РўРѕР»СЊРєРѕ РєР°Рє РІС‚РѕСЂРёС‡РЅС‹Р№ СЌРєСЂР°РЅ ("РџРѕРєР°Р·Р°С‚СЊ Р±РѕР»СЊС€Рµ РІСЂРµРјРµРЅРё").

---

## 5. РЎС‚СЂР°С‚РµРіРёСЏ РђРІС‚РѕСЂРёР·Р°С†РёРё (Flow)

### Рђ. Guest-First (Р’РёС‚СЂРёРЅР°)
*   **Р›РѕРіРёРєР°:** РЎРЅР°С‡Р°Р»Р° РІС‹Р±РёСЂР°РµРј РІСЃС‘, РІРІРѕРґРёРј С‚РµР»РµС„РѕРЅ РІ СЃР°РјРѕРј РєРѕРЅС†Рµ РґР»СЏ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ SMS.
*   **Р¦РµР»СЊ:** РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ РєРѕРЅРІРµСЂСЃРёСЏ РїРµСЂРІРёС‡РЅС‹С… РїР°С†РёРµРЅС‚РѕРІ.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ:** РќР°С€ РѕСЃРЅРѕРІРЅРѕР№ СЃС†РµРЅР°СЂРёР№ РґР»СЏ СЃР°Р№С‚Р°.

### Р‘. Auth-First (РљР»СѓР±/SuperApp)
*   **Р›РѕРіРёРєР°:** РЎРЅР°С‡Р°Р»Р° РІРІРµРґРё С‚РµР»РµС„РѕРЅ Рё SMS, РїРѕС‚РѕРј РїРѕР»СѓС‡Рё РґРѕСЃС‚СѓРї Рє Р·Р°РїРёСЃРё.
*   **Р¦РµР»СЊ:** РЎР±РѕСЂ Р±Р°Р·С‹, РїРµСЂСЃРѕРЅР°Р»РёР·Р°С†РёСЏ, РёСЃС‚РѕСЂРёСЏ РїСЂРёРµРјРѕРІ.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ:** РљР°Рє РѕРїС†РёСЏ РґР»СЏ СЂСѓРєРѕРІРѕРґСЃС‚РІР° (СЂРµР¶РёРј "Р›РёС‡РЅС‹Р№ РєР°Р±РёРЅРµС‚").




===== FILE: C:\git\apl\med\benchmarks\lotos_analysis.md =====

# Р‘РµРЅС‡РјР°СЂРєРёРЅРі: РњР¦ "Р›РѕС‚РѕСЃ" (Р§РµР»СЏР±РёРЅСЃРє)

**РЎС‚Р°С‚СѓСЃ:** Р›РѕРєР°Р»СЊРЅС‹Р№ Р»РёРґРµСЂ / РџСЂСЏРјРѕР№ РєРѕРЅРєСѓСЂРµРЅС‚.
**РњРѕРґРµР»СЊ:** "РЈРјРЅР°СЏ С„РёР»СЊС‚СЂР°С†РёСЏ" (Smart Dynamic Filters).

---

## 1. РљРёР»Р»РµСЂ-С„РёС‡Р°: РћР±СЂР°С‚РЅР°СЏ Р»РѕРіРёРєР° РІС‹Р±РѕСЂР° С„РёР»РёР°Р»Р°
Р’ РѕС‚Р»РёС‡РёРµ РѕС‚ СЃС‚Р°РЅРґР°СЂС‚РЅС‹С… С„РѕСЂРј, РіРґРµ РјС‹ РІС‹Р±РёСЂР°РµРј `Р“РѕСЂРѕРґ -> Р¤РёР»РёР°Р» -> Р’СЂР°С‡`, Р·РґРµСЃСЊ РїСЂРѕС†РµСЃСЃ РїРµСЂРµРІРµСЂРЅСѓС‚:

1.  **РџРѕР»Рµ "Р¤РёР»РёР°Р»" РёР·РЅР°С‡Р°Р»СЊРЅРѕ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅРѕ (Disabled).**
2.  РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ СЃРЅР°С‡Р°Р»Р° РІС‹Р±РёСЂР°РµС‚ **РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ** РёР»Рё **Р’СЂР°С‡Р°**.
3.  РЎРёСЃС‚РµРјР° *РЅР° Р»РµС‚Сѓ* РїСЂРѕРІРµСЂСЏРµС‚, РІ РєР°РєРёС… С„РёР»РёР°Р»Р°С… РїСЂРёРЅРёРјР°СЋС‚ СЌС‚Рё СЃРїРµС†РёР°Р»РёСЃС‚С‹.
4.  **Р РµР·СѓР»СЊС‚Р°С‚:**
    *   РџРѕР»Рµ "Р¤РёР»РёР°Р»" СЂР°Р·Р±Р»РѕРєРёСЂСѓРµС‚СЃСЏ Рё СЃРѕРґРµСЂР¶РёС‚ *С‚РѕР»СЊРєРѕ* СЂРµР»РµРІР°РЅС‚РЅС‹Рµ Р°РґСЂРµСЃР°.
    *   РР›Р (РµСЃР»Рё С„РёР»РёР°Р» РЅРµ РІС‹Р±СЂР°РЅ) РІС‹РґР°С‡Р° РіСЂСѓРїРїРёСЂСѓРµС‚СЃСЏ РїРѕ Р°РґСЂРµСЃР°Рј.

**РџРѕС‡РµРјСѓ СЌС‚Рѕ РєСЂСѓС‚Рѕ РґР»СЏ Р§РµР»СЏР±РёРЅСЃРєР°:**
Р“РѕСЂРѕРґ РїСЂРѕС‚СЏР¶РµРЅРЅС‹Р№. РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ С‡Р°СЃС‚Рѕ РЅРµ Р·РЅР°РµС‚, РіРґРµ СЃРёРґРёС‚ "РЈСЂРѕР»РѕРі". Р•СЃР»Рё Р·Р°СЃС‚Р°РІРёС‚СЊ РµРіРѕ СЃРЅР°С‡Р°Р»Р° РІС‹Р±СЂР°С‚СЊ С„РёР»РёР°Р» "РЅР° РўСЂСѓРґР°", Р° С‚Р°Рј РЅРµС‚ СѓСЂРѕР»РѕРіР° вЂ” РјС‹ РїРѕР»СѓС‡РёРј СЃС‚СЂР°РЅРёС†Сѓ "РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ" (Dead End). РџРѕРґС…РѕРґ Р›РѕС‚РѕСЃР° РіР°СЂР°РЅС‚РёСЂСѓРµС‚, С‡С‚Рѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІСЃРµРіРґР° СѓРІРёРґРёС‚ СЂРµР·СѓР»СЊС‚Р°С‚.

---

## 2. Р Р°Р·Р±РѕСЂ РёРЅС‚РµСЂС„РµР№СЃР° (UI Breakdown)

### Р­РєСЂР°РЅ 1: РџРѕРёСЃРє Рё Р¤РёР»СЊС‚СЂС‹
*   **Р’РєР»Р°РґРєРё:** РџРѕРёСЃРє РїРѕ Р’СЂР°С‡Сѓ / РџРѕРёСЃРє РїРѕ РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё.
*   **РђРІС‚РѕРєРѕРјРїР»РёС‚:** Р–РёРІРѕР№ РїРѕРёСЃРє РїСЂРё РІРІРѕРґРµ С„Р°РјРёР»РёРё.
*   **Р“СЂСѓРїРїРёСЂРѕРІРєР° РІС‹РґР°С‡Рё:**
    Р•СЃР»Рё РЅРµ РІС‹Р±СЂР°РЅ РєРѕРЅРєСЂРµС‚РЅС‹Р№ С„РёР»РёР°Р», СЃРїРёСЃРєРё РІСЂР°С‡РµР№ СЂР°Р·Р±РёС‚С‹ Р±Р»РѕРєР°РјРё:
    *   **Р¤РёР»РёР°Р» РЅР° РўСЂСѓРґР°, 187Р‘**
        *   Р’СЂР°С‡ 1
        *   Р’СЂР°С‡ 2
    *   **Р¤РёР»РёР°Р» РЅР° 250-Р»РµС‚РёСЏ Р§РµР»СЏР±РёРЅСЃРєР°**
        *   Р’СЂР°С‡ 3
*   **РљР°Р»РµРЅРґР°СЂСЊ:** Р Р°СЃРїРѕР»РѕР¶РµРЅ РЅР° СЌС‚РѕРј Р¶Рµ СЌРєСЂР°РЅРµ (РЅРёР¶Рµ РёР»Рё СЃР±РѕРєСѓ), РїРѕР·РІРѕР»СЏРµС‚ Р±С‹СЃС‚СЂРѕ РїРµСЂРµРєР»СЋС‡РёС‚СЊ РґР°С‚Сѓ, РЅРµ СѓС…РѕРґСЏ СЃРѕ СЃС‚СЂР°РЅРёС†С‹ РІС‹РґР°С‡Рё.

### Р­РєСЂР°РЅ 2: РЎР»РѕС‚С‹ Рё Р—Р°РїРёСЃСЊ
*   РЎР»РѕС‚С‹ РїРѕРєР°Р·С‹РІР°СЋС‚СЃСЏ РєРѕРјРїР°РєС‚РЅРѕ.
*   РњРёРЅРёРјСѓРј Р»РёС€РЅРёС… РґРІРёР¶РµРЅРёР№.

---

## 3. Р’С‹РІРѕРґС‹ РґР»СЏ РЅР°С€РµРіРѕ РїСЂРѕРµРєС‚Р° (Р§РµР»СЏР±РёРЅСЃРєРёР№ СЃС†РµРЅР°СЂРёР№)

РЈ РЅР°СЃ СЃР»РѕР¶РЅР°СЏ СЃРёС‚СѓР°С†РёСЏ СЃ Р±Р°Р·Р°РјРё РґР°РЅРЅС‹С… (3 Р±Р°Р·С‹ РЅР° 4 С„РёР»РёР°Р»Р°). РџРѕРґС…РѕРґ Р›РѕС‚РѕСЃР° РёРґРµР°Р»СЊРЅРѕ Р»РѕР¶РёС‚СЃСЏ РЅР° СЌС‚Сѓ Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ С‚РµС…РЅРёС‡РµСЃРєРё:

1.  **РџСЂРѕР±Р»РµРјР°:** РњС‹ РЅРµ Р·РЅР°РµРј, РІ РєР°РєСѓСЋ Р±Р°Р·Сѓ (qMS 1 РёР»Рё qMS 2) РѕС‚РїСЂР°РІР»СЏС‚СЊ Р·Р°РїСЂРѕСЃ, РїРѕРєР° РЅРµ Р·РЅР°РµРј, РєСѓРґР° С…РѕС‡РµС‚ Р·Р°РїРёСЃР°С‚СЊСЃСЏ РїР°С†РёРµРЅС‚.
2.  **Р РµС€РµРЅРёРµ (СЃС‚РёР»СЊ Р›РѕС‚РѕСЃР°):**
    *   РЎРїСЂР°С€РёРІР°РµРј РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ ("РўРµСЂР°РїРµРІС‚").
    *   РќР°С€ PHP-С€Р»СЋР· РѕРїСЂР°С€РёРІР°РµС‚ **РІСЃРµ** Р±Р°Р·С‹ РїР°СЂР°Р»Р»РµР»СЊРЅРѕ.
    *   Р’РѕР·РІСЂР°С‰Р°РµС‚ РѕР±С‰РёР№ СЃРїРёСЃРѕРє, СЃРіСЂСѓРїРїРёСЂРѕРІР°РЅРЅС‹Р№ РїРѕ Р°РґСЂРµСЃР°Рј.
    *   РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІРёРґРёС‚: "РђРіР°, РЅР° РўСЂСѓРґР° (СЌС‚Рѕ qMS 2) РµСЃС‚СЊ РѕРєРЅРѕ РЅР° 10:00, Р° РЅР° Р›РµРЅРёРЅР° (qMS 1) вЂ” С‚РѕР»СЊРєРѕ РЅР° РІРµС‡РµСЂ".

### Р§С‚Рѕ РјРѕР¶РЅРѕ СѓР»СѓС‡С€РёС‚СЊ (РїРѕ СЃСЂР°РІРЅРµРЅРёСЋ СЃ Р›РѕС‚РѕСЃРѕРј):
Р’ Р›РѕС‚РѕСЃРµ РёРЅС‚РµСЂС„РµР№СЃ РІС‹РіР»СЏРґРёС‚ РЅРµРјРЅРѕРіРѕ РїРµСЂРµРіСЂСѓР¶РµРЅРЅС‹Рј РёР·-Р·Р° РѕР±РёР»РёСЏ С‚РµРєСЃС‚Р° Рё Р°РґСЂРµСЃРѕРІ РІ СЃРїРёСЃРєРµ. РњС‹ РјРѕР¶РµРј СЃРґРµР»Р°С‚СЊ СЌС‚Рѕ РёР·СЏС‰РЅРµРµ, РёСЃРїРѕР»СЊР·СѓСЏ РІРёР·СѓР°Р»СЊРЅС‹Рµ РєР°СЂС‚РѕС‡РєРё, РєР°Рє РІ РЎРєР°РЅРґРёРЅР°РІРёРё, РЅРѕ СЃ Р»РѕРіРёРєРѕР№ РіСЂСѓРїРїРёСЂРѕРІРєРё, РєР°Рє РІ Р›РѕС‚РѕСЃРµ.

**РС‚РѕРі:** Р‘РµСЂРµРј Р»РѕРіРёРєСѓ "Р”РёРЅР°РјРёС‡РµСЃРєРѕРіРѕ С„РёР»РёР°Р»Р°" РґР»СЏ Р§РµР»СЏР±РёРЅСЃРєР°. Р­С‚Рѕ СЃРїР°СЃРµС‚ РЅР°СЃ РѕС‚ РїСѓСЃС‚С‹С… СЌРєСЂР°РЅРѕРІ РІС‹РґР°С‡Рё.



===== FILE: C:\git\apl\med\benchmarks\medsi_analysis.md =====

# Р‘РµРЅС‡РјР°СЂРєРёРЅРі: РљР»РёРЅРёРєР° "РњРµРґСЃРё" (SmartMed)

**РњРѕРґРµР»СЊ:** "РђРІС‚РѕСЂРёР·Р°С†РёСЏ РїСЂРµР¶РґРµ РІСЃРµРіРѕ" (Auth-First / SuperApp).
**Р¦РµР»СЊ:** РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ РёРґРµРЅС‚РёС„РёРєР°С†РёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ Рё СѓРґРµСЂР¶Р°РЅРёРµ РІ СЌРєРѕСЃРёСЃС‚РµРјРµ.

---

## 1. РђСЂС…РёС‚РµРєС‚СѓСЂР° Р’РѕСЂРѕРЅРєРё (User Flow)

Р’ РѕС‚Р»РёС‡РёРµ РѕС‚ Р»РёРЅРµР№РЅРѕР№ РІРѕСЂРѕРЅРєРё РЎРєР°РЅРґРёРЅР°РІРёРё, Р·РґРµСЃСЊ РїСЂРѕС†РµСЃСЃ Р·Р°РІСЏР·Р°РЅ РЅР° СЃРѕР·РґР°РЅРёРё РїСЂРѕС„РёР»СЏ.

`Р’С…РѕРґ/Р РµРіРёСЃС‚СЂР°С†РёСЏ (SMS)` в†’ `Р—Р°РїРѕР»РЅРµРЅРёРµ РїСЂРѕС„РёР»СЏ` в†’ `РџРѕРёСЃРє/Р’С‹Р±РѕСЂ РІСЂР°С‡Р°` в†’ `Р’С‹Р±РѕСЂ Р’СЂРµРјРµРЅРё` в†’ `РћРїР»Р°С‚Р°/Р‘СЂРѕРЅСЊ`

---

## 2. Р”РµС‚Р°Р»СЊРЅС‹Р№ СЂР°Р·Р±РѕСЂ С€Р°РіРѕРІ

### РЁР°Рі 1: "Р–РµСЃС‚РєР°СЏ" РђРІС‚РѕСЂРёР·Р°С†РёСЏ (Gatekeeper)
РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РЅРµ РјРѕР¶РµС‚ РЅР°С‡Р°С‚СЊ РїСЂРѕС†РµСЃСЃ Р·Р°РїРёСЃРё, РЅРµ РїСЂРµРґСЃС‚Р°РІРёРІС€РёСЃСЊ.
*   **Р­РєСЂР°РЅ РІС…РѕРґР°:**
    *   РџРѕР»Рµ РІРІРѕРґР° С‚РµР»РµС„РѕРЅР°.
    *   РљРЅРѕРїРєР° "Р’РѕР№С‚Рё".
    *   *Р›РѕРіРёРєР°:* Р•СЃР»Рё С‚РµР»РµС„РѕРЅ РЅРѕРІС‹Р№ в†’ СЃС†РµРЅР°СЂРёР№ СЂРµРіРёСЃС‚СЂР°С†РёРё. Р•СЃР»Рё СЃС‚Р°СЂС‹Р№ в†’ РІС…РѕРґ.
*   **SMS РІРµСЂРёС„РёРєР°С†РёСЏ:** РЎС‚Р°РЅРґР°СЂС‚РЅС‹Р№ РІРІРѕРґ РєРѕРґР° РёР· 4 С†РёС„СЂ.

### РЁР°Рі 2: РЎРѕР·РґР°РЅРёРµ С†РёС„СЂРѕРІРѕРіРѕ РґРІРѕР№РЅРёРєР° (РџСЂРѕС„РёР»СЊ)
Р•СЃР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РЅРѕРІС‹Р№, СЃРёСЃС‚РµРјР° С‚СЂРµР±СѓРµС‚ РїРѕР»РЅС‹Рµ РґР°РЅРЅС‹Рµ Р”Рћ РїРµСЂРµС…РѕРґР° Рє СѓСЃР»СѓРіР°Рј.
*   **РџРѕР»СЏ С„РѕСЂРјС‹:**
    *   Р¤Р°РјРёР»РёСЏ, РРјСЏ, РћС‚С‡РµСЃС‚РІРѕ (РїРѕ РѕС‚РґРµР»СЊРЅРѕСЃС‚Рё).
    *   РџРѕР» (Рњ/Р–) вЂ” *РІР°Р¶РЅРѕ РґР»СЏ С„РёР»СЊС‚СЂР°С†РёРё СѓСЃР»СѓРі (РіРёРЅРµРєРѕР»РѕРіРёСЏ/СѓСЂРѕР»РѕРіРёСЏ).*
    *   Р”Р°С‚Р° СЂРѕР¶РґРµРЅРёСЏ вЂ” *РєСЂРёС‚РёС‡РЅРѕ!* РРјРµРЅРЅРѕ РїРѕ СЌС‚РѕРјСѓ РїРѕР»СЋ РњРµРґСЃРё РїРѕРЅРёРјР°РµС‚, Р’Р·СЂРѕСЃР»С‹Р№ СЌС‚Рѕ РёР»Рё Р РµР±РµРЅРѕРє, Рё СЃРєСЂС‹РІР°РµС‚ РЅРµРЅСѓР¶РЅС‹С… РІСЂР°С‡РµР№ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё (РїРѕСЌС‚РѕРјСѓ РЅРµС‚ С€Р°РіР° РІС‹Р±РѕСЂР° С‚РёРїР° РїР°С†РёРµРЅС‚Р°).
    *   Email.

### РЁР°Рі 3: РќР°РІРёРіР°С†РёСЏ Рё РџРѕРёСЃРє
*   **РРЅС‚РµСЂС„РµР№СЃ:**
    *   РџРѕРёСЃРєРѕРІР°СЏ СЃС‚СЂРѕРєР° (Р’СЂР°С‡Рё, СѓСЃР»СѓРіРё).
    *   РћС‚СЃСѓС‚СЃС‚РІРёРµ СЏРІРЅРѕРіРѕ РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЏ "Р”РµС‚СЃРєРѕРµ/Р’Р·СЂРѕСЃР»РѕРµ" (С‚Р°Рє РєР°Рє СЃРёСЃС‚РµРјР° СѓР¶Рµ Р·РЅР°РµС‚ РІРѕР·СЂР°СЃС‚ РёР· РЁР°РіР° 2).

### РЁР°Рі 4: Р’С‹Р±РѕСЂ СЃРїРµС†РёР°Р»РёСЃС‚Р°
*   **РљР°СЂС‚РѕС‡РєР° РІСЂР°С‡Р°:**
    *   Р¤РРћ.
    *   РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ (РќРµРІСЂРѕР»РѕРі, РўРµСЂР°РїРµРІС‚).
    *   РЎС‚РѕРёРјРѕСЃС‚СЊ РїСЂРёРµРјР° (РЅР°РїСЂРёРјРµСЂ, "1 790 в‚Ѕ").
    *   РљРЅРѕРїРєР° "Р—Р°РїРёСЃР°С‚СЊСЃСЏ".

### РЁР°Рі 5: Р’С‹Р±РѕСЂ РІСЂРµРјРµРЅРё (РЎР»РѕС‚)
*   **UI:**
    *   Р’С‹Р±РѕСЂ РґР°С‚С‹ (РєР°Р»РµРЅРґР°СЂСЊ РёР»Рё Р»РµРЅС‚Р° РґРЅРµР№).
    *   РЎРїРёСЃРє РґРѕСЃС‚СѓРїРЅС‹С… СЃР»РѕС‚РѕРІ (11:00, 11:40...).

### РЁР°Рі 6: РџРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ Рё РћРїР»Р°С‚Р°
РњРµРґСЃРё РёСЃРїРѕР»СЊР·СѓРµС‚ РјРѕРґРµР»СЊ "E-commerce".
*   **РЎРІРѕРґРєР°:** "РљРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ РІСЂР°С‡Р°-РЅРµС„СЂРѕР»РѕРіР°", Р”Р°С‚Р°, Р’СЂРµРјСЏ, Р’СЂР°С‡.
*   **РџСЂРµРґСѓРїСЂРµР¶РґРµРЅРёСЏ:**
    *   "Р’СЂР°С‡ РЅРµ РІРїСЂР°РІРµ РїРѕСЃС‚Р°РІРёС‚СЊ РґРёР°РіРЅРѕР· РѕРЅР»Р°Р№РЅ" (СЋСЂРёРґРёС‡РµСЃРєРёР№ РґРёСЃРєР»РµР№РјРµСЂ РґР»СЏ С‚РµР»РµРјРµРґРёС†РёРЅС‹).
    *   "Р”Р»СЏ РЅР°Р·РЅР°С‡РµРЅРёСЏ Р»РµС‡РµРЅРёСЏ СЃР»РµРґСѓРµС‚ Р·Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° РѕС‡РЅС‹Р№ РїСЂРёРµРј".
*   **РћРїР»Р°С‚Р°:**
    *   РљРЅРѕРїРєР° "РћРїР»Р°С‚РёС‚СЊ".
    *   РўР°Р№РјРµСЂ (РЅР°РїСЂРёРјРµСЂ, 15 РјРёРЅСѓС‚ РЅР° РѕРїР»Р°С‚Сѓ Р±СЂРѕРЅРё).

### РЁР°Рі 7: РЈРїСЂР°РІР»РµРЅРёРµ Р·Р°РїРёСЃСЊСЋ (Р›РёС‡РЅС‹Р№ РєР°Р±РёРЅРµС‚)
*   **Р¤СѓРЅРєС†РёРё:**
    *   РџСЂРѕСЃРјРѕС‚СЂ РґРµС‚Р°Р»РµР№.
    *   РљРЅРѕРїРєР° "РћС‚РјРµРЅРёС‚СЊ РїСЂРёРµРј" вЂ” РІР°Р¶РЅС‹Р№ СЌР»РµРјРµРЅС‚ СЃР°РјРѕРѕР±СЃР»СѓР¶РёРІР°РЅРёСЏ, СЃРЅРёР¶Р°СЋС‰РёР№ РЅР°РіСЂСѓР·РєСѓ РЅР° РєРѕР»Р»-С†РµРЅС‚СЂ.

---

## 3. РЎСЂР°РІРЅРµРЅРёРµ РїРѕРґС…РѕРґРѕРІ РґР»СЏ РЅР°С€РµРіРѕ РїСЂРѕРµРєС‚Р°

| РҐР°СЂР°РєС‚РµСЂРёСЃС‚РёРєР° | РЎРєР°РЅРґРёРЅР°РІРёСЏ (РџРѕРґС…РѕРґ "Р’РёС‚СЂРёРЅР°") | РњРµРґСЃРё (РџРѕРґС…РѕРґ "РљР»СѓР±") |
| :--- | :--- | :--- |
| **Р’С…РѕРґ** | РЎРІРѕР±РѕРґРЅС‹Р№ РїСЂРѕСЃРјРѕС‚СЂ РІСЂР°С‡РµР№ | РЎРЅР°С‡Р°Р»Р° SMS-Р°РІС‚РѕСЂРёР·Р°С†РёСЏ |
| **Р’Р·СЂРѕСЃР»С‹Р№/Р РµР±РµРЅРѕРє** | РЇРІРЅС‹Р№ РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ РІ РЅР°С‡Р°Р»Рµ | РћРїСЂРµРґРµР»СЏРµС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РїРѕ Р”Р°С‚Рµ Р РѕР¶РґРµРЅРёСЏ РІ РїСЂРѕС„РёР»Рµ |
| **Р”Р°РЅРЅС‹Рµ РїР°С†РёРµРЅС‚Р°** | Р’РІРѕРґСЏС‚СЃСЏ РІ СЃР°РјРѕРј РєРѕРЅС†Рµ (С‚РѕР»СЊРєРѕ РґР»СЏ Р·Р°РїРёСЃРё) | Р’РІРѕРґСЏС‚СЃСЏ РІ РЅР°С‡Р°Р»Рµ (СЃРѕР·РґР°РЅРёРµ Р°РєРєР°СѓРЅС‚Р°) |
| **Р”Р»СЏ РєРѕРіРѕ Р»СѓС‡С€Рµ?** | **Р”Р»СЏ РЅРѕРІС‹С… РєР»РёРµРЅС‚РѕРІ СЃ СЃР°Р№С‚Р°** (РјРµРЅСЊС€Рµ СЃС‚СЂРµСЃСЃР°) | Р”Р»СЏ РїРѕСЃС‚РѕСЏРЅРЅС‹С… РїР°С†РёРµРЅС‚РѕРІ (Р±С‹СЃС‚СЂРµРµ РїРѕРІС‚РѕСЂРЅР°СЏ Р·Р°РїРёСЃСЊ) |

**Р РµРєРѕРјРµРЅРґР°С†РёСЏ:**
Р”Р»СЏ РІРёРґР¶РµС‚Р° РЅР° СЃР°Р№С‚Рµ (РґР»СЏ РїСЂРёРІР»РµС‡РµРЅРёСЏ РїР°С†РёРµРЅС‚РѕРІ) **РїРѕРґС…РѕРґ РЎРєР°РЅРґРёРЅР°РІРёРё Р»СѓС‡С€Рµ**. РџРѕРґС…РѕРґ РњРµРґСЃРё С…РѕСЂРѕС€ РґР»СЏ РјРѕР±РёР»СЊРЅРѕРіРѕ РїСЂРёР»РѕР¶РµРЅРёСЏ, РЅРѕ РЅР° СЃР°Р№С‚Рµ Р¶РµСЃС‚РєРѕРµ С‚СЂРµР±РѕРІР°РЅРёРµ СЂРµРіРёСЃС‚СЂР°С†РёРё РјРѕР¶РµС‚ РѕС‚РїСѓРіРЅСѓС‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ, РєРѕС‚РѕСЂС‹Р№ РїСЂРѕСЃС‚Рѕ С…РѕС‡РµС‚ "РїРѕСЃРјРѕС‚СЂРµС‚СЊ, РµСЃС‚СЊ Р»Рё СЃРІРѕР±РѕРґРЅРѕРµ РІСЂРµРјСЏ Сѓ Р›РћР Р°".



===== FILE: C:\git\apl\med\benchmarks\scandinavia_analysis.md =====

# Р‘РµРЅС‡РјР°СЂРєРёРЅРі: РљР»РёРЅРёРєР° "РЎРєР°РЅРґРёРЅР°РІРёСЏ" (UX/UI РђРЅР°Р»РёР·)

**Р¦РµР»СЊ:** РЎРѕР·РґР°С‚СЊ СЌС‚Р°Р»РѕРЅРЅСѓСЋ Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ РІРёРґР¶РµС‚Р° Р·Р°РїРёСЃРё, Р°РґР°РїС‚РёСЂРѕРІР°РЅРЅСѓСЋ РїРѕРґ РјСѓР»СЊС‚Рё-Р±Р°Р·РѕРІСѓСЋ СЃС‚СЂСѓРєС‚СѓСЂСѓ (Р§РµР»СЏР±РёРЅСЃРє/РЎРџР±).

---

## 1. РђСЂС…РёС‚РµРєС‚СѓСЂР° Р’РѕСЂРѕРЅРєРё (User Flow)

РЎРєР°РЅРґРёРЅР°РІРёСЏ РёСЃРїРѕР»СЊР·СѓРµС‚ Р»РёРЅРµР№РЅС‹Р№ РїСЂРѕС†РµСЃСЃ ("Wizard"), РіРґРµ РєР°Р¶РґС‹Р№ С€Р°Рі РѕС‚СЃРµРєР°РµС‚ Р»РёС€РЅРµРµ.

`Р“Р»Р°РІРЅР°СЏ` в†’ `РўРёРї РїР°С†РёРµРЅС‚Р°` в†’ `Р’С‹Р±РѕСЂ РљР»РёРЅРёРєРё (Р“РµРѕ)` в†’ `Р’С‹Р±РѕСЂ Р’СЂР°С‡Р°/РЈСЃР»СѓРіРё` в†’ `РђРІС‚РѕСЂРёР·Р°С†РёСЏ/Р¤РѕСЂРјР°` в†’ `РЈСЃРїРµС…`

---

## 2. Р”РµС‚Р°Р»СЊРЅС‹Р№ СЂР°Р·Р±РѕСЂ С€Р°РіРѕРІ

### РЁР°Рі 1: РўРѕС‡РєР° РІС…РѕРґР° (РџРѕРёСЃРє Рё РќР°РІРёРіР°С†РёСЏ)
РЎР°РјС‹Р№ СЃР»РѕР¶РЅС‹Р№ СЌРєСЂР°РЅ, С‚Р°Рє РєР°Рє РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РјРѕР¶РµС‚ РёСЃРєР°С‚СЊ СЂР°Р·РЅС‹РјРё СЃРїРѕСЃРѕР±Р°РјРё.
*   **РЈРјРЅС‹Р№ РїРѕРёСЃРє (Omnibox):**
    *   *РџРѕР»Рµ РІРІРѕРґР°:* Р Р°Р±РѕС‚Р°РµС‚ РєР°Рє Google. РС‰РµС‚ РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ РїРѕ: Р¤РРћ РІСЂР°С‡Р°, РќР°Р·РІР°РЅРёСЋ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё ("РЈСЂРѕР»РѕРі"), РќР°Р·РІР°РЅРёСЋ СѓСЃР»СѓРіРё ("РЈР—Р Р±СЂСЋС€РЅРѕР№ РїРѕР»РѕСЃС‚Рё").
    *   *РџР»РµР№СЃС…РѕР»РґРµСЂ:* "Р’СЂР°С‡, РЅР°РїСЂР°РІР»РµРЅРёРµ, СѓСЃР»СѓРіР°..."
*   **РџР»РёС‚РєРё РєР°С‚РµРіРѕСЂРёР№:**
    *   РљСЂСѓРїРЅС‹Рµ РёРєРѕРЅРєРё + РўРµРєСЃС‚.
    *   РќР°Р±РѕСЂ: РљРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ, Р”РёР°РіРЅРѕСЃС‚РёРєР°, РљРѕСЃРјРµС‚РѕР»РѕРіРёСЏ, РЎС‚РѕРјР°С‚РѕР»РѕРіРёСЏ, Р’С‹Р·РѕРІ РЅР° РґРѕРј.
    *   *Р—Р°С‡РµРј:* Р”Р»СЏ С‚РµС…, РєС‚Рѕ РЅРµ С…РѕС‡РµС‚ РїРµС‡Р°С‚Р°С‚СЊ, Р° С…РѕС‡РµС‚ "РїСЂРѕСЃС‚Рѕ Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ".

### РЁР°Рі 2: РЎРµРіРјРµРЅС‚Р°С†РёСЏ (Р’Р·СЂРѕСЃР»С‹Р№ / Р РµР±РµРЅРѕРє)
**РљСЂРёС‚РёС‡РµСЃРєРёР№ СЌС‚Р°Рї РґР»СЏ РњРРЎ.**
*   **РРЅС‚РµСЂС„РµР№СЃ:** Р”РІР° РєСЂСѓРїРЅС‹С… Р±Р»РѕРєР° РёР»Рё РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЊ.
*   **Р›РѕРіРёРєР°:**
    *   Р•СЃР»Рё "Р РµР±РµРЅРѕРє" в†’ С„РёР»СЊС‚СЂСѓРµРј РІСЂР°С‡РµР№ РїРѕ РїСЂРёР·РЅР°РєСѓ `is_pediatrician` РёР»Рё РїРµСЂРµРєР»СЋС‡Р°РµРјСЃСЏ РЅР° Р±Р°Р·Сѓ Р”РµС‚СЃРєРѕРіРѕ РѕС‚РґРµР»РµРЅРёСЏ.
    *   Р•СЃР»Рё "Р’Р·СЂРѕСЃР»С‹Р№" в†’ РёСЃРєР»СЋС‡Р°РµРј РїРµРґРёР°С‚СЂРѕРІ.
*   **РџРѕР»Рµ:** `patient_type` (adult | child).

### РЁР°Рі 3: Р“РµРѕРіСЂР°С„РёСЏ (Р’С‹Р±РѕСЂ С„РёР»РёР°Р»Р°)
Р­С‚РѕС‚ С€Р°Рі РїРѕСЏРІР»СЏРµС‚СЃСЏ, РµСЃР»Рё СѓСЃР»СѓРіР° РґРѕСЃС‚СѓРїРЅР° РІ РЅРµСЃРєРѕР»СЊРєРёС… РјРµСЃС‚Р°С….
*   **Р’РёР·СѓР°Р»РёР·Р°С†РёСЏ:**
    *   РљР°СЂС‚Р° (РЇРЅРґРµРєСЃ/Google) СЃ РїРёРЅР°РјРё.
    *   РЎРїРёСЃРѕРє С„РёР»РёР°Р»РѕРІ СЃР»РµРІР°/СЃРЅРёР·Сѓ (РќР°Р·РІР°РЅРёРµ + РђРґСЂРµСЃ + РњРµС‚СЂРѕ).
*   **Р”Р»СЏ РЅР°С€РµРіРѕ РїСЂРѕРµРєС‚Р° (Р§РµР»СЏР±РёРЅСЃРє):**
    *   Р—РґРµСЃСЊ РїСЂРѕРёСЃС…РѕРґРёС‚ "РјР°РіРёСЏ" РјР°СЂС€СЂСѓС‚РёР·Р°С†РёРё.
    *   Р’С‹Р±РѕСЂ "Р¤РёР»РёР°Р» РЅР° РўСЂСѓРґР°" в†’ РїРµСЂРµРєР»СЋС‡Р°РµС‚ API РЅР° `chel_extra` (РѕР±РѕСЃРѕР±Р»РµРЅРЅРѕРµ РїРѕРґСЂР°Р·РґРµР»РµРЅРёРµ).
    *   Р’С‹Р±РѕСЂ "Р¤РёР»РёР°Р» РЅР° Р›РµРЅРёРЅР°" в†’ РїРµСЂРµРєР»СЋС‡Р°РµС‚ API РЅР° `chel_main`.
    *   *Р’РёР·СѓР°Р»СЊРЅРѕ РґР»СЏ РєР»РёРµРЅС‚Р°:* Р­С‚Рѕ РїСЂРѕСЃС‚Рѕ РІС‹Р±РѕСЂ СѓРґРѕР±РЅРѕРіРѕ Р°РґСЂРµСЃР°.

### РЁР°Рі 4: Р’С‹РґР°С‡Р° (Р’СЂР°С‡Рё Рё РЎР»РѕС‚С‹)
РљР°СЂС‚РѕС‡РєР° РІСЂР°С‡Р° РјР°РєСЃРёРјР°Р»СЊРЅРѕ РёРЅС„РѕСЂРјР°С‚РёРІРЅР°, С‡С‚РѕР±С‹ РїСЂРёРЅСЏС‚СЊ СЂРµС€РµРЅРёРµ Р±РµР· РїРµСЂРµС…РѕРґР° РІРЅСѓС‚СЂСЊ РїСЂРѕС„РёР»СЏ.
*   **Р”Р°РЅРЅС‹Рµ РєР°СЂС‚РѕС‡РєРё:**
    *   Р¤РѕС‚Рѕ (РљСЂСѓРі РёР»Рё РєРІР°РґСЂР°С‚ СЃРѕ СЃРєСЂСѓРіР»РµРЅРёРµРј).
    *   Р¤РРћ (Р–РёСЂРЅС‹Рј).
    *   РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ (РЎРµСЂС‹Рј).
    *   РљР°С‚РµРіРѕСЂРёСЏ/РЎС‚Р°Р¶ (Р‘РµР№РґР¶Рё).
    *   РЎС‚РѕРёРјРѕСЃС‚СЊ РїСЂРёРµРјР° (РЎСЂР°Р·Сѓ РІРёРґРЅР° С†РµРЅР°! РќР°РїСЂРёРјРµСЂ: "6700 в‚Ѕ").
*   **РЎР»РѕС‚С‹ (Р’СЂРµРјСЏ):**
    *   Р’С‹РІРѕРґСЏС‚СЃСЏ "С‚Р°Р±Р»РµС‚РєР°РјРё" РїСЂСЏРјРѕ РІ РєР°СЂС‚РѕС‡РєРµ (Р±Р»РёР¶Р°Р№С€РёРµ 3-4 СЃР»РѕС‚Р°).
    *   РљРЅРѕРїРєР° "Р‘РѕР»СЊС€Рµ РІСЂРµРјРµРЅРё" РѕС‚РєСЂС‹РІР°РµС‚ РєР°Р»РµРЅРґР°СЂСЊ.

### РЁР°Рі 5: Р¤РѕСЂРјР° РґР°РЅРЅС‹С… (РћС„РѕСЂРјР»РµРЅРёРµ)
РЎРєР°РЅРґРёРЅР°РІРёСЏ СЃРѕР±РёСЂР°РµС‚ РґР°РЅРЅС‹Рµ, РЅРµРѕР±С…РѕРґРёРјС‹Рµ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ РєР°СЂС‚С‹ РїР°С†РёРµРЅС‚Р° РІ РњРРЎ.




===== FILE: C:\git\apl\med\benchmarks\smclinic_analysis.md =====

# Р‘РµРЅС‡РјР°СЂРєРёРЅРі: "РЎРњ-РљР»РёРЅРёРєР°" (Enterprise Legacy)

**РЎС‚Р°С‚СѓСЃ:** Р РµС„РµСЂРµРЅСЃ СЃ РѕРіРѕРІРѕСЂРєР°РјРё (Р•СЃС‚СЊ РєСЂРёС‚РёС‡РµСЃРєРёРµ UX-РѕС€РёР±РєРё).
**РњРѕРґРµР»СЊ:** "РўСЏР¶РµР»С‹Р№ С„РёР»СЊС‚СЂ" РґР»СЏ РѕРіСЂРѕРјРЅРѕР№ СЃРµС‚Рё.

---

## 1. РћСЃРЅРѕРІРЅС‹Рµ РїСЂРѕР±Р»РµРјС‹ (UX-Friction)

РќР° РѕСЃРЅРѕРІРµ С‚РІРѕРµРіРѕ РѕРїС‹С‚Р° Рё СЃРєСЂРёРЅС€РѕС‚РѕРІ РІС‹СЏРІР»РµРЅС‹ "СѓР·РєРёРµ РјРµСЃС‚Р°", РєРѕС‚РѕСЂС‹Рµ СѓР±РёРІР°СЋС‚ РєРѕРЅРІРµСЂСЃРёСЋ:

1.  **РџРѕС‚РµСЂСЏ РєРѕРЅС‚РµРєСЃС‚Р° (Data Loss):**
    *   *РЎС†РµРЅР°СЂРёР№:* РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІРІРµР» "Р“РѕРґ СЂРѕР¶РґРµРЅРёСЏ" -> РџРµСЂРµС€РµР» РЅР° РІРєР»Р°РґРєСѓ "РљР°СЂС‚Р°" -> Р’РµСЂРЅСѓР»СЃСЏ РЅР°Р·Р°Рґ -> РџРѕР»Рµ "Р“РѕРґ СЂРѕР¶РґРµРЅРёСЏ" РїСѓСЃС‚РѕРµ.
    *   *Р”РёР°РіРЅРѕР·:* РћС‚СЃСѓС‚СЃС‚РІРёРµ СЃРѕС…СЂР°РЅРµРЅРёСЏ State РїСЂРё РЅР°РІРёРіР°С†РёРё.
    *   *РЈСЂРѕРє РґР»СЏ РЅР°СЃ:* Р”Р°РЅРЅС‹Рµ С‡РµСЂРЅРѕРІРёРєР° (`draft`) РґРѕР»Р¶РЅС‹ Р¶РёС‚СЊ РіР»РѕР±Р°Р»СЊРЅРѕ РІРѕ РІСЃРµРј РїСЂРёР»РѕР¶РµРЅРёРё, РїРѕРєР° Р·Р°РїРёСЃСЊ РЅРµ Р·Р°РІРµСЂС€РµРЅР°.

2.  **РџСЂРµР¶РґРµРІСЂРµРјРµРЅРЅС‹Р№ Р·Р°РїСЂРѕСЃ РґР°РЅРЅС‹С…:**
    *   РЎРёСЃС‚РµРјР° С‚СЂРµР±СѓРµС‚ РІРІРµСЃС‚Рё РґР°С‚Сѓ СЂРѕР¶РґРµРЅРёСЏ РїР°С†РёРµРЅС‚Р° *СЃР»РёС€РєРѕРј СЂР°РЅРѕ* (РЎРєСЂРёРЅС€РѕС‚ 6), РµС‰Рµ РґРѕ С‚РѕРіРѕ, РєР°Рє РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ СѓРІРёРґРµР» СЂР°СЃРїРёСЃР°РЅРёРµ.
    *   *РџРѕС‡РµРјСѓ СЌС‚Рѕ РїР»РѕС…Рѕ:* Р­С‚Рѕ СЃРѕР·РґР°РµС‚ Р±Р°СЂСЊРµСЂ. РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ С…РѕС‡РµС‚ РїСЂРѕСЃС‚Рѕ РїРѕСЃРјРѕС‚СЂРµС‚СЊ, РµСЃС‚СЊ Р»Рё СЃРІРѕР±РѕРґРЅРѕРµ РІСЂРµРјСЏ РЅР° РІС‹С…РѕРґРЅС‹С…, Р° РµРіРѕ Р·Р°СЃС‚Р°РІР»СЏСЋС‚ Р·Р°РїРѕР»РЅСЏС‚СЊ Р°РЅРєРµС‚Сѓ.
    *   *РљР°Рє РЅР°РґРѕ:* РЎРїСЂР°С€РёРІР°С‚СЊ РІРѕР·СЂР°СЃС‚ С‚РѕР»СЊРєРѕ РµСЃР»Рё СЌС‚Рѕ РєСЂРёС‚РёС‡РЅРѕ РґР»СЏ РІС‹Р±РѕСЂР° РІСЂР°С‡Р° (РїРµРґРёР°С‚СЂ/С‚РµСЂР°РїРµРІС‚), Рё РґРµР»Р°С‚СЊ СЌС‚Рѕ РЅР°С‚РёРІРЅРѕ (РїРµСЂРµРєР»СЋС‡Р°С‚РµР»РµРј "Р РµР±РµРЅРѕРє/Р’Р·СЂРѕСЃР»С‹Р№", РєР°Рє РІ РЎРєР°РЅРґРёРЅР°РІРёРё), Р° РЅРµ РІРІРѕРґРѕРј РґР°С‚С‹.

3.  **РЎРєСЂС‹С‚С‹Р№ Call-to-Action (CTA):**
    *   Р’ СЃРїРёСЃРєРµ РІСЂР°С‡РµР№ РєРЅРѕРїРєР° Р·Р°РїРёСЃРё РЅРµРѕС‡РµРІРёРґРЅР° РёР»Рё С‚СЂРµР±СѓРµС‚ РїСЂРѕРІР°Р»РёРІР°РЅРёСЏ РІ РєР°СЂС‚РѕС‡РєСѓ РІСЂР°С‡Р°. Р­С‚Рѕ Р»РёС€РЅРёР№ РєР»РёРє, СЃРЅРёР¶Р°СЋС‰РёР№ РєРѕРЅРІРµСЂСЃРёСЋ.

---

## 2. Р Р°Р·Р±РѕСЂ С„СѓРЅРєС†РёРѕРЅР°Р»Р° (РЎРєСЂРёРЅС€РѕС‚С‹)

### Р­РєСЂР°РЅ: Р’С‹Р±РѕСЂ РєР»РёРЅРёРєРё (Р“РµРѕРіСЂР°С„РёСЏ)
*РЎРєСЂРёРЅС€РѕС‚ 5 (РљР°СЂС‚Р°)*
Р”Р»СЏ СЃРµС‚Рё РёР· 20+ РєР»РёРЅРёРє СЌС‚Рѕ РЅРµРѕР±С…РѕРґРёРјРѕСЃС‚СЊ, РЅРѕ СЂРµР°Р»РёР·Р°С†РёСЏ СЃР»РѕР¶РЅР°СЏ.
*   **РљР»Р°СЃС‚РµСЂРёР·Р°С†РёСЏ:** РљР»РёРЅРёРєРё СЃРіСЂСѓРїРїРёСЂРѕРІР°РЅС‹ РІ РєСЂСѓР¶РєРё СЃ С†РёС„СЂР°РјРё "4", "3".
*   **Р§РµРєР±РѕРєСЃС‹:** РњРѕР¶РЅРѕ РІС‹Р±СЂР°С‚СЊ РєРѕРЅРєСЂРµС‚РЅС‹Рµ РєР»РёРЅРёРєРё СЃРїРёСЃРєР°.
*   **РџСЂРёРјРµРЅРёРјРѕСЃС‚СЊ РґР»СЏ РЅР°СЃ:**
    *   Р”Р»СЏ РЎРџР± (1 РєР»РёРЅРёРєР°) вЂ” РєР°СЂС‚Р° РЅРµ РЅСѓР¶РЅР°.
    *   Р”Р»СЏ Р§РµР»СЏР±РёРЅСЃРєР° (4 С„РёР»РёР°Р»Р°) вЂ” РєР»Р°СЃС‚РµСЂРёР·Р°С†РёСЏ РёР·Р±С‹С‚РѕС‡РЅР°, РЅРѕ **С‚Р°Р±С‹ "РЎРїРёСЃРѕРє / РќР° РєР°СЂС‚Рµ"** РјРѕРіСѓС‚ Р±С‹С‚СЊ РїРѕР»РµР·РЅС‹, РµСЃР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»Рё РѕСЂРёРµРЅС‚РёСЂСѓСЋС‚СЃСЏ РіРµРѕРіСЂР°С„РёС‡РµСЃРєРё.

### Р­РєСЂР°РЅ: Р Р°СЃРїРёСЃР°РЅРёРµ (РљР°Р»РµРЅРґР°СЂСЊ)
*РЎРєСЂРёРЅС€РѕС‚ 4*
*   **Р’РёРґ:** РљР»Р°СЃСЃРёС‡РµСЃРєРёР№ РєР°Р»РµРЅРґР°СЂСЊ РЅР° РјРµСЃСЏС† + СЃР»РѕС‚С‹ РІРЅРёР·Сѓ.
*   **РњРёРЅСѓСЃ:** Р—Р°РЅРёРјР°РµС‚ РІРµСЃСЊ СЌРєСЂР°РЅ. РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ С‚РµСЂСЏРµС‚ РёР· РІРёРґСѓ, Рє РєР°РєРѕРјСѓ РІСЂР°С‡Сѓ РѕРЅ Р·Р°РїРёСЃС‹РІР°РµС‚СЃСЏ (РєРѕРЅС‚РµРєСЃС‚ РІСЂР°С‡Р° РїСЂРѕРїР°Р» СЃ СЌРєСЂР°РЅР°).

### Р­РєСЂР°РЅ: РљР°СЂС‚РѕС‡РєР° РІСЂР°С‡Р° РІ Р»РёСЃС‚РёРЅРіРµ
*РЎРєСЂРёРЅС€РѕС‚ 3*
*   **Р­Р»РµРјРµРЅС‚С‹:** Р¤РѕС‚Рѕ, Р¤РРћ, РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ ("РћСЃС‚РµРѕРїР°С‚").
*   **Р¦РµРЅР°:** "3100 в‚Ѕ" вЂ” РєСЂСѓРїРЅРѕ. Р­С‚Рѕ РїР»СЋСЃ.
*   **РњРµС‚СЂРѕ/РђРґСЂРµСЃ:** "РњР°СЂСЊРёРЅР° Р РѕС‰Р°". Р’Р°Р¶РЅРѕ РґР»СЏ РњРѕСЃРєРІС‹, РІ Р§РµР»СЏР±РёРЅСЃРєРµ Р·Р°РјРµРЅРёРј РЅР° РЈР»РёС†Сѓ/Р Р°Р№РѕРЅ.
*   **РЎС‚Р°Р¶:** РЈРєР°Р·Р°РЅ.

---

## 3. Р’С‹РІРѕРґС‹ РґР»СЏ РЅР°С€РµРіРѕ РїСЂРѕРµРєС‚Р°

### Р§С‚Рѕ Р‘Р•Р Р•Рњ (Good Parts):
1.  **Р¦РµРЅР° РїСЂРёРµРјР° РІ Р»РёСЃС‚РёРЅРіРµ.** Р­С‚Рѕ С‡РµСЃС‚РЅРѕ Рё СЃРЅРёРјР°РµС‚ РІРѕРїСЂРѕСЃС‹.
2.  **РЇРІРЅРѕРµ СѓРєР°Р·Р°РЅРёРµ Р°РґСЂРµСЃР°** РІ РєР°СЂС‚РѕС‡РєРµ РІСЂР°С‡Р° (РґР»СЏ Р§РµР»СЏР±РёРЅСЃРєР°, РіРґРµ СЂР°Р·РЅС‹Рµ Р±Р°Р·С‹/С„РёР»РёР°Р»С‹). РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РґРѕР»Р¶РµРЅ РїРѕРЅРёРјР°С‚СЊ, РЅР° "РўСЂСѓРґР°" РѕРЅ РµРґРµС‚ РёР»Рё РЅР° "Р›РµРЅРёРЅР°", *РґРѕ* С‚РѕРіРѕ РєР°Рє Р·Р°РїРёС€РµС‚СЃСЏ.

### Р§РµРіРѕ РР—Р‘Р•Р“РђР•Рњ (Anti-patterns):
1.  **РќРµ СЃР±СЂР°СЃС‹РІР°С‚СЊ РґР°РЅРЅС‹Рµ!** Р•СЃР»Рё СЏ РІС‹Р±СЂР°Р» "Р’Р·СЂРѕСЃР»С‹Р№" Рё РїРѕС€РµР» СЃРјРѕС‚СЂРµС‚СЊ РєР°СЂС‚Сѓ С„РёР»РёР°Р»РѕРІ, РїРѕ РІРѕР·РІСЂР°С‰РµРЅРёРё "Р’Р·СЂРѕСЃР»С‹Р№" РґРѕР»Р¶РЅРѕ РѕСЃС‚Р°С‚СЊСЃСЏ РІС‹Р±СЂР°РЅРЅС‹Рј.
2.  **РќРµ С‚СЂРµР±РѕРІР°С‚СЊ РґР°С‚Сѓ СЂРѕР¶РґРµРЅРёСЏ РЅР° СЃС‚Р°СЂС‚Рµ.** Р”РѕСЃС‚Р°С‚РѕС‡РЅРѕ РїРµСЂРµРєР»СЋС‡Р°С‚РµР»СЏ "Р’Р·СЂРѕСЃР»С‹Р№/Р РµР±РµРЅРѕРє". РўРѕС‡РЅСѓСЋ РґР°С‚Сѓ СЃРїСЂРѕСЃРёРј РІ СЃР°РјРѕРј РєРѕРЅС†Рµ, РїСЂРё РѕС„РѕСЂРјР»РµРЅРёРё.
3.  **РќРµ РїСЂСЏС‚Р°С‚СЊ СЃР»РѕС‚С‹.** Р’СЂРµРјСЏ РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ РґРѕСЃС‚СѓРїРЅРѕ РІ РѕРґРёРЅ РєР»РёРє РёР· СЃРїРёСЃРєР° РІСЂР°С‡РµР№ (РєР°Рє РІ РЎРєР°РЅРґРёРЅР°РІРёРё), Р±РµР· Р·Р°С…РѕРґР° РІ РїСЂРѕС„РёР»СЊ.

### Р’РµСЂРґРёРєС‚
РЎРњ-РљР»РёРЅРёРєР° вЂ” РїСЂРёРјРµСЂ С‚РѕРіРѕ, РєР°Рє СЃР»РѕР¶РЅР°СЏ Р±РёР·РЅРµСЃ-Р»РѕРіРёРєР° (СЃРѕС‚РЅРё С„РёР»РёР°Р»РѕРІ, С‚С‹СЃСЏС‡Рё РІСЂР°С‡РµР№) РјРѕР¶РµС‚ Р·Р°РґР°РІРёС‚СЊ СѓРґРѕР±СЃС‚РІРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ. РњС‹ РґРµР»Р°РµРј СЂРµС€РµРЅРёРµ РґР»СЏ 2-С… РіРѕСЂРѕРґРѕРІ, РЅР°Рј С‚Р°РєР°СЏ С‚СЏР¶РµР»Р°СЏ СЃС‚СЂСѓРєС‚СѓСЂР° РЅРµ РЅСѓР¶РЅР°.



===== FILE: C:\git\apl\med\CONFIG_GUIDE.md =====


# Р СѓРєРѕРІРѕРґСЃС‚РІРѕ РїРѕ РєРѕРЅС„РёРіСѓСЂР°С†РёРё (Backend)

РђСЂС…РёС‚РµРєС‚СѓСЂР° РєРѕРЅС„РёРіСѓСЂР°С†РёРё СЂР°Р·РґРµР»РµРЅР° РЅР° РґРІР° СЃР»РѕСЏ РґР»СЏ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё Рё СѓРґРѕР±СЃС‚РІР° РѕР±РЅРѕРІР»РµРЅРёР№.

## 1. РЎС‚СЂСѓРєС‚СѓСЂР° С„Р°Р№Р»РѕРІ

*   **`php_backend/config.php`** (Main Config)
    *   РЎРѕРґРµСЂР¶РёС‚ Р»РѕРіРёРєСѓ, С…РµР»РїРµСЂС‹ Рё СЃС‚Р°С‚РёС‡РµСЃРєРёРµ РјР°РїРїРёРЅРіРё (РЅР°Р·РІР°РЅРёСЏ С„РёР»РёР°Р»РѕРІ, Р°РґСЂРµСЃР°).
    *   Р­С‚РѕС‚ С„Р°Р№Р» **Р±РµР·РѕРїР°СЃРЅРѕ РѕР±РЅРѕРІР»СЏС‚СЊ** РїСЂРё РІС‹С…РѕРґРµ РЅРѕРІС‹С… РІРµСЂСЃРёР№ РІРёРґР¶РµС‚Р°.
    *   РћРЅ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РїРѕРґРіСЂСѓР¶Р°РµС‚ СЃРµРєСЂРµС‚С‹ РёР· `config_access.php`.

*   **`php_backend/config_access.php`** (Secrets)
    *   **Р’РќРРњРђРќРР•:** Р­С‚РѕС‚ С„Р°Р№Р» РІС‹ РґРѕР»Р¶РЅС‹ СЃРѕР·РґР°С‚СЊ СЃР°РјРё РЅР° СЃРµСЂРІРµСЂРµ!
    *   РЎРѕРґРµСЂР¶РёС‚ РїР°СЂРѕР»Рё РѕС‚ Р‘Р” Рё API РєР»СЋС‡Рё.
    *   Р­С‚РѕС‚ С„Р°Р№Р» **РЅРёРєРѕРіРґР° РЅРµ РїРµСЂРµР·Р°РїРёСЃС‹РІР°РµС‚СЃСЏ** РїСЂРё РѕР±РЅРѕРІР»РµРЅРёРё (С‚Р°Рє РєР°Рє РµРіРѕ РЅРµС‚ РІ Р°СЂС…РёРІРµ СЃ РєРѕРґРѕРј).

## 2. РРЅСЃС‚СЂСѓРєС†РёСЏ РїРѕ СѓСЃС‚Р°РЅРѕРІРєРµ

1.  Р—Р°РіСЂСѓР·РёС‚Рµ РїР°РїРєСѓ `php_backend` РЅР° СЃРµСЂРІРµСЂ.
2.  РќР°Р№РґРёС‚Рµ С„Р°Р№Р» `php_backend/config_access.example.php`.
3.  РџРµСЂРµРёРјРµРЅСѓР№С‚Рµ РµРіРѕ РІ `config_access.php`.
4.  РћС‚РєСЂРѕР№С‚Рµ РµРіРѕ Рё РІРїРёС€РёС‚Рµ СЂРµР°Р»СЊРЅС‹Рµ РґРѕСЃС‚СѓРїС‹:
    *   Р”Р°РЅРЅС‹Рµ РѕС‚ Р±Р°Р·С‹ WordPress (`cms_db`).
    *   API РєР»СЋС‡Рё РѕС‚ qMS (`api_token`).

## 3. РњР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёРµ

Р•СЃР»Рё РІР°Рј РЅСѓР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ РЅРѕРІС‹Р№ С„РёР»РёР°Р» (Р»РѕРіРёС‡РµСЃРєРё):
1.  Р’ `config_access.php` РґРѕР±Р°РІСЊС‚Рµ Р±Р»РѕРє РІ `qms_instances` СЃ РЅРѕРІС‹Рј URL Рё РўРѕРєРµРЅРѕРј.
2.  Р’ `config.php` (РµСЃР»Рё РЅСѓР¶РЅРѕ) РґРѕР±Р°РІСЊС‚Рµ РјР°РїРїРёРЅРі Р°РґСЂРµСЃР° РІ `branches_map`.



===== FILE: C:\git\apl\med\DEPLOY.md =====


# Р СѓРєРѕРІРѕРґСЃС‚РІРѕ РїРѕ РґРµРїР»РѕСЋ (Enterprise Deployment Guide)

РњС‹ РїРѕРґРґРµСЂР¶РёРІР°РµРј РґРІРµ РјРѕРґРµР»Рё СЂР°Р·РІРµСЂС‚С‹РІР°РЅРёСЏ. РћСЃРЅРѕРІРЅР°СЏ РјРѕРґРµР»СЊ РґР»СЏ РІРµСЂСЃРёРё 2025 вЂ” **Self-Hosted**.

## 1. РЎС†РµРЅР°СЂРёР№ A: Self-Hosted / Site-in-a-Box (РћСЃРЅРѕРІРЅРѕР№)
*РџРѕРґС…РѕРґРёС‚ РґР»СЏ: Р’СЃРµС… РєР»РёРЅРёРє, С‚СЂРµР±СѓСЋС‰РёС… СЃРѕРѕС‚РІРµС‚СЃС‚РІРёСЏ 152-Р¤Р— Рё РїРѕР»РЅРѕРіРѕ РєРѕРЅС‚СЂРѕР»СЏ.*

Р’ СЌС‚РѕРј СЃС†РµРЅР°СЂРёРё РІРµСЃСЊ РєРѕРґ (React Widget + PHP Core + WP Plugin) С„РёР·РёС‡РµСЃРєРё РЅР°С…РѕРґРёС‚СЃСЏ РЅР° СЃРµСЂРІРµСЂРµ РєР»РёРµРЅС‚Р°.

### РџСЂРµРёРјСѓС‰РµСЃС‚РІР°:
*   **Security:** РџРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ РїР°С†РёРµРЅС‚РѕРІ (С‚РµР»РµС„РѕРЅС‹, Р¤РРћ) РѕР±СЂР°Р±Р°С‚С‹РІР°СЋС‚СЃСЏ РІРЅСѓС‚СЂРё РїРµСЂРёРјРµС‚СЂР° РєР»РёРЅРёРєРё Рё РѕС‚РїСЂР°РІР»СЏСЋС‚СЃСЏ СЃСЂР°Р·Сѓ РІ РњРРЎ. РњС‹ РёС… РЅРµ РІРёРґРёРј.
*   **Performance:** РњРёРЅРёРјР°Р»СЊРЅР°СЏ Р·Р°РґРµСЂР¶РєР° РјРµР¶РґСѓ СЃР°Р№С‚РѕРј Рё Р±СЌРєРµРЅРґРѕРј (local loopback).
*   **SEO:** РљРѕРЅС‚РµРЅС‚ РІСЂР°С‡РµР№ СЂРµРЅРґРµСЂРёС‚СЃСЏ РЅР° РґРѕРјРµРЅРµ РєР»РёРЅРёРєРё.

### РЎС‚СЂСѓРєС‚СѓСЂР° РїР°РїРѕРє РЅР° СЃРµСЂРІРµСЂРµ:
```
/var/www/site.ru/public_html/
в”њв”Ђв”Ђ wp-content/plugins/medical-os-core/  # РќР°С€ РїР»Р°РіРёРЅ (СЂРµРіРёСЃС‚СЂР°С†РёСЏ С‚РёРїРѕРІ РґР°РЅРЅС‹С…)
в”њв”Ђв”Ђ booking/                             # РџР°РїРєР° РІРёРґР¶РµС‚Р°
в”‚   в”њв”Ђв”Ђ dist/                            # React Frontend (JS/CSS)
в”‚   в”њв”Ђв”Ђ php_backend/                     # Booking Core (API Gateway)
в”‚   в”‚   в”њв”Ђв”Ђ config.php                   # Р›РѕРіРёРєР°
в”‚   в”‚   в””в”Ђв”Ђ config_access.php            # РЎРµРєСЂРµС‚С‹ (Р‘Р”, API РљР»СЋС‡Рё)
```

---

## 2. РЎС†РµРЅР°СЂРёР№ B: SaaS / Cloud Widget (Р”Р»СЏ РїР°СЂС‚РЅРµСЂРѕРІ)
*РџРѕРґС…РѕРґРёС‚ РґР»СЏ: РђРіСЂРµРіР°С‚РѕСЂРѕРІ, Р»РµРЅРґРёРЅРіРѕРІ, РїР°СЂС‚РЅРµСЂРѕРІ.*

Р’ СЌС‚РѕРј СЃС†РµРЅР°СЂРёРё Р‘СЌРєРµРЅРґ Рё РЎС‚Р°С‚РёРєР° Р»РµР¶Р°С‚ РЅР° РќРђРЁР•Рњ СЃРµСЂРІРµСЂРµ, Р° РєР»РёРµРЅС‚ РІСЃС‚Р°РІР»СЏРµС‚ С‚РѕР»СЊРєРѕ JS.

### РћРіСЂР°РЅРёС‡РµРЅРёСЏ:
*   РўСЂРµР±СѓРµС‚ РїРѕРґРїРёСЃР°РЅРёСЏ РґРѕРіРѕРІРѕСЂР° РїРѕСЂСѓС‡РµРЅРёСЏ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РџР”РЅ (С‚Р°Рє РєР°Рє РґР°РЅРЅС‹Рµ РїСЂРѕС…РѕРґСЏС‚ С‡РµСЂРµР· РЅР°С€ СЃРµСЂРІРµСЂ).
*   РўСЂРµР±СѓРµС‚ РЅР°СЃС‚СЂРѕР№РєРё CORS.

### РЁР°РіРё:
1.  Р Р°Р·РІРµСЂРЅРёС‚Рµ Backend Рё React РЅР° `https://api.booking-platform.ru`.
2.  РќР° СЃР°Р№С‚Рµ РєР»РёРµРЅС‚Р° РІСЃС‚Р°РІСЊС‚Рµ РєРѕРґ СЃ СѓРєР°Р·Р°РЅРёРµРј `data-api-url`:

```html
<div 
    id="root" 
    data-api-url="https://api.booking-platform.ru/php_backend/api.php"
    data-city="spb"
></div>

<script type="module" src="https://api.booking-platform.ru/assets/index.js"></script>
<link rel="stylesheet" href="https://api.booking-platform.ru/assets/index.css">
```

---

## 3. РџСЂРѕС†РµСЃСЃ РѕР±РЅРѕРІР»РµРЅРёСЏ (CI/CD)

РўР°Рє РєР°Рє Р°СЂС…РёС‚РµРєС‚СѓСЂР° РјРѕРґСѓР»СЊРЅР°СЏ:
1.  **Frontend Update:** Р—Р°РјРµРЅСЏСЋС‚СЃСЏ С„Р°Р№Р»С‹ РІ РїР°РїРєРµ `/dist`. РќРµ С‚СЂРµР±СѓРµС‚ РѕСЃС‚Р°РЅРѕРІРєРё СЃРµСЂРІРёСЃР°.
2.  **Core Update:** Р—Р°РјРµРЅСЏСЋС‚СЃСЏ С„Р°Р№Р»С‹ РІ `/php_backend` (РєСЂРѕРјРµ `config_access.php`).
3.  **WP Plugin Update:** РЎС‚Р°РЅРґР°СЂС‚РЅРѕРµ РѕР±РЅРѕРІР»РµРЅРёРµ С‡РµСЂРµР· Р°РґРјРёРЅРєСѓ WP.


===== FILE: C:\git\apl\med\dist\index.html =====

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Medical Booking Widget</title>
    
    <!-- PWA Settings -->
    <meta name="theme-color" content="#3b82f6" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="manifest" href="./manifest.json">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Import map for specific CDN/Environment cases -->

  <link rel="stylesheet" href="/index.css">
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@^19.2.4",
        "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
        "react/": "https://esm.sh/react@^19.2.4/",
        "lucide-react": "https://esm.sh/lucide-react@^0.563.0",
        "vite": "https://esm.sh/vite@^7.3.1",
        "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^5.1.3",
        "zustand": "https://esm.sh/zustand@^5.0.11",
        "zustand/": "https://esm.sh/zustand@^5.0.11/",
        "react-hook-form": "https://esm.sh/react-hook-form@^7.71.1",
        "@hookform/resolvers/": "https://esm.sh/@hookform/resolvers@^5.2.2/",
        "@sentry/react": "https://esm.sh/@sentry/react@^10.38.0",
        "zod": "https://esm.sh/zod@^4.3.6"
      }
    }
    </script>
  <script type="module" crossorigin src="./assets/index.js"></script>
  <link rel="modulepreload" crossorigin href="./assets/vendor.js">
  <link rel="modulepreload" crossorigin href="./assets/sentry.js">
  <link rel="stylesheet" crossorigin href="./assets/index.css">
</head>
  <body>
    <!-- Unique ID to prevent conflict with WordPress/Bitrix sites -->
    <div id="medical-booking-widget-root"></div>
    
    <!-- Vite Entry Point -->
</body>
</html>


===== FILE: C:\git\apl\med\dist\manifest.json =====


{
  "name": "Medical Booking",
  "short_name": "MedBooking",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "description": "Р‘С‹СЃС‚СЂР°СЏ Р·Р°РїРёСЃСЊ Рє РІСЂР°С‡Сѓ Р±РµР· Р·РІРѕРЅРєР°.",
  "icons": [
    {
      "src": "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}



===== FILE: C:\git\apl\med\docker-compose.yml =====


version: '3.8'

services:
  # PHP Backend (API Gateway)
  php:
    image: php:8.1-apache
    volumes:
      - ./php_backend:/var/www/html/php_backend
    ports:
      - "8000:80"
    working_dir: /var/www/html/php_backend
    environment:
      - APACHE_DOCUMENT_ROOT=/var/www/html/php_backend
    command: php -S 0.0.0.0:80 -t /var/www/html/php_backend

  # React Frontend (Vite)
  frontend:
    image: node:18-alpine
    working_dir: /app
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    command: npm run dev -- --host
    environment:
      - VITE_API_URL=http://localhost:8000/api.php
    depends_on:
      - php



===== FILE: C:\git\apl\med\docs\00_CODE_AUDIT_PLAN.md =====


# 00_CODE_AUDIT_PLAN: РћС‡РёСЃС‚РєР° РљРѕРґР° (Migration to Core)

**Р¦РµР»СЊ:** РџСЂРёРІРµСЃС‚Рё РєРѕРґРѕРІСѓСЋ Р±Р°Р·Сѓ РІ СЃРѕРѕС‚РІРµС‚СЃС‚РІРёРµ СЃ `01_STRATEGY_SEPARATION.md`.
**РџСЂРёРЅС†РёРї:** "Search = OK, Chat = DELETE". РњС‹ СѓРґР°Р»СЏРµРј РґРёР°Р»РѕРіРѕРІС‹Р№ РёРЅС‚РµСЂС„РµР№СЃ, РЅРѕ РѕСЃС‚Р°РІР»СЏРµРј РІРµРєС‚РѕСЂРЅС‹Р№ РїРѕРёСЃРє.

---

## рџ”ґ Р¤РђР—Рђ 1: Frontend Cleanup (РЈРґР°Р»РµРЅРёРµ UI Р§Р°С‚Р°)

### 1. РЈРґР°Р»РµРЅРёРµ РљРѕРјРїРѕРЅРµРЅС‚РѕРІ
Р­С‚Рё С„Р°Р№Р»С‹ РґРѕР»Р¶РЅС‹ Р±С‹С‚СЊ С„РёР·РёС‡РµСЃРєРё СѓРґР°Р»РµРЅС‹:
- [ ] рџ—‘ `src/components/steps/StepAI.tsx` (Р­РєСЂР°РЅ С‡Р°С‚Р°)
- [ ] рџ—‘ `src/components/modules/DoctorChatCard.tsx` (РљР°СЂС‚РѕС‡РєР° РІСЂР°С‡Р° РґР»СЏ С‡Р°С‚Р°)

### 2. Р РµС„Р°РєС‚РѕСЂРёРЅРі `src/App.tsx`
- [ ] РЈР±СЂР°С‚СЊ РёРјРїРѕСЂС‚ `StepAI`.
- [ ] РЈР±СЂР°С‚СЊ Р»РѕРіРёРєСѓ СЂРµРЅРґРµСЂРёРЅРіР° С€Р°РіР° "AI/Chat" (РѕР±С‹С‡РЅРѕ СЌС‚Рѕ Р±С‹Р» step 10 РёР»Рё switch case).
- [ ] РЈР±СЂР°С‚СЊ Р»СЋР±С‹Рµ СЃСЃС‹Р»РєРё РЅР° `AIChatMessage`.

### 3. Р РµС„Р°РєС‚РѕСЂРёРЅРі `src/components/steps/StepHome.tsx`
- [ ] РЈР±СЂР°С‚СЊ РєРЅРѕРїРєСѓ/РёРєРѕРЅРєСѓ "Sparkles" (Р’С…РѕРґ РІ AI СЂРµР¶РёРј).
- [ ] РћСЃС‚Р°РІРёС‚СЊ С‚РѕР»СЊРєРѕ Search Bar Рё РџР»РёС‚РєРё РєР°С‚РµРіРѕСЂРёР№.

### 4. РћС‡РёСЃС‚РєР° `src/store/bookingStore.ts`
- [ ] РЈРґР°Р»РёС‚СЊ С‚РёРїС‹ `AIChatMessage`.
- [ ] РЈРґР°Р»РёС‚СЊ РјРµС‚РѕРґС‹, СЃРІСЏР·Р°РЅРЅС‹Рµ СЃ РѕС‚РїСЂР°РІРєРѕР№ СЃРѕРѕР±С‰РµРЅРёР№ РІ С‡Р°С‚.

### 5. РћС‡РёСЃС‚РєР° `src/services/api.ts`
- [ ] рџ—‘ РЈРґР°Р»РёС‚СЊ РјРµС‚РѕРґ `sendAIChat`.
- [ ] РЈР±РµРґРёС‚СЊСЃСЏ, С‡С‚Рѕ `getDoctorsBySpecialty` СЂР°Р±РѕС‚Р°РµС‚ РєРѕСЂСЂРµРєС‚РЅРѕ СЃ "РЈРјРЅС‹Рј РїРѕРёСЃРєРѕРј".

---

## рџџ  Р¤РђР—Рђ 2: Backend Cleanup (РЈРґР°Р»РµРЅРёРµ Р›РѕРіРёРєРё Р§Р°С‚Р°)

### 1. РљРѕРЅС‚СЂРѕР»Р»РµСЂС‹ (`php_backend/controllers/`)
- [ ] рџ—‘ РЈРґР°Р»РёС‚СЊ `AiController.php` (РџРѕР»РЅРѕСЃС‚СЊСЋ, С‚Р°Рє РєР°Рє РѕРЅ РѕС‚РІРµС‡Р°Р» Р·Р° С‡Р°С‚).
- [ ] вњ… РћСЃС‚Р°РІРёС‚СЊ `SearchController.php`. РЈР±РµРґРёС‚СЊСЃСЏ, С‡С‚Рѕ РјРµС‚РѕРґ `handleSearch` РёСЃРїРѕР»СЊР·СѓРµС‚ `VectorService` С‚РѕР»СЊРєРѕ РґР»СЏ РїРѕРёСЃРєР° (`searchSimilar`), РЅРѕ РЅРµ РіРµРЅРµСЂРёСЂСѓРµС‚ С‚РµРєСЃС‚.

### 2. РЎРµСЂРІРёСЃС‹ (`php_backend/services/`)
- [ ] **OpenAiClient.php**:
    - [ ] РЈРґР°Р»РёС‚СЊ РјРµС‚РѕРґ `chat()` (Р“РµРЅРµСЂР°С†РёСЏ С‚РµРєСЃС‚Р°).
    - [ ] РћСЃС‚Р°РІРёС‚СЊ РјРµС‚РѕРґ `getEmbedding()` (РќСѓР¶РµРЅ РґР»СЏ РІРµРєС‚РѕСЂРёР·Р°С†РёРё РїРѕРёСЃРєРѕРІС‹С… Р·Р°РїСЂРѕСЃРѕРІ).
- [ ] **VectorService.php**:
    - [ ] РћСЃС‚Р°РІРёС‚СЊ Р±РµР· РёР·РјРµРЅРµРЅРёР№ (РѕРЅ РѕС‚РІРµС‡Р°РµС‚ С‚РѕР»СЊРєРѕ Р·Р° С…СЂР°РЅРµРЅРёРµ Рё РїРѕРёСЃРє РІРµРєС‚РѕСЂРѕРІ).

### 3. Р РѕСѓС‚РёРЅРі (`php_backend/api.php`)
- [ ] РЈРґР°Р»РёС‚СЊ РјР°СЂС€СЂСѓС‚ `$router->register('ai_chat', ...);`.
- [ ] РџРµСЂРµРёРјРµРЅРѕРІР°С‚СЊ РјР°СЂС€СЂСѓС‚ `ai_search` РІ `smart_search` (РµСЃР»Рё РµС‰Рµ РЅРµ СЃРґРµР»Р°РЅРѕ), С‡С‚РѕР±С‹ РѕС‚СЂР°Р¶Р°С‚СЊ СЃСѓС‚СЊ.

### 4. РђРґРјРёРЅРєР° (`php_backend/components/admin/`)
- [ ] Р’ `AdminLayout.tsx` СѓРґР°Р»РёС‚СЊ РІРєР»Р°РґРєСѓ "Playground" (РўРµСЃС‚ С‡Р°С‚Р°).
- [ ] РћСЃС‚Р°РІРёС‚СЊ РІРєР»Р°РґРєСѓ "Knowledge Base" (РРЅРґРµРєСЃР°С†РёСЏ РІСЂР°С‡РµР№), С‚Р°Рє РєР°Рє РїРѕРёСЃРє РґРѕР»Р¶РµРЅ СЂР°Р±РѕС‚Р°С‚СЊ.

---

## рџџЎ Р¤РђР—Рђ 3: Configuration & Database

### 1. РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ (`php_backend/config_parts/`)
- [ ] `01_infrastructure.php`:
    - [ ] РЈР±СЂР°С‚СЊ РЅР°СЃС‚СЂРѕР№РєРё `system_prompt` Рё `chat_model`.
    - [ ] РћСЃС‚Р°РІРёС‚СЊ `embedding_model` Рё РєР»СЋС‡Рё API (РґР»СЏ СЂР°Р±РѕС‚С‹ РїРѕРёСЃРєР°).
- [ ] `04_theme.php`:
    - [ ] РЈРґР°Р»РёС‚СЊ Р»РµР№Р±Р»С‹: `aiWelcome`, `aiDisclaimer`, `aiEmergency`.

### 2. Р‘Р°Р·Р° Р”Р°РЅРЅС‹С… (Supabase/SQL)
- [ ] РўР°Р±Р»РёС†Р° `doc_vectors` РѕСЃС‚Р°РµС‚СЃСЏ (РЅСѓР¶РЅР° РґР»СЏ РїРѕРёСЃРєР°).
- [ ] Р•СЃР»Рё Р±С‹Р»Рё С‚Р°Р±Р»РёС†С‹ `chat_logs`, РёС… РјРѕР¶РЅРѕ СѓРґР°Р»РёС‚СЊ.

---

## рџџў Р¤РђР—Рђ 4: РџСЂРѕРІРµСЂРєР° (Verification)

1.  **Build Check:** `npm run build` РґРѕР»Р¶РµРЅ РїСЂРѕР№С‚Рё Р±РµР· РѕС€РёР±РѕРє TypeScript (РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‰РёРµ РёРјРїРѕСЂС‚С‹ СѓРґР°Р»РµРЅРЅС‹С… РєРѕРјРїРѕРЅРµРЅС‚РѕРІ).
2.  **Runtime Check:**
    -   Р’РёРґР¶РµС‚ РѕС‚РєСЂС‹РІР°РµС‚СЃСЏ.
    -   РџРѕРёСЃРє "РљР°СЂРґРёРѕР»РѕРі" СЂР°Р±РѕС‚Р°РµС‚.
    -   РџРѕРёСЃРє "Р‘РѕР»РёС‚ СЃРµСЂРґС†Рµ" (РІРµРєС‚РѕСЂРЅС‹Р№) СЂР°Р±РѕС‚Р°РµС‚ Рё РІС‹РґР°РµС‚ РєР°СЂРґРёРѕР»РѕРіР°.
    -   РќРёРіРґРµ РЅРµС‚ РєРЅРѕРїРєРё "РџРѕРіРѕРІРѕСЂРёС‚СЊ СЃ Р°СЃСЃРёСЃС‚РµРЅС‚РѕРј".



===== FILE: C:\git\apl\med\docs\00_MASTER_PLAN.md =====


# 00. MASTER EXECUTION PLAN: Medical Booking Engine

**Version:** 1.0
**Strategy:** Hybrid (Self-Hosted Core + Cloud Config/Assets)
**Goal:** Enterprise-grade Booking Widget ready for multi-tenant scaling.

---

## рџЏ— PHASE 1: THE ENGINE (Backend Core)
**Focus:** Reliability, Standardization, Performance.

- [ ] **1.1. Architecture Cleanup**
    - [x] Remove old AI chat controllers (`AiController.php`).
    - [x] Establish strict `MisInterface`.
    - [ ] Implement `ConfigLoader` strategy (`config_parts/`).

- [ ] **1.2. The Driver System**
    - [ ] **QmsDriver:** Implement `curl_multi` for parallel DB queries.
    - [ ] **Data Normalizer:** Create the `normalizeResponse()` pipeline to convert specific MIS JSON to our Canonical JSON.
    - [ ] **Hydrator:** Implement the logic to merge MIS Data + WP Data (Photos/Badges).

- [ ] **1.3. API Gateway (`api.php`)**
    - [ ] Unified Error Handling (JSON responses only).
    - [ ] CORS & Rate Limiting implementation.
    - [ ] Input Validation layer.

---

## рџЋЁ PHASE 2: THE INTERFACE (Frontend Widget)
**Focus:** Dynamic Rendering, Configuration-Driven UI.

- [ ] **2.1. Bootstrapping**
    - [ ] `App.tsx`: Fetch `/api.php?action=get_config` on mount.
    - [ ] `theme.ts`: Apply CSS variables (colors, radius) from config.
    - [ ] Store: Initialize `topology` (cities, branches logic) in Zustand.

- [ ] **2.2. The Wizard Engine**
    - [ ] Make steps dynamic based on `config.behavior.entry_points`.
    - [ ] Implement `Reverse Branching` (Doctor -> Branch).
    - [ ] Implement `Smart Search` (Omnibox).

- [ ] **2.3. Component Library**
    - [ ] Finalize `DoctorCard` (with Badges & Price).
    - [ ] Finalize `TimeSlotGrid` (Mobile optimized).

---

## рџ›  PHASE 3: INTEGRATOR TOOLS (The 3-Touch Workflow)
**Focus:** Developer Experience (DX) & Deployment Speed.

- [ ] **3.1. Wizard Tool (`/tools/wizard`)**
    - [ ] Interactive form to collect client requirements.
    - [ ] Output: JSON for LLM Prompt.

- [ ] **3.2. Sync Tool (`/tools/sync_tool.php`)**
    - [ ] Visual table to map WP Users <-> MIS IDs.
    - [ ] Auto-match suggestions (fuzzy search).

- [ ] **3.3. LLM Prompts**
    - [ ] `docs/LLM_CONFIG_GENERATOR.md`: Generate `config.php` from questionnaire.
    - [ ] `docs/LLM_DRIVER_MAPPER.md`: Generate `normalize()` function from raw JSON.

---

## рџ”ђ PHASE 4: SECURITY & COMPLIANCE
**Focus:** 152-FZ, Stability.

- [ ] **4.1. Data Privacy**
    - [ ] Verify PII is NOT stored in logs.
    - [ ] Implement `config.compliance` checks (Age Gate, Consent).

- [ ] **4.2. Hardening**
    - [ ] `.htaccess` rules for `config_access.php`.
    - [ ] Rate Limiting (File-based token bucket).

- [ ] **4.3. Monitoring**
    - [ ] Sentry integration (Frontend & Backend).
    - [ ] Simple `health_check.php` endpoint.



===== FILE: C:\git\apl\med\docs\00_MIGRATION_PLAN.md =====


# MIGRATION PLAN: Focus on Booking Core

**Р¦РµР»СЊ:** РћС‡РёСЃС‚РёС‚СЊ РїСЂРѕРµРєС‚ РѕС‚ Р»РѕРіРёРєРё "Р Р°Р·РіРѕРІРѕСЂРЅРѕРіРѕ РђСЃСЃРёСЃС‚РµРЅС‚Р°", РѕСЃС‚Р°РІРёРІ С‚РѕР»СЊРєРѕ РјРѕС‰РЅС‹Р№ РґРІРёР¶РѕРє Р·Р°РїРёСЃРё Рё РёРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂСѓ СЃР°Р№С‚Р°.

---

## Р¤Р°Р·Р° 1: Р§РёСЃС‚РєР° Р”РѕРєСѓРјРµРЅС‚Р°С†РёРё (Done)
1.  [x] РџРµСЂРµРїРёСЃР°С‚СЊ `STRATEGIC_ARCHITECTURE_SEPARATION.md` (РЈРїРѕСЂ РЅР° Core).
2.  [x] РћР±РЅРѕРІРёС‚СЊ `MASTER_FEATURES_CATALOG.md` (РЈР±СЂР°С‚СЊ conversational features).
3.  [x] РћР±РЅРѕРІРёС‚СЊ `PRODUCT_STRATEGY_2025.md`.

## Р¤Р°Р·Р° 2: Р§РёСЃС‚РєР° Р¤СЂРѕРЅС‚РµРЅРґР° (`src/`)
**РЈРґР°Р»РёС‚СЊ:**
*   `src/components/steps/StepAI.tsx` вЂ” Р­РєСЂР°РЅ С‡Р°С‚Р°.
*   `src/components/modules/DoctorChatCard.tsx` вЂ” РљР°СЂС‚РѕС‡РєР° РІСЂР°С‡Р° СЃРїРµС†РёС„РёС‡РЅР°СЏ РґР»СЏ С‡Р°С‚Р°.
*   Р›РѕРіРёРєСѓ `Step 10` (AI Mode) РёР· `src/App.tsx`.
*   РљРЅРѕРїРєСѓ "Sparkles" (AI) СЃ РіР»Р°РІРЅРѕРіРѕ СЌРєСЂР°РЅР° (`StepHome.tsx`).

**РћСЃС‚Р°РІРёС‚СЊ:**
*   `useSmartSearch.ts` вЂ” РџРѕРёСЃРє РѕСЃС‚Р°РµС‚СЃСЏ, РЅРѕ СЂР°Р±РѕС‚Р°РµС‚ РєР°Рє "Google", Р° РЅРµ РєР°Рє "ChatGPT".
*   Р’СЃРµ РєРѕРјРїРѕРЅРµРЅС‚С‹ Р·Р°РїРёСЃРё (`StepDoctors`, `StepSlots`, `StepForm`).

## Р¤Р°Р·Р° 3: Р§РёСЃС‚РєР° Р‘СЌРєРµРЅРґР° (`php_backend/`)
**РЈРґР°Р»РёС‚СЊ:**
*   `controllers/AiController.php` вЂ” Р›РѕРіРёРєР° С‡Р°С‚Р° (`handleChat`).
*   `services/OpenAiClient.php` вЂ” РџСЂСЏРјРѕРµ РѕР±С‰РµРЅРёРµ СЃ LLM РґР»СЏ РіРµРЅРµСЂР°С†РёРё С‚РµРєСЃС‚Р°.
*   `services/VectorService.php` вЂ” *РћР±СЃСѓР¶РґР°РµРјРѕ*. Р•СЃР»Рё РјС‹ С…РѕС‚РёРј РѕСЃС‚Р°РІРёС‚СЊ "РЈРјРЅС‹Р№ РїРѕРёСЃРє" (РїРѕРёСЃРє РїРѕ СЃРјС‹СЃР»Сѓ, Р° РЅРµ РїРѕ СЃР»РѕРІР°Рј), РІРµРєС‚РѕСЂРЅС‹Р№ СЃРµСЂРІРёСЃ РјРѕР¶РЅРѕ РѕСЃС‚Р°РІРёС‚СЊ, РЅРѕ РїРµСЂРµРёРјРµРЅРѕРІР°С‚СЊ РІ `SearchService`. Р•СЃР»Рё РїРѕРёСЃРє Р±СѓРґРµС‚ РїСЂРѕСЃС‚С‹Рј (LIKE %query%) вЂ” СѓРґР°Р»РёС‚СЊ.
    *   *Р РµС€РµРЅРёРµ:* РћСЃС‚Р°РІРёС‚СЊ `VectorService` С‚РѕР»СЊРєРѕ РґР»СЏ РјРµС‚РѕРґР° `searchSimilar`, СѓР±СЂР°С‚СЊ РіРµРЅРµСЂР°С†РёСЋ РѕС‚РІРµС‚РѕРІ.

**РњРѕРґРёС„РёС†РёСЂРѕРІР°С‚СЊ:**
*   `api.php` вЂ” РЈР±СЂР°С‚СЊ СЂРѕСѓС‚С‹ `ai_chat`. РћСЃС‚Р°РІРёС‚СЊ `ai_search` (РїРµСЂРµРёРјРµРЅРѕРІР°С‚СЊ РІ `smart_search`).

## Р¤Р°Р·Р° 4: РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ
*   РЈР±СЂР°С‚СЊ СЃРµРєС†РёСЋ `ai` РёР· `config_access.php` (API РєР»СЋС‡Рё OpenAI/OpenRouter).
*   РЈР±СЂР°С‚СЊ РЅР°СЃС‚СЂРѕР№РєРё РїСЂРѕРјРїС‚РѕРІ РёР· `config_parts/`.

---

## Р РµР·СѓР»СЊС‚Р°С‚
РњС‹ РїРѕР»СѓС‡РёРј С‡РёСЃС‚С‹Р№, Р±С‹СЃС‚СЂС‹Р№ Рё РїРѕРЅСЏС‚РЅС‹Р№ РїСЂРѕРґСѓРєС‚: **Medical Booking Widget**.
РђСЃСЃРёСЃС‚РµРЅС‚ СЃС‚Р°РЅРµС‚ РѕС‚РґРµР»СЊРЅС‹Рј РїСЂРѕРµРєС‚РѕРј, РєРѕС‚РѕСЂС‹Р№ РїСЂРѕСЃС‚Рѕ С€Р»РµС‚ HTTP-Р·Р°РїСЂРѕСЃС‹ РІ РЅР°С€ `api.php`.



===== FILE: C:\git\apl\med\docs\00_SYSTEM_PASSPORT.md =====


# 00. System Passport: Medical Booking Core

**Product Name:** Medical Booking Widget (White-Label)
**Version:** 2.4 (Hybrid Architecture)
**Target:** Medical Clinics (Enterprise/Chain)

---

## 1. Executive Summary
РђРІС‚РѕРЅРѕРјРЅС‹Р№ JS-РІРёРґР¶РµС‚ РґР»СЏ РѕРЅР»Р°Р№РЅ-Р·Р°РїРёСЃРё, РїСЂРµРґРЅР°Р·РЅР°С‡РµРЅРЅС‹Р№ РґР»СЏ РІСЃС‚СЂР°РёРІР°РЅРёСЏ РІ Р»СЋР±С‹Рµ CMS (WordPress, Bitrix, Tilda). Р РµС€Р°РµС‚ РїСЂРѕР±Р»РµРјСѓ "Р›РѕСЃРєСѓС‚РЅРѕРіРѕ РѕРґРµСЏР»Р°", РєРѕРіРґР° Сѓ РєР»РёРЅРёРєРё РЅРµСЃРєРѕР»СЊРєРѕ С„РёР»РёР°Р»РѕРІ СЂР°Р±РѕС‚Р°СЋС‚ РІ СЂР°Р·РЅС‹С… Р±Р°Р·Р°С… РґР°РЅРЅС‹С… РњРРЎ, РЅРѕ РЅР° СЃР°Р№С‚Рµ СЌС‚Рѕ РґРѕР»Р¶РЅРѕ РІС‹РіР»СЏРґРµС‚СЊ РєР°Рє РµРґРёРЅРѕРµ СЂР°СЃРїРёСЃР°РЅРёРµ.

### РљР»СЋС‡РµРІР°СЏ С†РµРЅРЅРѕСЃС‚СЊ (USP)
1.  **Multi-Database Aggregation:** РћР±СЉРµРґРёРЅСЏРµС‚ СЃР»РѕС‚С‹ РёР· N РёР·РѕР»РёСЂРѕРІР°РЅРЅС‹С… Р±Р°Р· РґР°РЅРЅС‹С… (qMS, 1C) РІ РѕРґРёРЅ РёРЅС‚РµСЂС„РµР№СЃ.
2.  **CMS Hydration:** РћР±РѕРіР°С‰Р°РµС‚ "СЃСѓС…РёРµ" РґР°РЅРЅС‹Рµ РњРРЎ (Р¤РРћ, Р’СЂРµРјСЏ) РјР°СЂРєРµС‚РёРЅРіРѕРІС‹Рј РєРѕРЅС‚РµРЅС‚РѕРј (Р¤РѕС‚Рѕ, Р РµРіР°Р»РёРё, HTML-Р±РёРѕ) РёР· CMS СЃР°Р№С‚Р°.
3.  **Smart Routing:** РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРё РѕРїСЂРµРґРµР»СЏРµС‚, РІ РєР°РєСѓСЋ Р±Р°Р·Сѓ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°РїСЂРѕСЃ Р·Р°РїРёСЃРё, РѕСЃРЅРѕРІС‹РІР°СЏСЃСЊ РЅР° РІС‹Р±СЂР°РЅРЅРѕРј РІСЂР°С‡Рµ/С„РёР»РёР°Р»Рµ.

---

## 2. Technology Stack

### Frontend (Client-Side)
*   **Core:** React 18, TypeScript.
*   **State:** Zustand (Persisted Store).
*   **Styling:** Tailwind CSS (Semantic Design Tokens).
*   **Build:** Vite (Output: Single Bundle for embedding).
*   **Patterns:** Feature-Sliced Design (partial), Container/Presenter.

### Backend (Server-Side Middleware)
*   **Language:** PHP 7.4+ (Vanilla, No-Framework).
    *   *Why No Framework?* РњР°РєСЃРёРјР°Р»СЊРЅР°СЏ РїРѕСЂС‚Р°С‚РёРІРЅРѕСЃС‚СЊ. Р’РёРґР¶РµС‚ РґРѕР»Р¶РµРЅ Р·Р°РїСѓСЃРєР°С‚СЊСЃСЏ РїСЂРѕСЃС‚С‹Рј РєРѕРїРёСЂРѕРІР°РЅРёРµРј РїР°РїРєРё РЅР° Р»СЋР±РѕР№ Shared Hosting РєР»РёРµРЅС‚Р° (С‡Р°СЃС‚Рѕ СЌС‚Рѕ РґРµС€РµРІС‹Рµ С‚Р°СЂРёС„С‹ СЃ РѕРіСЂР°РЅРёС‡РµРЅРёРµРј РїР°РјСЏС‚Рё).
*   **Architecture:** Front Controller (`api.php`) -> Router -> Controllers -> Drivers.
*   **Concurrency:** `curl_multi` РґР»СЏ РїР°СЂР°Р»Р»РµР»СЊРЅРѕРіРѕ РѕРїСЂРѕСЃР° РІСЃРµС… Р±Р°Р· РњРРЎ (СЃРЅРёР¶РµРЅРёРµ Latency СЃ 4СЃ РґРѕ 1.5СЃ).
*   **Caching:** File-based JSON cache (РґР»СЏ СЃРїСЂР°РІРѕС‡РЅРёРєРѕРІ Рё СЃРїРёСЃРєР° РІСЂР°С‡РµР№).

---

## 3. Current Architecture: "The Hybrid Model"

РњС‹ РёСЃРїРѕР»СЊР·СѓРµРј РіРёР±СЂРёРґРЅС‹Р№ РїРѕРґС…РѕРґ РґР»СЏ Р±Р°Р»Р°РЅСЃР° РјРµР¶РґСѓ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚СЊСЋ РґР°РЅРЅС‹С… Рё СѓРґРѕР±СЃС‚РІРѕРј РѕР±РЅРѕРІР»РµРЅРёСЏ.

1.  **Static Assets (CDN/Host):** JS/CSS С„Р°Р№Р»С‹ Р·Р°РіСЂСѓР¶Р°СЋС‚СЃСЏ СЃ С†РµРЅС‚СЂР°Р»СЊРЅРѕРіРѕ СЃРµСЂРІРµСЂР° (РёР»Рё С…РѕСЃС‚РёРЅРіР° РєР»РёРµРЅС‚Р°).
2.  **Config Injection:** Р’РёРґР¶РµС‚ РїСЂРё СЃС‚Р°СЂС‚Рµ Р·Р°РіСЂСѓР¶Р°РµС‚ JSON-РєРѕРЅС„РёРі (С†РІРµС‚Р°, Р»РѕРіРёРєР°) СЃ СЃРµСЂРІРµСЂР°.
3.  **Data Gateway (PHP):**
    *   Р Р°Р·РјРµС‰Р°РµС‚СЃСЏ **РЅР° СЃРµСЂРІРµСЂРµ РєР»РёРµРЅС‚Р°** (Self-Hosted).
    *   РҐСЂР°РЅРёС‚ API-РєР»СЋС‡Рё РѕС‚ РњРРЎ РІ `config_access.php` (РІРЅРµ РїСѓР±Р»РёС‡РЅРѕРіРѕ РґРѕСЃС‚СѓРїР°).
    *   Р’С‹СЃС‚СѓРїР°РµС‚ РїСЂРѕРєСЃРё-С€Р»СЋР·РѕРј: `Browser -> Client PHP -> MIS API`.

### Data Flow Diagram
```
[Browser] 
   | (1. Get Config & Assets)
   v
[CDN / Static Host]
   
   | (2. JSON Request: "Find Cardiologist")
   v
[Client PHP Gateway] (Security Boundary)
   |-- (3a) Parallel Request --> [MIS DB 1 (Main)]
   |-- (3b) Parallel Request --> [MIS DB 2 (Branch)]
   |-- (3c) SQL Query        --> [WordPress DB (Photos)]
   |
   v (4. Aggregated JSON response)
[Browser Renders UI]
```

---

## 4. Potential & Growth

1.  **AI Integration (RAG):** РђСЂС…РёС‚РµРєС‚СѓСЂР° РіРѕС‚РѕРІР° Рє РІРЅРµРґСЂРµРЅРёСЋ РІРµРєС‚РѕСЂРЅРѕРіРѕ РїРѕРёСЃРєР° (РїРѕРёСЃРє РІСЂР°С‡Р° РїРѕ СЃРёРјРїС‚РѕРјР°Рј), С‚Р°Рє РєР°Рє PHP Gateway СѓР¶Рµ СѓРјРµРµС‚ Р°РіСЂРµРіРёСЂРѕРІР°С‚СЊ РґР°РЅРЅС‹Рµ.
2.  **Centralized SaaS:** РўРµРєСѓС‰РёР№ РєРѕРґ Р»РµРіРєРѕ Р·Р°РІРѕСЂР°С‡РёРІР°РµС‚СЃСЏ РІ Docker-РєРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ СЂР°Р·РІРµСЂС‚С‹РІР°РЅРёСЏ РІ РІРёРґРµ РѕР±Р»Р°С‡РЅРѕРіРѕ СЃРµСЂРІРёСЃР° (Multi-tenant SaaS), РµСЃР»Рё РјС‹ СЂРµС€РёРј С…СЂР°РЅРёС‚СЊ РєР»СЋС‡Рё Сѓ СЃРµР±СЏ.
3.  **Mobile App Wrapper:** Р’РёРґР¶РµС‚ Р°РґР°РїС‚РёРІРµРЅ Рё РјРѕР¶РµС‚ Р±С‹С‚СЊ СѓРїР°РєРѕРІР°РЅ РІ WebView РґР»СЏ РЅР°С‚РёРІРЅРѕРіРѕ РїСЂРёР»РѕР¶РµРЅРёСЏ РєР»РёРЅРёРєРё.

---

## 5. Risk Analysis (Current State)

*   **Fragmentation:** РћР±РЅРѕРІР»РµРЅРёРµ PHP-Р±СЌРєРµРЅРґР° Сѓ 100 РєР»РёРµРЅС‚РѕРІ С‚СЂРµР±СѓРµС‚ РґРѕСЃС‚СѓРїР° Рє РёС… СЃРµСЂРІРµСЂР°Рј (FTP/SSH).
*   **Security:** Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ РєР»СЋС‡РµР№ РњРРЎ Р·Р°РІРёСЃРёС‚ РѕС‚ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё С…РѕСЃС‚РёРЅРіР° РєР»РёРµРЅС‚Р° (РµСЃР»Рё РІР·Р»РѕРјР°СЋС‚ РёС… WordPress, РјРѕРіСѓС‚ СѓРєСЂР°СЃС‚СЊ РєР»СЋС‡Рё РёР· РЅР°С€РµРіРѕ РєРѕРЅС„РёРіР°).



===== FILE: C:\git\apl\med\docs\01_STRATEGY_PRODUCT.md =====


# PRODUCT STRATEGY 2025: Configuration-Driven Booking Engine

**РњРёСЃСЃРёСЏ:** РЎРѕР·РґР°С‚СЊ "РљРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ Р—Р°РїРёСЃРё" (Medical OS Core), РєРѕС‚РѕСЂС‹Р№ Р°РґР°РїС‚РёСЂСѓРµС‚СЃСЏ РїРѕРґ Р±РёР·РЅРµСЃ С‡РµСЂРµР· JSON-РєРѕРЅС„РёРіСѓСЂР°С†РёСЋ Рё СЃС‚СЂРѕРіРёР№ РєРѕРЅС‚СЂР°РєС‚ РґР°РЅРЅС‹С….

---

## 1. Р¤РёР»РѕСЃРѕС„РёСЏ РђСЂС…РёС‚РµРєС‚СѓСЂС‹: "Engine + Config + Connectors"

РњС‹ СЂР°Р·РґРµР»СЏРµРј СЃРёСЃС‚РµРјСѓ РЅР° С‚СЂРё РЅРµР·Р°РІРёСЃРёРјС‹С… СЃР»РѕСЏ:

1.  **The Engine (РЇРґСЂРѕ):** РЈРЅРёРІРµСЂСЃР°Р»СЊРЅС‹Р№ React-РІРёРґР¶РµС‚ Рё PHP Gateway. РћРЅ *РЅРµ Р·РЅР°РµС‚* СЃРїРµС†РёС„РёРєРё РєР»РёРµРЅС‚Р° (Р§РµР»СЏР±РёРЅСЃРє СЌС‚Рѕ РёР»Рё РњРѕСЃРєРІР°). РћРЅ Р·РЅР°РµС‚ С‚РѕР»СЊРєРѕ "РљРѕРЅС‚СЂР°РєС‚ Р”Р°РЅРЅС‹С…".
2.  **The Configuration (РџСЂР°РІРёР»Р° РёРіСЂС‹):** Р¤Р°Р№Р», РѕРїРёСЃС‹РІР°СЋС‰РёР№ 4 СЃР»РѕСЏ Р»РѕРіРёРєРё: Catalog, Flow, Presentation, Compliance.
3.  **The Connectors (РђРґР°РїС‚РµСЂС‹):** РЎР»РѕР№ PHP-РґСЂР°Р№РІРµСЂРѕРІ, РєРѕС‚РѕСЂС‹Р№ Р±РµСЂРµС‚ "РіСЂСЏР·РЅС‹Рµ" РґР°РЅРЅС‹Рµ РёР· РњРРЎ (qMS, 1C) Рё РїСЂРёРІРѕРґРёС‚ РёС… Рє "Р§РёСЃС‚РѕРјСѓ РљРѕРЅС‚СЂР°РєС‚Сѓ".

---

## 2. РџСЂРѕС†РµСЃСЃ Р’РЅРµРґСЂРµРЅРёСЏ (The 3-Touch LLM Workflow)

РњС‹ РёСЃРїРѕР»СЊР·СѓРµРј РР РєР°Рє РїРѕРјРѕС‰РЅРёРєР° РЅР° РєР°Р¶РґРѕРј СЌС‚Р°РїРµ РёРЅС‚РµРіСЂР°С†РёРё, С‡С‚РѕР±С‹ РёСЃРєР»СЋС‡РёС‚СЊ СЂСѓС‚РёРЅСѓ.

### Р­С‚Р°Рї 1: Pre-Sales & Requirements (LLM Touch #1)
*   **Р’С…РѕРґ:** РЎС‹СЂС‹Рµ РѕС‚РІРµС‚С‹ РєР»РёРµРЅС‚Р° (РљРІРёР·/РђРЅРєРµС‚Р°).
*   **Р”РµР№СЃС‚РІРёРµ:** Р—Р°РіСЂСѓР¶Р°РµРј РѕС‚РІРµС‚С‹ РІ LLM СЃ РїСЂРѕРјРїС‚РѕРј "Analyst".
*   **Р’С‹С…РѕРґ:** Р”РѕРєСѓРјРµРЅС‚ "РўРµС…РЅРёС‡РµСЃРєРёРµ С‚СЂРµР±РѕРІР°РЅРёСЏ Рє РљР»РёРµРЅС‚Сѓ" (РєР°РєРёРµ РґРѕСЃС‚СѓРїС‹ РґР°С‚СЊ, РєР°РєРёРµ РїРѕСЂС‚С‹ РѕС‚РєСЂС‹С‚СЊ).
*   *Р РµР·СѓР»СЊС‚Р°С‚:* РљР»РёРµРЅС‚ СѓС…РѕРґРёС‚ РіРѕС‚РѕРІРёС‚СЊ РґРѕСЃС‚СѓРїС‹.

### Р­С‚Р°Рї 2: Configuration (LLM Touch #2)
*   **Р’С…РѕРґ:** РџРѕРґС‚РІРµСЂР¶РґРµРЅРЅР°СЏ СЃС‚СЂСѓРєС‚СѓСЂР° РєР»РёРЅРёРєРё (Р“РѕСЂРѕРґР°, РђРґСЂРµСЃР°, Р›РѕРіРёРєР° СЂР°Р·РґРµР»РµРЅРёСЏ РїРѕС‚РѕРєРѕРІ).
*   **Р”РµР№СЃС‚РІРёРµ:** Р—Р°РіСЂСѓР¶Р°РµРј РґР°РЅРЅС‹Рµ РІ LLM СЃ РїСЂРѕРјРїС‚РѕРј `LLM_CONFIG_GENERATOR_PROMPT`.
*   **Р’С‹С…РѕРґ:** PHP-С„Р°Р№Р»С‹ РґР»СЏ РїР°РїРєРё `config_parts/` (`02_topology.php`, `04_theme.php`).
*   *Р РµР·СѓР»СЊС‚Р°С‚:* РЇРґСЂРѕ СЃРёСЃС‚РµРјС‹ РЅР°СЃС‚СЂРѕРµРЅРѕ РїРѕРґ Р±РёР·РЅРµСЃ-Р»РѕРіРёРєСѓ РєР»РёРµРЅС‚Р°.

### Р­С‚Р°Рї 3: Data Mapping (LLM Touch #3)
*   **Р’С…РѕРґ:** "Р“СЂСЏР·РЅС‹Р№" JSON-РѕС‚РІРµС‚ РѕС‚ СЂРµР°Р»СЊРЅРѕРіРѕ API РњРРЎ РєР»РёРµРЅС‚Р° + РќР°С€ СЌС‚Р°Р»РѕРЅРЅС‹Р№ Interface.
*   **Р”РµР№СЃС‚РІРёРµ:** Р—Р°РіСЂСѓР¶Р°РµРј РѕР±Р° JSON РІ LLM СЃ РїСЂРѕРјРїС‚РѕРј `LLM_DRIVER_MAPPER_PROMPT`.
*   **Р’С‹С…РѕРґ:** PHP-РєРѕРґ С„СѓРЅРєС†РёРё С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё (`normalizeResponse`).
*   *Р РµР·СѓР»СЊС‚Р°С‚:* Р”СЂР°Р№РІРµСЂ РіРѕС‚РѕРІ, "РіСЂСЏР·РЅС‹Рµ" РґР°РЅРЅС‹Рµ РїСЂРµРІСЂР°С‰Р°СЋС‚СЃСЏ РІ С‡РёСЃС‚С‹Рµ.

---

## 3. РљР»СЋС‡РµРІС‹Рµ РњРµС…Р°РЅРёРєРё (USP)

### A. Canonical Model: Schedule vs Appointment
РњС‹ СЂР°Р·РґРµР»СЏРµРј "Р”РѕСЃС‚СѓРїРЅРѕСЃС‚СЊ" Рё "Р¤Р°РєС‚ Р·Р°РїРёСЃРё".
*   **Schedule/Slot:** Р РµСЃСѓСЂСЃ "Р’СЂРµРјСЏ РІСЂР°С‡Р°". РЎСѓС‰РµСЃС‚РІСѓРµС‚ РѕР±СЉРµРєС‚РёРІРЅРѕ.
*   **Appointment:** Р¤Р°РєС‚ РґРѕРіРѕРІРѕСЂРµРЅРЅРѕСЃС‚Рё.

### B. Actor vs Offering (Р›РёС‡РЅРѕСЃС‚СЊ vs РџСЂРµРґР»РѕР¶РµРЅРёРµ)
*   **Actor:** Р’СЂР°С‡ РєР°Рє Р»РёС‡РЅРѕСЃС‚СЊ (Р¤РѕС‚Рѕ, РЎС‚Р°Р¶). РЎС‚Р°С‚РёС‡РµРЅ. Р‘РµСЂРµС‚СЃСЏ РёР· WP/CMS.
*   **Offering:** РљРѕРЅРєСЂРµС‚РЅРѕРµ РїСЂРµРґР»РѕР¶РµРЅРёРµ (РџСЂРёРµРј РЅР° СѓР». Р›РµРЅРёРЅР°, 5000СЂ). Р”РёРЅР°РјРёС‡РЅРѕ. Р‘РµСЂРµС‚СЃСЏ РёР· РњРРЎ.

### C. Smart Search (РЈРјРЅС‹Р№ РџРѕРёСЃРє)
РњС‹ РёСЃРїРѕР»СЊР·СѓРµРј РІРµРєС‚РѕСЂРЅС‹Р№ РїРѕРёСЃРє РґР»СЏ РјР°РїРїРёРЅРіР° "РЎРёРјРїС‚РѕРј -> РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ".
*   *РћС‚Р»РёС‡РёРµ РѕС‚ Р§Р°С‚Р°:* Р­С‚Рѕ РЅРµ РґРёР°Р»РѕРі. РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІРІРѕРґРёС‚ "Р‘РѕР»РёС‚ СѓС…Рѕ", СЃРёСЃС‚РµРјР° РјРіРЅРѕРІРµРЅРЅРѕ С„РёР»СЊС‚СЂСѓРµС‚ СЃРїРёСЃРѕРє РІСЂР°С‡РµР№ (Р›РћР ), Р±РµР· "РџСЂРёРІРµС‚, СЏ Р±РѕС‚...".

---

## 4. Security & Compliance Layer (GDPR / 152-Р¤Р—)

1.  **Compliance Policy:** РљРѕРЅС„РёРі РѕРїСЂРµРґРµР»СЏРµС‚, РєР°РєРёРµ РґР°РЅРЅС‹Рµ РјС‹ *РёРјРµРµРј РїСЂР°РІРѕ* РѕР±СЂР°Р±Р°С‚С‹РІР°С‚СЊ.
2.  **Data Minimization:** Р•СЃР»Рё РњРРЎ РїРѕР·РІРѕР»СЏРµС‚, РјС‹ РЅРµ СЃРїСЂР°С€РёРІР°РµРј РћС‚С‡РµСЃС‚РІРѕ РёР»Рё Email.
3.  **Audit Logging:** Р›РѕРіРёСЂРѕРІР°РЅРёРµ РІСЃРµС… РґРµР№СЃС‚РІРёР№ (Search, View, Book, Error).



===== FILE: C:\git\apl\med\docs\01_STRATEGY_SEPARATION.md =====


# STRATEGIC ARCHITECTURE: The Hybrid Model

**Status:** Approved Vision
**Business Model:** 
1.  **Booking Core:** One-time license / Integration fee (Self-Hosted).
2.  **Assistant OS:** Recurring Subscription (SaaS).

---

## 1. The "Body": Booking Core (Local / On-Premise)
*Р Р°Р·РјРµС‰Р°РµС‚СЃСЏ РЅР° СЃРµСЂРІРµСЂР°С… РєР»РёРµРЅС‚РѕРІ (РљР»РёРЅРёРєР° "РСЃС‚РѕС‡РЅРёРє", РџР°СЂС‚РЅРµСЂС‹).*

Р­С‚Рѕ "РёСЃРїРѕР»РЅРёС‚РµР»СЊРЅС‹Р№ РјРµС…Р°РЅРёР·Рј". РћРЅ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РјР°РєСЃРёРјР°Р»СЊРЅРѕ РїСЂРѕСЃС‚С‹Рј РІ СѓСЃС‚Р°РЅРѕРІРєРµ Рё РЅРµС‚СЂРµР±РѕРІР°С‚РµР»СЊРЅС‹Рј Рє СЂРµСЃСѓСЂСЃР°Рј.

### РўРµС…РЅРёС‡РµСЃРєРёР№ РІС‹Р±РѕСЂ: PHP 8.x
*   **РџСЂРёС‡РёРЅР°:** РЎРѕРІРјРµСЃС‚РёРјРѕСЃС‚СЊ СЃ 99% С…РѕСЃС‚РёРЅРіРѕРІ (Shared Hosting, cPanel, ISPmanager), РіРґРµ Р¶РёРІСѓС‚ СЃР°Р№С‚С‹ РєР»РёРЅРёРє РЅР° WordPress/Bitrix.
*   **Р РѕР»СЊ:** 
    *   РђР±СЃС‚СЂР°РєС†РёСЏ РЅР°Рґ РњРРЎ (qMS, 1C, Medods).
    *   РҐСЂР°РЅРµРЅРёРµ С‡СѓРІСЃС‚РІРёС‚РµР»СЊРЅС‹С… РґР°РЅРЅС‹С… (РџР”РЅ) РІРЅСѓС‚СЂРё РїРµСЂРёРјРµС‚СЂР° РєР»РёРЅРёРєРё (152-Р¤Р— Compliance).
    *   РџСЂРµРґРѕСЃС‚Р°РІР»РµРЅРёРµ СЃС‚Р°РЅРґР°СЂС‚РёР·РёСЂРѕРІР°РЅРЅРѕРіРѕ REST API РґР»СЏ РІРЅРµС€РЅРёС… СЃРёСЃС‚РµРј.

### РљР»СЋС‡РµРІР°СЏ С†РµРЅРЅРѕСЃС‚СЊ РґР»СЏ РљР»РёРµРЅС‚Р°:
*   "Р”Р°РЅРЅС‹Рµ РЅРµ РїРѕРєРёРґР°СЋС‚ РЅР°С€ СЃРµСЂРІРµСЂ".
*   "РќРµ РЅСѓР¶РЅРѕ РїРѕРєСѓРїР°С‚СЊ РґРѕСЂРѕРіРёРµ СЃРµСЂРІРµСЂР°".
*   "РџР»Р°С‚РёРј РѕРґРёРЅ СЂР°Р· Р·Р° РІРЅРµРґСЂРµРЅРёРµ".

---

## 2. The "Brain": Assistant OS (Cloud / SaaS)
*Р Р°Р·РјРµС‰Р°РµС‚СЃСЏ РЅР° С‚РІРѕРµРј РѕР±Р»Р°РєРµ. Р­С‚Рѕ С‚РѕС‡РєР° РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёСЏ Р±РёР·РЅРµСЃР°.*

Р­С‚Рѕ РёРЅС‚РµР»Р»РµРєС‚СѓР°Р»СЊРЅС‹Р№ СЃР»РѕР№. РћРЅ Р°РЅР°Р»РёР·РёСЂСѓРµС‚ СЃР°Р№С‚С‹ РєР»РёРµРЅС‚РѕРІ, СЃС‚СЂРѕРёС‚ РіСЂР°С„С‹ Р·РЅР°РЅРёР№ Рё СѓРїСЂР°РІР»СЏРµС‚ РґРёР°Р»РѕРіРѕРј.

### РўРµС…РЅРёС‡РµСЃРєРёР№ РІС‹Р±РѕСЂ: Node.js / Python
*   **РџСЂРёС‡РёРЅР°:** Р­РєРѕСЃРёСЃС‚РµРјР° AI (LangChain, Vercel AI SDK), WebSockets, Vector Databases.
*   **Р РѕР»СЊ:**
    *   RAG (РџРѕРёСЃРє РїРѕ Р±Р°Р·Рµ Р·РЅР°РЅРёР№ СЃР°Р№С‚Р°).
    *   LLM Orchestration (РЈРїСЂР°РІР»РµРЅРёРµ РґРёР°Р»РѕРіРѕРј).
    *   Voice Processing (ASR/TTS).

### Р’Р·Р°РёРјРѕРґРµР№СЃС‚РІРёРµ (The Bridge):
AI РђСЃСЃРёСЃС‚РµРЅС‚ РЅРµ "С…РѕРґРёС‚ РІ Р±Р°Р·Сѓ" РєР»РёРЅРёРєРё РЅР°РїСЂСЏРјСѓСЋ. РћРЅ РёСЃРїРѕР»СЊР·СѓРµС‚ **Tool Calling**, РѕР±СЂР°С‰Р°СЏСЃСЊ Рє РїСѓР±Р»РёС‡РЅРѕРјСѓ API Booking Core.

*   **User:** "Р—Р°РїРёС€Рё РјРµРЅСЏ Рє Р»РѕСЂСѓ РЅР° Р·Р°РІС‚СЂР°".
*   **SaaS Brain:** РџРѕРЅРёРјР°РµС‚ РёРЅС‚РµРЅС‚ `booking`. Р¤РѕСЂРјРёСЂСѓРµС‚ JSON-Р·Р°РїСЂРѕСЃ.
*   **Network:** `POST https://clinic-site.ru/booking/api.php?action=get_slots`
*   **Local Body:** РћС‚РґР°РµС‚ СЃР»РѕС‚С‹.
*   **SaaS Brain:** Р¤РѕСЂРјРёСЂСѓРµС‚ РєСЂР°СЃРёРІС‹Р№ РѕС‚РІРµС‚.

---

## 3. РЎС†РµРЅР°СЂРёР№ РІРЅРµРґСЂРµРЅРёСЏ (Roadmap)

### Р­С‚Р°Рї 1: "РСЃС‚РѕС‡РЅРёРє" (MVP & Cash)
1.  Р Р°Р·РІРµСЂРЅСѓС‚СЊ `php_backend` Рё `React Widget` РЅР° С…РѕСЃС‚РёРЅРіРµ РєР»РёРЅРёРєРё.
2.  РќР°СЃС‚СЂРѕРёС‚СЊ `config_access.php` Р»РѕРєР°Р»СЊРЅРѕ.
3.  **Р РµР·СѓР»СЊС‚Р°С‚:** Р Р°Р±РѕС‚Р°СЋС‰Р°СЏ РѕРЅР»Р°Р№РЅ-Р·Р°РїРёСЃСЊ, РїСЂРµРјРёСЏ, РґРѕРІРѕР»СЊРЅРѕРµ СЂСѓРєРѕРІРѕРґСЃС‚РІРѕ. Р”Р°РЅРЅС‹Рµ РІ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё.

### Р­С‚Р°Рї 2: "SaaS Launch" (Startup)
1.  РџРѕРґРЅСЏС‚СЊ СЃРµСЂРІРµСЂ РЅР° Node.js (SaaS).
2.  Р РµР°Р»РёР·РѕРІР°С‚СЊ "РЈРЅРёРІРµСЂСЃР°Р»СЊРЅРѕРіРѕ РїР°СЂСЃРµСЂР°" СЃР°Р№С‚РѕРІ (РґР»СЏ РЅР°РїРѕР»РЅРµРЅРёСЏ Р±Р°Р·С‹ Р·РЅР°РЅРёР№).
3.  РџСЂРµРґР»РѕР¶РёС‚СЊ "РСЃС‚РѕС‡РЅРёРєСѓ" РїРѕРґРєР»СЋС‡РёС‚СЊ "РЈРјРЅРѕРіРѕ РїРѕРјРѕС‰РЅРёРєР°" Р·Р° РїРѕРґРїРёСЃРєСѓ (РёР»Рё Р±РµСЃРїР»Р°С‚РЅРѕ РєР°Рє Р±РµС‚Р°-С‚РµСЃС‚РµСЂСѓ).
4.  Р’ РєРѕРґРµ РІРёРґР¶РµС‚Р° Р·Р°РјРµРЅРёС‚СЊ `StepHome` РЅР° РІС‹Р·РѕРІ РѕР±Р»Р°С‡РЅРѕРіРѕ РІРёРґР¶РµС‚Р°.

---

## 4. РџРѕС‡РµРјСѓ СЌС‚Рѕ "РџРѕ-РІР·СЂРѕСЃР»РѕРјСѓ"?
Р­С‚Р° Р°СЂС…РёС‚РµРєС‚СѓСЂР° РЅР°Р·С‹РІР°РµС‚СЃСЏ **"Edge-Cloud Hybrid"**.
*   **Edge (PHP):** Р‘С‹СЃС‚СЂРѕРґРµР№СЃС‚РІРёРµ, Р±РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ РґР°РЅРЅС‹С…, СЂР°Р±РѕС‚Р° СЃ Р¶РµР»РµР·РѕРј (РњРРЎ).
*   **Cloud (Node):** РўСЏР¶РµР»С‹Рµ РІС‹С‡РёСЃР»РµРЅРёСЏ (AI), РѕР±РЅРѕРІР»РµРЅРёСЏ Р»РѕРіРёРєРё Р±РµР· РґРѕСЃС‚СѓРїР° Рє СЃРµСЂРІРµСЂР°Рј РєР»РёРµРЅС‚РѕРІ, СЃР±РѕСЂ Р°РЅР°Р»РёС‚РёРєРё.

РњС‹ РЅРµ СЃРјРµС€РёРІР°РµРј РјСѓС… Рё РєРѕС‚Р»РµС‚. Р•СЃР»Рё Сѓ С‚РµР±СЏ СѓРїР°РґРµС‚ SaaS, Р·Р°РїРёСЃСЊ РІ РєР»РёРЅРёРєРµ (С‡РµСЂРµР· РѕР±С‹С‡РЅС‹Р№ РІРёРґР¶РµС‚) РїСЂРѕРґРѕР»Р¶РёС‚ СЂР°Р±РѕС‚Р°С‚СЊ. Р­С‚Рѕ РЅР°РґРµР¶РЅРѕСЃС‚СЊ СѓСЂРѕРІРЅСЏ Enterprise.



===== FILE: C:\git\apl\med\docs\02_ARCHITECTURE_CMS.md =====


# WP CONTENT OS: Architecture & Strategy

**Status:** Approved Specification
**Focus:** WordPress as Headless Content Layer ("Site-in-a-Box")
**Principle:** 90/10 Rule (90% Standard Modules / 10% Custom Config)

---

## 1. РљРѕРЅС†РµРїС†РёСЏ Рё Р“СЂР°РЅРёС†С‹
WordPress РІС‹СЃС‚СѓРїР°РµС‚ **РЅРµ** РєР°Рє РјРѕРЅРѕР»РёС‚, РІС‹РїРѕР»РЅСЏСЋС‰РёР№ Р±РёР·РЅРµСЃ-Р»РѕРіРёРєСѓ Р·Р°РїРёСЃРё, Р° РєР°Рє **Content OS (РћРїРµСЂР°С†РёРѕРЅРЅР°СЏ РЎРёСЃС‚РµРјР° РљРѕРЅС‚РµРЅС‚Р°)**.

### Р—РѕРЅС‹ РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚Рё:
1.  **WP (Content OS):** РҐСЂР°РЅРёС‚ "Р’РёС‚СЂРёРЅСѓ". Р¤РѕС‚Рѕ РІСЂР°С‡РµР№, РѕРїРёСЃР°РЅРёСЏ СѓСЃР»СѓРі, SEO-С‚РµРєСЃС‚С‹, FAQ, РђРєС†РёРё. Р­С‚Рѕ "РСЃС‚РёРЅР° РґР»СЏ РњР°СЂРєРµС‚РёРЅРіР°".
2.  **Booking Core (Transaction OS):** РҐСЂР°РЅРёС‚ "РЎР»РѕС‚С‹". Р­С‚Рѕ "РСЃС‚РёРЅР° РґР»СЏ Р Р°СЃРїРёСЃР°РЅРёСЏ".
3.  **Hydrator:** РЎР»РѕР№, РєРѕС‚РѕСЂС‹Р№ СЃРєР»РµРёРІР°РµС‚ `WP.Doctor` (РљРѕРЅС‚РµРЅС‚) Рё `Core.Doctor` (РЎР»РѕС‚С‹) РїРѕ РєР»СЋС‡Сѓ `external_id`.

**РџРѕС‡РµРјСѓ СЌС‚Рѕ РІР°Р¶РЅРѕ:** РљРѕРЅС‚РµРЅС‚-РјРµРЅРµРґР¶РµСЂ СЂР°Р±РѕС‚Р°РµС‚ РІ РїСЂРёРІС‹С‡РЅРѕРј WP. РЎРёСЃС‚РµРјР° Р·Р°РїРёСЃРё СЂР°Р±РѕС‚Р°РµС‚ РЅРµР·Р°РІРёСЃРёРјРѕ. Р•СЃР»Рё СЃР°Р№С‚ СѓРїР°РґРµС‚, РїСЂСЏРјС‹Рµ СЃСЃС‹Р»РєРё РЅР° Р·Р°РїРёСЃСЊ РїСЂРѕРґРѕР»Р¶Р°С‚ СЂР°Р±РѕС‚Р°С‚СЊ.

---

## 2. РўРµС…РЅРѕР»РѕРіРёС‡РµСЃРєРёР№ РЎС‚РµРє (The "Clean Stack")

Р§С‚РѕР±С‹ РёР·Р±РµР¶Р°С‚СЊ "Р·РѕРѕРїР°СЂРєР° РїР»Р°РіРёРЅРѕРІ", РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј СЃС‚СЂРѕРіРёР№ РјРёРЅРёРјСѓРј:

1.  **Custom Plugin ("Medical OS Core"):** Р РµРіРёСЃС‚СЂРёСЂСѓРµС‚ CPT Рё РўР°РєСЃРѕРЅРѕРјРёРё С‡РµСЂРµР· РєРѕРґ (`register_post_type`). РќРёРєР°РєРёС… "CPT UI" РїР»Р°РіРёРЅРѕРІ, РіРґРµ РєР»РёРµРЅС‚ РјРѕР¶РµС‚ СЃР»СѓС‡Р°Р№РЅРѕ СѓРґР°Р»РёС‚СЊ СЃСѓС‰РЅРѕСЃС‚СЊ.
2.  **ACF Pro:** РЈРїСЂР°РІР»СЏРµС‚ РїРѕР»СЏРјРё.
    *   **Strategy:** "Schema as Code". РњС‹ РёСЃРїРѕР»СЊР·СѓРµРј `ACF Local JSON`.
    *   РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ РїРѕР»РµР№ С…СЂР°РЅРёС‚СЃСЏ РІ Git-СЂРµРїРѕР·РёС‚РѕСЂРёРё РїР»Р°РіРёРЅР°, Р° РЅРµ РІ Р±Р°Р·Рµ РґР°РЅРЅС‹С….
    *   РџСЂРё РґРµРїР»РѕРµ РїРѕР»СЏ СЃРёРЅС…СЂРѕРЅРёР·РёСЂСѓСЋС‚СЃСЏ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё.

---

## 3. РљР°РЅРѕРЅРёС‡РµСЃРєР°СЏ РњРѕРґРµР»СЊ Р”Р°РЅРЅС‹С… (Data Schema)

### A. Custom Post Types (РЎСѓС‰РЅРѕСЃС‚Рё)
РћР±СЏР·Р°С‚РµР»СЊРЅС‹Р№ РЅР°Р±РѕСЂ ("Foundation Modules"):

| CPT Key | РќР°Р·РІР°РЅРёРµ | РќР°Р·РЅР°С‡РµРЅРёРµ | РЎРІСЏР·Рё |
| :--- | :--- | :--- | :--- |
| `doctor_profile` | РџСЂРѕС„РёР»СЊ Р’СЂР°С‡Р° | РРјРёРґР¶РµРІС‹Р№ РєРѕРЅС‚РµРЅС‚ (Р¤РѕС‚Рѕ, Р‘РёРѕ, Р РµРіР°Р»РёРё). | -> `specialty`, `service` |
| `service` | РЈСЃР»СѓРіР° | Р’РёС‚СЂРёРЅР° СѓСЃР»СѓРіРё (РЅРµ РїСѓС‚Р°С‚СЊ СЃРѕ СЃР»РѕС‚РѕРј РњРРЎ). | -> `specialty`, `service_class` |
| `branch` | Р¤РёР»РёР°Р» | РђРґСЂРµСЃ, РєР°СЂС‚Р°, С„РѕС‚Рѕ РёРЅС‚РµСЂСЊРµСЂР°. | -> `city` |
| `faq` | Р’РѕРїСЂРѕСЃ-РћС‚РІРµС‚ | Р‘Р°Р·Р° Р·РЅР°РЅРёР№ РґР»СЏ RAG (AI) Рё SEO. | -> `service`, `specialty` |

РћРїС†РёРѕРЅР°Р»СЊРЅС‹Рµ РјРѕРґСѓР»Рё (РІРєР»СЋС‡Р°СЋС‚СЃСЏ РІ РєРѕРЅС„РёРіРµ):
*   `promo` (РђРєС†РёРё)
*   `review` (РћС‚Р·С‹РІС‹)
*   `team_member` (РђРґРјРёРЅРёСЃС‚СЂР°С‚РёРІРЅС‹Р№ РїРµСЂСЃРѕРЅР°Р», РЅРµ РІСЂР°С‡Рё)

### B. Taxonomies (РљР»Р°СЃСЃРёС„РёРєР°С†РёСЏ)
*   `specialty` (РРµСЂР°СЂС…РёС‡РµСЃРєР°СЏ): Р“Р»Р°РІРЅС‹Р№ РєР»Р°СЃСЃРёС„РёРєР°С‚РѕСЂ.
    *   *РџСЂРёРјРµСЂ:* РЎС‚РѕРјР°С‚РѕР»РѕРіРёСЏ -> РҐРёСЂСѓСЂРіРёСЏ -> РЈРґР°Р»РµРЅРёРµ Р·СѓР±РѕРІ.
*   `audience` (РџР»РѕСЃРєР°СЏ): Р’Р·СЂРѕСЃР»С‹Рµ / Р”РµС‚Рё / РџРѕР¶РёР»С‹Рµ.
*   `service_class` (РџР»РѕСЃРєР°СЏ): РљРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ / Р”РёР°РіРЅРѕСЃС‚РёРєР° / РџСЂРѕС†РµРґСѓСЂР°.

---

## 4. РџРѕР»СЏ Рё РђС‚СЂРёР±СѓС‚С‹ (ACF Strategy)

РњС‹ РґРµР»РёРј РїРѕР»СЏ РЅР° РґРІРµ РіСЂСѓРїРїС‹: **System** (РєСЂРёС‚РёС‡РЅС‹Рµ РґР»СЏ СЂР°Р±РѕС‚С‹) Рё **Showcase** (РґР»СЏ РєСЂР°СЃРѕС‚С‹).

### Group 1: Integration (System Critical)
Р­С‚Рё РїРѕР»СЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹. Р‘РµР· РЅРёС… РЅРµ СЂР°Р±РѕС‚Р°РµС‚ Hydrator.

*   `external_ids` (Repeater):
    *   `source`: `qms_main` | `qms_extra` | `1c`
    *   `id`: `DOC_001`
    *   *Р—Р°С‡РµРј repeater:* РћРґРёРЅ РІСЂР°С‡ РјРѕР¶РµС‚ РёРјРµС‚СЊ СЂР°Р·РЅС‹Рµ ID РІ СЂР°Р·РЅС‹С… Р±Р°Р·Р°С… РњРРЎ.
*   `is_bookable` (Boolean): РњРѕР¶РЅРѕ Р»Рё Р·Р°РїРёСЃР°С‚СЊСЃСЏ РѕРЅР»Р°Р№РЅ.

### Group 2: Showcase (Marketing)
РџРѕР»СЏ РґР»СЏ РіРµРЅРµСЂР°С†РёРё РєСЂР°СЃРёРІРѕР№ РєР°СЂС‚РѕС‡РєРё Рё RAG-РёРЅРґРµРєСЃРѕРІ.

*   **Doctor:**
    *   `badges` (Repeater): `{type: 'kmn', label: 'Рљ.Рњ.Рќ.'}`
    *   `experience_start_date`: (Date Picker) -> РђРІС‚РѕСЂР°СЃС‡РµС‚ СЃС‚Р°Р¶Р°.
    *   `tags`: "Р›РµС‡РёС‚ РґРµС‚РµР№", "Р’С‹РµР·Рґ РЅР° РґРѕРј" (РґР»СЏ AI РїРѕРёСЃРєР°).
*   **Service:**
    *   `preparation`: "РќР°С‚РѕС‰Р°Рє", "РџРѕР»РЅС‹Р№ РјРѕС‡РµРІРѕР№ РїСѓР·С‹СЂСЊ".
    *   `duration_avg`: "30 РјРёРЅ" (СЃРїСЂР°РІРѕС‡РЅРѕ).

---

## 5. Р“РµРЅРµСЂР°С‚РѕСЂ "Site-in-a-Box" (Automation Logic)

РњС‹ РЅРµ СЃРѕР·РґР°РµРј СЃР°Р№С‚С‹ РІСЂСѓС‡РЅСѓСЋ. РњС‹ РіРµРЅРµСЂРёСЂСѓРµРј РёС….

### Workflow:
1.  **Input:** `MASTER_CONFIGURATION_MATRIX` (РћРїСЂРѕСЃРЅРёРє РєР»РёРµРЅС‚Р°).
2.  **Process:** РЎРєСЂРёРїС‚-РіРµРЅРµСЂР°С‚РѕСЂ РІС‹Р±РёСЂР°РµС‚ РЅСѓР¶РЅС‹Рµ JSON-СЃС…РµРјС‹ РјРѕРґСѓР»РµР№.
3.  **Output:**
    *   `schema_manifest.json`: РўРµС…РЅРёС‡РµСЃРєРёР№ С„Р°Р№Р» РґР»СЏ РїР»Р°РіРёРЅР° (Р°РєС‚РёРІРёСЂСѓРµС‚ CPT).
    *   `acf-json/*.json`: Р¤Р°Р№Р»С‹ РїРѕР»РµР№ РґР»СЏ ACF.
    *   `content_guide.md`: РРЅСЃС‚СЂСѓРєС†РёСЏ РґР»СЏ РєРѕРЅС‚РµРЅС‚-РјРµРЅРµРґР¶РµСЂР°.

### РђРІС‚Рѕ-РіРµРЅРµСЂР°С†РёСЏ РРЅСЃС‚СЂСѓРєС†РёРё
РњС‹ РіРµРЅРµСЂРёСЂСѓРµРј РїСЂРѕРјРїС‚ РґР»СЏ LLM РЅР° РѕСЃРЅРѕРІРµ РјР°РЅРёС„РµСЃС‚Р°:
> "РЎРѕР·РґР°Р№ РёРЅСЃС‚СЂСѓРєС†РёСЋ РґР»СЏ РєРѕРЅС‚РµРЅС‚-РјРµРЅРµРґР¶РµСЂР°. Р’ СЃРёСЃС‚РµРјРµ Р°РєС‚РёРІРёСЂРѕРІР°РЅС‹ РјРѕРґСѓР»Рё: Р’СЂР°С‡Рё, РЈСЃР»СѓРіРё.
> Р”Р»СЏ Р’СЂР°С‡Р° РѕР±СЏР·Р°С‚РµР»СЊРЅС‹ РїРѕР»СЏ: Р¤РѕС‚Рѕ, External ID.
> Р”Р»СЏ РЈСЃР»СѓРіРё РѕР±СЏР·Р°С‚РµР»СЊРЅС‹ РїРѕР»СЏ: РџРѕРґРіРѕС‚РѕРІРєР°.
> РЎС‚РёР»СЊ: РЎС‚СЂРѕРіРёР№, РєРѕСЂРїРѕСЂР°С‚РёРІРЅС‹Р№."

---

## 6. РћС‚РєСЂС‹С‚С‹Рµ Р’РѕРїСЂРѕСЃС‹ (To Be Decided)

РЎР»РµРґСѓСЋС‰РёРµ Р°СЂС…РёС‚РµРєС‚СѓСЂРЅС‹Рµ СЂРµС€РµРЅРёСЏ С‚СЂРµР±СѓСЋС‚ СѓС‚РѕС‡РЅРµРЅРёСЏ РІ РїСЂРѕС†РµСЃСЃРµ СЂРµР°Р»РёР·Р°С†РёРё v1.0:

1.  **Verticals vs Hierarchy:**
    *   Р”РѕСЃС‚Р°С‚РѕС‡РЅРѕ Р»Рё РёРµСЂР°СЂС…РёРё РІ `specialty` (Р’Р·СЂРѕСЃР»РѕРµ -> РљР°СЂРґРёРѕР»РѕРі), РёР»Рё РЅСѓР¶РЅР° РѕС‚РґРµР»СЊРЅР°СЏ С‚Р°РєСЃРѕРЅРѕРјРёСЏ `vertical`?
    *   *Р“РёРїРѕС‚РµР·Р°:* РќР°С‡Р°С‚СЊ СЃ РёРµСЂР°СЂС…РёРё `specialty`, С‚Р°Рє РєР°Рє СЌС‚Рѕ РЅР°С‚РёРІРЅРµРµ РґР»СЏ WP.
2.  **Service-to-Doctor Link:**
    *   РљР°Рє СЃРІСЏР·С‹РІР°С‚СЊ: Р’СЂСѓС‡РЅСѓСЋ (РІС‹Р±РёСЂР°С‚СЊ РІСЂР°С‡РµР№ РІ СѓСЃР»СѓРіРµ) РёР»Рё РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРё (С‡РµСЂРµР· РѕР±С‰СѓСЋ `specialty`)?
    *   *Р“РёРїРѕС‚РµР·Р°:* РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРё С‡РµСЂРµР· С‚Р°РєСЃРѕРЅРѕРјРёСЋ (РјРµРЅСЊС€Рµ СЂСѓС‡РЅРѕР№ СЂР°Р±РѕС‚С‹), СЃ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊСЋ СЂСѓС‡РЅРѕРіРѕ override.
3.  **Reviews Moderation:**
    *   Р“РґРµ С…СЂР°РЅРёС‚СЊ РѕС‚Р·С‹РІС‹: CPT `review` РёР»Рё РІРЅРµС€РЅРёР№ СЃРµСЂРІРёСЃ (РџСЂРѕР”РѕРєС‚РѕСЂРѕРІ)?
    *   *Р“РёРїРѕС‚РµР·Р°:* CPT РґР»СЏ SEO, РЅРѕ СЃ РїСЂРµРјРѕРґРµСЂР°С†РёРµР№.

---

## 7. Roadmap СЂРµР°Р»РёР·Р°С†РёРё (Content Layer)

1.  РЎРѕР·РґР°С‚СЊ СЂРµРїРѕР·РёС‚РѕСЂРёР№ РїР»Р°РіРёРЅР° `medical-os-core`.
2.  РЎС„РѕСЂРјРёСЂРѕРІР°С‚СЊ JSON-СЃС…РµРјС‹ РґР»СЏ `Doctor` Рё `Specialty`.
3.  РќР°СЃС‚СЂРѕРёС‚СЊ Р°РІС‚Рѕ-Р·Р°РіСЂСѓР·РєСѓ ACF JSON РёР· РїР°РїРєРё РїР»Р°РіРёРЅР°.
4.  РќР°РїРёСЃР°С‚СЊ РєРѕРЅРЅРµРєС‚РѕСЂ РґР»СЏ Hydrator (SQL Р·Р°РїСЂРѕСЃ Рє С‚Р°Р±Р»РёС†Р°Рј WP, РѕРїРёСЃР°РЅРЅС‹Р№ РІ `BaseDriver.php`).



===== FILE: C:\git\apl\med\docs\02_ARCHITECTURE_COMPLIANCE.md =====


# Solution Architecture: Modular Configuration & Compliance Engine

**Р’РµСЂСЃРёСЏ:** 1.4 (Updated)
**Р”Р°С‚Р°:** РћРєС‚СЏР±СЂСЊ 2025
**РЎС‚Р°С‚СѓСЃ:** Implemented

Р­С‚РѕС‚ РґРѕРєСѓРјРµРЅС‚ РѕРїРёСЃС‹РІР°РµС‚ Р°СЂС…РёС‚РµРєС‚СѓСЂРЅРѕРµ СЂРµС€РµРЅРёРµ РїРѕ СЂР°Р·РґРµР»РµРЅРёСЋ РєРѕРЅС„РёРіСѓСЂР°С†РёРё Р±СЌРєРµРЅРґР° РЅР° РЅРµР·Р°РІРёСЃРёРјС‹Рµ СЃР»РѕРё Рё СЂРµР°Р»РёР·Р°С†РёСЋ РјРѕРґСѓР»СЏ СЋСЂРёРґРёС‡РµСЃРєРѕР№ Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё (Compliance Policy).

---

## 1. РџСЂРѕР±Р»РµРјР° (The Problem)

1.  **РњРѕРЅРѕР»РёС‚РЅРѕСЃС‚СЊ РЅР°СЃС‚СЂРѕРµРє:** Р¤Р°Р№Р» `config.php` СЂР°Р·СЂР°СЃС‚Р°Р»СЃСЏ, СЃРјРµС€РёРІР°СЏ РґРѕСЃС‚СѓРїС‹ Рє Р‘Р” (Infrastructure), СЃРїРёСЃРѕРє РіРѕСЂРѕРґРѕРІ (Topology) Рё С†РІРµС‚Р° РєРЅРѕРїРѕРє (Theme). Р­С‚Рѕ СѓСЃР»РѕР¶РЅСЏР»Рѕ РїРѕРґРґРµСЂР¶РєСѓ Рё РїРѕРІС‹С€Р°Р»Рѕ СЂРёСЃРє СЃР»СѓС‡Р°Р№РЅРѕ "СЃР»РѕРјР°С‚СЊ" РїРѕРґРєР»СЋС‡РµРЅРёРµ Рє Р±Р°Р·Рµ РїСЂРё СЃРјРµРЅРµ С†РІРµС‚Р°.
2.  **Р®СЂРёРґРёС‡РµСЃРєРёРµ СЂРёСЃРєРё (152-Р¤Р—):** Р–РµСЃС‚РєРёРµ С‚СЂРµР±РѕРІР°РЅРёСЏ Р·Р°РєРѕРЅРѕРґР°С‚РµР»СЊСЃС‚РІР° С‚СЂРµР±СѓСЋС‚ РіРёР±РєРѕСЃС‚Рё РІ СЃР±РѕСЂРµ РґР°РЅРЅС‹С…, Р»РѕРєР°Р»РёР·Р°С†РёРё С…СЂР°РЅРµРЅРёСЏ Рё С‡РµС‚РєРѕРіРѕ СЂР°Р·РґРµР»РµРЅРёСЏ РїРѕС‚РѕРєРѕРІ РґР°РЅРЅС‹С….
3.  **РњР°СЃС€С‚Р°Р±РёСЂСѓРµРјРѕСЃС‚СЊ:** Р”Р»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РЅРѕРІС‹С… РєР»РёРµРЅС‚РѕРІ (Tenant) С‚СЂРµР±РѕРІР°Р»РѕСЃСЊ РїСЂР°РІРёС‚СЊ РєРѕРґ СЏРґСЂР°, Р° РЅРµ РїСЂРѕСЃС‚Рѕ РјРµРЅСЏС‚СЊ РЅР°СЃС‚СЂРѕР№РєРё.

---

## 2. Р РµС€РµРЅРёРµ: "РЎР»РѕРµРЅС‹Р№ РџРёСЂРѕРі" (Layered Configuration)

РњС‹ РІРЅРµРґСЂРёР»Рё Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ, РіРґРµ `config.php` Р±РѕР»СЊС€Рµ РЅРµ СЃРѕРґРµСЂР¶РёС‚ РЅР°СЃС‚СЂРѕРµРє, Р° РІС‹СЃС‚СѓРїР°РµС‚ РІ СЂРѕР»Рё **РЎР±РѕСЂС‰РёРєР° (Aggregator)**.

### РЎС‚СЂСѓРєС‚СѓСЂР° `php_backend/config_parts/`

| Р¤Р°Р№Р» | РЎР»РѕР№ | РћРїРёСЃР°РЅРёРµ |
| :--- | :--- | :--- |
| `01_infrastructure.php` | **Hardware** | РџРѕРґРєР»СЋС‡РµРЅРёРµ Рє Р‘Р”, API РєР»СЋС‡Рё РњРРЎ, РЅР°СЃС‚СЂРѕР№РєРё HTTP-РєР»РёРµРЅС‚Р°. РЎС‡РёС‚С‹РІР°РµС‚ СЃРµРєСЂРµС‚С‹ РёР· `config_access.php`. |
| `02_topology.php` | **Business** | РЎРїРёСЃРѕРє РіРѕСЂРѕРґРѕРІ, С„РёР»РёР°Р»РѕРІ, РІРµСЂС‚РёРєР°Р»РµР№ (Р”РµС‚СЃС‚РІРѕ/Р’Р·СЂРѕСЃР»С‹Рµ). Р›РѕРіРёРєР° РјР°СЂС€СЂСѓС‚РёР·Р°С†РёРё. |
| `03_logic.php` | **Behavior** | РџСЂР°РІРёР»Р° РјР°РїРїРёРЅРіР° РґР°РЅРЅС‹С… (Р“РёРґСЂР°С‚Р°С†РёСЏ), С‚РѕС‡РєРё РІС…РѕРґР° (Entry Points). |
| `04_theme.php` | **Presentation** | Р¦РІРµС‚РѕРІР°СЏ РїР°Р»РёС‚СЂР°, Р»РѕРіРѕС‚РёРїС‹, С‚РµРєСЃС‚С‹ РёРЅС‚РµСЂС„РµР№СЃР° (Labels). |
| `05_compliance.php` | **Legal** | **[NEW]** РџРѕР»РёС‚РёРєРё Р±РµР·РѕРїР°СЃРЅРѕСЃС‚Рё РґР°РЅРЅС‹С… Рё СЋСЂРёРґРёС‡РµСЃРєРёРµ РѕРіСЂР°РЅРёС‡РµРЅРёСЏ. |
| `99_helpers.php` | **System** | Р’СЃРїРѕРјРѕРіР°С‚РµР»СЊРЅС‹Рµ С„СѓРЅРєС†РёРё Рё Р·Р°РјС‹РєР°РЅРёСЏ. |

---

## 3. РђСЂС…РёС‚РµРєС‚СѓСЂР° Р”Р°РЅРЅС‹С…: "Р”РІР° РљРѕРЅС‚СѓСЂР°" (152-Р¤Р— Strategy)

Р”Р»СЏ СЃРѕРѕС‚РІРµС‚СЃС‚РІРёСЏ Р·Р°РєРѕРЅРѕРґР°С‚РµР»СЊСЃС‚РІСѓ Р Р¤ РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј РіРёР±СЂРёРґРЅСѓСЋ РјРѕРґРµР»СЊ РѕР±СЂР°Р±РѕС‚РєРё РґР°РЅРЅС‹С….

### РљРѕРЅС‚СѓСЂ Рђ: РџСѓР±Р»РёС‡РЅС‹Р№ (Content Layer)
**Р§С‚Рѕ Р·РґРµСЃСЊ:** Р”Р°РЅРЅС‹Рµ РІСЂР°С‡РµР№, РѕРїРёСЃР°РЅРёСЏ СѓСЃР»СѓРі, С†РµРЅС‹, СЃРїСЂР°РІРѕС‡РЅРёРєРё С„РёР»РёР°Р»РѕРІ.
**РћР±СЂР°Р±РѕС‚РєР°:** РњРѕР¶РµС‚ РєСЌС€РёСЂРѕРІР°С‚СЊСЃСЏ, РёРЅРґРµРєСЃРёСЂРѕРІР°С‚СЊСЃСЏ РїРѕРёСЃРєРѕРІРёРєР°РјРё, РїРµСЂРµРґР°РІР°С‚СЊСЃСЏ РІ РІРµРєС‚РѕСЂРЅС‹Рµ Р±Р°Р·С‹ РґР»СЏ "РЈРјРЅРѕРіРѕ РїРѕРёСЃРєР°" (Supabase/Vector DB).
**РћР±РѕСЃРЅРѕРІР°РЅРёРµ:** Р­С‚Рѕ РѕР±С‰РµРґРѕСЃС‚СѓРїРЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ, РЅРµ СЏРІР»СЏСЋС‰Р°СЏСЃСЏ РџР”РЅ РїР°С†РёРµРЅС‚РѕРІ. РўСЂР°РЅСЃРіСЂР°РЅРёС‡РЅР°СЏ РїРµСЂРµРґР°С‡Р° СЂР°Р·СЂРµС€РµРЅР° (РїСЂРё РЅРµРѕР±С…РѕРґРёРјРѕСЃС‚Рё).

### РљРѕРЅС‚СѓСЂ Р‘: РџСЂРёРІР°С‚РЅС‹Р№ (Transaction Layer)
**Р§С‚Рѕ Р·РґРµСЃСЊ:** РўРµР»РµС„РѕРЅС‹ РїР°С†РёРµРЅС‚РѕРІ, Р¤РРћ, РґР°С‚С‹ СЂРѕР¶РґРµРЅРёСЏ, С„Р°РєС‚С‹ Р·Р°РїРёСЃРё.
**РћР±СЂР°Р±РѕС‚РєР°:**
1.  **Р›РѕРєР°Р»РёР·Р°С†РёСЏ:** РћР±СЂР°Р±Р°С‚С‹РІР°СЋС‚СЃСЏ **СЃС‚СЂРѕРіРѕ** РЅР° СЃРµСЂРІРµСЂРµ РІРЅСѓС‚СЂРё Р Р¤ (PHP Backend).
2.  **РР·РѕР»СЏС†РёСЏ:** РџРµСЂРµРґР°СЋС‚СЃСЏ РЅР°РїСЂСЏРјСѓСЋ РІ РњРРЎ (qMS/1C) РїРѕ Р·Р°С‰РёС‰РµРЅРЅС‹Рј РєР°РЅР°Р»Р°Рј.
3.  **No-Log Policy:** РњС‹ РЅРµ С…СЂР°РЅРёРј РџР”РЅ РІ РїРѕСЃС‚РѕСЏРЅРЅС‹С… Р»РѕРіР°С… "СѓРјРЅРѕРіРѕ РїРѕРёСЃРєР°". РџРµСЂРµРґ Р»СЋР±С‹Рј Р»РѕРіРёСЂРѕРІР°РЅРёРµРј РёР»Рё Р°РЅР°Р»РёС‚РёРєРѕР№ РґР°РЅРЅС‹Рµ РїСЂРѕС…РѕРґСЏС‚ РїСЂРѕС†РµРґСѓСЂСѓ РѕС‡РёСЃС‚РєРё (Sanitization).

---

## 4. Threat Model (РњРѕРґРµР»СЊ РЈРіСЂРѕР· Рё Р—Р°С‰РёС‚Р°)

Р’ РјРѕРґРµР»Рё Self-Hosted РјС‹ СЂР°СЃСЃРјР°С‚СЂРёРІР°РµРј СЃРµСЂРІРµСЂ РєР»РёРµРЅС‚Р° РєР°Рє "РќРµРґРѕРІРµСЂРµРЅРЅСѓСЋ СЃСЂРµРґСѓ".

### РЈРіСЂРѕР·Р° 1: РљРѕРјРїСЂРѕРјРµС‚Р°С†РёСЏ CMS (WordPress)
*   **РЎС†РµРЅР°СЂРёР№:** РҐР°РєРµСЂ РІР·Р»Р°РјС‹РІР°РµС‚ WP С‡РµСЂРµР· СѓСЏР·РІРёРјС‹Р№ РїР»Р°РіРёРЅ Рё РїРѕР»СѓС‡Р°РµС‚ РґРѕСЃС‚СѓРї Рє С„Р°Р№Р»РѕРІРѕР№ СЃРёСЃС‚РµРјРµ.
*   **Р РёСЃРє:** Р§С‚РµРЅРёРµ `config_access.php` Рё РєСЂР°Р¶Р° РєР»СЋС‡РµР№ РњРРЎ.
*   **Р—Р°С‰РёС‚Р°:**
    *   Р¤Р°Р№Р» `config_access.php` РІС‹РЅРµСЃРµРЅ Р·Р° РїСЂРµРґРµР»С‹ `public_html` (РіРґРµ СЌС‚Рѕ РІРѕР·РјРѕР¶РЅРѕ) РёР»Рё Р·Р°С‰РёС‰РµРЅ `.htaccess` (Deny from all).
    *   API-РєР»СЋС‡Рё РњРРЎ РёРјРµСЋС‚ РѕРіСЂР°РЅРёС‡РµРЅРЅС‹Рµ РїСЂР°РІР° (Scope): С‚РѕР»СЊРєРѕ Р·Р°РїРёСЃСЊ РЅР° РїСЂРёРµРј, Р±РµР· РїСЂР°РІР° РІС‹РіСЂСѓР·РєРё РІСЃРµР№ Р±Р°Р·С‹ РїР°С†РёРµРЅС‚РѕРІ.

### РЈРіСЂРѕР·Р° 2: XSS РЅР° СЃС‚РѕСЂРѕРЅРµ РєР»РёРµРЅС‚Р°
*   **РЎС†РµРЅР°СЂРёР№:** Р’РЅРµРґСЂРµРЅРёРµ РІСЂРµРґРѕРЅРѕСЃРЅРѕРіРѕ JS РЅР° СЃР°Р№С‚ РєР»РёРЅРёРєРё.
*   **Р РёСЃРє:** РџРµСЂРµС…РІР°С‚ РІРІРѕРґРёРјС‹С… РґР°РЅРЅС‹С… РїР°С†РёРµРЅС‚Р°.
*   **Р—Р°С‰РёС‚Р°:**
    *   Р’РёРґР¶РµС‚ РёСЃРїРѕР»СЊР·СѓРµС‚ Shadow DOM (РІ РїРµСЂСЃРїРµРєС‚РёРІРµ) РёР»Рё СЃС‚СЂРѕРіСѓСЋ РёР·РѕР»СЏС†РёСЋ СЃС‚РёР»РµР№/СЃРєСЂРёРїС‚РѕРІ.
    *   РСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ `HttpOnly` cookies РґР»СЏ СЃРµСЃСЃРёР№.

---

## 5. РРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂР° Рё Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ (Search Gateway)

Р”Р»СЏ СЂРµР°Р»РёР·Р°С†РёРё "РЈРјРЅРѕРіРѕ РїРѕРёСЃРєР°" Рё СЂР°Р±РѕС‚С‹ СЃ РІРЅРµС€РЅРёРјРё API РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј РїР°С‚С‚РµСЂРЅ **Backend-for-Frontend (BFF)**.

### РџСЂРёРЅС†РёРї СЂР°Р±РѕС‚С‹ С€Р»СЋР·Р°:
1.  **РЎРєСЂС‹С‚РёРµ РєР»СЋС‡РµР№:** Р‘СЂР°СѓР·РµСЂ РєР»РёРµРЅС‚Р° **РЅРёРєРѕРіРґР°** РЅРµ РґРµР»Р°РµС‚ РїСЂСЏРјС‹С… Р·Р°РїСЂРѕСЃРѕРІ Рє OpenAI, Supabase РёР»Рё РњРРЎ. Р’СЃРµ Р·Р°РїСЂРѕСЃС‹ РёРґСѓС‚ С‚РѕР»СЊРєРѕ РЅР° РЅР°С€ `api.php`. Р­С‚Рѕ Р·Р°С‰РёС‰Р°РµС‚ API-РєР»СЋС‡Рё РѕС‚ РєСЂР°Р¶Рё.
2.  **РћР±С…РѕРґ Р±Р»РѕРєРёСЂРѕРІРѕРє:** РЎРµСЂРІРµСЂРЅС‹Р№ PHP-СЃРєСЂРёРїС‚ РІС‹СЃС‚СѓРїР°РµС‚ РїСЂРѕРєСЃРё, С‡С‚Рѕ СЂРµС€Р°РµС‚ РїСЂРѕР±Р»РµРјС‹ СЃ РґРѕСЃС‚СѓРїРѕРј Рє API (РЅР°РїСЂРёРјРµСЂ, OpenAI) РёР· Р±СЂР°СѓР·РµСЂРѕРІ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РІ Р Р¤ Рё РїСЂРѕР±Р»РµРјС‹ CORS.
3.  **Р•РґРёРЅР°СЏ С‚РѕС‡РєР° РєРѕРЅС‚СЂРѕР»СЏ:** РњС‹ РјРѕР¶РµРј РІ Р»СЋР±РѕР№ РјРѕРјРµРЅС‚ РѕС‚РєР»СЋС‡РёС‚СЊ РїРѕРёСЃРє РёР»Рё СЃРјРµРЅРёС‚СЊ РїСЂРѕРІР°Р№РґРµСЂР° AI РЅР° СЃРµСЂРІРµСЂРµ, РЅРµ РѕР±РЅРѕРІР»СЏСЏ РєРѕРґ РЅР° РєР»РёРµРЅС‚Рµ.



===== FILE: C:\git\apl\med\docs\02_ARCHITECTURE_CORE.md =====


# 02_ARCHITECTURE_CORE: The "Driver" Concept

**Core Principle:** The PHP Backend is not just a backend for the widget. It is a **Standardized Driver** for any Medical Information System (MIS).

---

## 1. The Problem of Heterogeneity
Every clinic has a different setup:
*   Clinic A: qMS (SOAP API)
*   Clinic B: 1C-Bitrix (Rest API)
*   Clinic C: Medods (Custom API)

Creating a SaaS that connects directly to all these is a nightmare of VPNs, firewalls, and custom parsers.

## 2. The Solution: "Installation on the Edge"
We install our **Booking Core (PHP)** directly on the client's server.

### Why PHP?
It acts as a **Normalizer**.
*   **Input:** Random, messy data from specific MIS.
*   **Output:** Strict, clean JSON following our `Doctor` and `Offering` schema.

### Benefit for SaaS
Your future AI SaaS doesn't need to know how `qMS` works. It only needs to know how to talk to **Booking Core**.
Your SaaS becomes "MIS Agnostic" instantly.

---

## 3. Data Flow Diagram (Hybrid)

```mermaid
graph TD
    subgraph "Your SaaS Cloud (Brain)"
        AI_Engine[Node.js AI Engine]
        VectorDB[(Knowledge Base)]
    end

    subgraph "Client Server (Body)"
        PHP_Core[Booking Core API]
        Client_DB[(Wordpress DB)]
    end

    subgraph "Clinic Internal Network"
        MIS[Hospital System (qMS/1C)]
    end

    %% Flows
    AI_Engine -- "1. Tool Call (HTTP)" --> PHP_Core
    PHP_Core -- "2. Native Request" --> MIS
    PHP_Core -- "3. Normalized JSON" --> AI_Engine
```

---

## 4. Security & Isolation
*   **API Keys for MIS** are stored in `php_backend/config_access.php` on the Client Server. **Your SaaS never sees them.**
*   **Authentication:** The SaaS authenticates with the PHP Core via a simple `X-Service-Token`.
*   **PII (Personal Data):** When booking happens, the SaaS sends the phone number to PHP Core. PHP Core pushes it to MIS. You don't store patients in the Cloud DB.

This architecture is **152-FZ Compliant by Design**.



===== FILE: C:\git\apl\med\docs\03_SPEC_CONFIG.md =====


# MASTER CONFIGURATION MATRIX

РњРµРЅСЋ РѕРїС†РёР№ РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё СЃРёСЃС‚РµРјС‹. РћРїС†РёРё СЃС‚СЂРѕРіРѕ СЂР°Р·РґРµР»РµРЅС‹ РїРѕ Р·РѕРЅР°Рј РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚Рё.

---

## 1. Catalog Dimensions (Р¤РёР»СЊС‚СЂР°С†РёСЏ Рё РЎС‚СЂСѓРєС‚СѓСЂР°)
*РћРїСЂРµРґРµР»СЏРµС‚, РєР°РєРёРµ СЃСѓС‰РЅРѕСЃС‚Рё РїРѕРїР°РґР°СЋС‚ РІ РІС‹Р±РѕСЂРєСѓ.*

| РР·РјРµСЂРµРЅРёРµ | РћРїРёСЃР°РЅРёРµ | Р’Р°СЂРёР°РЅС‚С‹ | Data Requirement |
| :--- | :--- | :--- | :--- |
| **Geography** | РўРѕРїРѕР»РѕРіРёСЏ СЃРµС‚Рё | `multi_city`, `single_city` | `branch.city_code` |
| **Audience** | Р’РѕР·СЂР°СЃС‚РЅС‹Рµ РіСЂСѓРїРїС‹ | `strict` (СЂР°Р·РЅС‹Рµ Р±Р°Р·С‹), `mixed` (С„РёР»СЊС‚СЂ), `none` | `doctor.audience_tag` (ValueSet: adult, child) |
| **Service Class** | РўРёРї СѓСЃР»СѓРіРё | `consult` vs `diag` vs `procedure` | `offering.service_type` |
| **Branching** | Р›РѕРіРёРєР° РІС‹Р±РѕСЂР° | `strict_select` (СЃРЅР°С‡Р°Р»Р° С„РёР»РёР°Р»), `dynamic` (СЃРЅР°С‡Р°Р»Р° РІСЂР°С‡) | `offering.branch_id` |

---

## 2. Flow Policy (РњР°СЂС€СЂСѓС‚ РџРѕР»СЊР·РѕРІР°С‚РµР»СЏ)
*РћРїСЂРµРґРµР»СЏРµС‚ РіСЂР°С„ РїРµСЂРµС…РѕРґРѕРІ (Steps Graph).*

| РџРѕР»РёС‚РёРєР° | РћРїРёСЃР°РЅРёРµ | Р’Р°СЂРёР°РЅС‚С‹ |
| :--- | :--- | :--- |
| **Entry Point** | РџРµСЂРІР°СЏ С‚РѕС‡РєР° РєРѕРЅС‚Р°РєС‚Р° | `specialty`, `doctor`, `service_tree`, `symptom` |
| **Auth Strategy** | РљРѕРіРґР° РїСЂРѕСЃРёРј С‚РµР»РµС„РѕРЅ? | `guest_first` (РІ РєРѕРЅС†Рµ), `auth_first` (РІ РЅР°С‡Р°Р»Рµ) |
| **Waitlist** | Р§С‚Рѕ РґРµР»Р°С‚СЊ, РµСЃР»Рё РЅРµС‚ РјРµСЃС‚? | `auto` (С„РѕСЂРјР°), `off` (СЃРѕРѕР±С‰РµРЅРёРµ), `call` (РєРЅРѕРїРєР° Р·РІРѕРЅРєР°) |
| **Payment** | РњРѕРјРµРЅС‚ РѕРїР»Р°С‚С‹ | `offline` (РЅР° РјРµСЃС‚Рµ), `prepay_hold` (С…РѕР»РґРёСЂРѕРІР°РЅРёРµ) |

---

## 3. Presentation Policy (Р’РёРґ Рё РљРѕРЅС‚РµРЅС‚)
*РћРїСЂРµРґРµР»СЏРµС‚ РІРЅРµС€РЅРёР№ РІРёРґ РєРѕРјРїРѕРЅРµРЅС‚РѕРІ.*

| РћРїС†РёСЏ | РћРїРёСЃР°РЅРёРµ | Data Requirement |
| :--- | :--- | :--- |
| **Doctor Card** | РќР°РїРѕР»РЅРµРЅРёРµ РєР°СЂС‚РѕС‡РєРё | `badges` (Regalia), `price_view` (min/range), `experience_format` |
| **Visual Tree** | РџР»РёС‚РєРё РєР°С‚РµРіРѕСЂРёР№ | Icons Mapping, Color Scheme |
| **Slots View** | Р’РёРґ СЂР°СЃРїРёСЃР°РЅРёСЏ | `quick_chips` (С‚Р°Р±Р»РµС‚РєРё), `calendar_grid` (СЃРµС‚РєР°) |

---

## 4. Compliance Policy (Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ Рё РџСЂР°РІРѕ)
*Р®СЂРёРґРёС‡РµСЃРєРёРµ РѕРіСЂР°РЅРёС‡РµРЅРёСЏ РѕР±СЂР°Р±РѕС‚РєРё РґР°РЅРЅС‹С…. РљСЂРёС‚РёС‡РЅРѕ РґР»СЏ 152-Р¤Р— / GDPR.*

| РџРѕР»РёС‚РёРєР° | РћРїРёСЃР°РЅРёРµ | Р­С„С„РµРєС‚ |
| :--- | :--- | :--- |
| **Data Minimization** | РњРёРЅРёРјРёР·Р°С†РёСЏ РґР°РЅРЅС‹С… | Р•СЃР»Рё `strict`, РЅРµ Р·Р°РїСЂР°С€РёРІР°РµРј Рё РЅРµ С…СЂР°РЅРёРј РћС‚С‡РµСЃС‚РІРѕ Рё Р”Р , РµСЃР»Рё РњРРЎ РїРѕР·РІРѕР»СЏРµС‚. |
| **Age Gate** | РџСЂРѕРІРµСЂРєР° РІРѕР·СЂР°СЃС‚Р° | Р‘Р»РѕРєРёСЂСѓРµС‚ Р·Р°РїРёСЃСЊ РґРµС‚РµР№ РЅР° РІР·СЂРѕСЃР»С‹Рµ СѓСЃР»СѓРіРё (Client-side validation). |
| **Consent Flow** | РЎР±РѕСЂ СЃРѕРіР»Р°СЃРёР№ | `checkbox` (РіР°Р»РѕС‡РєР°), `explicit_action` (РЅР°Р¶Р°С‚РёРµ РєРЅРѕРїРєРё = СЃРѕРіР»Р°СЃРёРµ). |
| **Audit Level** | РЈСЂРѕРІРµРЅСЊ Р»РѕРіРёСЂРѕРІР°РЅРёСЏ | `basic` (РѕС€РёР±РєРё), `full` (РІСЃРµ С€Р°РіРё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ). |



===== FILE: C:\git\apl\med\docs\03_SPEC_DATA_REQ.md =====


# 03_SPEC_DATA_REQ: РўСЂРµР±РѕРІР°РЅРёСЏ Рє Р”Р°РЅРЅС‹Рј (Data Requirements)

Р­С‚РѕС‚ РґРѕРєСѓРјРµРЅС‚ вЂ” Р°РЅРєРµС‚Р° РґР»СЏ СЃР±РѕСЂР° РґР°РЅРЅС‹С… РѕС‚ РєР»РёРЅРёРєРё РїРµСЂРµРґ Р·Р°РїСѓСЃРєРѕРј СЃРёСЃС‚РµРјС‹.
Р­С‚Рё РґР°РЅРЅС‹Рµ РЅРµРѕР±С…РѕРґРёРјС‹ РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё РєРѕРЅС„РёРіР° (`config.php`) Рё РЅР°РїРѕР»РЅРµРЅРёСЏ WordPress.

---

## 1. РўРѕРїРѕР»РѕРіРёСЏ РЎРµС‚Рё (Topology)

| РџР°СЂР°РјРµС‚СЂ | Р’РѕРїСЂРѕСЃ | РџСЂРёРјРµСЂ Р·Р°РїРѕР»РЅРµРЅРёСЏ |
| :--- | :--- | :--- |
| **Р“РѕСЂРѕРґР°** | Р’ РєР°РєРёС… РіРѕСЂРѕРґР°С… СЂР°Р±РѕС‚Р°РµРј? (РљРѕРґС‹) | `chel` (Р§РµР»СЏР±РёРЅСЃРє), `spb` (РџРёС‚РµСЂ) |
| **Р¤РёР»РёР°Р»С‹ (Р¤РёР·РёС‡РµСЃРєРёРµ)** | РЎРїРёСЃРѕРє Р°РґСЂРµСЃРѕРІ РєР»РёРЅРёРє. | 1. СѓР». Р›РµРЅРёРЅР°, 10<br>2. СѓР». РўСЂСѓРґР°, 100 |
| **Р‘Р°Р·С‹ Р”Р°РЅРЅС‹С… (РњРРЎ)** | РЎРєРѕР»СЊРєРѕ Р±Р°Р· qMS/1C? | 3 Р±Р°Р·С‹ (Main, Extra, Kids) |
| **РњР°РїРїРёРЅРі** | РљР°РєРѕР№ С„РёР»РёР°Р» Рє РєР°РєРѕР№ Р±Р°Р·Рµ РѕС‚РЅРѕСЃРёС‚СЃСЏ? | Р›РµРЅРёРЅР° -> Main<br>РўСЂСѓРґР° -> Extra |

---

## 2. Р’СЂР°С‡ (РЎСѓС‰РЅРѕСЃС‚СЊ Actor)

РљР°РєРёРµ РґР°РЅРЅС‹Рµ Рѕ РІСЂР°С‡Рµ РјС‹ **РѕР±СЏР·Р°РЅС‹** РїРѕР»СѓС‡РёС‚СЊ РёР· РјР°СЂРєРµС‚РёРЅРіР° (WordPress), С‚Р°Рє РєР°Рє РёС… РЅРµС‚ РёР»Рё РѕРЅРё "РїР»РѕС…РёРµ" РІ РњРРЎ.

### РћР±СЏР·Р°С‚РµР»СЊРЅС‹Рµ РїРѕР»СЏ (Must Have)
1.  **Р¤РѕС‚РѕРіСЂР°С„РёСЏ:** Р’РµСЂС‚РёРєР°Р»СЊРЅС‹Р№ РїРѕСЂС‚СЂРµС‚ (РјРёРЅ. 600x800px). РџСЂРѕР·СЂР°С‡РЅС‹Р№ РёР»Рё РѕРґРЅРѕСЂРѕРґРЅС‹Р№ С„РѕРЅ.
2.  **РЎРІСЏР·РєР° ID:** РЈРЅРёРєР°Р»СЊРЅС‹Р№ РєРѕРґ РІСЂР°С‡Р° РІ РњРРЎ (РЅР°РїСЂ. `QQC123` РёР»Рё `B01.05`). Р‘РµР· СЌС‚РѕРіРѕ РЅРµ Р±СѓРґРµС‚ СЂР°Р±РѕС‚Р°С‚СЊ Р·Р°РїРёСЃСЊ.
3.  **Р¤РРћ (РњР°СЂРєРµС‚РёРЅРіРѕРІРѕРµ):** Р•СЃР»Рё РІ РњРРЎ РЅР°РїРёСЃР°РЅРѕ "РР’РђРќРћР’ Р.Р.", РЅР°Рј РЅСѓР¶РЅРѕ "РРІР°РЅРѕРІ РРІР°РЅ РРІР°РЅРѕРІРёС‡".

### РРјРёРґР¶РµРІС‹Рµ РїРѕР»СЏ (Nice to Have)
1.  **Р РµРіР°Р»РёРё (Badges):**
    *   РЈС‡РµРЅР°СЏ СЃС‚РµРїРµРЅСЊ (Рљ.Рњ.Рќ., Р”.Рњ.Рќ.)
    *   РљР°С‚РµРіРѕСЂРёСЏ (Р’С‹СЃС€Р°СЏ, РџРµСЂРІР°СЏ)
    *   РЎС‚Р°Р¶ (Р“РѕРґ РЅР°С‡Р°Р»Р° РїСЂР°РєС‚РёРєРё)
2.  **Р‘РёРѕ (HTML):** РљСЂР°С‚РєРёР№ С‚РµРєСЃС‚ "Рћ РІСЂР°С‡Рµ" (2-3 Р°Р±Р·Р°С†Р°). РЎРїРµС†РёР°Р»РёР·Р°С†РёСЏ, РїРѕРґС…РѕРґ Рє Р»РµС‡РµРЅРёСЋ.
3.  **РќР°РїСЂР°РІР»РµРЅРёСЏ (Tags):** РўРµРіРё РґР»СЏ РїРѕРёСЃРєР° (РЅР°РїСЂ. "Р›РµС‡РёС‚ РєРѕР»РµРЅРё", "Р’С‹РµР·Р¶Р°РµС‚ РЅР° РґРѕРј").

---

## 3. РЈСЃР»СѓРіРё Рё Р¦РµРЅС‹ (Offering)

Р’ РЅР°С€РµР№ Р°СЂС…РёС‚РµРєС‚СѓСЂРµ С†РµРЅС‹ Р±РµСЂСѓС‚СЃСЏ РёР· РњРРЎ. РќРѕ РґР»СЏ РІРёС‚СЂРёРЅС‹ РЅСѓР¶РЅР° СЃС‚СЂСѓРєС‚СѓСЂР°.

1.  **Р”РµСЂРµРІРѕ РЈСЃР»СѓРі:** РљР°Рє РјС‹ РіСЂСѓРїРїРёСЂСѓРµРј РІСЂР°С‡РµР№ РЅР° СЃР°Р№С‚Рµ?
    *   *Р’Р°СЂРёР°РЅС‚ Рђ:* РџРѕ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЏРј (РўРµСЂР°РїРµРІС‚, РҐРёСЂСѓСЂРі).
    *   *Р’Р°СЂРёР°РЅС‚ Р‘:* РџРѕ С†РµРЅС‚СЂР°Рј (Р¦РµРЅС‚СЂ Р¶РµРЅСЃРєРѕРіРѕ Р·РґРѕСЂРѕРІСЊСЏ, РљР»РёРЅРёРєР° Р±РѕР»Рё).
    *   *РўСЂРµР±РѕРІР°РЅРёРµ:* РќСѓР¶РµРЅ СЃРїРёСЃРѕРє СЌС‚РёС… РєР°С‚РµРіРѕСЂРёР№ Рё РёРєРѕРЅРєР° РґР»СЏ РєР°Р¶РґРѕР№.

2.  **Р¦РµРЅС‹ (Fallback):**
    *   Р•СЃР»Рё РњРРЎ Р»РµР¶РёС‚, РєР°РєСѓСЋ С†РµРЅСѓ РїРѕРєР°Р·С‹РІР°С‚СЊ? (РџРѕР»Рµ `price_from` РІ WP).

---

## 4. Р®СЂРёРґРёС‡РµСЃРєР°СЏ С‡Р°СЃС‚СЊ (Compliance)

Р”Р»СЏ РЅР°СЃС‚СЂРѕР№РєРё С„Р°Р№Р»Р° `05_compliance.php`.

1.  **РћС„РµСЂС‚Р°:** РЎСЃС‹Р»РєР° РЅР° СЃС‚СЂР°РЅРёС†Сѓ СЃ РїРѕР»РёС‚РёРєРѕР№ РѕР±СЂР°Р±РѕС‚РєРё РџР”РЅ.
2.  **РњРёРЅРёРјРёР·Р°С†РёСЏ:** РњРѕР¶РЅРѕ Р»Рё РќР• СЃРїСЂР°С€РёРІР°С‚СЊ РћС‚С‡РµСЃС‚РІРѕ? (Р”Р°/РќРµС‚).
3.  **Р’РѕР·СЂР°СЃС‚:** РЎ РєР°РєРѕРіРѕ РІРѕР·СЂР°СЃС‚Р° СЂРµР±РµРЅРѕРє СЃС‡РёС‚Р°РµС‚СЃСЏ РІР·СЂРѕСЃР»С‹Рј РІ РІР°С€РµР№ РњРРЎ? (РѕР±С‹С‡РЅРѕ 18).



===== FILE: C:\git\apl\med\docs\03_SPEC_FEATURES.md =====


# MASTER FEATURE CATALOG: Medical Booking Engine 2025

Р­С‚РѕС‚ РґРѕРєСѓРјРµРЅС‚ СЃРѕРґРµСЂР¶РёС‚ РїРѕР»РЅС‹Р№ СЃРїРёСЃРѕРє С„СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹С… РІРѕР·РјРѕР¶РЅРѕСЃС‚РµР№ СЃРёСЃС‚РµРјС‹ **Booking Core**.

---

## рџЏ— Р“Р РЈРџРџРђ 1: РђСЂС…РёС‚РµРєС‚СѓСЂР° Рё Р”Р°РЅРЅС‹Рµ (Foundation)
*Р‘Р°Р·РѕРІС‹Р№ СЃР»РѕР№, РѕРїСЂРµРґРµР»СЏСЋС‰РёР№, РєР°Рє СЃРёСЃС‚РµРјР° СЂР°Р±РѕС‚Р°РµС‚ СЃ "Р¶РµР»РµР·РѕРј" Рё Р±Р°Р·Р°РјРё РґР°РЅРЅС‹С….*

1.  **Multi-Database Aggregation (Р¤РµРґРµСЂР°С‚РёРІРЅС‹Р№ РїРѕРёСЃРє)**
    *   РћРґРЅРѕРІСЂРµРјРµРЅРЅС‹Р№ РѕРїСЂРѕСЃ N Р±Р°Р· РґР°РЅРЅС‹С… РњРРЎ (РЅР°РїСЂРёРјРµСЂ, 3 Р±Р°Р·С‹ qMS).
    *   РЎРєР»РµР№РєР° СЂРµР·СѓР»СЊС‚Р°С‚РѕРІ РІ РµРґРёРЅС‹Р№ СЃРїРёСЃРѕРє Р±РµР· РґСѓР±Р»РµР№.
2.  **Actor vs Offering Separation (Р›РёС‡РЅРѕСЃС‚СЊ vs РџСЂРµРґР»РѕР¶РµРЅРёРµ)**
    *   Р Р°Р·РґРµР»РµРЅРёРµ РІСЂР°С‡Р° РЅР° "Р§РµР»РѕРІРµРєР°" (С„РѕС‚Рѕ, Р±РёРѕ) Рё "РЈСЃР»СѓРіСѓ" (С†РµРЅР°, С„РёР»РёР°Р», СЂР°СЃРїРёСЃР°РЅРёРµ).
3.  **CMS Hydration (РћР±РѕРіР°С‰РµРЅРёРµ РєРѕРЅС‚РµРЅС‚Р°)**
    *   РџРѕРґС‚СЏРіРёРІР°РЅРёРµ РјР°СЂРєРµС‚РёРЅРіРѕРІС‹С… РґР°РЅРЅС‹С… (С„РѕС‚Рѕ, СЂРµРіР°Р»РёРё, html-РѕРїРёСЃР°РЅРёРµ) РёР· WordPress/Bitrix РЅР° Р»РµС‚Сѓ.
4.  **Graceful Degradation (РћС‚РєР°Р·РѕСѓСЃС‚РѕР№С‡РёРІРѕСЃС‚СЊ)**
    *   Р•СЃР»Рё РѕРґРЅР° Р±Р°Р·Р° РњРРЎ СѓРїР°Р»Р°, СЃРµСЂРІРёСЃ РїРѕРєР°Р·С‹РІР°РµС‚ СЃР»РѕС‚С‹ РёР· РѕСЃС‚Р°РІС€РёС…СЃСЏ Р±Р°Р·.

---

## рџљЄ Р“Р РЈРџРџРђ 2: РўРѕС‡РєРё Р’С…РѕРґР° Рё РќР°РІРёРіР°С†РёСЏ (Entry Points)

5.  **Smart Omni-Search (РЈРјРЅС‹Р№ РїРѕРёСЃРє)**
    *   Р•РґРёРЅР°СЏ СЃС‚СЂРѕРєР° РїРѕРёСЃРєР°: РёС‰РµС‚ Р’СЂР°С‡Р°, РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ, РЈСЃР»СѓРіСѓ ("РЈР—Р"), РЎРёРјРїС‚РѕРј ("Р‘РѕР»РёС‚ СѓС…Рѕ").
    *   Р Р°Р±РѕС‚Р°РµС‚ РЅР° Р±Р°Р·Рµ РІРµРєС‚РѕСЂРЅРѕРіРѕ РёРЅРґРµРєСЃР° (Semantic Search), РЅРѕ Р±РµР· РґРёР°Р»РѕРіРѕРІРѕРіРѕ РёРЅС‚РµСЂС„РµР№СЃР°.
6.  **Deep Linking (Р“Р»СѓР±РѕРєРёРµ СЃСЃС‹Р»РєРё)**
    *   РџСЂСЏРјР°СЏ СЃСЃС‹Р»РєР° РЅР° РІСЂР°С‡Р°: `/?doctorId=123`.
    *   РџСЂСЏРјР°СЏ СЃСЃС‹Р»РєР° РЅР° СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ: `/?spec=cardio`.
7.  **Verticals (Р‘РёР·РЅРµСЃ-РІРµСЂС‚РёРєР°Р»Рё)**
    *   РР·РѕР»РёСЂРѕРІР°РЅРЅС‹Рµ РїРѕС‚РѕРєРё: "Р”РµС‚СЃС‚РІРѕ", "Р’Р·СЂРѕСЃР»С‹Рµ", "РЎС‚РѕРјР°С‚РѕР»РѕРіРёСЏ".

---

## рџ‘©вЂЌвљ•пёЏ Р“Р РЈРџРџРђ 3: Р’С‹Р±РѕСЂ Р’СЂР°С‡Р° Рё Р¤РёР»РёР°Р»Р° (Selection UX)

8.  **Reverse Branch Selection (РћР±СЂР°С‚РЅС‹Р№ РІС‹Р±РѕСЂ С„РёР»РёР°Р»Р°)**
    *   РЎС†РµРЅР°СЂРёР№: Р’С‹Р±СЂР°Р» "РљР°СЂРґРёРѕР»РѕРіР°" -> РЈРІРёРґРµР» СЃРїРёСЃРѕРє РІСЂР°С‡РµР№ РїРѕ РІСЃРµРјСѓ РіРѕСЂРѕРґСѓ -> Р’С‹Р±СЂР°Р» РІСЂР°С‡Р° -> РЈРІРёРґРµР» С„РёР»РёР°Р»С‹.
9.  **Rich Doctor Card (Р‘РѕРіР°С‚Р°СЏ РєР°СЂС‚РѕС‡РєР°)**
    *   Р’С‹РІРѕРґ С†РµРЅС‹ "РѕС‚..." РїСЂСЏРјРѕ РІ СЃРїРёСЃРєРµ.
    *   Р‘РµР№РґР¶Рё (Рљ.Рњ.Рќ., Р’С‹СЃС€Р°СЏ РєР°С‚РµРіРѕСЂРёСЏ, РЎС‚Р°Р¶).
10. **Visual Service Tree (Р’РёС‚СЂРёРЅР° РїР»РёС‚РѕРє)**
    *   РљСЂР°СЃРёРІС‹Рµ РёРєРѕРЅРєРё РєР°С‚РµРіРѕСЂРёР№ РЅР° РіР»Р°РІРЅРѕРј СЌРєСЂР°РЅРµ.

---

## рџ“… Р“Р РЈРџРџРђ 4: Р Р°Р±РѕС‚Р° СЃРѕ Р’СЂРµРјРµРЅРµРј (Scheduling)

11. **Quick Slots View (Р‘С‹СЃС‚СЂС‹Рµ СЃР»РѕС‚С‹)**
    *   РџРѕРєР°Р· Р±Р»РёР¶Р°Р№С€РёС… СЃР»РѕС‚РѕРІ РїСЂСЏРјРѕ РІ РєР°СЂС‚РѕС‡РєРµ РІСЂР°С‡Р°.
12. **Waitlist (Р›РёСЃС‚ РѕР¶РёРґР°РЅРёСЏ)**
    *   Р•СЃР»Рё СЃР»РѕС‚РѕРІ РЅРµС‚ -> РљРЅРѕРїРєР° "РЎРѕРѕР±С‰РёС‚СЊ, РєРѕРіРґР° РїРѕСЏРІРёС‚СЃСЏ РІСЂРµРјСЏ".
13. **Slot Hold (Р’СЂРµРјРµРЅРЅР°СЏ Р±СЂРѕРЅСЊ)**
    *   Р‘Р»РѕРєРёСЂРѕРІРєР° СЃР»РѕС‚Р° РЅР° РІСЂРµРјСЏ РІРІРѕРґР° РЎРњРЎ.

---

## рџ‘ЁвЂЌрџ‘©вЂЌрџ‘§ Р“Р РЈРџРџРђ 5: РџР°С†РёРµРЅС‚ Рё РЎРµРјСЊСЏ (Identity & CRM)

14. **Guest-First Flow (Р“РѕСЃС‚РµРІРѕР№ СЂРµР¶РёРј)**
    *   РўРµР»РµС„РѕРЅ РїСЂРѕСЃРёРј С‚РѕР»СЊРєРѕ РІ СЃР°РјРѕРј РєРѕРЅС†Рµ.
15. **Family Accounts (РЎРµРјРµР№РЅС‹Р№ РїСЂРѕС„РёР»СЊ)**
    *   Р’РѕР·РјРѕР¶РЅРѕСЃС‚СЊ Р·Р°РїРёСЃР°С‚СЊ СЂРµР±РµРЅРєР°.
    *   РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРёР№ С„РёР»СЊС‚СЂ РІСЂР°С‡РµР№ РїРѕ РІРѕР·СЂР°СЃС‚Сѓ.

---

## вљ–пёЏ Р“Р РЈРџРџРђ 6: Compliance & Security

16. **Data Minimization (РњРёРЅРёРјРёР·Р°С†РёСЏ РґР°РЅРЅС‹С…)**
    *   РћС‚РєР»СЋС‡РµРЅРёРµ СЃР±РѕСЂР° "Р»РёС€РЅРёС…" РїРѕР»РµР№ С‡РµСЂРµР· РєРѕРЅС„РёРі.
17. **Age Gate (Р’РѕР·СЂР°СЃС‚РЅРѕР№ С†РµРЅР·)**
    *   Р‘Р»РѕРєРёСЂРѕРІРєР° Р·Р°РїРёСЃРё РґРµС‚РµР№ РЅР° РІР·СЂРѕСЃР»С‹Рµ СѓСЃР»СѓРіРё.
18. **Explicit Consent (РЈРїСЂР°РІР»РµРЅРёРµ СЃРѕРіР»Р°СЃРёСЏРјРё)**
    *   Р“РёР±РєР°СЏ РЅР°СЃС‚СЂРѕР№РєР° РіР°Р»РѕС‡РµРє РѕС„РµСЂС‚С‹.

---

## рџ›  Р“Р РЈРџРџРђ 7: РђРґРјРёРЅРёСЃС‚СЂРёСЂРѕРІР°РЅРёРµ

19. **Sync Tool (РРЅСЃС‚СЂСѓРјРµРЅС‚ СЃРёРЅС…СЂРѕРЅРёР·Р°С†РёРё)**
    *   РРЅС‚РµСЂС„РµР№СЃ РґР»СЏ СЃРІСЏР·РєРё `ID Р’СЂР°С‡Р° РІ РњРРЎ` <-> `ID Р’СЂР°С‡Р° РІ WordPress`.
20. **API for AI Agents**
    *   Р“РѕС‚РѕРІС‹Рµ СЌРЅРґРїРѕРёРЅС‚С‹ (`/search`, `/slots`, `/book`) РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РІРЅРµС€РЅРёС… РіРѕР»РѕСЃРѕРІС‹С… Рё С‚РµРєСЃС‚РѕРІС‹С… Р±РѕС‚РѕРІ.



===== FILE: C:\git\apl\med\docs\03_SPEC_WP_SCHEMA.json =====


{
  "version": "0.1.0",
  "meta": {
    "generated_at": "2025-10-05T12:00:00Z",
    "generator": "Medical-OS-Architect"
  },
  "modules": {
    "core_doctors": true,
    "core_services": true,
    "core_branches": true,
    "module_faq": true,
    "module_reviews": false
  },
  "post_types": [
    {
      "slug": "doctor_profile",
      "label": "Р’СЂР°С‡Рё",
      "supports": ["title", "editor", "thumbnail"],
      "taxonomies": ["specialty", "audience", "category"]
    },
    {
      "slug": "service",
      "label": "РЈСЃР»СѓРіРё",
      "supports": ["title", "editor", "thumbnail"],
      "taxonomies": ["specialty", "service_class"]
    },
    {
      "slug": "branch",
      "label": "Р¤РёР»РёР°Р»С‹",
      "supports": ["title", "thumbnail"],
      "taxonomies": ["city"]
    },
    {
      "slug": "faq",
      "label": "Р’РѕРїСЂРѕСЃС‹ Рё РѕС‚РІРµС‚С‹",
      "supports": ["title", "editor"],
      "taxonomies": ["specialty"]
    }
  ],
  "taxonomies": [
    {
      "slug": "specialty",
      "label": "РЎРїРµС†РёР°Р»РёР·Р°С†РёРё",
      "hierarchical": true,
      "description": "РћСЃРЅРѕРІРЅРѕРµ РґРµСЂРµРІРѕ РЅР°РІРёРіР°С†РёРё (РЅР°РїСЂ. РҐРёСЂСѓСЂРіРёСЏ -> Р”РµС‚СЃРєР°СЏ С…РёСЂСѓСЂРіРёСЏ)"
    },
    {
      "slug": "audience",
      "label": "РђСѓРґРёС‚РѕСЂРёСЏ",
      "hierarchical": false,
      "values": ["adult", "child", "family"]
    },
    {
      "slug": "service_class",
      "label": "РўРёРї СѓСЃР»СѓРіРё",
      "hierarchical": false,
      "values": ["consultation", "diagnostic", "procedure", "analysis"]
    }
  ],
  "field_groups": {
    "doctor_integration": {
      "location": "doctor_profile",
      "fields": [
        { "key": "external_ids", "type": "repeater", "required": true, "sub_fields": ["source", "id"] },
        { "key": "is_bookable", "type": "true_false", "default": true }
      ]
    },
    "doctor_showcase": {
      "location": "doctor_profile",
      "fields": [
        { "key": "experience_start", "type": "date_picker", "label": "Р”Р°С‚Р° РЅР°С‡Р°Р»Р° РїСЂР°РєС‚РёРєРё" },
        { "key": "position", "type": "text", "label": "Р”РѕР»Р¶РЅРѕСЃС‚СЊ (РґР»СЏ Р±РµР№РґР¶Р°)" },
        { "key": "badges", "type": "repeater", "label": "Р РµРіР°Р»РёРё" },
        { "key": "video_card", "type": "url", "label": "РЎСЃС‹Р»РєР° РЅР° РІРёРґРµРѕ-РІРёР·РёС‚РєСѓ" }
      ]
    },
    "service_details": {
      "location": "service",
      "fields": [
        { "key": "preparation_text", "type": "wysiwyg", "label": "РџРѕРґРіРѕС‚РѕРІРєР° Рє РїСЂРёРµРјСѓ" },
        { "key": "contraindications", "type": "wysiwyg", "label": "РџСЂРѕС‚РёРІРѕРїРѕРєР°Р·Р°РЅРёСЏ" },
        { "key": "duration_hint", "type": "text", "label": "Р”Р»РёС‚РµР»СЊРЅРѕСЃС‚СЊ (СЃС‚СЂРѕРєР°)" }
      ]
    }
  }
}



===== FILE: C:\git\apl\med\docs\04_RESEARCH_ANALYSIS.md =====


# 04_RESEARCH_ANALYSIS: Р“Р»РѕР±Р°Р»СЊРЅС‹Рµ РїР°С‚С‚РµСЂРЅС‹ UX

**РђРЅР°Р»РёР· РєРѕРЅРєСѓСЂРµРЅС‚РѕРІ:** Doctolib (EU), ZocDoc (USA), Mayo Clinic, Practo.
**Р¤РѕРєСѓСЃ:** РљР°Рє СЃРєСЂС‹С‚СЊ СЃР»РѕР¶РЅСѓСЋ СЃС‚СЂСѓРєС‚СѓСЂСѓ РєР»РёРЅРёРєРё РѕС‚ РїР°С†РёРµРЅС‚Р°.

---

## 1. Р’РІРµРґРµРЅРёРµ: Р§С‚Рѕ РЅР° СЃР°РјРѕРј РґРµР»Рµ РЅСѓР¶РЅРѕ
Р¦РµР»СЊ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ вЂ” СЃРїСЂРѕРµРєС‚РёСЂРѕРІР°С‚СЊ РёРЅС‚РµСЂС„РµР№СЃ Рё РёРЅС‚РµРіСЂР°С†РёРѕРЅРЅСѓСЋ РїСЂРѕСЃР»РѕР№РєСѓ, РєРѕС‚РѕСЂС‹Рµ РґР°СЋС‚ РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ РµРґРёРЅС‹Р№ РєР°С‚Р°Р»РѕРі СѓСЃР»СѓРі/РІСЂР°С‡РµР№/СЃР»РѕС‚РѕРІ РїСЂРё РЅР°Р»РёС‡РёРё РЅРµСЃРєРѕР»СЊРєРёС… РЅРµР·Р°РІРёСЃРёРјС‹С… РёСЃС‚РѕС‡РЅРёРєРѕРІ СЂР°СЃРїРёСЃР°РЅРёСЏ.

вЂњChelyabinsk caseвЂќ вЂ” СЌС‚Рѕ С‡Р°СЃС‚РЅС‹Р№ РїСЂРёРјРµСЂ РѕР±С‰РµР№ Р·Р°РґР°С‡Рё **federated scheduling**: РѕРґРёРЅ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёР№ РїРѕРёСЃРє в†’ fan-out Р·Р°РїСЂРѕСЃРѕРІ РІ СЂР°Р·РЅС‹Рµ backends в†’ РЅРѕСЂРјР°Р»РёР·Р°С†РёСЏ в†’ РІС‹РґР°С‡Р°.

---

## 2. Р РµС„РµСЂРµРЅСЃС‹ Рё РњРµС…Р°РЅРёРєРё

### РњСѓР»СЊС‚Рё-РїР»РѕС‰Р°РґРєРё (Multi-Location)
*   **Doctolib:** РџРѕРґРґРµСЂР¶РёРІР°РµС‚ РѕС‚РѕР±СЂР°Р¶РµРЅРёРµ **РЅРµСЃРєРѕР»СЊРєРёС… РјРµСЃС‚ РїСЂРёРµРјР°** Сѓ РѕРґРЅРѕРіРѕ РІСЂР°С‡Р°. Р’СЂР°С‡ РѕРґРёРЅ (Actor), РјРµСЃС‚ РїСЂРёРµРјР° РјРЅРѕРіРѕ (Offerings).
*   **ZocDoc:** РЎСѓС‰РЅРѕСЃС‚СЊ вЂњlocationвЂќ вЂ” СЌС‚Рѕ РёР·РјРµРЅСЏРµРјС‹Р№ Р°С‚СЂРёР±СѓС‚ Р·Р°РїРёСЃРё. РЎР»РѕС‚ РїСЂРёРІСЏР·Р°РЅ Рє (Р’СЂР°С‡ + Р›РѕРєР°С†РёСЏ).
*   **Р’С‹РІРѕРґ РґР»СЏ РЅР°СЃ:** РќР°Рј РЅСѓР¶РЅРѕ СЂР°Р·РґРµР»РёС‚СЊ СЃСѓС‰РЅРѕСЃС‚СЊ `Doctor` (WP) Рё `Offering` (qMS). Р’СЂР°С‡ РРІР°РЅРѕРІ (WP ID 10) РјРѕР¶РµС‚ РёРјРµС‚СЊ Offering A (qMS Main) Рё Offering B (qMS Extra).

### РЎРµРјСЊСЏ (Multi-Profile)
*   **Mayo Clinic:** РСЃРїРѕР»СЊР·СѓРµС‚ РїРѕРЅСЏС‚РёРµ **proxy access** (РґРѕСЃС‚СѓРї Рє Р°РєРєР°СѓРЅС‚Сѓ СЂРµР±РµРЅРєР°).
*   **Р’С‹РІРѕРґ РґР»СЏ РЅР°СЃ:** Р”Р»СЏ MVP РёСЃРїРѕР»СЊР·СѓРµРј РїСЂРѕСЃС‚РѕРµ РїРµСЂРµРєР»СЋС‡РµРЅРёРµ "Р’Р·СЂРѕСЃР»С‹Р№/Р РµР±РµРЅРѕРє" (РєР°Рє РІ РЎРєР°РЅРґРёРЅР°РІРёРё), РЅРѕ РІ Р±Р°Р·Рµ РґР°РЅРЅС‹С… Р·Р°РєР»Р°РґС‹РІР°РµРј СЃС‚СЂСѓРєС‚СѓСЂСѓ `parent_id` -> `child_id`.

### Р›РёСЃС‚ РѕР¶РёРґР°РЅРёСЏ (Waitlist)
*   **Doctolib:** РњРµС…Р°РЅРёРєР° "Prendre rendez-vous plus tГґt". Р•СЃР»Рё СЃР»РѕС‚РѕРІ РЅРµС‚, РјРѕР¶РЅРѕ РїРѕРґРїРёСЃР°С‚СЊСЃСЏ РЅР° СѓРІРµРґРѕРјР»РµРЅРёСЏ.
*   **Р’С‹РІРѕРґ РґР»СЏ РЅР°СЃ:** Р’РЅРµРґСЂСЏРµРј `Waitlist` РЅР° СѓСЂРѕРІРЅРµ PHP (С‚Р°Р±Р»РёС†Р° `booking_waitlist`). Р•СЃР»Рё API РІРµСЂРЅСѓР» 0 СЃР»РѕС‚РѕРІ, РїРѕРєР°Р·С‹РІР°РµРј РєРЅРѕРїРєСѓ "РЎРѕРѕР±С‰РёС‚СЊ Рѕ РїРѕСЏРІР»РµРЅРёРё".

---

## 3. РўР°Р±Р»РёС†Р° РјРµС…Р°РЅРёРє

| РџР»Р°С‚С„РѕСЂРјР° | РњРµС…Р°РЅРёРєР° | РљР°Рє РїСЂРѕСЏРІР»СЏРµС‚СЃСЏ | Р—Р°С‡РµРј РІР°Рј |
|---|---|---|---|
| **Doctolib** | Multi-location | РћРґРёРЅ РїСЂРѕС„РёР»СЊ вЂ” N Р°РґСЂРµСЃРѕРІ | Р РµС€Р°РµС‚ РїСЂРѕР±Р»РµРјСѓ "Р’СЂР°С‡ СЂР°Р±РѕС‚Р°РµС‚ РІ 2 С„РёР»РёР°Р»Р°С… (СЂР°Р·РЅС‹Рµ СЋСЂР»РёС†Р°)" |
| **ZocDoc** | Real-time | РђРєС†РµРЅС‚ РЅР° "Р·Р°РїРёСЃСЊ Р·РґРµСЃСЊ Рё СЃРµР№С‡Р°СЃ" | Guest-First РїРѕРґС…РѕРґ РґР»СЏ РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ РєРѕРЅРІРµСЂСЃРёРё |
| **Mayo Clinic** | Auth-first | РЎРЅР°С‡Р°Р»Р° РІС…РѕРґ, РїРѕС‚РѕРј Р·Р°РїРёСЃСЊ | Р РµС„РµСЂРµРЅСЃ РґР»СЏ СЂРµР¶РёРјР° "Р›РёС‡РЅС‹Р№ РєР°Р±РёРЅРµС‚" (РЅРµ РґР»СЏ РІРёС‚СЂРёРЅС‹) |
| **HotDoc** | Queue | "Р’Р°С€Рµ РјРµСЃС‚Рѕ РІ РѕС‡РµСЂРµРґРё" | Р’Р°Сѓ-СЌС„С„РµРєС‚ РїРѕСЃР»Рµ Р·Р°РїРёСЃРё |

---

## 4. Р РµРєРѕРјРµРЅРґР°С†РёРё РїРѕРґ Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ (3 qMS в†’ 1 UX)

### UX: РЎРєСЂС‹С‚СЊ вЂњР»РѕСЃРєСѓС‚РЅРѕРµ РѕРґРµСЏР»РѕвЂќ
*   **РџСЂРѕРіСЂРµСЃСЃРёРІРЅР°СЏ РІС‹РґР°С‡Р°:** РџРѕРєР°Р·С‹РІР°Р№С‚Рµ РїРµСЂРІС‹Рµ РЅР°Р№РґРµРЅРЅС‹Рµ СЃР»РѕС‚С‹ СЃСЂР°Р·Сѓ (РёР· СЃР°РјРѕР№ Р±С‹СЃС‚СЂРѕР№ Р±Р°Р·С‹), Р° РѕСЃС‚Р°Р»СЊРЅС‹Рµ РґРѕРіСЂСѓР¶Р°Р№С‚Рµ. РСЃРїРѕР»СЊР·СѓР№С‚Рµ Skeleton Screens.
*   **РћР±СЂР°С‚РЅР°СЏ Р»РѕРіРёРєР°:** РЎРЅР°С‡Р°Р»Р° РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ -> РїРѕС‚РѕРј Р’СЂР°С‡ -> РїРѕС‚РѕРј Р¤РёР»РёР°Р» РїРѕРґС‚СЏРіРёРІР°РµС‚СЃСЏ СЃР°Рј.

### Fault Tolerance (РћС‚РєР°Р·РѕСѓСЃС‚РѕР№С‡РёРІРѕСЃС‚СЊ)
*   РќР° СѓСЂРѕРІРЅРµ PHP Gateway РІРІРѕРґРёРј **С‚Р°Р№Рј-Р±СЋРґР¶РµС‚** (РЅР°РїСЂРёРјРµСЂ, 1.5 СЃРµРє).
*   Р•СЃР»Рё Р‘Р°Р·Р° Рђ РѕС‚РІРµС‚РёР»Р°, Р° Р‘Р°Р·Р° Р‘ вЂ” РЅРµС‚, РїРѕРєР°Р·С‹РІР°РµРј С‚РѕР»СЊРєРѕ Рђ.
*   РќРёРєР°РєРёС… "Error 500". РўРѕР»СЊРєРѕ "Р§Р°СЃС‚СЊ С„РёР»РёР°Р»РѕРІ РЅРµРґРѕСЃС‚СѓРїРЅР°".

### Auth-first vs Guest-first
*   Р”Р»СЏ РїСЂРёРІР»РµС‡РµРЅРёСЏ **РЅРѕРІС‹С…** РїР°С†РёРµРЅС‚РѕРІ (РјР°СЂРєРµС‚РёРЅРі) РІС‹РёРіСЂС‹РІР°РµС‚ **Guest-First** (С‚РµР»РµС„РѕРЅ РІ РєРѕРЅС†Рµ).
*   Р”Р»СЏ РїРѕРІС‚РѕСЂРЅС‹С… (CRM) вЂ” Auth-First.
*   **Р РµС€РµРЅРёРµ:** Р”РµР»Р°РµРј РіРёР±СЂРёРґ. РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ Guest-First, РЅРѕ РµСЃР»Рё cookie РµСЃС‚СЊ вЂ” СѓР·РЅР°РµРј РїР°С†РёРµРЅС‚Р°.

---

## 5. Р§РµРє-Р»РёСЃС‚ РґР»СЏ СЂР°Р·СЂР°Р±РѕС‚РєРё

1.  **РљР°РЅРѕРЅРёС‡РµСЃРєР°СЏ РјРѕРґРµР»СЊ:** РџСЂРёРІРµСЃС‚Рё JSON РѕС‚ РІСЃРµС… 3-С… Р±Р°Р· Рє РµРґРёРЅРѕРјСѓ РІРёРґСѓ (СЃРј. `02_ARCHITECTURE_CORE.md`).
2.  **Hold (Р‘СЂРѕРЅСЊ):** Р РµР°Р»РёР·РѕРІР°С‚СЊ "РјСЏРіРєСѓСЋ Р±СЂРѕРЅСЊ" СЃР»РѕС‚Р° РЅР° 10 РјРёРЅСѓС‚, РїРѕРєР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІРІРѕРґРёС‚ РЎРњРЎ.
3.  **РџСЂРёРІР°С‚РЅРѕСЃС‚СЊ:** РќРµ РїРµСЂРµРґР°РІР°С‚СЊ Р¤РРћ Рё С‚РµР»РµС„РѕРЅ РІ "РџСѓР±Р»РёС‡РЅС‹Р№ РєРѕРЅС‚СѓСЂ" (AI РїРѕРёСЃРє).
4.  **Р’Р°Р»РёРґР°С†РёСЏ:** Р§РµС‚РєРёРµ СЃРѕРѕР±С‰РµРЅРёСЏ РѕР± РѕС€РёР±РєР°С… ("Р­С‚РѕС‚ РІСЂР°С‡ РїСЂРёРЅРёРјР°РµС‚ С‚РѕР»СЊРєРѕ РІР·СЂРѕСЃР»С‹С…").



===== FILE: C:\git\apl\med\docs\04_RESEARCH_AUDIT.md =====

# РњРЅРµРЅРёРµ Р’РЅРµС€РЅРµРіРѕ Р­РєСЃРїРµСЂС‚Р°: РђСѓРґРёС‚ РђСЂС…РёС‚РµРєС‚СѓСЂС‹ Booking Engine

**РЎС‚Р°С‚СѓСЃ:** External Audit / Expert Review
**Р”Р°С‚Р°:** РћРєС‚СЏР±СЂСЊ 2025
**РљРѕРЅС‚РµРєСЃС‚:** РћС‚РІРµС‚ РЅР° Р°СЂС…РёС‚РµРєС‚СѓСЂРЅС‹Р№ Р±СЂРёС„ РїРѕ СЃРёСЃС‚РµРјРµ РјСѓР»СЊС‚Рё-С„РёР»РёР°Р»СЊРЅРѕР№ Р·Р°РїРёСЃРё.

---

Р’С‹ СѓР¶Рµ РЅР°С‰СѓРїР°Р»Рё РїСЂР°РІРёР»СЊРЅСѓСЋ РѕСЃСЊ РїСЂРѕРґСѓРєС‚Р°: вЂњРґР°РЅРЅС‹Рµ в‰  РІРёС‚СЂРёРЅР° в‰  Р±РёР·РЅРµСЃ-СЃС‚СЂСѓРєС‚СѓСЂР°вЂќ, Рё РёРјРµРЅРЅРѕ РІ СЌС‚РѕРј РјРµСЃС‚Рµ РѕР±С‹С‡РЅРѕ СЂРѕР¶РґР°РµС‚СЃСЏ РјР°СЃС€С‚Р°Р±РёСЂСѓРµРјС‹Р№ whiteвЂ‘label Booking Engine. Р”Р°Р»СЊС€Рµ РїРѕС‚РµРЅС†РёР°Р» СЂР°СЃРєСЂС‹РІР°РµС‚СЃСЏ С‡РµСЂРµР· (Р°) С„РѕСЂРјР°Р»РёР·Р°С†РёСЋ РєРѕРЅС„РёРіСѓСЂР°С†РёРё РєР°Рє вЂњРїСЂРѕРґСѓРєС‚РѕРІРѕРіРѕ РєРѕРЅС‚СЂР°РєС‚Р°вЂќ Рё (Р±) РЅР°Р±РѕСЂ СЃС‚Р°РЅРґР°СЂС‚РЅС‹С… enterpriseвЂ‘РјРµС…Р°РЅРёРє РІРѕРєСЂСѓРі РїСЂРѕРёР·РІРѕРґРёС‚РµР»СЊРЅРѕСЃС‚Рё, РєРѕР»Р»РёР·РёР№ Рё С‚РѕС‡РµРє РІС…РѕРґР°.

## 1) РўРѕРїРѕР»РѕРіРёСЏ: РіРґРµ РјРѕР¶РµС‚ В«СЃР»РѕРјР°С‚СЊСЃСЏВ»
Р“Р»Р°РІРЅС‹Р№ СЂРёСЃРє РЅРµ РІ С‚РѕРј, С‡С‚Рѕ РєРѕРЅС„РёРі вЂњСЃР»РѕР¶РЅС‹Р№вЂќ, Р° РІ С‚РѕРј, С‡С‚Рѕ РѕРЅ РЅР°С‡РЅРµС‚ **РЅРµСЏРІРЅРѕ** РєРѕРґРёСЂРѕРІР°С‚СЊ РёСЃРєР»СЋС‡РµРЅРёСЏ (вЂњСЌС‚РѕС‚ РІСЂР°С‡ С‚СѓС‚, РЅРѕ РЅРµ С‚СѓС‚вЂќ), Рё РІС‹ РїРѕС‚РµСЂСЏРµС‚Рµ РїСЂРµРґСЃРєР°Р·СѓРµРјРѕСЃС‚СЊ РїСЂРё РјР°СЃС€С‚Р°Р±РёСЂРѕРІР°РЅРёРё. РўРёРїРѕРІР°СЏ РєРѕР»Р»РёР·РёСЏ: РІСЂР°С‡ СЂР°Р±РѕС‚Р°РµС‚ РІ РЅРµСЃРєРѕР»СЊРєРёС… РІРµСЂС‚РёРєР°Р»СЏС…/Р±СЂРµРЅРґР°С… Рё РІ СЂР°Р·РЅС‹С… С„РёР»РёР°Р»Р°С…, Р° UI С‚СЂРµР±СѓРµС‚ СЃС‚СЂРѕРіРѕР№ РёР·РѕР»СЏС†РёРё РїРѕС‚РѕРєРѕРІ вЂ” СЌС‚Рѕ РЅРµ РєРѕРЅС„Р»РёРєС‚ РґР°РЅРЅС‹С…, СЌС‚Рѕ РєРѕРЅС„Р»РёРєС‚ вЂњСѓРїР°РєРѕРІРєРёвЂќ РїСЂРµРґР»РѕР¶РµРЅРёСЏ.

Р§С‚Рѕ РѕР±С‹С‡РЅРѕ РґРµР»Р°СЋС‚ РІ СЌРЅС‚РµСЂРїСЂР°Р№Р·Рµ (РїСЂР°РєС‚РёС‡РµСЃРєРё РїСЂРёРјРµРЅРёРјРѕ Рє РІР°С€РµР№ РјРѕРґРµР»Рё root_slugs):
- **Р Р°Р·РІРµСЃС‚Рё вЂњActorвЂќ Рё вЂњOfferingвЂќ:** РѕРґРёРЅ РІСЂР°С‡ (actor) РјРѕР¶РµС‚ РёРјРµС‚СЊ РЅРµСЃРєРѕР»СЊРєРѕ вЂњРїСЂРµРґР»РѕР¶РµРЅРёР№вЂќ (offering) РїРѕ РІРµСЂС‚РёРєР°Р»СЏРј/Р±СЂРµРЅРґР°Рј, Сѓ РєР°Р¶РґРѕРіРѕ offering СЃРІРѕРё С†РµРЅС‹/РѕРїРёСЃР°РЅРёСЏ/Р»РµР№Р±Р»С‹/РѕРіСЂР°РЅРёС‡РµРЅРёСЏ Р·Р°РїРёСЃРё, Р° СЃР»РѕС‚С‹ Рё СЂР°СЃРїРёСЃР°РЅРёРµ РјР°РїСЏС‚СЃСЏ РЅР° offering С‡РµСЂРµР· РїСЂР°РІРёР»Р°.
- **Р”РѕР±Р°РІРёС‚СЊ РїСЂРёРѕСЂРёС‚РµС‚С‹ Рё РїСЂР°РІРёР»Р° СЂРµР·РѕР»СЋС†РёРё:** вЂњРµСЃР»Рё РІСЂР°С‡ РїРѕРјРµС‡РµРЅ РІ 2 РІРµСЂС‚РёРєР°Р»СЏС…, С‚Рѕ РІ РґРµС‚СЃРєРѕР№ РІРёС‚СЂРёРЅРµ РїРѕРєР°Р·С‹РІР°РµРј С‚РѕР»СЊРєРѕ СѓСЃР»СѓРіРё X/Y, РІ РІР·СЂРѕСЃР»РѕР№ вЂ” X/Z; РµСЃР»Рё СѓСЃР»СѓРіР° РЅРµ СЂР°Р·РјРµС‡РµРЅР° вЂ” РґРµС„РѕР»С‚РЅРѕРµ РїСЂР°РІРёР»Рѕ (СЃРєСЂС‹С‚СЊ/РїРѕРєР°Р·Р°С‚СЊ/РїРµСЂРµРЅРµСЃС‚Рё РІ вЂРґСЂСѓРіРѕРµвЂ™)вЂќ.
- **Р’РІРµСЃС‚Рё РІ РєРѕРЅС„РёРі 2 СЃР»РѕСЏ:** вЂњРіР»РѕР±Р°Р»СЊРЅР°СЏ СЃС…РµРјР°вЂќ (РєР°РєРёРµ РёР·РјРµСЂРµРЅРёСЏ РІРѕРѕР±С‰Рµ РґРѕСЃС‚СѓРїРЅС‹: cities/verticals/branches_mode/entrypoints) Рё вЂњС‚РµРЅР°РЅС‚вЂ‘РЅР°СЃС‚СЂРѕР№РєРёвЂќ (РєРѕРЅРєСЂРµС‚РЅС‹Рµ Р·РЅР°С‡РµРЅРёСЏ/РїСЂР°РІРёР»Р° РєРѕРЅРєСЂРµС‚РЅРѕР№ СЃРµС‚Рё). Р­С‚Рѕ СЃРЅРёР¶Р°РµС‚ РІРµСЂРѕСЏС‚РЅРѕСЃС‚СЊ, С‡С‚Рѕ РѕРґРёРЅ РєР»РёРµРЅС‚ вЂњСЃР»РѕРјР°РµС‚вЂќ РѕР±С‰СѓСЋ РјРѕРґРµР»СЊ.

РџСЂР°РєС‚РёС‡РµСЃРєРёР№ РїСЂРёР·РЅР°Рє, С‡С‚Рѕ РїРѕСЂР°: РєР°Рє С‚РѕР»СЊРєРѕ РїРѕСЏРІР»СЏРµС‚СЃСЏ С„СЂР°Р·Р° вЂњРІРѕС‚ СЌС‚РѕРјСѓ РєР»РёРµРЅС‚Сѓ РЅР°РґРѕ, С‡С‚РѕР±С‹ РІСЂР°С‡ Р±С‹Р» Рё С‚Р°Рј Рё С‚Р°Рј, РЅРѕ РїРѕ-СЂР°Р·РЅРѕРјСѓвЂќ, Р·РЅР°С‡РёС‚ root_slug СѓР¶Рµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РЅРµ РїСЂРѕСЃС‚Рѕ С‚РµРіРѕРј, Р° С‡Р°СЃС‚СЊСЋ РїСЂР°РІРёР» вЂњРІРёС‚СЂРёРЅР° в†’ РґРѕСЃС‚СѓРїРЅС‹Рµ offeringsвЂќ.

## 2) РљРѕРЅС„РёРі РєР°Рє РїСЂРѕРґСѓРєС‚: РІР°Р»РёРґР°С†РёСЏ, РІРµСЂСЃРёРё, С‚РµСЃС‚С‹
Р•СЃР»Рё РІР°С€Р° С‚РѕРїРѕР»РѕРіРёСЏ вЂ” СЌС‚Рѕ вЂњРѕРїРµСЂР°С†РёРѕРЅРЅР°СЏ СЃРёСЃС‚РµРјР°вЂќ РІРёС‚СЂРёРЅС‹, РµР№ РЅСѓР¶РЅС‹ РјРµС…Р°РЅРёРєРё РєР°Рє Сѓ РћРЎ:
- **Schema + РјРёРіСЂР°С†РёРё РєРѕРЅС„РёРіР°:** СЃС‚СЂРѕРіР°СЏ СЃС…РµРјР° (JSON Schema/TypeScript types) Рё РІРµСЂСЃРёРѕРЅРёСЂРѕРІР°РЅРёРµ, С‡С‚РѕР±С‹ РІС‹ РјРѕРіР»Рё Р±РµР·РѕРїР°СЃРЅРѕ СЌРІРѕР»СЋС†РёРѕРЅРёСЂРѕРІР°С‚СЊ РєРѕРЅС„РёРі Р±РµР· СЂСѓС‡РЅС‹С… РїСЂР°РІРѕРє РІ РєРѕРґРµ.
- **Config linting:** СЃС‚Р°С‚РёС‡РµСЃРєРёРµ РїСЂРѕРІРµСЂРєРё (вЂњverticals=true, РЅРѕ РЅРµС‚ РЅРё РѕРґРЅРѕРіРѕ root_slugвЂќ, вЂњbranches_mode=strict, РЅРѕ Сѓ С‡Р°СЃС‚Рё РІСЂР°С‡РµР№ РЅРµС‚ С„РёР»РёР°Р»РѕРІвЂќ, вЂњdeep link РЅР° С€Р°Рі СЃР»РѕС‚Р° СЂР°Р·СЂРµС€РµРЅ, РЅРѕ РЅРµС‚ РїСЂР°РІРёР»Р° РїСЂРѕРІРµСЂРєРё РґРѕСЃС‚СѓРїРЅРѕСЃС‚РёвЂќ).
- **Golden tests РЅР° User Flow:** РЅР°Р±РѕСЂ СЃС†РµРЅР°СЂРёРµРІ, РєРѕС‚РѕСЂС‹Рµ РїСЂРѕРіРѕРЅСЏСЋС‚СЃСЏ РЅР° РєРѕРЅС„РёРіРµ РєР»РёРµРЅС‚Р° (snapshot вЂњРєР°РєРёРµ С€Р°РіРё Р±СѓРґСѓС‚вЂќ, вЂњРєР°РєРёРµ С„РёР»СЊС‚СЂС‹ РїРѕСЏРІСЏС‚СЃСЏвЂќ, вЂњРєР°РєРёРµ РїР°СЂР°РјРµС‚СЂС‹ СѓР№РґСѓС‚ РІ GatewayвЂќ). Р­С‚Рѕ СЂРµР·РєРѕ СЃРЅРёР¶Р°РµС‚ СЂРµРіСЂРµСЃСЃРёРё РїСЂРё СЂРѕСЃС‚Рµ С‡РёСЃР»Р° РёР·РјРµСЂРµРЅРёР№.

Р­С‚Рѕ вЂњРЅРµ С„РёС‡Р°вЂќ, РЅРѕ СЌС‚Рѕ СЃР°РјР°СЏ Р±С‹СЃС‚СЂР°СЏ С‚РѕС‡РєР° СЂРѕСЃС‚Р° РїРѕ РјР°СЃС€С‚Р°Р±РёСЂСѓРµРјРѕСЃС‚Рё РІРЅРµРґСЂРµРЅРёР№ Рё СЃРЅРёР¶РµРЅРёСЋ СЃС‚РѕРёРјРѕСЃС‚Рё СЃР°РїРїРѕСЂС‚Р°.

## 3) Latency: СЃРєРµР»РµС‚РѕРЅС‹ РґР°, В«РѕРїС‚РёРјРёР·РјВ» РѕСЃС‚РѕСЂРѕР¶РЅРѕ
Р’С‹ РјРѕР¶РµС‚Рµ Р±СЂР°С‚СЊ РїСЂРёРјРµСЂ РёР· С‚РѕРіРѕ, РєР°Рє РІ HL7 FHIR СЂР°Р·РґРµР»СЏСЋС‚ СЂР°СЃРїРёСЃР°РЅРёСЏ Рё С„Р°РєС‚РёС‡РµСЃРєРёРµ Р·Р°РїРёСЃРё: Schedule вЂ” РєРѕРЅС‚РµР№РЅРµСЂ, РєРѕС‚РѕСЂС‹Р№ РѕРїРёСЃС‹РІР°РµС‚ РѕРєРЅРѕ РІСЂРµРјРµРЅРё/РґРѕСЃС‚СѓРїРЅРѕСЃС‚СЊ, Рё РѕС‚РґРµР»РµРЅ РѕС‚ РёРЅС„РѕСЂРјР°С†РёРё Рѕ РєРѕРЅРєСЂРµС‚РЅС‹С… РїСЂРёРµРјР°С…, С‡С‚Рѕ РїРѕРјРѕРіР°РµС‚ РґР°Р¶Рµ СЃ С‚РѕС‡РєРё Р·СЂРµРЅРёСЏ РїСЂРёРІР°С‚РЅРѕСЃС‚Рё Рё РґРѕСЃС‚СѓРїР° [1]. Slot вЂ” СЌС‚Рѕ СѓР¶Рµ РєРѕРЅРєСЂРµС‚РЅР°СЏ РµРґРёРЅРёС†Р° РІСЂРµРјРµРЅРё, РєРѕС‚РѕСЂСѓСЋ РјРѕР¶РЅРѕ Р±СЂРѕРЅРёСЂРѕРІР°С‚СЊ, Рё РІ С‚РёРїРѕРІРѕР№ РјРѕРґРµР»Рё РёС… РјРЅРѕРіРѕ РЅР° РѕРґРёРЅ Schedule (РЅР°РїСЂРёРјРµСЂ, РґРµСЃСЏС‚РєРё СЃР»РѕС‚РѕРІ РЅР° РЅРµРґРµР»СЋ) [2].

Р§С‚Рѕ СЌС‚Рѕ РґР°РµС‚ РІР°Рј Р°СЂС…РёС‚РµРєС‚СѓСЂРЅРѕ РїСЂРё 2вЂ“3 СЃРµРє Р°РіСЂРµРіР°С†РёРё:
- **РљСЌС€РёСЂРѕРІР°С‚СЊ вЂњРјРµРґР»РµРЅРЅС‹РµвЂќ hydratedвЂ‘РїСЂРѕС„РёР»Рё РІСЂР°С‡РµР№** (С„РѕС‚Рѕ/СЂРµРіР°Р»РёРё/РѕРїРёСЃР°РЅРёСЏ) РѕС‚РґРµР»СЊРЅРѕ РѕС‚ вЂњР±С‹СЃС‚СЂС‹С… Рё С‡Р°СЃС‚Рѕ РјРµРЅСЏСЋС‰РёС…СЃСЏвЂќ СЃР»РѕС‚РѕРІ; СЃР»РѕС‚С‹ вЂ” РєРѕСЂРѕС‚РєРёР№ TTL, РїСЂРѕС„РёР»Рё вЂ” РґР»РёРЅРЅС‹Р№ TTL.
- **РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ staleвЂ‘whileвЂ‘revalidate:** РїРѕРєР°Р·С‹РІР°РµС‚Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ РїРѕСЃР»РµРґРЅРёР№ РІР°Р»РёРґРЅС‹Р№ СЃРЅРёРјРѕРє (РѕСЃРѕР±РµРЅРЅРѕ СЃРїРёСЃРєРё РІСЂР°С‡РµР№), РїР°СЂР°Р»Р»РµР»СЊРЅРѕ РѕР±РЅРѕРІР»СЏРµС‚Рµ, Р° РЅР° С€Р°РіРµ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ СЃР»РѕС‚Р° РґРµР»Р°РµС‚Рµ СЃС‚СЂРѕРіСѓСЋ СЃРµСЂРІРµСЂРЅСѓСЋ РїСЂРѕРІРµСЂРєСѓ (С‡С‚РѕР±С‹ РЅРµ Р·Р°РїРёСЃР°С‚СЊ РІ СѓР¶Рµ Р·Р°РЅСЏС‚РѕРµ).
- **вЂњРћРїС‚РёРјРёСЃС‚РёС‡РЅС‹Р№ UIвЂќ СѓРјРµСЃС‚РµРЅ С‚РѕР»СЊРєРѕ С‚Р°Рј, РіРґРµ РѕС€РёР±РєР° РґРµС€С‘РІР°СЏ** (РЅР°РїСЂРёРјРµСЂ, РїРѕРґРіСЂСѓР·РєР° РѕРїРёСЃР°РЅРёСЏ РІСЂР°С‡Р°); РЅР° СЃР»РѕС‚Рµ РѕС€РёР±РєР° РґРѕСЂРѕРіР°СЏ (РЅРµРґРѕРІРµСЂРёРµ), РїРѕСЌС‚РѕРјСѓ Р»СѓС‡С€Рµ вЂњРїСЃРµРІРґРѕвЂ‘РѕРїС‚РёРјРёР·РјвЂќ: РїСЂРµРґРІР°СЂРёС‚РµР»СЊРЅС‹Р№ РїРѕРєР°Р· + РѕР±СЏР·Р°С‚РµР»СЊРЅР°СЏ С„РёРЅР°Р»СЊРЅР°СЏ РІР°Р»РёРґР°С†РёСЏ РЅР° СЃРµСЂРІРµСЂРµ.

РџСЂРѕ СЃРєРµР»РµС‚РѕРЅС‹: РѕРЅРё РЅРµ СЃРµСЂРµР±СЂСЏРЅР°СЏ РїСѓР»СЏ вЂ” РµСЃС‚СЊ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ/СЌРєСЃРїРµСЂРёРјРµРЅС‚С‹, РіРґРµ skeletonвЂ‘СЌРєСЂР°РЅС‹ РїРѕРєР°Р·Р°Р»Рё С…СѓРґС€РёРµ РјРµС‚СЂРёРєРё РІРѕСЃРїСЂРёСЏС‚РёСЏ РѕР¶РёРґР°РЅРёСЏ Рё РІС‹РїРѕР»РЅРµРЅРёСЏ Р·Р°РґР°С‡ РїРѕ СЃСЂР°РІРЅРµРЅРёСЋ СЃРѕ СЃРїРёРЅРЅРµСЂРѕРј/РїСѓСЃС‚С‹Рј СЌРєСЂР°РЅРѕРј [3]. Р•СЃР»Рё РґРµР»Р°РµС‚Рµ skeleton, РґРµР»Р°Р№С‚Рµ РµРіРѕ вЂњС‡РµСЃС‚РЅС‹РјвЂќ (РїРѕС…РѕР¶Рµ РЅР° СЂРµР°Р»СЊРЅСѓСЋ СЃС‚СЂСѓРєС‚СѓСЂСѓ РєРѕРЅС‚РµРЅС‚Р° Рё Р±РµР· РѕС‰СѓС‰РµРЅРёСЏ, С‡С‚Рѕ вЂњСѓР¶Рµ РїРѕС‡С‚Рё РіРѕС‚РѕРІРѕвЂќ), РёРЅР°С‡Рµ РІС‹ РјРѕР¶РµС‚Рµ СѓС…СѓРґС€РёС‚СЊ РІРѕСЃРїСЂРёСЏС‚РёРµ Р·Р°РґРµСЂР¶РєРё РІРјРµСЃС‚Рѕ СѓР»СѓС‡С€РµРЅРёСЏ [3].

## 4) Entry points: С‡С‚Рѕ Р·Р°Р»РѕР¶РёС‚СЊ СЃРµР№С‡Р°СЃ
вЂњРћС‚ РІСЂР°С‡Р°вЂќ Рё вЂњРѕС‚ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚РёвЂќ вЂ” Р±Р°Р·РѕРІС‹Рµ. Р§С‚РѕР±С‹ Р°СЂС…РёС‚РµРєС‚СѓСЂР° Р±С‹Р»Р° РіРѕС‚РѕРІР° Рє СЂРµР°Р»СЊРЅС‹Рј РІРѕСЂРѕРЅРєР°Рј РєР»РёРЅРёРє, СЏ Р±С‹ Р·Р°Р»РѕР¶РёР» РєР°Рє РјРёРЅРёРјСѓРј РµС‰С‘ 5 С‚РѕС‡РµРє РІС…РѕРґР° (РєР°Рє РєРѕРЅС„РёРіСѓСЂРёСЂСѓРµРјС‹Рµ entrypoints, Р° РЅРµ РѕС‚РґРµР»СЊРЅС‹Рµ СЃС‚СЂР°РЅРёС†С‹):
- **РћС‚ СѓСЃР»СѓРіРё/С‚РёРїР° РІРёР·РёС‚Р°:** вЂњРєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏвЂќ, вЂњРЈР—РвЂќ, вЂњС‡РµРєР°РївЂќ, вЂњР°РЅР°Р»РёР·вЂќ; СЌС‚Рѕ РІР°Р¶РЅРѕ РґР»СЏ РєР»РёРЅРёРє, РіРґРµ СѓСЃР»СѓРіРё РЅРµ = РІСЂР°С‡Р°Рј (РІС‹ СЌС‚Рѕ СѓР¶Рµ РѕС‚РјРµС‚РёР»Рё).
- **РћС‚ вЂњСЃР°РјРѕРµ СЂР°РЅРЅРµРµ РІСЂРµРјСЏвЂќ:** РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РёСЂР°РµС‚ вЂњРєРѕРіРґР° Р±Р»РёР¶Р°Р№С€Р°СЏ Р·Р°РїРёСЃСЊвЂќ в†’ РїРѕС‚РѕРј СѓС‚РѕС‡РЅСЏРµС‚ РІСЂР°С‡Р°/С„РёР»РёР°Р» (СЃРёР»СЊРЅРѕ РїРѕРІС‹С€Р°РµС‚ РєРѕРЅРІРµСЂСЃРёСЋ, РєРѕРіРґР° С†РµР»СЊ вЂ” Р±С‹СЃС‚СЂРѕ РїРѕРїР°СЃС‚СЊ).
- **РћС‚ СЃРёРјРїС‚РѕРјР°/РїРѕРІРѕРґР° РѕР±СЂР°С‰РµРЅРёСЏ:** СЌС‚Рѕ РЅРµ РѕР±СЏР·Р°С‚РµР»СЊРЅРѕ вЂњРјРµРґРёС†РёРЅСЃРєРёР№ РґРёР°РіРЅРѕР·вЂќ; СЌС‚Рѕ РјРѕР¶РµС‚ Р±С‹С‚СЊ СЃР»РѕРІР°СЂСЊ РјР°СЂРєРµС‚РёРЅРіРѕРІС‹С… С„РѕСЂРјСѓР»РёСЂРѕРІРѕРє, РјР°РїРїСЏС‰РёР№СЃСЏ РЅР° СѓСЃР»СѓРіРё/СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё (Рё РјРѕР¶РµС‚ Р¶РёС‚СЊ С†РµР»РёРєРѕРј РІ РІР°С€РµРј РєРѕРЅС„РёРіРµ/С‚Р°РєСЃРѕРЅРѕРјРёРё, РЅРµР·Р°РІРёСЃРёРјРѕ РѕС‚ РњРРЎ).
- **РћС‚ С„РёР»РёР°Р»Р°/РіРµРѕ:** вЂњСЂСЏРґРѕРј СЃРѕ РјРЅРѕР№вЂќ, вЂњРЅР° СЌС‚РѕР№ СѓР»РёС†РµвЂќ, вЂњСѓ РјРµС‚СЂРѕвЂќ; РѕСЃРѕР±РµРЅРЅРѕ РІР°Р¶РЅРѕ РїСЂРё reverse branch selection, С‡С‚РѕР±С‹ РЅРµ С‚РµСЂСЏС‚СЊ Р»СЋРґРµР№, РєРѕС‚РѕСЂС‹Рµ РІСЃС‘-С‚Р°РєРё РїСЂРёРІСЏР·Р°РЅС‹ Рє Р»РѕРєР°С†РёРё.
- **РћС‚ С„РѕСЂРјР°С‚Р°:** РѕС‡РЅРѕ/РѕРЅР»Р°Р№РЅ, РІР·СЂРѕСЃР»С‹Р№/РґРµС‚СЃРєРёР№ РІРѕР·СЂР°СЃС‚, СЏР·С‹Рє РІСЂР°С‡Р°, РїРѕР» РІСЂР°С‡Р° (С‡Р°СЃС‚Рѕ РєСЂРёС‚РёС‡РЅРѕ РІ СЂРµР°Р»СЊРЅРѕСЃС‚Рё Рё РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ РёР·РјРµСЂРµРЅРёРµРј С„РёР»СЊС‚СЂР°, Р° РЅРµ РєРѕСЃС‚С‹Р»С‘Рј).

РљР»СЋС‡РµРІРѕР№ РїСЂРёРЅС†РёРї: entrypoint РґРѕР»Р¶РµРЅ РїСЂРёРІРѕРґРёС‚СЊ Рє РѕРґРЅРѕРјСѓ Рё С‚РѕРјСѓ Р¶Рµ вЂњСЏРґСЂСѓвЂќ Р±СЂРѕРЅРёСЂРѕРІР°РЅРёСЏ (РІР°С€ РґРёРЅР°РјРёС‡РµСЃРєРёР№ СЃС‚РѕСЂ/С„Р»РѕСѓ), РїСЂРѕСЃС‚Рѕ СЃ СЂР°Р·РЅС‹РјРё РїСЂРµРґР·Р°РїРѕР»РЅРµРЅРЅС‹РјРё РїР°СЂР°РјРµС‚СЂР°РјРё Рё СЂР°Р·РЅС‹РјРё РїРµСЂРІС‹РјРё С€Р°РіР°РјРё.

## 5) РўРѕС‡РєРё СЂРѕСЃС‚Р° РїСЂРѕРґСѓРєС‚Р° РґР»СЏ РєР»РёРЅРёРє
Р•СЃР»Рё С†РµР»СЊ вЂ” вЂњРјРѕС‰РЅС‹Р№ РёРЅСЃС‚СЂСѓРјРµРЅС‚вЂќ, С‚Рѕ Booking Engine РѕР±С‹С‡РЅРѕ РІС‹РёРіСЂС‹РІР°РµС‚ РЅРµ С‚РѕР»СЊРєРѕ UXвЂ‘РІРѕСЂРѕРЅРєРѕР№, РЅРѕ Рё С‚РµРј, С‡С‚Рѕ СЃРЅРёР¶Р°РµС‚ РѕРїРµСЂР°С†РёРѕРЅРЅС‹Рµ РїРѕС‚РµСЂРё РєР»РёРЅРёРєРё:
- **РђРЅС‚РёвЂ‘noвЂ‘show РїР°РєРµС‚:** РЅР°РїРѕРјРёРЅР°РЅРёСЏ (SMS/РјРµСЃСЃРµРЅРґР¶РµСЂС‹), РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ РІРёР·РёС‚Р°, РїСЂРѕСЃС‚Р°СЏ РїРµСЂРµРЅРѕСЃ/РѕС‚РјРµРЅР°, Р»РёСЃС‚ РѕР¶РёРґР°РЅРёСЏ; SMSвЂ‘РЅР°РїРѕРјРёРЅР°РЅРёСЏ РІ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏС… СЃРЅРёР¶Р°Р»Рё РЅРµСЏРІРєРё (РЅР°РїСЂРёРјРµСЂ, РІ РѕРґРЅРѕРј РёСЃСЃР»РµРґРѕРІР°РЅРёРё Р°Р±СЃРѕР»СЋС‚РЅРѕРµ СЃРЅРёР¶РµРЅРёРµ СЃРѕСЃС‚Р°РІРёР»Рѕ 6.9%, Р° РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅРѕРµ вЂ” 38%) [4].
- **вЂњРљРѕРјРјРµСЂС‡РµСЃРєРёР№ СЃР»РѕР№вЂќ РїРѕРІРµСЂС… Р·Р°РїРёСЃРё:** РґРµРїРѕР·РёС‚С‹/РїСЂРµРґРѕРїР»Р°С‚Р° РґР»СЏ РґРµС„РёС†РёС‚РЅС‹С… СЃР»РѕС‚РѕРІ, РїСЂР°РІРёР»Р° С€С‚СЂР°С„РѕРІ, РїСЂРѕРјРѕРєРѕРґС‹/РєР°РјРїР°РЅРёРё, СЂР°Р·РЅС‹Рµ РїСЂР°Р№СЃС‹ РїРѕ РІРµСЂС‚РёРєР°Р»СЏРј (СЌС‚Рѕ РµСЃС‚РµСЃС‚РІРµРЅРЅРѕ Р»РѕР¶РёС‚СЃСЏ РЅР° РјРѕРґРµР»СЊ offering).
- **РћРїРµСЂР°С†РёРѕРЅРЅС‹Рµ РёРЅС‚РµСЂС„РµР№СЃС‹:** РєР°Р±РёРЅРµС‚ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР° (РєРѕРЅС‚СЂРѕР»СЊ СЂР°СЃРїРёСЃР°РЅРёР№/РѕРєРЅР° РїСЂРёРµРјР°/РѕРІРµСЂР±СѓРєРёРЅРі), Р°СѓРґРёС‚ РёР·РјРµРЅРµРЅРёР№ РєРѕРЅС„РёРіСѓСЂР°С†РёРё, РЅР°Р±Р»СЋРґР°РµРјРѕСЃС‚СЊ (РјРµС‚СЂРёРєРё вЂњtime-to-first-slotвЂќ, вЂњdrop-off РїРѕ С€Р°РіР°РјвЂќ, вЂњРѕС€РёР±РєРё РґСЂР°Р№РІРµСЂРѕРІвЂќ).



===== FILE: C:\git\apl\med\docs\04_RESEARCH_BRIEF.md =====

# РўРµС…РЅРёС‡РµСЃРєРѕРµ Р·Р°РґР°РЅРёРµ РЅР° РёСЃСЃР»РµРґРѕРІР°РЅРёРµ: Global Best Practices for Medical Booking

**РўРµРјР°:** РСЃСЃР»РµРґРѕРІР°РЅРёРµ Р»СѓС‡С€РёС… РјРёСЂРѕРІС‹С… РїСЂР°РєС‚РёРє (UX/UI Рё РђСЂС…РёС‚РµРєС‚СѓСЂР°) РґР»СЏ РїРѕСЃС‚СЂРѕРµРЅРёСЏ РІРёРґР¶РµС‚Р° РѕРЅР»Р°Р№РЅ-Р·Р°РїРёСЃРё РІ РјСѓР»СЊС‚Рё-С„РёР»РёР°Р»СЊРЅРѕР№ РјРµРґРёС†РёРЅСЃРєРѕР№ СЃРµС‚Рё.

## 1. РљРѕРЅС‚РµРєСЃС‚ РїСЂРѕРµРєС‚Р° (Р”Р°РЅРѕ)
РњС‹ СЂР°Р·СЂР°Р±Р°С‚С‹РІР°РµРј **Standalone React Widget** (РІСЃС‚СЂР°РёРІР°РµРјС‹Р№ РєРѕРјРїРѕРЅРµРЅС‚), РєРѕС‚РѕСЂС‹Р№ Р±СѓРґРµС‚ СЂР°Р±РѕС‚Р°С‚СЊ РЅР° СЃР°Р№С‚Р°С… РїРѕРґ СѓРїСЂР°РІР»РµРЅРёРµРј WordPress Рё MODX.

**РљР»СЋС‡РµРІР°СЏ СЃР»РѕР¶РЅРѕСЃС‚СЊ (The "Chelyabinsk" Case):**
*   РЈ РЅР°СЃ **3 РЅРµР·Р°РІРёСЃРёРјС‹С… Р±Р°Р·С‹ РґР°РЅРЅС‹С…** РњРРЎ (qMS), РєРѕС‚РѕСЂС‹Рµ РѕС‚РґР°СЋС‚ РґР°РЅРЅС‹Рµ РїРѕ API.
*   Р’ РѕРґРЅРѕРј РіРѕСЂРѕРґРµ (Р§РµР»СЏР±РёРЅСЃРє) 4 С„РёР»РёР°Р»Р°: 3 СЂР°Р±РѕС‚Р°СЋС‚ РЅР° РѕРґРЅРѕР№ Р±Р°Р·Рµ, 4-Р№ вЂ” РЅР° РґСЂСѓРіРѕР№.
*   **Р—Р°РґР°С‡Р°:** Р”Р»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ СЌС‚Рѕ РґРѕР»Р¶РЅРѕ РІС‹РіР»СЏРґРµС‚СЊ РєР°Рє РµРґРёРЅР°СЏ СЌРєРѕСЃРёСЃС‚РµРјР°. РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РЅРµ РґРѕР»Р¶РµРЅ Р·РЅР°С‚СЊ, С‡С‚Рѕ С‚РµС…РЅРёС‡РµСЃРєРё РѕРЅ РїРµСЂРµРєР»СЋС‡Р°РµС‚СЃСЏ РјРµР¶РґСѓ СЂР°Р·РЅС‹РјРё СЋСЂРёРґРёС‡РµСЃРєРёРјРё Р»РёС†Р°РјРё Рё СЃРµСЂРІРµСЂР°РјРё.
*   Р‘СЌРєРµРЅРґ-РїСЂРѕСЃР»РѕР№РєР°: PHP. Р¤СЂРѕРЅС‚РµРЅРґ: React.

---

## 2. Р¦РµР»Рё РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ
РќР°Р№С‚Рё Рё РѕРїРёСЃР°С‚СЊ СЂРµС„РµСЂРµРЅСЃС‹ (Global Benchmarks), РєРѕС‚РѕСЂС‹Рµ СѓСЃРїРµС€РЅРѕ СЂРµС€РёР»Рё РїСЂРѕР±Р»РµРјСѓ **Р°РіСЂРµРіР°С†РёРё СЃР»РѕР¶РЅРѕР№ РёРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂС‹** РІ РїСЂРѕСЃС‚РѕР№ Рё Р±С‹СЃС‚СЂС‹Р№ РёРЅС‚РµСЂС„РµР№СЃ. РќР°СЃ РёРЅС‚РµСЂРµСЃСѓСЋС‚ РЅРµ Р»РѕРєР°Р»СЊРЅС‹Рµ РєРѕРЅРєСѓСЂРµРЅС‚С‹, Р° РјРёСЂРѕРІС‹Рµ Р»РёРґРµСЂС‹ (РЎРЁРђ, Р¤СЂР°РЅС†РёСЏ, Р“РµСЂРјР°РЅРёСЏ, РђР·РёСЏ).

---

## 3. РљР»СЋС‡РµРІС‹Рµ РІРѕРїСЂРѕСЃС‹ РґР»СЏ РїСЂРѕСЂР°Р±РѕС‚РєРё (Scope of Work)

### Р‘Р»РѕРє Рђ: UX/UI Рё РЎС†РµРЅР°СЂРёРё (Frontend Mechanics)

1.  **РџСЂРѕР±Р»РµРјР° В«Р›РѕСЃРєСѓС‚РЅРѕРіРѕ РѕРґРµСЏР»Р°В» (Seamless Branch Merge):**
    *   *Р’РѕРїСЂРѕСЃ:* РљР°Рє РјРёСЂРѕРІС‹Рµ СЃРµСЂРІРёСЃС‹ (РїСЂРёРјРµСЂ: ZocDoc, Doctolib) РѕС‚РѕР±СЂР°Р¶Р°СЋС‚ СЃР»РѕС‚С‹ РѕРґРЅРѕРіРѕ РІСЂР°С‡Р°, РµСЃР»Рё РѕРЅ РїСЂРёРЅРёРјР°РµС‚ РІ СЂР°Р·РЅС‹С… С„РёР»РёР°Р»Р°С… (РєРѕС‚РѕСЂС‹Рµ С‚РµС…РЅРёС‡РµСЃРєРё РјРѕРіСѓС‚ Р±С‹С‚СЊ СЂР°Р·РЅС‹РјРё СЃСѓС‰РЅРѕСЃС‚СЏРјРё)?
    *   *Р—Р°РґР°С‡Р°:* РќР°Р№С‚Рё РїСЂРёРјРµСЂС‹ РёРЅС‚РµСЂС„РµР№СЃРѕРІ, РіРґРµ РІС‹Р±РѕСЂ СЃРЅР°С‡Р°Р»Р° РёРґРµС‚ РїРѕ **РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё**, Р° С„РёР»РёР°Р» РїРѕРґР±РёСЂР°РµС‚СЃСЏ РґРёРЅР°РјРёС‡РµСЃРєРё ("РћР±СЂР°С‚РЅР°СЏ Р»РѕРіРёРєР°").

2.  **РЎС†РµРЅР°СЂРёР№ В«РЎРµРјСЊСЏВ» (Multi-profile Management):**
    *   *Р’РѕРїСЂРѕСЃ:* РљР°Рє СЌР»РµРіР°РЅС‚РЅРѕ СЂРµР°Р»РёР·РѕРІР°РЅРѕ РїРµСЂРµРєР»СЋС‡РµРЅРёРµ В«Р—Р°РїРёСЃС‹РІР°СЋ СЃРµР±СЏВ» / В«Р—Р°РїРёСЃС‹РІР°СЋ СЂРµР±РµРЅРєР°В» / В«Р—Р°РїРёСЃС‹РІР°СЋ Р¶РµРЅСѓВ»?
    *   *РќСЋР°РЅСЃ:* РљР°Рє РёР·Р±РµР¶Р°С‚СЊ РІРІРѕРґР° Р»РёС€РЅРёС… РґР°РЅРЅС‹С… (РЅР°РїСЂРёРјРµСЂ, РґР°С‚С‹ СЂРѕР¶РґРµРЅРёСЏ), РµСЃР»Рё РјС‹ С…РѕС‚РёРј РјР°РєСЃРёРјР°Р»СЊРЅСѓСЋ РєРѕРЅРІРµСЂСЃРёСЋ, РЅРѕ РїСЂРё СЌС‚РѕРј РѕР±СЏР·Р°РЅС‹ РІР°Р»РёРґРёСЂРѕРІР°С‚СЊ РІРѕР·СЂР°СЃС‚ РґР»СЏ РїРµРґРёР°С‚СЂР°?
    *   *Р РµС„РµСЂРµРЅСЃ РґР»СЏ РїРѕРёСЃРєР°:* Cleveland Clinic, Mayo Clinic (Patient Portals).

3.  **РЎС‚СЂР°С‚РµРіРёСЏ РђРІС‚РѕСЂРёР·Р°С†РёРё (Auth-First vs Guest-First):**
    *   *Р’РѕРїСЂРѕСЃ:* РЎСЂР°РІРЅРёС‚СЊ РєРѕРЅРІРµСЂСЃРёСЋ Рё UX РІ РґРІСѓС… РїРѕРґС…РѕРґР°С…:
        *   **Uber-style:** РЎРЅР°С‡Р°Р»Р° СѓСЃР»СѓРіР° Рё РІСЂРµРјСЏ, С‚РµР»РµС„РѕРЅ РІ СЃР°РјРѕРј РєРѕРЅС†Рµ.
        *   **SuperApp-style:** РЎРЅР°С‡Р°Р»Р° РІС…РѕРґ РїРѕ SMS, РїРѕС‚РѕРј РґРѕСЃС‚СѓРї Рє СЂР°СЃРїРёСЃР°РЅРёСЋ.
    *   *Р—Р°РґР°С‡Р°:* РџСЂРёРІРµСЃС‚Рё Р°СЂРіСѓРјРµРЅС‚С‹ "Р·Р°" Рё "РїСЂРѕС‚РёРІ" РґР»СЏ РєРµР№СЃР°, РєРѕРіРґР° С†РµР»СЊ вЂ” РїСЂРёРІР»РµС‡РµРЅРёРµ *РЅРѕРІС‹С…* РїРµСЂРІРёС‡РЅС‹С… РїР°С†РёРµРЅС‚РѕРІ.

### Р‘Р»РѕРє Р‘: РђСЂС…РёС‚РµРєС‚СѓСЂРЅС‹Рµ РїР°С‚С‚РµСЂРЅС‹ (System Design)

1.  **РњР°СЃРєРёСЂРѕРІРєР° Р·Р°РґРµСЂР¶РµРє (Latency Masking):**
    *   *РџСЂРѕР±Р»РµРјР°:* РћРїСЂРѕСЃ 3-С… СЂР°Р·РЅС‹С… Р±Р°Р· РґР°РЅРЅС‹С… Р·Р°РЅРёРјР°РµС‚ РІСЂРµРјСЏ (РґРѕ 2-3 СЃРµРєСѓРЅРґ).
    *   *Р—Р°РґР°С‡Р°:* РљР°Рє Р»РёРґРµСЂС‹ СЂС‹РЅРєР° СЃРєСЂС‹РІР°СЋС‚ РѕР¶РёРґР°РЅРёРµ? (Skeletons, Optimistic UI, РїСЂРѕРіСЂРµСЃСЃРёРІРЅР°СЏ РїРѕРґРіСЂСѓР·РєР° СЃР»РѕС‚РѕРІ). РљР°Рє РѕРЅРё РїРѕРєР°Р·С‹РІР°СЋС‚ СЃР»РѕС‚С‹ РїРµСЂРІРѕР№ Р±Р°Р·С‹, РїРѕРєР° РІС‚РѕСЂР°СЏ РµС‰Рµ РіСЂСѓР·РёС‚СЃСЏ?

2.  **РћР±СЂР°Р±РѕС‚РєР° РѕС€РёР±РѕРє (Fault Tolerance):**
    *   *РљРµР№СЃ:* Р§С‚Рѕ РїРѕРєР°Р·С‹РІР°С‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ, РµСЃР»Рё "Р¤РёР»РёР°Р» 1" (Р‘Р°Р·Р° Рђ) РѕС‚РІРµС‚РёР», Р° "Р¤РёР»РёР°Р» 4" (Р‘Р°Р·Р° Р‘) Р»РµР¶РёС‚ РёР»Рё РѕС‚РІР°Р»РёР»СЃСЏ РїРѕ С‚Р°Р№РјР°СѓС‚Сѓ? РљР°Рє РЅРµ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°С‚СЊ РІРµСЃСЊ РёРЅС‚РµСЂС„РµР№СЃ?

### Р‘Р»РѕРє Р’: РњРёРєСЂРѕ-С„РёС‡Рё Рё "Р’Р°Сѓ-СЌС„С„РµРєС‚С‹"

*   **Triage (РџРµСЂРІРёС‡РЅР°СЏ СЃРѕСЂС‚РёСЂРѕРІРєР°):** РСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РїСЂРѕСЃС‚С‹С… РѕРїСЂРѕСЃРЅРёРєРѕРІ РїРµСЂРµРґ Р·Р°РїРёСЃСЊСЋ (РЅР°РїСЂРёРјРµСЂ, "Р‘РѕР»РёС‚ РѕСЃС‚СЂРѕ?" -> РїРµСЂРµРЅР°РїСЂР°РІР»РµРЅРёРµ РЅР° РґРµР¶СѓСЂРЅРѕРіРѕ РІСЂР°С‡Р°).
*   **Waitlist (Р›РёСЃС‚ РѕР¶РёРґР°РЅРёСЏ):** РњРµС…Р°РЅРёРєРё Р·Р°РїРёСЃРё, РµСЃР»Рё РЅРµС‚ СЃРІРѕР±РѕРґРЅС‹С… СЃР»РѕС‚РѕРІ (Notification when available).
*   **Deep Linking:** РљР°Рє РїСЂР°РІРёР»СЊРЅРѕ РїРµСЂРµРґР°РІР°С‚СЊ РєРѕРЅС‚РµРєСЃС‚ (РІС‹Р±СЂР°РЅРЅРѕРіРѕ РІСЂР°С‡Р°) РёР· СЂРµРєР»Р°РјРЅРѕРіРѕ Р±Р°РЅРЅРµСЂР° СЃСЂР°Р·Сѓ РІ РІРёРґР¶РµС‚, РјРёРЅСѓСЏ РіР»Р°РІРЅСѓСЋ СЃС‚СЂР°РЅРёС†Сѓ.

---

## 4. РћР¶РёРґР°РµРјС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚ (Deliverables)

РћС‚С‡РµС‚ РІ С„РѕСЂРјР°С‚Рµ PDF/Notion, СЃРѕРґРµСЂР¶Р°С‰РёР№:
1.  **Р РµРµСЃС‚СЂ Р РµС„РµСЂРµРЅСЃРѕРІ:** РЎРєСЂРёРЅС€РѕС‚С‹ Рё РІРёРґРµРѕ (screen recording) РїСЂРѕС…РѕР¶РґРµРЅРёСЏ РїСѓС‚Рё Р·Р°РїРёСЃРё РЅР° 3-5 Р»СѓС‡С€РёС… РјРёСЂРѕРІС‹С… РїР»Р°С‚С„РѕСЂРјР°С….
2.  **РЎСЂР°РІРЅРёС‚РµР»СЊРЅР°СЏ С‚Р°Р±Р»РёС†Р° РјРµС…Р°РЅРёРє:** (РџСЂРёРјРµСЂ: "Doctolib С‚СЂРµР±СѓРµС‚ РґР°С‚Сѓ СЂРѕР¶РґРµРЅРёСЏ СЃСЂР°Р·Сѓ, Р° Mayo Clinic вЂ” РЅРµС‚").
3.  **Р РµРєРѕРјРµРЅРґР°С†РёРё РґР»СЏ РЅР°С€РµР№ Р°СЂС…РёС‚РµРєС‚СѓСЂС‹:** "РЈС‡РёС‚С‹РІР°СЏ РІР°С€Рё 3 Р±Р°Р·С‹ РґР°РЅРЅС‹С…, СЂРµРєРѕРјРµРЅРґСѓРµРј РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РїР°С‚С‚РµСЂРЅ [РќР°Р·РІР°РЅРёРµ] РєР°Рє РІ [РЎРµСЂРІРёСЃ X]".

---

## 5. Р РµРєРѕРјРµРЅРґСѓРµРјС‹Рµ СЃРµСЂРІРёСЃС‹ РґР»СЏ Р°РЅР°Р»РёР·Р° (Starting Point)
*   **Doctolib** (Р•РІСЂРѕРїР° вЂ” СЌС‚Р°Р»РѕРЅ UX Р·Р°РїРёСЃРё).
*   **ZocDoc** (РЎРЁРђ вЂ” СЌС‚Р°Р»РѕРЅ Р°РіСЂРµРіР°С†РёРё СЂР°Р·РЅС‹С… РєР»РёРЅРёРє).
*   **Practo** (РђР·РёСЏ вЂ” РІС‹СЃРѕРєР°СЏ РЅР°РіСЂСѓР·РєР°, СЃР»РѕР¶РЅР°СЏ СЃС‚СЂСѓРєС‚СѓСЂР°).
*   **Mayo Clinic App** (РЎРЁРђ вЂ” СЌС‚Р°Р»РѕРЅ РіРѕСЃРїРёС‚Р°Р»СЊРЅРѕРіРѕ РїСЂРёР»РѕР¶РµРЅРёСЏ).
*   **HotDoc** (РђРІСЃС‚СЂР°Р»РёСЏ).



===== FILE: C:\git\apl\med\docs\04_RESEARCH_SUMMARY.md =====


# 04_RESEARCH_SUMMARY: РС‚РѕРіРё R&D

**РЎС‚Р°С‚СѓСЃ:** РСЃСЃР»РµРґРѕРІР°РЅРёРµ Р·Р°РІРµСЂС€РµРЅРѕ.
**Р¦РµР»СЊ:** РЎРѕР·РґР°С‚СЊ Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ, РєРѕС‚РѕСЂР°СЏ СЃРєСЂС‹РІР°РµС‚ СЃР»РѕР¶РЅРѕСЃС‚СЊ РјСѓР»СЊС‚Рё-Р±Р°Р·РѕРІРѕР№ СЃС‚СЂСѓРєС‚СѓСЂС‹ (Р§РµР»СЏР±РёРЅСЃРє) Р·Р° РїСЂРµРјРёР°Р»СЊРЅС‹Рј РёРЅС‚РµСЂС„РµР№СЃРѕРј.

---

## рџЋЇ Р“Р»Р°РІРЅС‹Рµ РІС‹РІРѕРґС‹ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ

### 1. РђСЂС…РёС‚РµРєС‚СѓСЂРЅС‹Р№ РїР°С‚С‚РµСЂРЅ: "Federated Gateway"
Р’РјРµСЃС‚Рѕ С‚РѕРіРѕ С‡С‚РѕР±С‹ Р·Р°СЃС‚Р°РІР»СЏС‚СЊ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РІС‹Р±РёСЂР°С‚СЊ С„РёР»РёР°Р», РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј **API Gateway (PHP)**, РєРѕС‚РѕСЂС‹Р№ РґРµР»Р°РµС‚ РїР°СЂР°Р»Р»РµР»СЊРЅС‹Рµ Р·Р°РїСЂРѕСЃС‹ (`curl_multi`) РєРѕ РІСЃРµРј Р±Р°Р·Р°Рј РґР°РЅРЅС‹С… (Chel Main, Chel Extra) Рё СЃРєР»РµРёРІР°РµС‚ СЂРµР·СѓР»СЊС‚Р°С‚С‹.
*   **Р РµР·СѓР»СЊС‚Р°С‚:** РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІРёРґРёС‚ РµРґРёРЅС‹Р№ СЃРїРёСЃРѕРє РІСЂР°С‡РµР№, РєР°Рє РІ Doctolib.
*   **Р РµР°Р»РёР·Р°С†РёСЏ:** РЎРј. `docs/02_ARCHITECTURE_CORE.md`.

### 2. РџСЂРёРЅС†РёРї "Specialty-First"
РњРёСЂРѕРІС‹Рµ Р»РёРґРµСЂС‹ (ZocDoc, Doctolib) РёСЃРїРѕР»СЊР·СѓСЋС‚ РІС…РѕРґ С‡РµСЂРµР· СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ, Р° РЅРµ С‡РµСЂРµР· РєР»РёРЅРёРєСѓ.
*   **Flow:** РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ -> РЎРїРёСЃРѕРє Р’СЂР°С‡РµР№ (СЃРѕ РІСЃРµС… С„РёР»РёР°Р»РѕРІ) -> РЎР»РѕС‚ -> РђРІС‚РѕСЂРёР·Р°С†РёСЏ.
*   **Р РµР°Р»РёР·Р°С†РёСЏ:** РЎРј. `docs/03_SPEC_FEATURES.md` (Reverse Branch Selection).

### 3. Graceful Degradation (РћС‚РєР°Р·РѕСѓСЃС‚РѕР№С‡РёРІРѕСЃС‚СЊ)
Р•СЃР»Рё РѕРґРЅР° РёР· Р±Р°Р· РњРРЎ (РЅР°РїСЂРёРјРµСЂ, "Р¤РёР»РёР°Р» РЅР° РўСЂСѓРґР°") РЅРµ РѕС‚РІРµС‡Р°РµС‚:
*   **РџР»РѕС…Рѕ:** РџРѕРєР°Р·Р°С‚СЊ РѕС€РёР±РєСѓ 500 РЅР° РІРµСЃСЊ РІРёРґР¶РµС‚.
*   **РҐРѕСЂРѕС€Рѕ:** РџРѕРєР°Р·Р°С‚СЊ РІСЂР°С‡РµР№ РёР· РґРѕСЃС‚СѓРїРЅС‹С… Р±Р°Р· Рё СѓРІРµРґРѕРјР»РµРЅРёРµ "Р§Р°СЃС‚СЊ СЂР°СЃРїРёСЃР°РЅРёСЏ РІСЂРµРјРµРЅРЅРѕ РЅРµРґРѕСЃС‚СѓРїРЅР°".

### 4. РЎС‚СЂР°С‚РµРіРёСЏ "Guest-First"
Р”Р»СЏ РїРµСЂРІРёС‡РЅС‹С… РїР°С†РёРµРЅС‚РѕРІ (РЅР°С€Р° Р¦Рђ) РєРѕРЅРІРµСЂСЃРёСЏ РІС‹С€Рµ, РµСЃР»Рё РїСЂРѕСЃРёС‚СЊ С‚РµР»РµС„РѕРЅ **РІ СЃР°РјРѕРј РєРѕРЅС†Рµ** (РїСЂРё Р±СЂРѕРЅРёСЂРѕРІР°РЅРёРё СЃР»РѕС‚Р°), Р° РЅРµ РЅР° РІС…РѕРґРµ.
*   **Р РµР°Р»РёР·Р°С†РёСЏ:** РќР°СЃС‚СЂРѕР№РєР° `auth_flow: guest_first` РІ `config.php`.

---

## рџ“Љ РћР¶РёРґР°РµРјС‹Рµ РјРµС‚СЂРёРєРё (KPI)

| РњРµС‚СЂРёРєР° | РўРµРєСѓС‰РµРµ (Legacy) | Р¦РµР»СЊ (New Core) | Р—Р° СЃС‡РµС‚ С‡РµРіРѕ |
|---------|------------------|-----------------|--------------|
| **РљРѕРЅРІРµСЂСЃРёСЏ** | ~65% | **75%+** | РЈРїСЂРѕС‰РµРЅРёРµ РІС‹Р±РѕСЂР° С„РёР»РёР°Р»Р°, Guest-First. |
| **РЎРєРѕСЂРѕСЃС‚СЊ** | 4.2s | **<1.5s** | РљСЌС€РёСЂРѕРІР°РЅРёРµ "СЃС‚Р°С‚РёС‡РЅС‹С…" РґР°РЅРЅС‹С… (Actor) РІ PHP. |
| **РћС€РёР±РєРё** | User Frustration | **Zero Dead Ends** | РЈРјРЅС‹Р№ РїРѕРёСЃРє (РІРµРєС‚РѕСЂРЅС‹Р№) РІРјРµСЃС‚Рѕ С‚РѕС‡РЅРѕРіРѕ СЃРѕРІРїР°РґРµРЅРёСЏ. |

---

## рџ“љ РќР°РІРёРіР°С†РёСЏ РїРѕ СЂРµР·СѓР»СЊС‚Р°С‚Р°Рј

Р”РµС‚Р°Р»СЊРЅС‹Рµ РѕС‚С‡РµС‚С‹ СЂР°Р·Р»РѕР¶РµРЅС‹ РїРѕ С„Р°Р№Р»Р°Рј:

1.  **[04_RESEARCH_ANALYSIS.md](04_RESEARCH_ANALYSIS.md)** вЂ” Р“Р»СѓР±РѕРєРёР№ СЂР°Р·Р±РѕСЂ РїР°С‚С‚РµСЂРЅРѕРІ Doctolib, ZocDoc, Mayo Clinic.
2.  **[04_RESEARCH_AUDIT.md](04_RESEARCH_AUDIT.md)** вЂ” РљСЂРёС‚РёРєР° Р°СЂС…РёС‚РµРєС‚СѓСЂС‹ РІРЅРµС€РЅРёРј СЌРєСЃРїРµСЂС‚РѕРј.
3.  **[02_ARCHITECTURE_CORE.md](02_ARCHITECTURE_CORE.md)** вЂ” РС‚РѕРіРѕРІРѕРµ С‚РµС…РЅРёС‡РµСЃРєРѕРµ СЂРµС€РµРЅРёРµ (SSOT).

---

## рџљЂ РЎР»РµРґСѓСЋС‰РёРµ С€Р°РіРё

1.  РЈС‚РІРµСЂРґРёС‚СЊ РєРѕРЅС„РёРіСѓСЂР°С†РёСЋ РІ `php_backend/config_parts/`.
2.  Р—Р°РїРѕР»РЅРёС‚СЊ РјР°РїРїРёРЅРі РІСЂР°С‡РµР№ (РёРЅСЃС‚СЂСѓРјРµРЅС‚ `tools/sync_tool.php`).
3.  Р—Р°РїСѓСЃС‚РёС‚СЊ A/B С‚РµСЃС‚ СЂРµР¶РёРјР° "Р’РёС‚СЂРёРЅР°" (Guest-First).



===== FILE: C:\git\apl\med\docs\05_LOGS_BRANCHES.txt =====


РќРёР¶Рµ РїСЂРёРјРµСЂ СЂР°Р±РѕС‚С‹ "РїРѕ РІСЃРµРј С„РёР»РёР°Р»Р°Рј". Р•СЃР»Рё РЅРµ СѓРєР°Р·С‹РІР°С‚СЊ РІ Р·Р°РїСЂРѕСЃРµ getslotsbyspec РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ С„РёР»РёР°Р»Р° - С‚Рѕ РІС‹РґР°СЃС‚ РЅР°Р№РґРµРЅРЅС‹С… РІСЂР°С‡РµР№ СЌС‚РѕР№ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё РїРѕ РІСЃРµРј С„РёР»РёР°Р»Р°Рј
РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі: РџРѕ РїРѕРІРѕРґСѓ "РЅРѕРІС‹Р№ / СЃСѓС‰РµСЃС‚РІСѓСЋС‰РёР№ РїР°С†РёРµРЅС‚" 
РЇ: РљР°Рє РґСѓРјР°РµС€СЊ РјРЅРµ РЅР° СЃР°Р№С‚Рµ СЂРµР°Р»РёР·РѕРІР°С‚СЊ СЌС‚Рѕ РёР»Рё СЃС‡РёС‚Р°С‚СЊВ РІСЃРµС…В РЅРѕРІС‹РјРё?
РћР»РµРі: Р’ РєР°РєРѕРј РїР»Р°РЅРµ? Р”Р»СЏ РїРѕРІРµРґРµРЅРёСЏ РЅР° СЃР°Р№С‚Рµ? Р•СЃР»Рё С‚С‹ РїСЂРѕ СЌС‚Рѕ - С‚Рѕ РґР»СЏ РЅР°С‡Р°Р»Р° РїСЂРµРґР»РѕР¶РёР» Р±С‹ СЃС‡РёС‚Р°С‚СЊ РІСЃРµС… РЅРѕРІС‹РјРё, Р° С‚Р°Рј СѓР¶Рµ РїРѕРіР»СЏРґРµС‚СЊ
РћР»РµРі: РїРѕРёСЃРєР° РІСЂР°С‡Р° РїРѕ С„РёРѕ РЅРµС‚ РІ РїСЂРёРЅС†РёРїРµ, СЃС‡РёС‚Р°РµС‚СЃСЏ, С‡С‚Рѕ РїР°С†РёРµРЅС‚ РІСЃРµРіРґР° РёРґРµС‚ РѕС‚ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё РІСЂР°С‡Р°. Р’ РїСЂРёРЅС†РёРїРµ РјРѕР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ, РЅРѕ С‚РѕРіРґР° Р±СѓРґСѓС‚ РІСЂР°С‡Рё, РєРѕРіРґР° РѕРЅ РµРґРёРЅ РІ РЅРµСЃРєРѕР»СЊРєРёС… С„РёР»РёР°Р»Р°С… Рё РЅРµСЃРєРѕР»СЊРєРёС… СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЏС… - Р° СЌС‚Рѕ СЃ С‚РѕС‡РєРё Р·СЂРµРЅРёСЏ СЃРёСЃС‚РµРјС‹ СЂР°Р·РЅС‹Рµ РІСЂР°С‡Рё.
РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі: РєСЃС‚Р°С‚Рё, РїСЂРё РїРѕР»СѓС‡РµРЅРёРё СЃР»РѕС‚РѕРІ РµСЃР»Рё РЅРµ СѓРєР°Р·Р°С‚СЊ РІСЂР°С‡Р°, Р° С‚РѕР»СЊРєРѕ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ Рё РґРµРЅСЊ - С‚Рѕ РїРѕР»СѓС‡РёРј РІСЃРµС… РІСЂР°С‡РµР№ СЌС‚РѕР№ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё РїРѕ РІСЃРµРј С„РёР»РёР°Р»Р°Рј





2025-10-03 08:51:23.400 | INFO     | Oleg РЅР°Р¶Р°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ ('Р—Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ').
2025-10-03 08:51:23.527 | DEBUG    | Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/branch_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': 206156880}
2025-10-03 08:51:30.405 | DEBUG    | РћС‚РІРµС‚: {'result': 'success', 'branches': {'РўACdAAC': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAC', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAD': {'title': 'Р”РµС‚СЃРєР°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAD', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAQ': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAQ', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAR': {'title': 'РћС‚РґРµР»РµРЅРёРµ РєРѕСЃРјРµС‚РѕР»РѕРіРёРё (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAR', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAA\\': {'title': 'РџРѕР»РёРєР»РёРЅРёРєР° (РЎРѕСЃРЅРѕРІСЃРєРёР№ СЂ-РЅ, РїРѕСЃ. "Р›РµСЃРЅРѕР№ РѕСЃС‚СЂРѕРІ", СѓР». Р“СЂР°РґРѕСЃС‚СЂРѕРёС‚РµР»РµР№, 1/3)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAA\\', 'orgqqc': 'РўACdAAFAqAA'}, 'РўAGdAAE': {'title': 'Р­РљРћ (СѓР». Р§РёС‡РµСЂРёРЅР°, 36РІ)', 'org': 'Р­РєРѕРљР»РёРЅРёРєР°', 'qqc': 'РўAGdAAE', 'orgqqc': 'РўAGdAADANAA'}}}
2025-10-03 08:51:33.100 | INFO     | Oleg РІС‹Р±СЂР°Р» С„РёР»РёР°Р»: Р»СЋР±РѕР№ 
2025-10-03 08:51:33.178 | DEBUG    | Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/spec_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': 206156880, 'qqc244': ''}
2025-10-03 08:51:33.721 | DEBUG    | РћС‚РІРµС‚: {'spec': ['РђРєСѓС€РµСЂ-РіРёРЅРµРєРѕР»РѕРі', 'РђР»Р»РµСЂРіРѕР»РѕРі-РёРјРјСѓРЅРѕР»РѕРі', 'Р’РћРџ', 'Р’СЂР°С‡ РґРµС‚СЃРєРёР№ РєР°СЂРґРёРѕР»РѕРі', 'Р’СЂР°С‡ РґРµС‚СЃРєРёР№ СѓСЂРѕР»РѕРі-Р°РЅРґСЂРѕР»РѕРі', 'Р’СЂР°С‡-РѕС‚РѕСЂРёРЅРѕР»Р°СЂРёРЅРіРѕР»РѕРі', 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'Р“РµРјР°С‚РѕР»РѕРі', 'Р”РµСЂРјР°С‚РѕРІРµРЅРµСЂРѕР»РѕРі', 'Р”РµС‚СЃРєРёР№ С…РёСЂСѓСЂРі', 'Р”РµС‚СЃРєРёР№ СЌРЅРґРѕРєСЂРёРЅРѕР»РѕРі', 'Р”РёРµС‚РѕР»РѕРі', 'Р—Р°РІРµРґСѓСЋС‰РёР№ РѕС‚РґРµР»РµРЅРёРµРј Р°РєСѓС€РµСЂСЃС‚РІР° Рё РіРёРЅРµРєРѕР»РѕРіРёРё', 'Р—Р°РјРµСЃС‚РёС‚РµР»СЊ РіР»Р°РІРЅРѕРіРѕ РІСЂР°С‡Р° РїРѕ РїРµРґРёР°С‚СЂРёРё', 'РљР°СЂРґРёРѕР»РѕРі', 'РљРѕР»РѕРїСЂРѕРєС‚РѕР»РѕРі', 'РќРµРІСЂРѕР»РѕРі', 'РќРµР№СЂРѕС…РёСЂСѓСЂРі', 'РќРµС„СЂРѕР»РѕРі', 'РћР¤РўРђР›Р¬РњРћР›РћР“', 'РћРЅРєРѕР»РѕРі', 'РџРµРґРёР°С‚СЂ', 'РџРµСЂРёРЅР°С‚Р°Р»СЊРЅС‹Р№  РїСЃРёС…РѕР»РѕРі', 'РџСЂРѕС„РїР°С‚РѕР»РѕРі', 'РџСЃРёС…РёР°С‚СЂ', 'РџСЃРёС…РёР°С‚СЂ-РЅР°СЂРєРѕР»РѕРі', 'РџСЃРёС…РѕР»РѕРі', 'РџСЃРёС…РѕС‚РµСЂР°РїРµРІС‚', 'РџСѓР»СЊРјРѕРЅРѕР»РѕРі', 'Р РµРІРјР°С‚РѕР»РѕРі', 'РЎРµСЂРґРµС‡РЅРѕ-СЃРѕСЃСѓРґРёСЃС‚С‹Р№ С…РёСЂСѓСЂРі', 'РўРµСЂР°РїРµРІС‚', 'РўСЂР°РІРјР°С‚РѕР»РѕРі-РѕСЂС‚РѕРїРµРґ', 'РЈСЂРѕР»РѕРі', 'Р¤РёР·РёРѕС‚РµСЂР°РїРµРІС‚', 'Р¤СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹Р№ РґРёР°РіРЅРѕСЃС‚', 'Р­РЅРґРѕРєСЂРёРЅРѕР»РѕРі']}
2025-10-03 08:51:41.700 | INFO     | Oleg РІС‹Р±СЂР°Р» СЃРїРµС†РёР°Р»РёР·Р°С†РёСЋ: РљР°СЂРґРёРѕР»РѕРі
2025-10-03 08:51:41.766 | DEBUG    | Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': 206156880, 'spec': 'РљР°СЂРґРёРѕР»РѕРі'}
2025-10-03 08:51:48.773 | DEBUG    | РћС‚РІРµС‚: {'slots': [{'fio': 'Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡', 'qqc': 'РўACdAACASAA', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}, {'fio': 'Р РµРґСЊРєРёРЅР° РњР°СЂРёРЅР° Р’Р°Р»РµСЂСЊРµРІРЅР°', 'qqc': 'РўACdAACASAD', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}, {'fio': 'РџСЂРѕС…РѕСЂРѕРІР° РќР°С‚Р°Р»СЊСЏ РџР°РІР»РѕРІРЅР°', 'qqc': 'РўACdAACASAH', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 3200}, {'fio': 'Р“СѓСЃРµРІР° РђР»С‘РЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР°', 'qqc': 'РўACdAAQAPAC', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 3200}, {'fio': 'РђС‚Р°РјР°РЅРѕРІР° РўР°С‚СЊСЏРЅР° Р®СЂСЊРµРІРЅР°', 'qqc': 'РўACdAAQAPAD', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}, {'fio': 'Р—РµРјР»СЏРЅСЃРєР°СЏ РђРЅРЅР° Р®СЂСЊРµРІРЅР°', 'qqc': 'РўACdAAQDDAB', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 3200}, {'fio': 'РЁРµР»РѕРјРѕРІР° РќР°С‚Р°Р»СЊСЏ РќРёРєРѕР»Р°РµРІРЅР°', 'qqc': 'РўACdAAQDfAA', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}, {'fio': 'Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡', 'qqc': 'РўACdAA\\AwAA', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}]}



===== FILE: C:\git\apl\med\docs\05_LOGS_MAIN.txt =====


РќРёР¶Рµ: РїСЂРёРјРµСЂ С†РµРїРѕС‡РєРё Р·Р°РїСЂРѕСЃРѕРІ Рё РѕС‚РІРµС‚РѕРІ Р±РѕС‚Р° РґР»СЏ С†РёРєР»Р° Р·Р°РїРёСЃРё РїР°С†РёРµРЅС‚Р° С‡РµСЂРµР· Р±СЌРєРµРЅРґ.
Р’РёРґРЅС‹ url-С‹, Р·Р°РіРѕР»РѕРІРєРё Рё РѕС‚РІРµС‚С‹ Р±СЌРєРµРЅРґР°.
Р¦РёРєР» РїСЂРµРґРїРѕР»Р°РіР°РµС‚ РІС‹Р±РѕСЂ С„РёР»РёР°Р»Р°, РІСЂР°С‡Р°, РґРЅСЏ, РІСЂРµРјРµРЅРё, РїР°С†РёРµРЅС‚Р° Рё Р·Р°С‚РµРј Р·Р°РїРёСЃСЊ РїР°С†РёРµРЅС‚Р° РЅР° СЌС‚Рѕ РІСЂРµРјСЏ.

РџРµСЂРІС‹Р№ РїСЂРёРјРµСЂ - СЃ РѕС‚РєР°Р·РѕРј РѕС‚ Р·Р°РїРёСЃРё РІ РёС‚РѕРіРµ (РЅРµС‚ Р·Р°РїСЂРѕСЃР° РЅРµРїРѕСЃСЂРµРґСЃС‚РІРµРЅРЅРѕ РЅР° Р·Р°РїРёСЃСЊ)
Р’С‚РѕСЂРѕР№ - СЃ Р·Р°РїРёСЃСЊСЋ РїР°С†РёРµРЅС‚Р°, РєРѕС‚РѕСЂС‹Р№ СѓР¶Рµ РµСЃС‚СЊ РІ Р±Р°Р·Рµ (СЃРѕС…СЂР°РЅРµРЅ РІ Р±РѕС‚Рµ)
РўСЂРµС‚РёР№ - Р·Р°РїРёСЃСЊ РЅРѕРІРѕРіРѕ РїР°С†РёРµРЅС‚Р°.
РќР°С‡РЅРё РїРѕРєР° РёР·СѓС‡Р°С‚СЊ, С‡С‚Рѕ Рє С‡РµРјСѓ, СЃРїСЂР°С€РёРІР°Р№, РґР°РІР°Р№ РІС‹СЏСЃРЅСЏС‚СЊ, РєР°РєРѕР№ РёРЅС„С‹ РЅРµ С…РІР°С‚Р°РµС‚ :)
РљР»СЋС‡ API С‰Р° СЃРґРµР»Р°СЋ Рё СЃРєРёРЅСѓ С‚РµР±Рµ.
Р РµР°Р»СЊРЅРѕ СЂР°Р±РѕС‚Р° РІ СЌС‚РёС… Р·Р°РїСЂРѕСЃР°С… РёРґРµС‚ СЃ СѓС‡РµР±РЅРѕР№ Р±Р°Р·РѕР№ РІ Р§РµР»СЏР±РёРЅСЃРєРµ, РµСЃР»Рё С‡С‚Рѕ.

[15:11, 01.10.2025] РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі РЎРџР±: РЅСѓ СЏ РїРёСЃР°Р» Р¶Рµ РїСЂРѕСЃР»РѕР№РєСѓ РјРµР¶РґСѓ QMS Рё РІРЅРµС€РЅРёРјРё СЃРёСЃС‚РµРјР°РјРё. РљР°Рє СЂР°Р· РґР»СЏ С‚РѕРіРѕ, С‡С‚РѕР±С‹ СѓРїСЂРѕС‰Р°С‚СЊ РїРѕС‚РѕРј РІСЃРµ РёРЅС‚РµРіСЂР°С†РёРё, РїСЂРёРєСЂСѓС‡РёРІР°С‚СЊ Рє РЅРёРј РЅР°С€Рё РєРѕСЃС‚С‹Р»Рё, РїСЂР°РІРёС‚СЊ РІ РѕРґРЅРѕРј РјРµСЃС‚Рµ, РµСЃР»Рё СЃРїР°СЂРј С‡С‚Рѕ РїРѕРјРµРЅСЏРµС‚
[15:12, 01.10.2025] РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі РЎРџР±: Р¶Р°Р»РµСЋ, С‡С‚Рѕ СЂРѕР±РѕС‚Р° РЅРµ С‡РµСЂРµР· СЌС‚Сѓ СЃРёСЃС‚РµРјСѓ Р·Р°РїСѓСЃС‚РёР»Рё, РЅРѕ С‚РѕРіРґР° РµС‘ С‚РѕР»СЊРєРѕ РѕР±РґСѓРјС‹РІР°Р» Рё РїРёСЃР°Р» РЅР° С…РѕРґСѓ, Рё РѕРЅР° РµС‰Рµ РєРѕСЂСЏРІР°СЏ Рё Р·Р°С‚РѕС‡РµРЅРЅР°СЏ РїРѕРґ Р±РѕС‚Р° Р±С‹Р»Р°
[15:12, 01.10.2025] РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі РЎРџР±: С‚СѓС‚ Рё СЃРµР№С‡Р°СЃ СЃРѕС…СЂР°РЅСЏРµС‚СЃСЏ Р·Р°С‚РѕС‡РµРЅРЅРѕСЃС‚СЊ РїРѕРґ Р±РѕС‚Р° - РїР°СЂР°РјРµС‚СЂ chatID. РўРµР±Рµ РµРіРѕ РїСЂРёРґРµС‚СЃСЏ РїСЂРёРґСѓРјС‹РІР°С‚СЊ Рё РїРµСЂРµРґР°РІР°С‚СЊ :)
[15:12, 01.10.2025] Mr. Smit: Р”Р° С‚РµРїРµСЂСЊ Рё РїСЂРѕРґР°С‚СЊ РјРѕР¶РЅРѕ, С‚Р°РєРёРј Р¶Рµ РјСѓС‡РµРЅРёРєР°Рј? ))
[15:12, 01.10.2025] РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі РЎРџР±: С‡С‚Рѕ-С‚Рѕ С‚РёРїР° РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂР° СЃРµСЃСЃРёРё, РµСЃР»Рё Рє С‚РµР±Рµ РІРµСЂРЅРµС‚СЃСЏ Р·РЅР°РєРѕРјС‹Р№ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ, РїРѕ РёРґРµРµ

[15:12, 01.10.2025] РљР°РµР»Р°Р№РЅРµРЅ РћР»РµРі РЎРџР±: РєСЃС‚Р°С‚Рё, РµСЃС‚СЊ "searchdocbyfio"  - РѕРЅ РєР°Рє СЂР°Р· РёС‰РµС‚ РїРѕ С„РёРѕ, РІ С‚РѕРј С‡РёСЃР»Рµ Рё РїРѕ РІС…РѕР¶РґРµРЅРёСЋ. РџР°СЂР°РјРµС‚СЂ - "fio"





РїСЂРёРјРµСЂ С†РµРїРѕС‡РєРё Р·Р°РїСЂРѕСЃРѕРІ Рё РѕС‚РІРµС‚РѕРІ Р±РѕС‚Р° РґР»СЏ С†РёРєР»Р° Р·Р°РїРёСЃРё РїР°С†РёРµРЅС‚Р° С‡РµСЂРµР· Р±СЌРєРµРЅРґ

2025-10-01T12:48:13.234435+0300 INFO some_id_of_chat_integer Oleg РЅР°Р¶Р°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ ('Р—Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ').
2025-10-01T12:48:13.337137+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/branch_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer}
2025-10-01T12:48:14.128529+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'branches': {'РўACdAAC': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAC', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAD': {'title': 'Р”РµС‚СЃРєР°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAD', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAQ': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAQ', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAR': {'title': 'РћС‚РґРµР»РµРЅРёРµ РєРѕСЃРјРµС‚РѕР»РѕРіРёРё (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAR', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAA\\': {'title': 'РџРѕР»РёРєР»РёРЅРёРєР° (РЎРѕСЃРЅРѕРІСЃРєРёР№ СЂ-РЅ, РїРѕСЃ. "Р›РµСЃРЅРѕР№ РѕСЃС‚СЂРѕРІ", СѓР». Р“СЂР°РґРѕСЃС‚СЂРѕРёС‚РµР»РµР№, 1/3)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAA\\', 'orgqqc': 'РўACdAAFAqAA'}, 'РўAGdAAE': {'title': 'Р­РљРћ (СѓР». Р§РёС‡РµСЂРёРЅР°, 36РІ)', 'org': 'Р­РєРѕРљР»РёРЅРёРєР°', 'qqc': 'РўAGdAAE', 'orgqqc': 'РўAGdAADANAA'}}}
2025-10-01T12:49:02.341055+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» С„РёР»РёР°Р»: Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11) РўACdAAC
2025-10-01T12:49:02.484132+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/spec_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'qqc244': 'РўACdAAC'}
2025-10-01T12:49:03.011175+0300 DEBUG РћС‚РІРµС‚: {'spec': ['РђРєСѓС€РµСЂ-РіРёРЅРµРєРѕР»РѕРі', 'РђР»Р»РµСЂРіРѕР»РѕРі-РёРјРјСѓРЅРѕР»РѕРі', 'Р’РћРџ', 'Р’СЂР°С‡-РѕС‚РѕСЂРёРЅРѕР»Р°СЂРёРЅРіРѕР»РѕРі', 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'Р”РµСЂРјР°С‚РѕРІРµРЅРµСЂРѕР»РѕРі', 'РљР°СЂРґРёРѕР»РѕРі', 'РќРµРІСЂРѕР»РѕРі', 'РќРµС„СЂРѕР»РѕРі', 'РћР¤РўРђР›Р¬РњРћР›РћР“', 'РџСЂРѕС„РїР°С‚РѕР»РѕРі', 'РџСЃРёС…РёР°С‚СЂ-РЅР°СЂРєРѕР»РѕРі', 'РџСЃРёС…РѕР»РѕРі', 'РџСЃРёС…РѕС‚РµСЂР°РїРµРІС‚', 'РџСѓР»СЊРјРѕРЅРѕР»РѕРі', 'Р РµРІРјР°С‚РѕР»РѕРі', 'РўРµСЂР°РїРµРІС‚', 'РўСЂР°РІРјР°С‚РѕР»РѕРі-РѕСЂС‚РѕРїРµРґ', 'РЈСЂРѕР»РѕРі', 'Р­РЅРґРѕРєСЂРёРЅРѕР»РѕРі']}
2025-10-01T12:49:06.972970+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» СЃРїРµС†РёР°Р»РёР·Р°С†РёСЋ: РљР°СЂРґРёРѕР»РѕРі
2025-10-01T12:49:07.095056+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'qqc244branch': 'РўACdAAC'}
2025-10-01T12:49:14.078458+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'fio': 'Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡', 'qqc': 'РўACdAACASAA', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}, {'fio': 'Р РµРґСЊРєРёРЅР° РњР°СЂРёРЅР° Р’Р°Р»РµСЂСЊРµРІРЅР°', 'qqc': 'РўACdAACASAD', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 5200}, {'fio': 'РџСЂРѕС…РѕСЂРѕРІР° РќР°С‚Р°Р»СЊСЏ РџР°РІР»РѕРІРЅР°', 'qqc': 'РўACdAACASAH', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'price': 3200}]}
2025-10-01T12:49:16.232107+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РѕРїСЂРµРґРµР»РµРЅРЅРѕРјСѓ РІСЂР°С‡Сѓ: Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡: 5200 СЂСѓР±. (РўACdAACASAA)
2025-10-01T12:49:16.299112+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'qqc244branch': 'РўACdAAC', 'qqc244': 'РўACdAACASAA'}
2025-10-01T12:49:16.876157+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'20251006': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 4}, 'data': '6 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251006', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 4'}, '20251013': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 4}, 'data': '13 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251013', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 4'}, '20251020': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 4}, 'data': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251020', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 4'}}]}
2025-10-01T12:49:20.190461+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» РґР°С‚Сѓ: 20251020
2025-10-01T12:49:20.277457+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'qqc244branch': 'РўACdAAC', 'day': '20251020', 'qqc244': 'РўACdAACASAA'}
2025-10-01T12:49:20.813531+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'fio': 'Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡', 'qqc': 'РўACdAACASAA', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'DefDu_dlit': 45, 'DefDu_qqc': 'РўACAABAAAOABF', 'price': 5200, 'schedule': [{'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '09:00', 'time2appoint': '09:00-09:45', 'price': 5200}, {'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '09:45', 'time2appoint': '09:45-10:30', 'price': 5200}, {'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '10:30', 'time2appoint': '10:30-11:15', 'price': 5200}, {'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '11:15', 'time2appoint': '11:15-12:00', 'price': 5200}, {'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '12:00', 'time2appoint': '12:00-12:45', 'price': 5200}, {'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '12:45', 'time2appoint': '12:45-13:30', 'price': 5200}, {'day': '20251020', 'day2say': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '13:30', 'time2appoint': '13:30-14:15', 'price': 5200}]}]}
2025-10-01T12:49:22.418026+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getdocinfo/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'qqc_doc': 'РўACdAACASAA'}
2025-10-01T12:49:22.970288+0300 DEBUG РћС‚РІРµС‚: {'doc': {'filialName': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'docName': 'Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡', 'docSpec': 'РљР°СЂРґРёРѕР»РѕРі'}}
2025-10-01T12:49:23.154435+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» РІСЂР°С‡Р° Рё РІСЂРµРјСЏ: Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡ (РўACdAACASAA) 12:00-12:45
2025-10-01T12:49:23.157436+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/load_patients_for_chat/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer}
2025-10-01T12:49:23.686012+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'patients': [{'fio': 'РљР°СЏР»Р°Р№РЅРµРЅ РћР»РµРі РђР»РµРєСЃР°РЅРґСЂРѕРІРёС‡', 'birthdate': '26.09.1979', 'phone': '89112473645'}, {'fio': 'РїРїРї РїРїРї РїРїРї', 'birthdate': '11.11.1911', 'phone': '89112473645'}, {'fio': 'РўРµСЃС‚РѕРІ С‚РµСЃС‚ С‚РµСЃС‚РѕРІРёС‡', 'birthdate': '17.07.1999', 'phone': '89112473645'}, {'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'birthdate': '12.12.2000', 'phone': '89112473645'}]}
2025-10-01T12:49:25.628117+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» Р·Р°РїРёСЃР°С‚СЊ РїР°С†РёРµРЅС‚Р°: Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№ 12.12.2000
2025-10-01T12:49:25.629115+0300 DEBUG some_id_of_chat_integer Oleg user_choices РґР»СЏ Р±СЌРєРµРЅРґР°: {'qqc244branch': 'РўACdAAC', 'qqc244branchname': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'spec': 'РљР°СЂРґРёРѕР»РѕРі', 'anyDoctor': 'False', 'doc_qqc': 'РўACdAACASAA', 'day': '20251020', 'dayName': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'doc_fio': 'Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡', 'doc_filial': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'time': '12:00-12:45', 'timeShort': '12:00', 'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'phone': '89112473645', 'birthdate': '12.12.2000'}
2025-10-01T12:49:25.631116+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getnotesforappointment/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'user_choises': '{"qqc244branch": "\\u0422ACdAAC", "qqc244branchname": "\\u0412\\u0437\\u0440\\u043e\\u0441\\u043b\\u0430\\u044f \\u043f\\u043e\\u043b\\u0438\\u043a\\u043b\\u0438\\u043d\\u0438\\u043a\\u0430 (\\u0443\\u043b. 40-\\u043b\\u0435\\u0442\\u0438\\u044f \\u041f\\u043e\\u0431\\u0435\\u0434\\u044b, 11)", "spec": "\\u041a\\u0430\\u0440\\u0434\\u0438\\u043e\\u043b\\u043e\\u0433", "anyDoctor": "False", "doc_qqc": "\\u0422ACdAACASAA", "day": "20251020", "dayName": "20 \\u043e\\u043a\\u0442\\u044f\\u0431\\u0440\\u044f 2025 \\u0433\\u043e\\u0434\\u0430", "doc_fio": "\\u0412\\u0435\\u0440\\u0435\\u0438\\u043d \\u0412\\u0430\\u0434\\u0438\\u043c \\u041c\\u0438\\u0445\\u0430\\u0439\\u043b\\u043e\\u0432\\u0438\\u0447", "doc_filial": "\\u0412\\u0437\\u0440\\u043e\\u0441\\u043b\\u0430\\u044f \\u043f\\u043e\\u043b\\u0438\\u043a\\u043b\\u0438\\u043d\\u0438\\u043a\\u0430 (\\u0443\\u043b. 40-\\u043b\\u0435\\u0442\\u0438\\u044f \\u041f\\u043e\\u0431\\u0435\\u0434\\u044b, 11)", "time": "12:00-12:45", "timeShort": "12:00", "fio": "\\u0424\\u0435\\u0432\\u0440\\u0430\\u043b\\u044c \\u0427\\u0435\\u0442\\u044b\\u0440\\u043d\\u0430\\u0434\\u0446\\u0430\\u0442\\u043e\\u0432 \\u041f\\u0435\\u0440\\u0432\\u044b\\u0439", "phone": "89112473645", "birthdate": "12.12.2000"}'}
2025-10-01T12:49:26.132626+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'notes': 'вЂјпёЏ <b>Р’РЅРёРјР°РЅРёРµ</b> вЂјпёЏ \nР•СЃР»Рё РІС‹ РѕР±СЃР»СѓР¶РёРІР°РµС‚РµСЃСЊ РїРѕ РїРѕР»РёСЃСѓ Р”РњРЎ, РЅРµРѕР±С…РѕРґРёРјРѕ Р·Р°РєР°Р·Р°С‚СЊ РіР°СЂР°РЅС‚РёР№РЅРѕРµ РїРёСЃСЊРјРѕ <b>РЅР° РїСЂРёРµРј РіР»Р°РІРЅРѕРіРѕ СЃРїРµС†РёР°Р»РёСЃС‚Р°</b> РљР»РёРЅРёРєРё РІ СЃРІРѕРµР№ СЃС‚СЂР°С…РѕРІРѕР№ РєРѕРјРїР°РЅРёРё. РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё Сѓ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ РєР»РёРЅРёРєРё 7788887 рџ“ћ'}
2025-10-01T12:49:26.277570+0300 INFO some_id_of_chat_integer Oleg: РѕС‚РїСЂР°РІРёР»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЋ Р·Р°РїСЂРѕСЃ РЅР° РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ Р·Р°РїРёСЃРё.
2025-10-01T12:49:30.820111+0300 INFO some_id_of_chat_integer Oleg РЅР°Р¶Р°Р» РѕС‚РјРµРЅР° Р·Р°РїРёСЃРё.




2025-10-01T12:49:33.308557+0300 INFO some_id_of_chat_integer Oleg РЅР°Р¶Р°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ ('Р—Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ').
2025-10-01T12:49:33.367562+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/branch_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer}
2025-10-01T12:49:33.871598+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'branches': {'РўACdAAC': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAC', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAD': {'title': 'Р”РµС‚СЃРєР°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAD', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAQ': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAQ', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAR': {'title': 'РћС‚РґРµР»РµРЅРёРµ РєРѕСЃРјРµС‚РѕР»РѕРіРёРё (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAR', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAA\\': {'title': 'РџРѕР»РёРєР»РёРЅРёРєР° (РЎРѕСЃРЅРѕРІСЃРєРёР№ СЂ-РЅ, РїРѕСЃ. "Р›РµСЃРЅРѕР№ РѕСЃС‚СЂРѕРІ", СѓР». Р“СЂР°РґРѕСЃС‚СЂРѕРёС‚РµР»РµР№, 1/3)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAA\\', 'orgqqc': 'РўACdAAFAqAA'}, 'РўAGdAAE': {'title': 'Р­РљРћ (СѓР». Р§РёС‡РµСЂРёРЅР°, 36РІ)', 'org': 'Р­РєРѕРљР»РёРЅРёРєР°', 'qqc': 'РўAGdAAE', 'orgqqc': 'РўAGdAADANAA'}}}
2025-10-01T12:49:37.245719+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» С„РёР»РёР°Р»: Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11) РўACdAAC
2025-10-01T12:49:37.326727+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/spec_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'qqc244': 'РўACdAAC'}
2025-10-01T12:49:37.848765+0300 DEBUG РћС‚РІРµС‚: {'spec': ['РђРєСѓС€РµСЂ-РіРёРЅРµРєРѕР»РѕРі', 'РђР»Р»РµСЂРіРѕР»РѕРі-РёРјРјСѓРЅРѕР»РѕРі', 'Р’РћРџ', 'Р’СЂР°С‡-РѕС‚РѕСЂРёРЅРѕР»Р°СЂРёРЅРіРѕР»РѕРі', 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'Р”РµСЂРјР°С‚РѕРІРµРЅРµСЂРѕР»РѕРі', 'РљР°СЂРґРёРѕР»РѕРі', 'РќРµРІСЂРѕР»РѕРі', 'РќРµС„СЂРѕР»РѕРі', 'РћР¤РўРђР›Р¬РњРћР›РћР“', 'РџСЂРѕС„РїР°С‚РѕР»РѕРі', 'РџСЃРёС…РёР°С‚СЂ-РЅР°СЂРєРѕР»РѕРі', 'РџСЃРёС…РѕР»РѕРі', 'РџСЃРёС…РѕС‚РµСЂР°РїРµРІС‚', 'РџСѓР»СЊРјРѕРЅРѕР»РѕРі', 'Р РµРІРјР°С‚РѕР»РѕРі', 'РўРµСЂР°РїРµРІС‚', 'РўСЂР°РІРјР°С‚РѕР»РѕРі-РѕСЂС‚РѕРїРµРґ', 'РЈСЂРѕР»РѕРі', 'Р­РЅРґРѕРєСЂРёРЅРѕР»РѕРі']}
2025-10-01T12:49:41.050803+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» СЃРїРµС†РёР°Р»РёР·Р°С†РёСЋ: РўРµСЂР°РїРµРІС‚
2025-10-01T12:49:41.109808+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'РўРµСЂР°РїРµРІС‚', 'qqc244branch': 'РўACdAAC'}
2025-10-01T12:49:49.513996+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'fio': 'РќРµРґР±Р°Р№Р»Рѕ Р’РµСЂР° Р’РёРєС‚РѕСЂРѕРІРЅР°', 'qqc': 'РўACdAACATAA', 'spec': 'РўРµСЂР°РїРµРІС‚', 'price': 4200}, {'fio': 'Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР°', 'qqc': 'РўACdAACATAN', 'spec': 'РўРµСЂР°РїРµРІС‚', 'price': 5200}]}
2025-10-01T12:49:52.333736+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РѕРїСЂРµРґРµР»РµРЅРЅРѕРјСѓ РІСЂР°С‡Сѓ: Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР°: 5200 СЂСѓР±. (РўACdAACATAN)
2025-10-01T12:49:52.413047+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'РўРµСЂР°РїРµРІС‚', 'qqc244branch': 'РўACdAAC', 'qqc244': 'РўACdAACATAN'}
2025-10-01T12:49:52.941090+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'20251002': {'count': {'Р”РµРЅСЊ:': 3, 'Р’РµС‡РµСЂ:': 1}, 'data': '2 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251002', 'text': 'Р”РµРЅСЊ: 3 Р’РµС‡РµСЂ: 1'}, '20251003': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 5}, 'data': '3 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251003', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 5'}, '20251006': {'count': {'РЈС‚СЂРѕ:': 4}, 'data': '6 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251006', 'text': 'РЈС‚СЂРѕ: 4'}, '20251008': {'count': {'РЈС‚СЂРѕ:': 4}, 'data': '8 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251008', 'text': 'РЈС‚СЂРѕ: 4'}, '20251009': {'count': {'Р”РµРЅСЊ:': 3, 'Р’РµС‡РµСЂ:': 1}, 'data': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251009', 'text': 'Р”РµРЅСЊ: 3 Р’РµС‡РµСЂ: 1'}, '20251010': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 5}, 'data': '10 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251010', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 5'}, '20251013': {'count': {'РЈС‚СЂРѕ:': 4}, 'data': '13 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251013', 'text': 'РЈС‚СЂРѕ: 4'}, '20251015': {'count': {'РЈС‚СЂРѕ:': 4}, 'data': '15 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251015', 'text': 'РЈС‚СЂРѕ: 4'}, '20251016': {'count': {'Р”РµРЅСЊ:': 3, 'Р’РµС‡РµСЂ:': 1}, 'data': '16 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251016', 'text': 'Р”РµРЅСЊ: 3 Р’РµС‡РµСЂ: 1'}, '20251017': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 5}, 'data': '17 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251017', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 5'}, '20251020': {'count': {'РЈС‚СЂРѕ:': 3}, 'data': '20 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251020', 'text': 'РЈС‚СЂРѕ: 3'}, '20251022': {'count': {'РЈС‚СЂРѕ:': 4}, 'data': '22 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251022', 'text': 'РЈС‚СЂРѕ: 4'}}]}
2025-10-01T12:49:54.412048+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» РґР°С‚Сѓ: 20251016
2025-10-01T12:49:54.471573+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'РўРµСЂР°РїРµРІС‚', 'qqc244branch': 'РўACdAAC', 'day': '20251016', 'qqc244': 'РўACdAACATAN'}
2025-10-01T12:49:54.999559+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'fio': 'Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР°', 'qqc': 'РўACdAACATAN', 'spec': 'РўРµСЂР°РїРµРІС‚', 'DefDu_dlit': 45, 'DefDu_qqc': 'РўACAABAAAuABE', 'price': 5200, 'schedule': [{'day': '20251016', 'day2say': '16 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '15:00', 'time2appoint': '15:00-15:45', 'price': 5200}, {'day': '20251016', 'day2say': '16 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '15:45', 'time2appoint': '15:45-16:30', 'price': 5200}, {'day': '20251016', 'day2say': '16 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '16:30', 'time2appoint': '16:30-17:15', 'price': 5200}, {'day': '20251016', 'day2say': '16 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '17:15', 'time2appoint': '17:15-18:00', 'price': 5200}]}]}
2025-10-01T12:49:56.410573+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getdocinfo/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'qqc_doc': 'РўACdAACATAN'}
2025-10-01T12:49:56.949375+0300 DEBUG РћС‚РІРµС‚: {'doc': {'filialName': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'docName': 'Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР°', 'docSpec': 'РўРµСЂР°РїРµРІС‚'}}
2025-10-01T12:49:57.102592+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» РІСЂР°С‡Р° Рё РІСЂРµРјСЏ: Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР° (РўACdAACATAN) 15:45-16:30
2025-10-01T12:49:57.104593+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/load_patients_for_chat/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer}
2025-10-01T12:49:57.612138+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'patients': [{'fio': 'РљР°СЏР»Р°Р№РЅРµРЅ РћР»РµРі РђР»РµРєСЃР°РЅРґСЂРѕРІРёС‡', 'birthdate': '26.09.1979', 'phone': '89112473645'}, {'fio': 'РїРїРї РїРїРї РїРїРї', 'birthdate': '11.11.1911', 'phone': '89112473645'}, {'fio': 'РўРµСЃС‚РѕРІ С‚РµСЃС‚ С‚РµСЃС‚РѕРІРёС‡', 'birthdate': '17.07.1999', 'phone': '89112473645'}, {'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'birthdate': '12.12.2000', 'phone': '89112473645'}]}
2025-10-01T12:49:58.965801+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» Р·Р°РїРёСЃР°С‚СЊ РїР°С†РёРµРЅС‚Р°: Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№ 12.12.2000
2025-10-01T12:49:58.966802+0300 DEBUG some_id_of_chat_integer Oleg user_choices РґР»СЏ Р±СЌРєРµРЅРґР°: {'qqc244branch': 'РўACdAAC', 'qqc244branchname': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'spec': 'РўРµСЂР°РїРµРІС‚', 'anyDoctor': 'False', 'doc_qqc': 'РўACdAACATAN', 'day': '20251016', 'dayName': '16 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'doc_fio': 'Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР°', 'doc_filial': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'time': '15:45-16:30', 'timeShort': '15:45', 'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'phone': '89112473645', 'birthdate': '12.12.2000'}
2025-10-01T12:49:58.969800+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getnotesforappointment/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'user_choises': '{"qqc244branch": "\\u0422ACdAAC", "qqc244branchname": "\\u0412\\u0437\\u0440\\u043e\\u0441\\u043b\\u0430\\u044f \\u043f\\u043e\\u043b\\u0438\\u043a\\u043b\\u0438\\u043d\\u0438\\u043a\\u0430 (\\u0443\\u043b. 40-\\u043b\\u0435\\u0442\\u0438\\u044f \\u041f\\u043e\\u0431\\u0435\\u0434\\u044b, 11)", "spec": "\\u0422\\u0435\\u0440\\u0430\\u043f\\u0435\\u0432\\u0442", "anyDoctor": "False", "doc_qqc": "\\u0422ACdAACATAN", "day": "20251016", "dayName": "16 \\u043e\\u043a\\u0442\\u044f\\u0431\\u0440\\u044f 2025 \\u0433\\u043e\\u0434\\u0430", "doc_fio": "\\u041b\\u044e\\u0431\\u0438\\u043c\\u043e\\u0432\\u0430 \\u041d\\u0430\\u0442\\u0430\\u043b\\u044c\\u044f \\u042e\\u0440\\u044c\\u0435\\u0432\\u043d\\u0430", "doc_filial": "\\u0412\\u0437\\u0440\\u043e\\u0441\\u043b\\u0430\\u044f \\u043f\\u043e\\u043b\\u0438\\u043a\\u043b\\u0438\\u043d\\u0438\\u043a\\u0430 (\\u0443\\u043b. 40-\\u043b\\u0435\\u0442\\u0438\\u044f \\u041f\\u043e\\u0431\\u0435\\u0434\\u044b, 11)", "time": "15:45-16:30", "timeShort": "15:45", "fio": "\\u0424\\u0435\\u0432\\u0440\\u0430\\u043b\\u044c \\u0427\\u0435\\u0442\\u044b\\u0440\\u043d\\u0430\\u0434\\u0446\\u0430\\u0442\\u043e\\u0432 \\u041f\\u0435\\u0440\\u0432\\u044b\\u0439", "phone": "89112473645", "birthdate": "12.12.2000"}'}
2025-10-01T12:49:59.464838+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'notes': 'вЂјпёЏ <b>Р’РЅРёРјР°РЅРёРµ</b> вЂјпёЏ \nР•СЃР»Рё РІС‹ РѕР±СЃР»СѓР¶РёРІР°РµС‚РµСЃСЊ РїРѕ РїРѕР»РёСЃСѓ Р”РњРЎ, РЅРµРѕР±С…РѕРґРёРјРѕ Р·Р°РєР°Р·Р°С‚СЊ РіР°СЂР°РЅС‚РёР№РЅРѕРµ РїРёСЃСЊРјРѕ <b>РЅР° РїСЂРёРµРј РіР»Р°РІРЅРѕРіРѕ СЃРїРµС†РёР°Р»РёСЃС‚Р°</b> РљР»РёРЅРёРєРё РІ СЃРІРѕРµР№ СЃС‚СЂР°С…РѕРІРѕР№ РєРѕРјРїР°РЅРёРё. РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё Сѓ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ РєР»РёРЅРёРєРё 7788887 рџ“ћ'}
2025-10-01T12:50:01.147879+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/appointByFIO/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'phone': '89112473645', 'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'birthdate': '12.12.2000', 'doc': 'РўACdAACATAN', 'date': '20251016', 'time': '15:45-16:30'}
2025-10-01T12:50:09.418866+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'qqc153': 'РўACAO@+', 'qqc1860': 'РўACAO@+AABAAA14:50BAB', 'note': 'РЎ СЃРѕР±РѕР№ РЅРµРѕР±С…РѕРґРёРјРѕ РёРјРµС‚СЊ РџРђРЎРџРћР Рў Рё РЎРќРР›РЎ.'}
2025-10-01T12:50:09.419866+0300 INFO some_id_of_chat_integer Oleg Р·Р°РїРёСЃР°Р» Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№ (12.12.2000) Рє СЃРїРµС†РёР°Р»РёСЃС‚Сѓ Р›СЋР±РёРјРѕРІР° РќР°С‚Р°Р»СЊСЏ Р®СЂСЊРµРІРЅР° (РўACdAACATAN) (РўРµСЂР°РїРµРІС‚) РЅР° 20251016 15:45-16:30
2025-10-01T12:50:09.546579+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/save_patient_for_chat/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'birthdate': '12.12.2000', 'phone': '89112473645'}
2025-10-01T12:50:10.063645+0300 DEBUG РћС‚РІРµС‚: {'result': 'success'}
2025-10-01T12:50:10.065647+0300 INFO some_id_of_chat_integer Oleg РЅР°Р¶Р°Р» /start

2025-10-01T13:01:21.872777+0300 INFO some_id_of_chat_integer Oleg РЅР°Р¶Р°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ ('Р—Р°РїРёСЃР°С‚СЊСЃСЏ Рє РІСЂР°С‡Сѓ').
2025-10-01T13:01:21.943785+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/branch_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer}
2025-10-01T13:01:22.595831+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'branches': {'РўACdAAC': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAC', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAD': {'title': 'Р”РµС‚СЃРєР°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAD', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAQ': {'title': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAQ', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAAR': {'title': 'РћС‚РґРµР»РµРЅРёРµ РєРѕСЃРјРµС‚РѕР»РѕРіРёРё (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAAR', 'orgqqc': 'РўACdAAFAqAA'}, 'РўACdAA\\': {'title': 'РџРѕР»РёРєР»РёРЅРёРєР° (РЎРѕСЃРЅРѕРІСЃРєРёР№ СЂ-РЅ, РїРѕСЃ. "Р›РµСЃРЅРѕР№ РѕСЃС‚СЂРѕРІ", СѓР». Р“СЂР°РґРѕСЃС‚СЂРѕРёС‚РµР»РµР№, 1/3)', 'org': 'РСЃС‚РѕС‡РЅРёРє', 'qqc': 'РўACdAA\\', 'orgqqc': 'РўACdAAFAqAA'}, 'РўAGdAAE': {'title': 'Р­РљРћ (СѓР». Р§РёС‡РµСЂРёРЅР°, 36РІ)', 'org': 'Р­РєРѕРљР»РёРЅРёРєР°', 'qqc': 'РўAGdAAE', 'orgqqc': 'РўAGdAADANAA'}}}
2025-10-01T13:01:31.674569+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» С„РёР»РёР°Р»: Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°) РўACdAAQ
2025-10-01T13:01:31.749574+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/spec_list/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'qqc244': 'РўACdAAQ'}
2025-10-01T13:01:32.365292+0300 DEBUG РћС‚РІРµС‚: {'spec': ['РђРєСѓС€РµСЂ-РіРёРЅРµРєРѕР»РѕРі', 'Р’РћРџ', 'Р’СЂР°С‡-РѕС‚РѕСЂРёРЅРѕР»Р°СЂРёРЅРіРѕР»РѕРі', 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'Р“РµРјР°С‚РѕР»РѕРі', 'Р”РµСЂРјР°С‚РѕРІРµРЅРµСЂРѕР»РѕРі', 'Р”РёРµС‚РѕР»РѕРі', 'Р—Р°РІРµРґСѓСЋС‰РёР№ РѕС‚РґРµР»РµРЅРёРµРј Р°РєСѓС€РµСЂСЃС‚РІР° Рё РіРёРЅРµРєРѕР»РѕРіРёРё', 'РљР°СЂРґРёРѕР»РѕРі', 'РљРѕР»РѕРїСЂРѕРєС‚РѕР»РѕРі', 'РќРµРІСЂРѕР»РѕРі', 'РќРµР№СЂРѕС…РёСЂСѓСЂРі', 'РћРЅРєРѕР»РѕРі', 'РЎРµСЂРґРµС‡РЅРѕ-СЃРѕСЃСѓРґРёСЃС‚С‹Р№ С…РёСЂСѓСЂРі', 'РўРµСЂР°РїРµРІС‚', 'РўСЂР°РІРјР°С‚РѕР»РѕРі-РѕСЂС‚РѕРїРµРґ', 'РЈСЂРѕР»РѕРі', 'Р¤РёР·РёРѕС‚РµСЂР°РїРµРІС‚', 'Р­РЅРґРѕРєСЂРёРЅРѕР»РѕРі']}
2025-10-01T13:01:39.542567+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» СЃРїРµС†РёР°Р»РёР·Р°С†РёСЋ: Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі
2025-10-01T13:01:39.657974+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'qqc244branch': 'РўACdAAQ'}
2025-10-01T13:01:44.559477+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'fio': 'РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР°', 'qqc': 'РўACdAAQAMAD', 'spec': 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'price': 4200}]}
2025-10-01T13:01:46.108961+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» Р·Р°РїРёСЃР°С‚СЊСЃСЏ Рє РѕРїСЂРµРґРµР»РµРЅРЅРѕРјСѓ РІСЂР°С‡Сѓ: РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР°: 4200 СЂСѓР±. (РўACdAAQAMAD)
2025-10-01T13:01:46.218964+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'qqc244branch': 'РўACdAAQ', 'qqc244': 'РўACdAAQAMAD'}
2025-10-01T13:01:46.739676+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'20251002': {'count': {'Р”РµРЅСЊ:': 2, 'Р’РµС‡РµСЂ:': 4}, 'data': '2 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251002', 'text': 'Р”РµРЅСЊ: 2 Р’РµС‡РµСЂ: 4'}, '20251003': {'count': {'РЈС‚СЂРѕ:': 5, 'Р”РµРЅСЊ:': 4}, 'data': '3 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251003', 'text': 'РЈС‚СЂРѕ: 5 Р”РµРЅСЊ: 4'}, '20251007': {'count': {'РЈС‚СЂРѕ:': 5, 'Р”РµРЅСЊ:': 4}, 'data': '7 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251007', 'text': 'РЈС‚СЂРѕ: 5 Р”РµРЅСЊ: 4'}, '20251009': {'count': {'Р”РµРЅСЊ:': 3, 'Р’РµС‡РµСЂ:': 5}, 'data': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251009', 'text': 'Р”РµРЅСЊ: 3 Р’РµС‡РµСЂ: 5'}, '20251011': {'count': {'РЈС‚СЂРѕ:': 3, 'Р”РµРЅСЊ:': 8, 'Р’РµС‡РµСЂ:': 1}, 'data': '11 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'day': '20251011', 'text': 'РЈС‚СЂРѕ: 3 Р”РµРЅСЊ: 8 Р’РµС‡РµСЂ: 1'}}]}
2025-10-01T13:01:48.423498+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» РґР°С‚Сѓ: 20251009
2025-10-01T13:01:48.517504+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getslotsbyspec/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'spec': 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'qqc244branch': 'РўACdAAQ', 'day': '20251009', 'qqc244': 'РўACdAAQAMAD'}
2025-10-01T13:01:49.147438+0300 DEBUG РћС‚РІРµС‚: {'slots': [{'fio': 'РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР°', 'qqc': 'РўACdAAQAMAD', 'spec': 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі', 'DefDu_dlit': 45, 'DefDu_qqc': 'РўACAABAAADAAR', 'price': 4200, 'schedule': [{'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '15:00', 'time2appoint': '15:00-15:45', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '15:45', 'time2appoint': '15:45-16:30', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '16:30', 'time2appoint': '16:30-17:15', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '17:15', 'time2appoint': '17:15-18:00', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '18:00', 'time2appoint': '18:00-18:45', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '18:45', 'time2appoint': '18:45-19:30', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '19:30', 'time2appoint': '19:30-20:15', 'price': 4200}, {'day': '20251009', 'day2say': '9 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°', 'time': '20:15', 'time2appoint': '20:15-21:00', 'price': 4200}]}]}
2025-10-01T13:01:50.673579+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getdocinfo/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'qqc_doc': 'РўACdAAQAMAD'}
2025-10-01T13:01:51.205129+0300 DEBUG РћС‚РІРµС‚: {'doc': {'filialName': 'Р’Р·СЂРѕСЃР»Р°СЏ РїРѕР»РёРєР»РёРЅРёРєР° (СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°)', 'docName': 'РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР°', 'docSpec': 'Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі'}}
2025-10-01T13:01:51.361570+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» РІСЂР°С‡Р° Рё РІСЂРµРјСЏ: РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР° (РўACdAAQAMAD) 18:00-18:45
2025-10-01T13:01:51.363567+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/load_patients_for_chat/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer}
2025-10-01T13:01:51.907605+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'patients': [{'fio': 'РљР°СЏР»Р°Р№РЅРµРЅ РћР»РµРі РђР»РµРєСЃР°РЅРґСЂРѕРІРёС‡', 'birthdate': '26.09.1979', 'phone': '89112473645'}, {'fio': 'РїРїРї РїРїРї РїРїРї', 'birthdate': '11.11.1911', 'phone': '89112473645'}, {'fio': 'РўРµСЃС‚РѕРІ С‚РµСЃС‚ С‚РµСЃС‚РѕРІРёС‡', 'birthdate': '17.07.1999', 'phone': '89112473645'}, {'fio': 'Р¤РµРІСЂР°Р»СЊ Р§РµС‚С‹СЂРЅР°РґС†Р°С‚РѕРІ РџРµСЂРІС‹Р№', 'birthdate': '12.12.2000', 'phone': '89112473645'}]}
2025-10-01T13:01:53.696605+0300 INFO some_id_of_chat_integer Oleg РІС‹Р±СЂР°Р» Р·Р°РїРёСЃР°С‚СЊ СЂР°РЅРµРµ РЅРµРёР·РІРµСЃС‚РЅРѕРіРѕ РїР°С†РёРµРЅС‚Р°.
2025-10-01T13:02:08.999877+0300 INFO some_id_of_chat_integer Oleg РІРІРµР» Р¤РРћ РїР°С†РёРµРЅС‚Р°: РљР°РєРѕР№-С‚Рѕ РќРѕРІС‹Р№ РџР°С†РёРµРЅС‚РѕРІ
2025-10-01T13:02:17.134443+0300 INFO some_id_of_chat_integer Oleg РІРІРµР» РґР°С‚Сѓ СЂРѕР¶РґРµРЅРёСЏ: 09.09.1999
2025-10-01T13:02:17.135445+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/searchPatientByFIO/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'fio': 'РљР°РєРѕР№-С‚Рѕ РќРѕРІС‹Р№ РџР°С†РёРµРЅС‚РѕРІ', 'birthdate': '09.09.1999'}
2025-10-01T13:02:18.122173+0300 DEBUG РћС‚РІРµС‚: {'patient': {'found': 0}}
2025-10-01T13:02:23.783869+0300 INFO some_id_of_chat_integer Oleg РѕС‚РїСЂР°РІР»СЏРµРј sms РґР»СЏ РїСЂРѕРІРµСЂРєРё РЅРѕРјРµСЂР°: 89112473645
2025-10-01T13:02:32.650931+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/phone_check/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'phone': '89112473645'}
2025-10-01T13:02:33.261014+0300 DEBUG РћС‚РІРµС‚: {'result': 'error', 'error': 'РќРѕРјРµСЂ С‚РµР»РµС„РѕРЅР° СѓР¶Рµ РїРѕРґС‚РІРµСЂР¶РґРµРЅ.'}
2025-10-01T13:02:33.262013+0300 INFO some_id_of_chat_integer Oleg РѕС€РёР±РєР° РѕС‚РїСЂР°РІРєРё sms (РќРѕРјРµСЂ С‚РµР»РµС„РѕРЅР° СѓР¶Рµ РїРѕРґС‚РІРµСЂР¶РґРµРЅ.) РЅР° РЅРѕРјРµСЂ: 89112473645
2025-10-01T13:02:33.263012+0300 INFO some_id_of_chat_integer Oleg РїСЂРѕРІРµСЂРєР° РЅРѕРјРµСЂР°: 89112473645 РїСЂРѕС€Р»Р° СѓСЃРїРµС€РЅРѕ
2025-10-01T13:02:33.268012+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/getnotesforappointment/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'user_choises': '{"qqc244branch": "\\u0422ACdAAQ", "qqc244branchname": "\\u0412\\u0437\\u0440\\u043e\\u0441\\u043b\\u0430\\u044f \\u043f\\u043e\\u043b\\u0438\\u043a\\u043b\\u0438\\u043d\\u0438\\u043a\\u0430 (\\u0443\\u043b. \\u0427\\u0438\\u0447\\u0435\\u0440\\u0438\\u043d\\u0430, 34\\u0430)", "spec": "\\u0413\\u0430\\u0441\\u0442\\u0440\\u043e\\u044d\\u043d\\u0442\\u0435\\u0440\\u043e\\u043b\\u043e\\u0433", "anyDoctor": "False", "doc_qqc": "\\u0422ACdAAQAMAD", "day": "20251009", "dayName": "9 \\u043e\\u043a\\u0442\\u044f\\u0431\\u0440\\u044f 2025 \\u0433\\u043e\\u0434\\u0430", "doc_fio": "\\u041a\\u0443\\u0448\\u0442\\u0443\\u0435\\u0432\\u0430 \\u0410\\u043d\\u043d\\u0430 \\u0410\\u043b\\u0435\\u043a\\u0441\\u0430\\u043d\\u0434\\u0440\\u043e\\u0432\\u043d\\u0430", "doc_filial": "\\u0412\\u0437\\u0440\\u043e\\u0441\\u043b\\u0430\\u044f \\u043f\\u043e\\u043b\\u0438\\u043a\\u043b\\u0438\\u043d\\u0438\\u043a\\u0430 (\\u0443\\u043b. \\u0427\\u0438\\u0447\\u0435\\u0440\\u0438\\u043d\\u0430, 34\\u0430)", "time": "18:00-18:45", "timeShort": "18:00", "patients": {"\\u041a\\u0430\\u044f\\u043b\\u0430\\u0439\\u043d\\u0435\\u043d \\u041e\\u043b\\u0435\\u0433 \\u0410\\u043b\\u0435\\u043a\\u0441\\u0430\\u043d\\u0434\\u0440\\u043e\\u0432\\u0438\\u0447": {"fio": "\\u041a\\u0430\\u044f\\u043b\\u0430\\u0439\\u043d\\u0435\\u043d \\u041e\\u043b\\u0435\\u0433 \\u0410\\u043b\\u0435\\u043a\\u0441\\u0430\\u043d\\u0434\\u0440\\u043e\\u0432\\u0438\\u0447", "birthdate": "26.09.1979", "phone": "89112473645"}, "\\u043f\\u043f\\u043f \\u043f\\u043f\\u043f \\u043f\\u043f\\u043f": {"fio": "\\u043f\\u043f\\u043f \\u043f\\u043f\\u043f \\u043f\\u043f\\u043f", "birthdate": "11.11.1911", "phone": "89112473645"}, "\\u0422\\u0435\\u0441\\u0442\\u043e\\u0432 \\u0442\\u0435\\u0441\\u0442 \\u0442\\u0435\\u0441\\u0442\\u043e\\u0432\\u0438\\u0447": {"fio": "\\u0422\\u0435\\u0441\\u0442\\u043e\\u0432 \\u0442\\u0435\\u0441\\u0442 \\u0442\\u0435\\u0441\\u0442\\u043e\\u0432\\u0438\\u0447", "birthdate": "17.07.1999", "phone": "89112473645"}, "\\u0424\\u0435\\u0432\\u0440\\u0430\\u043b\\u044c \\u0427\\u0435\\u0442\\u044b\\u0440\\u043d\\u0430\\u0434\\u0446\\u0430\\u0442\\u043e\\u0432 \\u041f\\u0435\\u0440\\u0432\\u044b\\u0439": {"fio": "\\u0424\\u0435\\u0432\\u0440\\u0430\\u043b\\u044c \\u0427\\u0435\\u0442\\u044b\\u0440\\u043d\\u0430\\u0434\\u0446\\u0430\\u0442\\u043e\\u0432 \\u041f\\u0435\\u0440\\u0432\\u044b\\u0439", "birthdate": "12.12.2000", "phone": "89112473645"}}, "fio": "\\u041a\\u0430\\u043a\\u043e\\u0439-\\u0442\\u043e \\u041d\\u043e\\u0432\\u044b\\u0439 \\u041f\\u0430\\u0446\\u0438\\u0435\\u043d\\u0442\\u043e\\u0432", "birthdate": "09.09.1999", "phone": "89112473645"}'}
2025-10-01T13:02:33.828772+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'notes': 'вЂјпёЏ <b>Р’РЅРёРјР°РЅРёРµ</b> вЂјпёЏ \nР•СЃР»Рё РїР»Р°РЅРёСЂСѓРµС‚Рµ РѕРїР»Р°С‚Сѓ СѓСЃР»СѓРі РїРѕ Р”РњРЎ, РЅРµРѕР±С…РѕРґРёРјРѕ Р·Р°РєР°Р·Р°С‚СЊ РіР°СЂР°РЅС‚РёР№РЅРѕРµ РїРёСЃСЊРјРѕ (СЃ СѓРєР°Р·Р°РЅРёРµРј СЂРµРіР°Р»РёР№ РІСЂР°С‡Р°!) РІ СЃРІРѕРµР№ СЃС‚СЂР°С…РѕРІРѕР№ РєРѕРјРїР°РЅРёРё.  РџРѕРґСЂРѕР±РЅРѕСЃС‚Рё Сѓ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ РєР»РёРЅРёРєРё 7788887 рџ“ћ'}
2025-10-01T13:02:38.122514+0300 INFO some_id_of_chat_integer Oleg РїС‹С‚Р°РµС‚СЃСЏ Р·Р°РїРёСЃР°С‚СЊ РљР°РєРѕР№-С‚Рѕ РќРѕРІС‹Р№ РџР°С†РёРµРЅС‚РѕРІ (09.09.1999) Рє СЃРїРµС†РёР°Р»РёСЃС‚Сѓ РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР° (РўACdAAQAMAD) (Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі) РЅР° 20251009 18:00-18:45
2025-10-01T13:02:38.463972+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/appointByFIO/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'phone': '89112473645', 'fio': 'РљР°РєРѕР№-С‚Рѕ РќРѕРІС‹Р№ РџР°С†РёРµРЅС‚РѕРІ', 'birthdate': '09.09.1999', 'doc': 'РўACdAAQAMAD', 'date': '20251009', 'time': '18:00-18:45'}
2025-10-01T13:02:48.261148+0300 DEBUG РћС‚РІРµС‚: {'result': 'success', 'qqc153': 'РўACAO@,', 'qqc1860': 'РўACAO@,AAAAAA15:02BAB', 'note': 'РЎ СЃРѕР±РѕР№ РЅРµРѕР±С…РѕРґРёРјРѕ РёРјРµС‚СЊ РџРђРЎРџРћР Рў Рё РЎРќРР›РЎ.'}
2025-10-01T13:02:48.262146+0300 INFO some_id_of_chat_integer Oleg Р·Р°РїРёСЃР°Р» РљР°РєРѕР№-С‚Рѕ РќРѕРІС‹Р№ РџР°С†РёРµРЅС‚РѕРІ (09.09.1999) Рє СЃРїРµС†РёР°Р»РёСЃС‚Сѓ РљСѓС€С‚СѓРµРІР° РђРЅРЅР° РђР»РµРєСЃР°РЅРґСЂРѕРІРЅР° (РўACdAAQAMAD) (Р“Р°СЃС‚СЂРѕСЌРЅС‚РµСЂРѕР»РѕРі) РЅР° 20251009 18:00-18:45
2025-10-01T13:02:48.369708+0300 DEBUG Р—Р°РїСЂРѕСЃ: https://back.cispb.ru/robot-dev/save_patient_for_chat/
Р—Р°РіРѕР»РѕРІРєРё: {'apikey': 'some_api_key_for_backend'}
РўРµР»Рѕ Р·Р°РїСЂРѕСЃР°: {'chatid': some_id_of_chat_integer, 'fio': 'РљР°РєРѕР№-С‚Рѕ РќРѕРІС‹Р№ РџР°С†РёРµРЅС‚РѕРІ', 'birthdate': '09.09.1999', 'phone': '89112473645'}
2025-10-01T13:02:48.883735+0300 DEBUG РћС‚РІРµС‚: {'result': 'success'}



===== FILE: C:\git\apl\med\docs\06_CONSULTATION_BRIEF.md =====


# 06. Expert Consultation Brief: Security Architecture Strategy

**To:** External Security Architect / SaaS Expert
**Date:** October 2025
**Subject:** Choosing between Distributed (Self-Hosted) vs. Centralized (SaaS) architecture for a Medical Booking Widget.

---

## 1. Context
We are developing a **Medical Booking Widget** that connects a clinic's website (Frontend) to their internal Hospital Information System (HIS/MIS) via API.
The widget handles sensitive operations:
1.  Viewing doctor schedules (Public data).
2.  Booking appointments (Requires Phone/Name - PII/152-FZ).

**Current Tech:** React Frontend + PHP Backend Proxy.

---

## 2. The Core Dilemma
We are deciding where to host the **PHP Backend Proxy** which holds the API secrets (access tokens to the Hospital System).

### Option A: Distributed (Self-Hosted) вЂ” *Current Implementation*
We give the PHP code to the client. They upload it to their web server (e.g., inside `/public_html/booking/`).
*   **Pros:** 
    *   Decentralized risk. If Client A is hacked, Client B is safe.
    *   Data sovereignty (PII never leaves the client's perimeter).
*   **Cons:** 
    *   **"The Leaky Neighbor":** Clients often host this on cheap shared hosting alongside vulnerable WordPress sites. If WP is compromised, our `config_access.php` (with API keys) is compromised.
    *   **Update Hell:** Updating backend logic for 50 clients requires FTP access or an auto-updater mechanism which is a security risk itself.

### Option B: Centralized (SaaS)
We host the PHP Backend on our secure cloud. The client only embeds a JS script.
*   **Pros:**
    *   Instant updates.
    *   We control the environment security (WAF, Monitoring).
*   **Cons:**
    *   **"Honey Pot":** Our server holds API keys for 50 hospitals. A single breach compromises everyone.
    *   **DDoS Risk:** Single point of failure.

---

## 3. Our Proposed "Hybrid" Solution
We are leaning towards a hybrid approach to mitigate risks while maintaining control:

1.  **Frontend (SaaS-like):** Served from our CDN. Allows instant UI/UX updates.
2.  **Config (Centralized):** JSON configs (Theme, Logic) are fetched from our server.
3.  **Execution (Self-Hosted):** The actual transaction code and API Keys remain on the client's server (PHP).

**Reasoning:** Even if we manage the UI centrally, we don't want to be the custodian of 50 sets of Hospital API Keys and Patient Data logs.

---

## 4. Questions for the Expert

1.  **Security of Self-Hosted:** Is there a standard pattern to protect a PHP config file (`config_access.php`) inside a generic WordPress shared hosting environment, assuming the neighboring WP might get hacked? (Apart from basic `.htaccess`).
2.  **SaaS Encryption:** If we move to SaaS (Option B), is "Vault" (e.g., HashiCorp Vault) the only viable way to store client API keys, or is DB-level encryption (AES-256) sufficient for an MVP?
3.  **Hybrid Validation:** Does the "Hybrid" model (JS from us, PHP on client) introduce Cross-Origin (CORS) or Supply Chain Attack risks that we are missing?

We appreciate your critique of our architectural direction.



===== FILE: C:\git\apl\med\docs\07_API_FOR_AI_AGENT.md =====


# 07. API Contract: Medical Tools for AI Agents

Р­С‚РѕС‚ РґРѕРєСѓРјРµРЅС‚ РѕРїРёСЃС‹РІР°РµС‚ "РРЅСЃС‚СЂСѓРјРµРЅС‚С‹" (Tools/Functions), РєРѕС‚РѕСЂС‹Рµ **Booking Core** РїСЂРµРґРѕСЃС‚Р°РІР»СЏРµС‚ РІРЅРµС€РЅРёРј AI-Р°РіРµРЅС‚Р°Рј (Assistant OS).
РСЃРїРѕР»СЊР·СѓР№С‚Рµ СЌС‚Рё РѕРїСЂРµРґРµР»РµРЅРёСЏ РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё `function calling` РІ OpenAI / Gemini.

---

## 1. Tool: `search_doctors`
РџРѕРёСЃРє РІСЂР°С‡РµР№ РїРѕ С‚РµРєСЃС‚РѕРІРѕРјСѓ Р·Р°РїСЂРѕСЃСѓ, СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё Рё РїР°СЂР°РјРµС‚СЂР°Рј Р°СѓРґРёС‚РѕСЂРёРё.

### OpenAI Function Definition
```json
{
  "name": "search_doctors",
  "description": "Search for doctors, specialties, or medical services based on user query and context. Use this when user asks 'Find a cardiologist' or 'I have a headache'.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The search term (e.g., 'Cardiologist', 'Ultrasound', 'Ivanov')."
      },
      "city": {
        "type": "string",
        "enum": ["chel", "spb"],
        "description": "City code. Default to 'chel' if not specified."
      },
      "dimensions": {
        "type": "object",
        "description": "Optional filters for audience or service type.",
        "properties": {
          "audience": {
            "type": "string",
            "enum": ["adult", "child"],
            "description": "Target audience. Set to 'child' if the user mentions 'kid', 'baby', 'son', 'daughter'. Set to 'adult' otherwise."
          },
          "vertical": {
            "type": "string",
            "enum": ["ivf", "cosmetology"],
            "description": "Specific business vertical if implied by context."
          }
        }
      }
    },
    "required": ["query"]
  }
}
```

### Backend Endpoint
*   **URL:** `GET /php_backend/api.php?action=smart_search`
*   **Method:** `POST` (preferred) or `GET`
*   **Input:** 
    ```json
    { 
      "query": "Р»РѕСЂ", 
      "city": "chel", 
      "dimensions": { "audience": "child" } 
    }
    ```
*   **Returns:** List of doctors with `id`, `name`, `specialty`, `score` and `tags`.

---

## 2. Tool: `get_doctor_slots`
РџРѕР»СѓС‡РµРЅРёРµ РґРѕСЃС‚СѓРїРЅС‹С… СЃР»РѕС‚РѕРІ СЂР°СЃРїРёСЃР°РЅРёСЏ РґР»СЏ РєРѕРЅРєСЂРµС‚РЅРѕРіРѕ РІСЂР°С‡Р°.

### OpenAI Function Definition
```json
{
  "name": "get_doctor_slots",
  "description": "Get available time slots for a specific doctor on a specific date.",
  "parameters": {
    "type": "object",
    "properties": {
      "doctor_id": {
        "type": "string",
        "description": "The unique ID of the doctor (e.g., 'qqc_123') obtained from search_doctors."
      },
      "database_id": {
        "type": "string",
        "description": "The database ID associated with the doctor's offering."
      },
      "date": {
        "type": "string",
        "description": "Date in YYYYMMDD format (e.g., '20251025')."
      }
    },
    "required": ["doctor_id", "date"]
  }
}
```

### Backend Endpoint
*   **URL:** `GET /php_backend/api.php?action=get_slots`
*   **Input:** Query params `doc_id`, `db`, `date`.
*   **Returns:** Array of slots `{ "time": "14:00", "isAvailable": true, "price": 5000 }`.

---

## 3. Tool: `check_availability_calendar`
РџРѕР»СѓС‡РµРЅРёРµ РєР°Р»РµРЅРґР°СЂСЏ Р·Р°РіСЂСѓР¶РµРЅРЅРѕСЃС‚Рё (С‡С‚РѕР±С‹ РїРѕРЅСЏС‚СЊ, РµСЃС‚СЊ Р»Рё РјРµСЃС‚Р° РІРѕРѕР±С‰Рµ).

### OpenAI Function Definition
```json
{
  "name": "check_availability_calendar",
  "description": "Check which days have available slots for a doctor. Use this before asking for a specific time.",
  "parameters": {
    "type": "object",
    "properties": {
      "doctor_id": { "type": "string" },
      "specialty": { "type": "string" }
    },
    "required": ["doctor_id"]
  }
}
```

### Backend Endpoint
*   **URL:** `GET /php_backend/api.php?action=get_calendar`
*   **Returns:** Array of days `{ "date": "2025-10-20", "count": 5 }`.

---

## 4. Integration Logic (The Bridge)

### How "Generative UI" works with Booking Core:

1.  **AI:** User asks "Is Dr. Ivanov free?"
2.  **Assistant OS:** Calls `search_doctors(query="Ivanov")`.
3.  **Booking Core:** Returns JSON: `[{ "name": "Ivanov", "id": "doc_1", "photoUrl": "..." }]`.
4.  **Assistant OS:**
    *   Recognizes it received doctor data.
    *   Instead of printing text, it renders a **Rich Widget** using the `photoUrl` and `specialty` from the JSON.
    *   Calls `check_availability_calendar(doc_1)` in the background.
5.  **Assistant OS:** Updates the widget with "Available today!" badge based on Calendar data.

**Conclusion:** The Booking Core acts as the **Data Provider** for the Assistant's **UI Renderer**.



===== FILE: C:\git\apl\med\docs\2_00_PRODUCT_STRATEGY.md =====


# 2_00. РЎС‚СЂР°С‚РµРіРёСЏ РџСЂРѕРґСѓРєС‚Р°: "Medical Booking Engine"

**РљРѕРЅС†РµРїС†РёСЏ:** РћС‚РєР°Р· РѕС‚ "Р§Р°С‚-Р±РѕС‚Р° РєР°Рє РїСЂРѕРґСѓРєС‚Р°" РІ РїРѕР»СЊР·Сѓ "РЈРјРЅРѕРіРѕ Р’РёРґР¶РµС‚Р° Р—Р°РїРёСЃРё".
**РЎСѓС‚СЊ:** РњС‹ СЃРѕР·РґР°РµРј РЅРµ РїСЂРѕСЃС‚Рѕ РёРЅС‚РµСЂС„РµР№СЃ, Р° РёРЅС‚РµРіСЂР°С†РёРѕРЅРЅСѓСЋ С€РёРЅСѓ, РєРѕС‚РѕСЂР°СЏ СЃРєСЂС‹РІР°РµС‚ С…Р°РѕСЃ РІРЅСѓС‚СЂРµРЅРЅРµР№ IT-РёРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂС‹ РєР»РёРЅРёРєРё РѕС‚ РїР°С†РёРµРЅС‚Р°.

---

## 1. РџСЂРѕР±Р»РµРјР° Р‘РёР·РЅРµСЃР° (The Pain)
РњРµРґРёС†РёРЅСЃРєРёРµ СЃРµС‚Рё (РѕСЃРѕР±РµРЅРЅРѕ РІ СЂРµРіРёРѕРЅР°С…, РєР°Рє "Р§РµР»СЏР±РёРЅСЃРє + РЎРџР±") РёРјРµСЋС‚ РёСЃС‚РѕСЂРёС‡РµСЃРєРё СЃР»РѕР¶РёРІС€СѓСЋСЃСЏ "Р»РѕСЃРєСѓС‚РЅСѓСЋ" РёРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂСѓ:
1.  **Р Р°Р·СЂРѕР·РЅРµРЅРЅРѕСЃС‚СЊ:** Р’СЂР°С‡Рё РїСЂРёРЅРёРјР°СЋС‚ РІ СЂР°Р·РЅС‹С… С„РёР»РёР°Р»Р°С…, РєРѕС‚РѕСЂС‹Рµ СЋСЂРёРґРёС‡РµСЃРєРё СЏРІР»СЏСЋС‚СЃСЏ СЂР°Р·РЅС‹РјРё РћРћРћ Рё Р¶РёРІСѓС‚ РІ СЂР°Р·РЅС‹С… Р±Р°Р·Р°С… РґР°РЅРЅС‹С… РњРРЎ (qMS, 1C).
2.  **РЎРєСѓРґРѕСЃС‚СЊ РґР°РЅРЅС‹С…:** Р’ РњРРЎ РµСЃС‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ, РЅРѕ РЅРµС‚ РјР°СЂРєРµС‚РёРЅРіРѕРІРѕРіРѕ РєРѕРЅС‚РµРЅС‚Р° (С„РѕС‚Рѕ, СЂРµРіР°Р»РёРё, РѕРїРёСЃР°РЅРёРµ РјРµС‚РѕРґРёРє).
3.  **РљРѕРЅРІРµСЂСЃРёРѕРЅРЅС‹Рµ РґС‹СЂС‹:** РЎС‚Р°РЅРґР°СЂС‚РЅС‹Рµ РІРёРґР¶РµС‚С‹ Р·Р°СЃС‚Р°РІР»СЏСЋС‚ РїР°С†РёРµРЅС‚Р° Р·РЅР°С‚СЊ СЃС‚СЂСѓРєС‚СѓСЂСѓ РєР»РёРЅРёРєРё ("Р’С‹Р±РµСЂРёС‚Рµ С„РёР»РёР°Р» -> Р’С‹Р±РµСЂРёС‚Рµ РѕС‚РґРµР»РµРЅРёРµ -> Р’С‹Р±РµСЂРёС‚Рµ РІСЂР°С‡Р°"). Р•СЃР»Рё РїР°С†РёРµРЅС‚ РѕС€РёР±СЃСЏ С„РёР»РёР°Р»РѕРј, РѕРЅ РЅРµ РЅР°Р№РґРµС‚ РІСЂР°С‡Р° Рё СѓР№РґРµС‚.

## 2. Р РµС€РµРЅРёРµ: "Federated Booking Gateway"
РњС‹ СЃС‚СЂРѕРёРј **Р•РґРёРЅРѕРµ РћРєРЅРѕ Р—Р°РїРёСЃРё**, РєРѕС‚РѕСЂРѕРµ СЂР°Р±РѕС‚Р°РµС‚ РїРѕРІРµСЂС… Р»СЋР±С‹С… Р±Р°Р· РґР°РЅРЅС‹С….

### РљР»СЋС‡РµРІР°СЏ С†РµРЅРЅРѕСЃС‚СЊ (Value Proposition):
1.  **Р”Р»СЏ РџР°С†РёРµРЅС‚Р°:** "РЇ РїСЂРѕСЃС‚Рѕ С…РѕС‡Сѓ Рє РєР°СЂРґРёРѕР»РѕРіСѓ". РЎРёСЃС‚РµРјР° СЃР°РјР° РёС‰РµС‚ РІСЂР°С‡РµР№ РІРѕ РІСЃРµС… С„РёР»РёР°Р»Р°С… РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ Рё РїРѕРєР°Р·С‹РІР°РµС‚ РµРґРёРЅС‹Р№ СЃРїРёСЃРѕРє.
2.  **Р”Р»СЏ РљР»РёРЅРёРєРё:**
    *   РЈРІРµР»РёС‡РµРЅРёРµ РєРѕРЅРІРµСЂСЃРёРё (РјРµРЅСЊС€Рµ С€Р°РіРѕРІ).
    *   Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ (РґР°РЅРЅС‹Рµ РїР°С†РёРµРЅС‚РѕРІ РЅРµ РїРѕРєРёРґР°СЋС‚ РєРѕРЅС‚СѓСЂ РєР»РёРЅРёРєРё).
    *   РњР°СЂРєРµС‚РёРЅРі (РєСЂР°СЃРёРІС‹Рµ РєР°СЂС‚РѕС‡РєРё РІСЂР°С‡РµР№, РїРѕРґС‚СЏРіРёРІР°РµРјС‹Рµ РёР· CMS СЃР°Р№С‚Р°).

---

## 3. Р‘РёР·РЅРµСЃ-Р›РѕРіРёРєР°: РЎСѓС‰РЅРѕСЃС‚Рё

РњС‹ РІРІРѕРґРёРј СЂР°Р·РґРµР»РµРЅРёРµ РїРѕРЅСЏС‚РёР№, РєРѕС‚РѕСЂРѕРіРѕ РЅРµС‚ РІ РѕР±С‹С‡РЅС‹С… РІРёРґР¶РµС‚Р°С…:

### Рђ. Actor (Р’СЂР°С‡-Р›РёС‡РЅРѕСЃС‚СЊ)
*   Р­С‚Рѕ С‡РµР»РѕРІРµРє. РћРЅ РѕРґРёРЅ, РЅРµР·Р°РІРёСЃРёРјРѕ РѕС‚ С‚РѕРіРѕ, РІ СЃРєРѕР»СЊРєРёС… РєР»РёРЅРёРєР°С… РѕРЅ СЂР°Р±РѕС‚Р°РµС‚.
*   **РСЃС‚РѕС‡РЅРёРє РґР°РЅРЅС‹С…:** РЎР°Р№С‚ (WordPress/CMS).
*   **РЎРѕРґРµСЂР¶РёС‚:** Р¤РѕС‚Рѕ, Р‘РёРѕРіСЂР°С„РёСЏ, РЎС‚Р°Р¶, РћС‚Р·С‹РІС‹.

### Р‘. Offering (Р’СЂР°С‡-РЈСЃР»СѓРіР°)
*   Р­С‚Рѕ СЃР»РѕС‚ РІ СЂР°СЃРїРёСЃР°РЅРёРё.
*   **РСЃС‚РѕС‡РЅРёРє РґР°РЅРЅС‹С…:** РњРРЎ (qMS/1C).
*   **РЎРѕРґРµСЂР¶РёС‚:** Р¦РµРЅР°, РђРґСЂРµСЃ С„РёР»РёР°Р»Р°, ID Р±Р°Р·С‹ РґР°РЅРЅС‹С…, Р’СЂРµРјСЏ РїСЂРёРµРјР°.

**РњР°РіРёСЏ СЃРёСЃС‚РµРјС‹:** РњС‹ "СЃРєР»РµРёРІР°РµРј" (Hydrate) СЌС‚Рё РґРІРµ СЃСѓС‰РЅРѕСЃС‚Рё РЅР° Р»РµС‚Сѓ. РџР°С†РёРµРЅС‚ РІРёРґРёС‚ **Actor**, Р° Р·Р°РїРёСЃС‹РІР°РµС‚СЃСЏ РЅР° **Offering**.

---

## 4. РџРѕС‡РµРјСѓ Tool First, Р° AI Second?
1.  **Р”Р°РЅРЅС‹Рµ:** AI РЅРµ РјРѕР¶РµС‚ СЂР°Р±РѕС‚Р°С‚СЊ Р±РµР· РЅР°РґРµР¶РЅРѕРіРѕ API. Р•СЃР»Рё РјС‹ СЃРЅР°С‡Р°Р»Р° СЃРґРµР»Р°РµРј AI, РѕРЅ Р±СѓРґРµС‚ РіР°Р»Р»СЋС†РёРЅРёСЂРѕРІР°С‚СЊ (РїСЂРёРґСѓРјС‹РІР°С‚СЊ СЃР»РѕС‚С‹).
2.  **Р”РѕРІРµСЂРёРµ:** РљР»РёРЅРёРєРё Р±РѕСЏС‚СЃСЏ РѕС‚РґР°РІР°С‚СЊ Р±Р°Р·Сѓ РїР°С†РёРµРЅС‚РѕРІ РІ "РѕР±Р»Р°С‡РЅС‹Р№ AI". РќР°С€ РїРѕРґС…РѕРґ (Self-Hosted Widget) СЃРЅРёРјР°РµС‚ СЌС‚РѕС‚ СЃС‚СЂР°С….
3.  **Р”РµРЅСЊРіРё:** Р’РёРґР¶РµС‚ РЅСѓР¶РµРЅ "РІС‡РµСЂР°" Рё СЃСЂР°Р·Сѓ РїСЂРёРЅРѕСЃРёС‚ Р»РёРґС‹. AI вЂ” СЌС‚Рѕ R&D РїСЂРѕРµРєС‚ СЃ РґРѕР»РіРёРј РІРЅРµРґСЂРµРЅРёРµРј.

**Р’С‹РІРѕРґ:** РЎРЅР°С‡Р°Р»Р° СЃС‚СЂРѕРёРј РёРґРµР°Р»СЊРЅС‹Р№ API-С€Р»СЋР· Рё Р’РёРґР¶РµС‚. РџРѕС‚РѕРј РїРѕРґРєР»СЋС‡Р°РµРј Рє СЌС‚РѕРјСѓ API Р»СЋР±РѕРіРѕ AI-Р°РіРµРЅС‚Р°.



===== FILE: C:\git\apl\med\docs\2_01_ARCHITECTURE_CORE.md =====


# 2_01. РђСЂС…РёС‚РµРєС‚СѓСЂР° РЎРёСЃС‚РµРјС‹ (Deep Dive)

**РњРѕРґРµР»СЊ:** Hybrid "Distributed Core / Centralized UI".
**РџСЂРёРЅС†РёРї:** Р›РѕРіРёРєР° Рё СЃРµРєСЂРµС‚С‹ вЂ” Сѓ РєР»РёРµРЅС‚Р°. РРЅС‚РµСЂС„РµР№СЃ Рё РєРѕРЅС„РёРіРё вЂ” РІ РѕР±Р»Р°РєРµ (РѕРїС†РёРѕРЅР°Р»СЊРЅРѕ).

---

## 1. РЎС…РµРјР° РџРѕС‚РѕРєРѕРІ Р”Р°РЅРЅС‹С…

```mermaid
graph LR
    User[Browser / Patient] -- 1. JSON Request --> Gateway[PHP Backend (Client Server)]
    
    subgraph "Client Security Perimeter"
        Gateway -- 2a. Query --> DB_Main[MIS: Chel Main]
        Gateway -- 2b. Query --> DB_Extra[MIS: Chel Branch]
        Gateway -- 2c. Query --> DB_WP[CMS: WordPress]
        Secrets[config_access.php] -.-> Gateway
    end
    
    Gateway -- 3. Aggregated Response --> User
```

## 2. РљРѕРјРїРѕРЅРµРЅС‚С‹ РЎРёСЃС‚РµРјС‹

### A. Frontend (The Widget)
*   **РўРµС…РЅРѕР»РѕРіРёСЏ:** React 19 + TypeScript + Vite.
*   **РЎР±РѕСЂРєР°:** Single Bundle (JS + CSS), РєРѕС‚РѕСЂС‹Р№ РІСЃС‚СЂР°РёРІР°РµС‚СЃСЏ РІ Р»СЋР±РѕР№ СЃР°Р№С‚ С‡РµСЂРµР· `<div id="root">`.
*   **Р—Р°РґР°С‡Р°:** Р РµРЅРґРµСЂРёРЅРі РёРЅС‚РµСЂС„РµР№СЃР°, РІР°Р»РёРґР°С†РёСЏ С„РѕСЂРј, СѓРїСЂР°РІР»РµРЅРёРµ СЃРѕСЃС‚РѕСЏРЅРёРµРј (Wizard).
*   **РћСЃРѕР±РµРЅРЅРѕСЃС‚СЊ:** РќРµ СЃРѕРґРµСЂР¶РёС‚ Р±РёР·РЅРµСЃ-Р»РѕРіРёРєРё РѕР±СЂР°С‰РµРЅРёСЏ Рє РњРРЎ. Р’СЃСЏ РєРѕРјРјСѓРЅРёРєР°С†РёСЏ С‚РѕР»СЊРєРѕ С‡РµСЂРµР· РЅР°С€ PHP Gateway.

### B. Backend Gateway (The Core)
*   **РўРµС…РЅРѕР»РѕРіРёСЏ:** PHP 8.1 (No Framework / Micro-framework concept).
*   **Р Р°Р·РјРµС‰РµРЅРёРµ:** РҐРѕСЃС‚РёРЅРі РєР»РёРЅРёРєРё (РїР°РїРєР° `/public_html/booking/api`).
*   **Р—Р°РґР°С‡Р° 1 (Routing):** РџСЂРёРЅРёРјР°РµС‚ Р·Р°РїСЂРѕСЃ "РќР°Р№С‚Рё РљР°СЂРґРёРѕР»РѕРіР°". Р”РµР»Р°РµС‚ `curl_multi` Р·Р°РїСЂРѕСЃС‹ РІ 3 СЂР°Р·РЅС‹Рµ Р±Р°Р·С‹ РњРРЎ РїР°СЂР°Р»Р»РµР»СЊРЅРѕ.
*   **Р—Р°РґР°С‡Р° 2 (Hydration):** РџРѕР»СѓС‡Р°РµС‚ "СЃСѓС…РёРµ" ID РІСЂР°С‡РµР№ РёР· РњРРЎ, РёРґРµС‚ РІ Р±Р°Р·Сѓ WordPress, РґРѕСЃС‚Р°РµС‚ С„РѕС‚Рѕ Рё СЂРµРіР°Р»РёРё, РѕР±СЉРµРґРёРЅСЏРµС‚ РІ РєСЂР°СЃРёРІС‹Р№ JSON.
*   **Р—Р°РґР°С‡Р° 3 (Security):** РҐСЂР°РЅРёС‚ API-РєР»СЋС‡Рё РњРРЎ. РћРЅРё РЅРёРєРѕРіРґР° РЅРµ РїРµСЂРµРґР°СЋС‚СЃСЏ РІ Р±СЂР°СѓР·РµСЂ.

---

## 3. РђСЂРіСѓРјРµРЅС‚Р°С†РёСЏ Р’С‹Р±РѕСЂР° (Why this stack?)

### РџРѕС‡РµРјСѓ PHP РЅР° Р±СЌРєРµРЅРґРµ?
1.  **Ubiquity:** PHP РµСЃС‚СЊ РЅР° 99% С…РѕСЃС‚РёРЅРіРѕРІ РєР»РёРЅРёРє (РіРґРµ СЃС‚РѕРёС‚ WordPress РёР»Рё Bitrix). РќР°Рј РЅРµ РЅСѓР¶РЅРѕ РїСЂРѕСЃРёС‚СЊ IT-РѕС‚РґРµР» "РїРѕРґРЅСЏС‚СЊ Docker РєРѕРЅС‚РµР№РЅРµСЂ СЃ Node.js" (СЌС‚Рѕ С‡Р°СЃС‚Рѕ Р±СЋСЂРѕРєСЂР°С‚РёС‡РµСЃРєРёР№ Р°Рґ).
2.  **Stateless:** РРґРµР°Р»СЊРЅРѕ РґР»СЏ API-С€Р»СЋР·Р°. РџСЂРѕСЃС‚РѕР№ РґРµРїР»РѕР№ РєРѕРїРёСЂРѕРІР°РЅРёРµРј С„Р°Р№Р»РѕРІ.

### РџРѕС‡РµРјСѓ React РЅР° С„СЂРѕРЅС‚РµРЅРґРµ?
1.  **State Management:** РЎР»РѕР¶РЅР°СЏ Р»РѕРіРёРєР° "РІС‹Р±РѕСЂР°" (Р’СЂР°С‡ -> Р¤РёР»РёР°Р» -> РЎР»РѕС‚ -> РћС‚РјРµРЅР° -> Р”СЂСѓРіРѕР№ РІСЂР°С‡) С‚СЂРµР±СѓРµС‚ РЅР°РґРµР¶РЅРѕРіРѕ СѓРїСЂР°РІР»РµРЅРёСЏ СЃРѕСЃС‚РѕСЏРЅРёРµРј (Zustand), С‡РµРіРѕ СЃР»РѕР¶РЅРѕ РґРѕР±РёС‚СЊСЃСЏ РЅР° jQuery/Vanilla JS.
2.  **Performance:** Virtual DOM РѕР±РµСЃРїРµС‡РёРІР°РµС‚ РјРіРЅРѕРІРµРЅРЅСѓСЋ С„РёР»СЊС‚СЂР°С†РёСЋ СЃРїРёСЃРєРѕРІ РІСЂР°С‡РµР№ Р±РµР· РїРµСЂРµР·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹.

### РџРѕС‡РµРјСѓ Self-Hosted (РєРѕРґ Сѓ РєР»РёРµРЅС‚Р°)?
1.  **152-Р¤Р— (РџР”РЅ):** РџРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ (РўРµР»РµС„РѕРЅ, Р¤РРћ) РІРІРѕРґСЏС‚СЃСЏ РІ С„РѕСЂРјСѓ, Р»РµС‚СЏС‚ РЅР° СЃРµСЂРІРµСЂ РєР»РёРЅРёРєРё Рё РѕС‚С‚СѓРґР° СЃСЂР°Р·Сѓ РІ РњРРЎ. РњС‹ (СЂР°Р·СЂР°Р±РѕС‚С‡РёРє РџРћ) СЌС‚Рё РґР°РЅРЅС‹Рµ РЅРµ РІРёРґРёРј Рё РЅРµ С…СЂР°РЅРёРј. РњС‹ РЅРµ СЏРІР»СЏРµРјСЃСЏ РѕРїРµСЂР°С‚РѕСЂРѕРј РџР”РЅ.
2.  **Latency:** РЎРµСЂРІРµСЂ РІРёРґР¶РµС‚Р° РЅР°С…РѕРґРёС‚СЃСЏ С„РёР·РёС‡РµСЃРєРё СЂСЏРґРѕРј СЃ Р±Р°Р·РѕР№ РґР°РЅРЅС‹С… СЃР°Р№С‚Р° (РјРёРЅРёРјР°Р»СЊРЅС‹Рµ Р·Р°РґРµСЂР¶РєРё РїСЂРё Р·Р°РїСЂРѕСЃРµ С„РѕС‚Рѕ РІСЂР°С‡РµР№).

---

## 4. Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ

1.  **Isolation:** Р¤Р°Р№Р» `config_access.php` СЃ РїР°СЂРѕР»СЏРјРё Р·Р°С‰РёС‰РµРЅ `.htaccess` (Deny from all).
2.  **Sanitization:** Р’СЃРµ РІС…РѕРґСЏС‰РёРµ РїР°СЂР°РјРµС‚СЂС‹ РѕС‡РёС‰Р°СЋС‚СЃСЏ. API РњРРЎ РІС‹Р·С‹РІР°РµС‚СЃСЏ С‚РѕР»СЊРєРѕ СЃ РІР°Р»РёРґРёСЂРѕРІР°РЅРЅС‹РјРё РґР°РЅРЅС‹РјРё.
3.  **CORS:** РЁР»СЋР· РѕС‚РІРµС‡Р°РµС‚ С‚РѕР»СЊРєРѕ РЅР° Р·Р°РїСЂРѕСЃС‹ СЃ РґРѕРјРµРЅР° РєР»РёРЅРёРєРё.



===== FILE: C:\git\apl\med\docs\2_02_UX_MECHANICS.md =====


# 2_02. РњРµС…Р°РЅРёРєР° Рё UX (User Flows)

РћРїРёСЃР°РЅРёРµ С‚РѕРіРѕ, РєР°Рє СЃРёСЃС‚РµРјР° РІРµРґРµС‚ СЃРµР±СЏ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ Рё РєР°РєРёРµ "С„РёС€РєРё" РїРѕРІС‹С€Р°СЋС‚ РєРѕРЅРІРµСЂСЃРёСЋ.

---

## 1. РЎС‚СЂР°С‚РµРіРёСЏ "Guest First" (РЎРЅР°С‡Р°Р»Р° С‚РѕРІР°СЂ, РїРѕС‚РѕРј РїР°СЃРїРѕСЂС‚)
РљР»Р°СЃСЃРёС‡РµСЃРєРёРµ РњРРЎ С‚СЂРµР±СѓСЋС‚ Р°РІС‚РѕСЂРёР·Р°С†РёРё (SMS) **РґРѕ** РїРѕРєР°Р·Р° СЂР°СЃРїРёСЃР°РЅРёСЏ. Р­С‚Рѕ СѓР±РёРІР°РµС‚ РєРѕРЅРІРµСЂСЃРёСЋ.
**РќР°С€Р° РјРµС…Р°РЅРёРєР°:**
1.  РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РёСЂР°РµС‚ РІСЂР°С‡Р°.
2.  Р’С‹Р±РёСЂР°РµС‚ РІСЂРµРјСЏ.
3.  Р’РёРґРёС‚ СЃРІРѕРґРєСѓ "Р’С‹ Р·Р°РїРёСЃС‹РІР°РµС‚РµСЃСЊ Рє РРІР°РЅРѕРІСѓ РЅР° 14:00".
4.  **РўРѕР»СЊРєРѕ СЃРµР№С‡Р°СЃ** РјС‹ РїСЂРѕСЃРёРј РІРІРµСЃС‚Рё С‚РµР»РµС„РѕРЅ РґР»СЏ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ.
*РђСЂРіСѓРјРµРЅС‚:* РџСЃРёС…РѕР»РѕРіРёС‡РµСЃРєРё Р»РµРіС‡Рµ РѕС‚РґР°С‚СЊ РєРѕРЅС‚Р°РєС‚, РєРѕРіРґР° "С‚РѕРІР°СЂ" (СЃР»РѕС‚ РІСЂРµРјРµРЅРё) СѓР¶Рµ РІ РєРѕСЂР·РёРЅРµ.

---

## 2. Reverse Branching (РћР±СЂР°С‚РЅС‹Р№ РІС‹Р±РѕСЂ С„РёР»РёР°Р»Р°)
*Р РµС€Р°РµС‚ РїСЂРѕР±Р»РµРјСѓ "Р§РµР»СЏР±РёРЅСЃРєР°" (РјРЅРѕРіРѕ С„РёР»РёР°Р»РѕРІ).*

**РџР»РѕС…РѕР№ СЃС†РµРЅР°СЂРёР№:** Р’С‹Р±РµСЂРёС‚Рµ С„РёР»РёР°Р» РЅР° Р›РµРЅРёРЅР° -> РќРµС‚ Р›РћР Р° -> Р’С‹Р±РµСЂРёС‚Рµ С„РёР»РёР°Р» РЅР° РўСЂСѓРґР° -> Р•СЃС‚СЊ Р›РћР .
**РќР°С€ СЃС†РµРЅР°СЂРёР№:**
1.  РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РёСЂР°РµС‚ "Р›РћР ".
2.  РЎРёСЃС‚РµРјР° РїРѕРєР°Р·С‹РІР°РµС‚ **РІСЃРµС…** Р›РћР РѕРІ РіРѕСЂРѕРґР°.
3.  Р’ РєР°СЂС‚РѕС‡РєРµ РІСЂР°С‡Р° РЅР°РїРёСЃР°РЅРѕ: *"РџСЂРёРЅРёРјР°РµС‚ РЅР° Р›РµРЅРёРЅР° Рё РЅР° РўСЂСѓРґР°"*.
4.  РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІС‹Р±РёСЂР°РµС‚ РІСЂР°С‡Р°, Рё С‚РѕР»СЊРєРѕ С‚РѕРіРґР° РІС‹Р±РёСЂР°РµС‚ СѓРґРѕР±РЅС‹Р№ Р°РґСЂРµСЃ.

---

## 3. CMS Hydration (РћР±РѕРіР°С‰РµРЅРёРµ РєРѕРЅС‚РµРЅС‚Р°)
РњРРЎ (qMS) РѕС‚РґР°РµС‚ СЃСѓС…РёРµ РґР°РЅРЅС‹Рµ: `Name: РРІР°РЅРѕРІ Р.Р., Spec: Ter`.
РЎР°Р№С‚ РЅР° WP СЃРѕРґРµСЂР¶РёС‚ Р±РѕРіР°С‚С‹Рµ РґР°РЅРЅС‹Рµ.

**РџСЂРѕС†РµСЃСЃ:**
1.  **API:** РџРѕР»СѓС‡Р°РµС‚ ID РІСЂР°С‡Р° `DOC_123` РёР· РњРРЎ.
2.  **Query:** РС‰РµС‚ РІ WP РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ СЃ `meta_key: qms_id = DOC_123`.
3.  **Merge:**
    *   Р‘РµСЂРµС‚ С„РѕС‚Рѕ (URL).
    *   Р‘РµСЂРµС‚ Р±РµР№РґР¶Рё ("Рљ.Рњ.Рќ.", "РЎС‚Р°Р¶ 20 Р»РµС‚").
    *   Р‘РµСЂРµС‚ HTML-Р±РёРѕ.
4.  **Result:** Р’СЂР°С‡ РІС‹РіР»СЏРґРёС‚ РїСЂРµР·РµРЅС‚Р°Р±РµР»СЊРЅРѕ, С†РµРЅР° Рё РІСЂРµРјСЏ Р°РєС‚СѓР°Р»СЊРЅС‹.

---

## 4. Smart Search (Р’РµРєС‚РѕСЂРЅС‹Р№ РїРѕРёСЃРє - *Future Ready*)
РњС‹ Р·Р°РєР»Р°РґС‹РІР°РµРј РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊ РїРѕРёСЃРєР° РЅРµ РїРѕ РєР»СЋС‡РµРІС‹Рј СЃР»РѕРІР°Рј ("Р›РћР "), Р° РїРѕ СЃРјС‹СЃР»Сѓ ("Р‘РѕР»РёС‚ СѓС…Рѕ").
*   РќР° Р±СЌРєРµРЅРґРµ: Р’РµРєС‚РѕСЂРЅР°СЏ Р±Р°Р·Р° (РјР°СЃСЃРёРІ embeddings).
*   РќР° С„СЂРѕРЅС‚Рµ: РћР±С‹С‡РЅС‹Р№ РёРЅРїСѓС‚.
*   **РњРµС…Р°РЅРёРєР°:** РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РїРёС€РµС‚ "СЃС‚СЂРµР»СЏРµС‚ РІ СѓС…Рµ", СЃРёСЃС‚РµРјР° РјР°РїРёС‚ СЌС‚Рѕ РЅР° СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ "РћС‚РѕСЂРёРЅРѕР»Р°СЂРёРЅРіРѕР»РѕРі" Рё РїРѕРєР°Р·С‹РІР°РµС‚ РІСЂР°С‡РµР№.

---

## 5. Waitlist (Р›РёСЃС‚ РћР¶РёРґР°РЅРёСЏ)
Р•СЃР»Рё СЃР»РѕС‚РѕРІ РЅРµС‚ (API РІРµСЂРЅСѓР» РїСѓСЃС‚РѕР№ РјР°СЃСЃРёРІ):
1.  РќРµ РїРѕРєР°Р·С‹РІР°РµРј "РњРµСЃС‚ РЅРµС‚".
2.  РџРѕРєР°Р·С‹РІР°РµРј С„РѕСЂРјСѓ "РЎРѕРѕР±С‰РёС‚СЊ, РєРѕРіРґР° РїРѕСЏРІРёС‚СЃСЏ РІСЂРµРјСЏ".
3.  РЎРѕС…СЂР°РЅСЏРµРј Р·Р°СЏРІРєСѓ РІ Р»РѕРєР°Р»СЊРЅСѓСЋ С‚Р°Р±Р»РёС†Сѓ Р‘Р”.
*Р¦РµРЅРЅРѕСЃС‚СЊ:* РќРµ С‚РµСЂСЏРµРј Р»РёРґ, РґР°Р¶Рµ РµСЃР»Рё СЂР°СЃРїРёСЃР°РЅРёРµ Р·Р°Р±РёС‚Рѕ.



===== FILE: C:\git\apl\med\docs\2_03_TECH_STACK.md =====


# 2_03. РўРµС…РЅРѕР»РѕРіРёС‡РµСЃРєРёР№ РЎС‚РµРє

РћР±РѕСЃРЅРѕРІР°РЅРёРµ РІС‹Р±РѕСЂР° С‚РµС…РЅРѕР»РѕРіРёР№ РґР»СЏ РѕР±РµСЃРїРµС‡РµРЅРёСЏ РїСЂРѕРёР·РІРѕРґРёС‚РµР»СЊРЅРѕСЃС‚Рё, РґРµС€РµРІРёР·РЅС‹ РїРѕРґРґРµСЂР¶РєРё Рё РЅРµР·Р°РІРёСЃРёРјРѕСЃС‚Рё.

---

## 1. Frontend (The Widget)

| РўРµС…РЅРѕР»РѕРіРёСЏ | Р’С‹Р±РѕСЂ | РђСЂРіСѓРјРµРЅС‚Р°С†РёСЏ |
| :--- | :--- | :--- |
| **Framework** | **React 19** | РЎС‚Р°РЅРґР°СЂС‚ РёРЅРґСѓСЃС‚СЂРёРё. РџРѕР·РІРѕР»СЏРµС‚ СЃРѕР·РґР°РІР°С‚СЊ СЃР»РѕР¶РЅС‹Р№ РёРЅС‚РµСЂР°РєС‚РёРІРЅС‹Р№ UI (Wizard) Р±РµР· "Р»Р°РїС€Рё" РёР· jQuery. |
| **Build Tool** | **Vite** | РЎРІРµСЂС…Р±С‹СЃС‚СЂР°СЏ СЃР±РѕСЂРєР°. РЈРјРµРµС‚ СЃРѕР±РёСЂР°С‚СЊ РїСЂРѕРµРєС‚ РІ РѕРїС‚РёРјРёР·РёСЂРѕРІР°РЅРЅС‹Рµ С‡Р°РЅРєРё. |
| **State** | **Zustand** | Р›РµРіРєРѕРІРµСЃРЅС‹Р№ СЃС‚РµР№С‚-РјРµРЅРµРґР¶РµСЂ. РќР°Рј РЅСѓР¶РЅРѕ С…СЂР°РЅРёС‚СЊ "С‡РµСЂРЅРѕРІРёРє Р·Р°РїРёСЃРё" (Draft) РјРµР¶РґСѓ С€Р°РіР°РјРё, Redux С‚СѓС‚ РёР·Р±С‹С‚РѕС‡РµРЅ. |
| **Styling** | **Tailwind CSS** | РџРѕР·РІРѕР»СЏРµС‚ РёР·РѕР»РёСЂРѕРІР°С‚СЊ СЃС‚РёР»Рё РІРёРґР¶РµС‚Р° РѕС‚ СЃС‚РёР»РµР№ СЃР°Р№С‚Р° (С‡РµСЂРµР· РїСЂРµС„РёРєСЃС‹ РёР»Рё Shadow DOM), С‡С‚РѕР±С‹ РІРµСЂСЃС‚РєР° СЃР°Р№С‚Р° РЅРµ Р»РѕРјР°Р»Р° РІРёРґР¶РµС‚. |
| **Icons** | **Lucide React** | Р›РµРіРєРёРµ, РєСЂР°СЃРёРІС‹Рµ SVG РёРєРѕРЅРєРё. |

---

## 2. Backend (The Gateway)

| РўРµС…РЅРѕР»РѕРіРёСЏ | Р’С‹Р±РѕСЂ | РђСЂРіСѓРјРµРЅС‚Р°С†РёСЏ |
| :--- | :--- | :--- |
| **Language** | **PHP 8.1+** | "Lingua Franca" РјРµРґРёС†РёРЅСЃРєРёС… СЃР°Р№С‚РѕРІ (90% РЅР° WP/Bitrix). Р“Р°СЂР°РЅС‚РёСЏ С‚РѕРіРѕ, С‡С‚Рѕ РєРѕРґ Р·Р°РїСѓСЃС‚РёС‚СЃСЏ РЅР° СЃРµСЂРІРµСЂРµ РєР»РёРµРЅС‚Р° Р±РµР· РЅР°СЃС‚СЂРѕР№РєРё CI/CD. |
| **Http Client** | **Curl Multi** | РљСЂРёС‚РёС‡РЅРѕ РІР°Р¶РЅРѕ. РџРѕР·РІРѕР»СЏРµС‚ РѕРїСЂР°С€РёРІР°С‚СЊ 3 Р±Р°Р·С‹ РњРРЎ **РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ**, Р° РЅРµ РїРѕ РѕС‡РµСЂРµРґРё. РЎРѕРєСЂР°С‰Р°РµС‚ РІСЂРµРјСЏ РѕС‚РІРµС‚Р° СЃ 3 СЃРµРє РґРѕ 1 СЃРµРє. |
| **Database** | **MySQL (WP DB)** | РСЃРїРѕР»СЊР·СѓРµРј С‚Сѓ Р¶Рµ Р±Р°Р·Сѓ, С‡С‚Рѕ Рё СЃР°Р№С‚, РґР»СЏ С‡С‚РµРЅРёСЏ РєРѕРЅС‚РµРЅС‚Р° РІСЂР°С‡РµР№ Рё Р·Р°РїРёСЃРё Р»РѕРіРѕРІ. РќРµ С‚СЂРµР±СѓРµС‚ РїРѕРґРЅСЏС‚РёСЏ РѕС‚РґРµР»СЊРЅРѕР№ Р‘Р”. |
| **Architecture** | **No-Framework** | РњС‹ РЅРµ РёСЃРїРѕР»СЊР·СѓРµРј Laravel/Symfony, С‡С‚РѕР±С‹ РЅРµ С‚Р°С‰РёС‚СЊ 50РјР± Р·Р°РІРёСЃРёРјРѕСЃС‚РµР№. РЈ РЅР°СЃ СЃРІРѕР№ РјРёРєСЂРѕ-СЂРѕСѓС‚РµСЂ (`Router.php`) вЂ” РєРѕРґ РІРµСЃРёС‚ 200РєР± Рё Р»РµС‚Р°РµС‚. |

---

## 3. Infrastructure (Dev vs Prod)

*   **Development:** Docker Compose (Nginx + PHP-FPM + Node.js).
*   **Production:**
    *   **Frontend:** РЎС‚Р°С‚РёС‡РµСЃРєРёРµ С„Р°Р№Р»С‹ (`.js`, `.css`) РІ РїР°РїРєРµ `/dist`.
    *   **Backend:** РџР°РїРєР° `/php_backend` РєРѕРїРёСЂСѓРµС‚СЃСЏ РЅР° СЃРµСЂРІРµСЂ.
    *   **Config:** Р¤Р°Р№Р» `config_access.php` СЃРѕР·РґР°РµС‚СЃСЏ РІСЂСѓС‡РЅСѓСЋ РЅР° СЃРµСЂРІРµСЂРµ (С…СЂР°РЅРёС‚ СЃРµРєСЂРµС‚С‹).

---

## 4. Integration Points

1.  **WordPress:** Р§РµСЂРµР· РїСЂСЏРјРѕР№ SQL-РґРѕСЃС‚СѓРї (PDO) Рє С‚Р°Р±Р»РёС†Р°Рј `wp_users`, `wp_usermeta`. Р­С‚Рѕ Р±С‹СЃС‚СЂРµРµ, С‡РµРј WP REST API.
2.  **qMS (РњРРЎ):** XML/JSON API. РўСЂРµР±СѓРµС‚ Р°РІС‚РѕСЂРёР·Р°С†РёРё РїРѕ С‚РѕРєРµРЅСѓ Рё IP (White labeling).
3.  **1C (РњРРЎ):** OData / HTTP-СЃРµСЂРІРёСЃС‹.



===== FILE: C:\git\apl\med\docs\2_04_ROADMAP.md =====


# 2_04. РџР»Р°РЅ Р Р°Р·СЂР°Р±РѕС‚РєРё (Roadmap)

РЎС‚СЂР°С‚РµРіРёСЏ "РѕС‚ РїСЂРѕСЃС‚РѕРіРѕ Рє СЃР»РѕР¶РЅРѕРјСѓ".

---

## Р­РўРђРџ 1: MVP "Р–РµР»РµР·РЅС‹Р№ РЁР»СЋР·" (РўРµРєСѓС‰РёР№ СЃС‚Р°С‚СѓСЃ)
**Р¦РµР»СЊ:** Р Р°Р±РѕС‡Р°СЏ Р·Р°РїРёСЃСЊ РІ "РіСЂСЏР·РЅРѕРј" РёРЅС‚РµСЂС„РµР№СЃРµ, РЅРѕ СЃ РёРґРµР°Р»СЊРЅС‹Рј Р±СЌРєРµРЅРґРѕРј.

1.  [x] **PHP Core:** Р РµР°Р»РёР·РѕРІР°С‚СЊ `AsyncHttpService` РґР»СЏ РїР°СЂР°Р»Р»РµР»СЊРЅС‹С… Р·Р°РїСЂРѕСЃРѕРІ.
2.  [x] **Drivers:** РќР°РїРёСЃР°С‚СЊ РґСЂР°Р№РІРµСЂ РґР»СЏ qMS (С‡С‚РµРЅРёРµ СЃР»РѕС‚РѕРІ, Р·Р°РїРёСЃСЊ).
3.  [x] **Config:** Р’РЅРµРґСЂРёС‚СЊ РјРѕРґСѓР»СЊРЅСѓСЋ РєРѕРЅС„РёРіСѓСЂР°С†РёСЋ (Infrastructure, Topology).
4.  [ ] **Frontend Skeleton:** Р‘Р°Р·РѕРІС‹Р№ React-РІРёРґР¶РµС‚ (РІС‹Р±РѕСЂ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё -> СЃРїРёСЃРѕРє РІСЂР°С‡РµР№ -> СЃР»РѕС‚С‹).

## Р­РўРђРџ 2: "РџСЂРµРјРёСѓРј Р’РёС‚СЂРёРЅР°" (CMS Integration)
**Р¦РµР»СЊ:** Р’РёРґР¶РµС‚ РІС‹РіР»СЏРґРёС‚ РґРѕСЂРѕРіРѕ Рё РїСЂРѕРґР°РµС‚ РІСЂР°С‡РµР№.

1.  [ ] **WP Plugin:** РЎРѕР·РґР°С‚СЊ РїР»Р°РіРёРЅ РґР»СЏ WP, РєРѕС‚РѕСЂС‹Р№ РґРѕР±Р°РІР»СЏРµС‚ РїРѕР»СЏ `qms_id`, `photo`, `regalia` Рє РїРѕР»СЊР·РѕРІР°С‚РµР»СЏРј.
2.  [ ] **Sync Tool:** РРЅСЃС‚СЂСѓРјРµРЅС‚ РґР»СЏ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР°: "РќР°Р¶РјРё РєРЅРѕРїРєСѓ, С‡С‚РѕР±С‹ СЃРІСЏР·Р°С‚СЊ РІСЂР°С‡РµР№ WP СЃ РІСЂР°С‡Р°РјРё qMS".
3.  [ ] **Frontend UI:** РљСЂР°СЃРёРІС‹Рµ РєР°СЂС‚РѕС‡РєРё, С„РёР»СЊС‚СЂС‹, Р°РЅРёРјР°С†РёРё РїРµСЂРµС…РѕРґРѕРІ.

## Р­РўРђРџ 3: "РЈРјРЅС‹Рµ Р¤СѓРЅРєС†РёРё" (Smart Layer)
**Р¦РµР»СЊ:** РџРѕРІС‹С€РµРЅРёРµ РєРѕРЅРІРµСЂСЃРёРё Рё СѓРґРѕР±СЃС‚РІР°.

1.  [ ] **Waitlist:** Р РµР°Р»РёР·Р°С†РёСЏ Р»РёСЃС‚Р° РѕР¶РёРґР°РЅРёСЏ РІ Р‘Р”.
2.  [ ] **Auth:** SMS-РІРµСЂРёС„РёРєР°С†РёСЏ РЅРѕРјРµСЂР° С‚РµР»РµС„РѕРЅР°.
3.  [ ] **Deep Linking:** Р’РѕР·РјРѕР¶РЅРѕСЃС‚СЊ РґР°РІР°С‚СЊ СЂРµРєР»Р°РјСѓ СЃСЂР°Р·Сѓ РЅР° С„РѕСЂРјСѓ Р·Р°РїРёСЃРё Рє РєРѕРЅРєСЂРµС‚РЅРѕРјСѓ РІСЂР°С‡Сѓ (`/book?doc=123`).

## Р­РўРђРџ 4: "AI Transformation" (Future)
**Р¦РµР»СЊ:** РџРѕРґРєР»СЋС‡РµРЅРёРµ РёРЅС‚РµР»Р»РµРєС‚Р°.

1.  [ ] **Knowledge Base:** РРЅРґРµРєСЃР°С†РёСЏ СѓСЃР»СѓРі Рё Р±РёРѕ РІСЂР°С‡РµР№ РІ РІРµРєС‚РѕСЂРЅСѓСЋ Р±Р°Р·Сѓ (Supabase).
2.  [ ] **Semantic Search:** Р­РЅРґРїРѕРёРЅС‚ `/smart_search`, РєРѕС‚РѕСЂС‹Р№ РїСЂРёРЅРёРјР°РµС‚ "Р±РѕР»РёС‚ РіРѕР»РѕРІР°" Рё РІРѕР·РІСЂР°С‰Р°РµС‚ СЃРїРёСЃРѕРє РќРµРІСЂРѕР»РѕРіРѕРІ.
3.  [ ] **Voice Assistant:** РџРѕРґРєР»СЋС‡РµРЅРёРµ РіРѕР»РѕСЃРѕРІРѕРіРѕ СЂРѕР±РѕС‚Р° Рє РЅР°С€РµРјСѓ API (`/get_slots`, `/book`).

---

## Р РµР·СЋРјРµ РґР»СЏ Р­РєСЃРїРµСЂС‚Р°

РњС‹ РЅР°С…РѕРґРёРјСЃСЏ РІ РєРѕРЅС†Рµ **Р­С‚Р°РїР° 1** Рё РЅР°С‡Р°Р»Рµ **Р­С‚Р°РїР° 2**.
РђСЂС…РёС‚РµРєС‚СѓСЂР° СЃРїСЂРѕРµРєС‚РёСЂРѕРІР°РЅР° С‚Р°Рє, С‡С‚РѕР±С‹ **Р­С‚Р°Рї 4 (AI)** СЃС‚Р°Р» РїСЂРѕСЃС‚Рѕ "РµС‰Рµ РѕРґРЅРёРј РїР»Р°РіРёРЅРѕРј", Р° РЅРµ С‚СЂРµР±РѕРІР°Р» РїРµСЂРµРїРёСЃС‹РІР°РЅРёСЏ РІСЃРµРіРѕ РєРѕРґР°.
Р¤СѓРЅРґР°РјРµРЅС‚ (PHP Gateway + Actor/Offering Model) вЂ” СЌС‚Рѕ РЅР°С€ РіР»Р°РІРЅС‹Р№ Р°РєС‚РёРІ.



===== FILE: C:\git\apl\med\docs\LLM_CONFIG_GENERATOR_PROMPT.md =====


# LLM Prompt: Config Generator v3.0 (Rules Engine Aware)

Copy the text below and paste it into ChatGPT (o1 or GPT-4) or Claude 3.5 Sonnet.
Append the JSON output from the Integrator Console at the end.

---

**ROLE:**
You are a Senior PHP System Architect. Your task is to generate valid PHP configuration files for a Medical Booking Engine based on the provided "Client Context JSON".

**ARCHITECTURE:**
The system uses a modular configuration strategy located in `php_backend/config_parts/`.
You must generate code for **3 specific files**.

**INPUT DATA:**
I will provide a JSON object `client_context` containing the client's infrastructure, branding, and strict logic rules.

**TASK:**
Generate valid PHP code blocks for the following files.

---

### FILE 1: `php_backend/config_parts/02_topology.php`
*Define cities and dimensions logic.*

**Logic Rules:**
1. **Cities:** Convert `client_context.topology.cities` array into the items array. Use the first city as default.
2. **Audience Dimension:**
   - If `audience.mode` == 'strict': Set dimension `mode` to 'strict_separation'.
   - If `audience.mode` == 'mixed': Set dimension `mode` to 'tabs'.
   - Create options 'adult' and 'child'.
3. **Vertical Dimension:**
   - If `client_context.topology.verticals.mapping` is NOT empty:
     - Create a 'vertical' dimension.
     - `mode` = 'filter'.
     - Create options based on the values in the mapping (e.g., if 'stoma' exists, create option 'stoma').

**Template:**
```php
<?php
return [
    'topology' => [
        'cities' => [
            'enabled' => true,
            'items' => [
                'chel' => ['label' => 'Chelyabinsk', 'default' => true]
            ]
        ],
        'dimensions' => [
            'audience' => [
                'enabled' => true,
                'key' => 'audience',
                'label' => 'Who is the patient?',
                'mode' => 'tabs', // derived from JSON
                'options' => [
                    ['id' => 'adult', 'label' => 'Adults', 'isDefault' => true],
                    ['id' => 'child', 'label' => 'Children']
                ]
            ]
            // Add vertical dimension if present
        ],
        'branches' => [
            'enabled' => true,
            'logic' => 'dynamic_aggregation'
        ]
    ]
];
```

---

### FILE 2: `php_backend/config_parts/03_logic.php`
*Define the Rules Engine (Classification).*

**Logic Rules:**
1. **Hydrator:** Keep default settings.
2. **Classification (CRITICAL):**
   - **Audience Rule:** 
     - Source: `client_context.cms.taxonomy_source`.
     - Map: Use `client_context.topology.audience.mapping` (e.g., `'detskaya-poliklinika' => 'child'`).
   - **Vertical Rule:**
     - Source: `client_context.cms.taxonomy_source`.
     - Map: Use `client_context.topology.verticals.mapping`.

**Template:**
```php
<?php
return [
    'hydrator' => [
        'doctor' => [
            'identity' => 'qms_api',
            'schedule' => 'qms_api',
            'content'  => 'wp_usermeta',
            'pricing'  => 'qms_api',
        ]
    ],
    'classification' => [
        'audience' => [
            'type'   => 'wp_taxonomy_ancestor',
            'source' => 'INSERT_TAXONOMY_SOURCE_HERE',
            'map'    => [
                // INSERT AUDIENCE MAPPING HERE
                // 'detskaya' => 'child'
            ]
        ],
        'vertical' => [
            'type'   => 'wp_taxonomy_ancestor',
            'source' => 'INSERT_TAXONOMY_SOURCE_HERE',
            'map'    => [
                // INSERT VERTICAL MAPPING HERE
            ]
        ]
    ],
    'cms_map' => [
        'taxonomies' => [
            'services' => 'INSERT_TAXONOMY_SOURCE_HERE'
        ]
    ]
];
```

---

### FILE 3: `php_backend/config_parts/04_theme.php`
*Apply branding.*

**Logic Rules:**
- Use `client_context.cms.assets.colors`.
- Use `client_context.client.name`.

**Template:**
```php
<?php
return [
    'client' => [
        'name' => 'INSERT_CLIENT_NAME',
        'city_default' => 'chel',
    ],
    'theme' => [
        'logo_url' => 'INSERT_LOGO_URL',
        'colors' => [
            'primary' => '#INSERT_PRIMARY_HEX',
            'accent' => '#INSERT_ACCENT_HEX',
            'background' => '#F8FAFC'
        ],
        'labels' => [
            'step1Title' => 'Booking Appointment',
            // ... standard labels
        ]
    ]
];
```

---

**STRICT OUTPUT FORMAT:**
Return 3 distinct code blocks. Do not add conversational filler.

**PASTE JSON BELOW THIS LINE:**



===== FILE: C:\git\apl\med\docs\LLM_DRIVER_MAPPER_PROMPT.md =====


# LLM Prompt: Data Mapper (Driver Generator)

**ROLE:**
You are a Senior PHP Backend Engineer. Your goal is to write a data transformation function (Adapter Pattern).

**CONTEXT:**
We have a "Dirty" JSON response from a legacy Medical System (MIS).
We need to transform it into a "Clean" Standardized JSON format for our Frontend Widget.

**INPUT 1: DIRTY JSON (Source)**
[PASTE_REAL_API_RESPONSE_HERE]

**INPUT 2: TARGET SCHEMA (Destination)**
Our system expects an array of `Doctor` objects:
```typescript
interface Doctor {
  id: string;          // Unique ID from MIS
  name: string;        // Full Name "Ivanov Ivan Ivanovich"
  specialty: string;   // "Cardiologist"
  price: number;       // Numeric, e.g. 5000
  branchCode: string;  // Code of the branch from MIS
}
```

**TASK:**
Write a PHP function `normalizeResponse(array $dirtyData): array` that iterates over the dirty data and returns the clean array.
- Handle missing fields gracefully (use defaults).
- If the name is in parts (Surname, Name), join them.
- If the price is a string with currency, parse it to float.

**OUTPUT FORMAT:**
Provide ONLY the PHP code for the function.



===== FILE: C:\git\apl\med\docs\LLM_THEME_GENERATOR_PROMPT.md =====


# LLM Prompt: Theme Generator

**Task:** Extract design tokens from a brand image (screenshot or brandbook) and generate a PHP configuration.

**Input:** Image (Screenshot of client's website).

**Instructions for LLM:**
1. Analyze the image to find the **Primary Color** (used for buttons, links, active states) and the **Accent Color** (used for notifications, badges, highlights).
2. Extract the Hex codes.
3. Identify if the design is "Round" (large radius) or "Sharp" (small radius).
4. Output the PHP array for `php_backend/config_parts/04_theme.php`.

**Output Format:**

```php
<?php
// PART 4: THEME (Auto-generated from screenshot)

return [
    'client' => [
        'name' => 'DETECTED_CLIENT_NAME', 
        'city_default' => 'chel',
    ],

    'theme' => [
        'logo_url' => 'DETECTED_LOGO_URL_OR_EMPTY',
        
        'colors' => [
            'primary' => '#HEX_PRIMARY',
            'accent' => '#HEX_ACCENT',
        ],
        
        'contacts' => [
            'phone' => 'DETECTED_PHONE',
            'website' => 'DETECTED_DOMAIN'
        ],
        
        // ... standard labels
    ]
];
```



===== FILE: C:\git\apl\med\docs\PROJECT_REGISTRY.md =====


# Project Registry (File Map)

Р­С‚РѕС‚ РґРѕРєСѓРјРµРЅС‚ РѕРїРёСЃС‹РІР°РµС‚ СЃС‚СЂСѓРєС‚СѓСЂСѓ РїСЂРѕРµРєС‚Р°. **РРјРµРЅР° С„Р°Р№Р»РѕРІ РІ РїР°РїРєРµ `docs/` СѓРЅРёС„РёС†РёСЂРѕРІР°РЅС‹.**

## рџџў Root
- `.cursorrules` - РРЅСЃС‚СЂСѓРєС†РёРё РґР»СЏ РР.
- `package.json` - Р—Р°РІРёСЃРёРјРѕСЃС‚Рё.
- `vite.config.ts` - РљРѕРЅС„РёРі СЃР±РѕСЂРєРё.
- `docker-compose.yml` - РћРєСЂСѓР¶РµРЅРёРµ.
- `README.md` - РРЅСЃС‚СЂСѓРєС†РёСЏ РїРѕ Р·Р°РїСѓСЃРєСѓ.

## рџ”µ Frontend (`src/`)
### Core
- `main.tsx` / `index.tsx`
- `App.tsx`
- `types.ts`
- `index.css`

### Config & Store
- `config/theme.ts`
- `config/schema.ts`
- `store/bookingStore.ts`

### Services
- `services/api.ts`
- `services/session.ts`
- `services/analytics.ts`
- `services/mockQmsApi.ts`

### Components
- `components/ui/` (Card, Button, Skeleton...)
- `components/modules/` (DoctorCard, BranchSwitcher...)
- `components/steps/` (StepHome, StepDoctors, StepSlots, StepForm, StepSuccess)
- `components/admin/` (AdminLayout)
- `components/presentation/` (Landing pages)
- `components/ArchitecturePreview.tsx`
- `components/ErrorBoundary.tsx`
- `components/WizardLayout.tsx`

## рџџ  Backend (`php_backend/`)
- `api.php` - Front Controller.
- `config.php` - Config Loader.
- `config_parts/` (01_infrastructure, 02_topology, 03_logic, 04_theme, 05_compliance, 99_helpers).
- `controllers/` (BookingController, SearchController).
- `drivers/` (QmsDriver, OneCDriver, BaseDriver).
- `services/` (AsyncHttpService, RecaptchaService).
- `core/` (Router, Logger, Cache, RateLimiter).
- `helpers/` (DoctorFormatter).
- `dev_dashboard.php`, `dev_api_test.php`, `dev_cms_sync.php`.

### рџ›  Tools (`php_backend/tools/`)
- `README.md` - РРЅСЃС‚СЂСѓРєС†РёСЏ РїРѕ РёРЅСЃС‚СЂСѓРјРµРЅС‚Р°Рј.
- `sync_tool.php` - РњР°РїРїРёРЅРі РІСЂР°С‡РµР№.
- `generate_requirements.php` - Р“РµРЅРµСЂР°С‚РѕСЂ РўР— (PDF).
- `wizard/`
  - `index.html` - РРЅС‚РµСЂС„РµР№СЃ РєРѕРЅС„РёРіСѓСЂР°С‚РѕСЂР°.
  - `save.php` - API СЃРѕС…СЂР°РЅРµРЅРёСЏ РґСЂР°С„С‚Р°.

## рџџЈ Documentation (`docs/`)

РЎС‚СЂСѓРєС‚СѓСЂР° РґРѕРєСѓРјРµРЅС‚Р°С†РёРё РїСЂРёРІРµРґРµРЅР° Рє РµРґРёРЅРѕРјСѓ СЃС‚Р°РЅРґР°СЂС‚Сѓ `XX_NAME.md`.

### 00. General
- `docs/README.md` - РћРіР»Р°РІР»РµРЅРёРµ Р±Р°Р·С‹ Р·РЅР°РЅРёР№.
- `docs/00_MIGRATION_PLAN.md` - РџР»Р°РЅ С‚РµРєСѓС‰РёС… СЂР°Р±РѕС‚.

### 01. Strategy (РЎС‚СЂР°С‚РµРіРёСЏ)
- `docs/01_STRATEGY_PRODUCT.md` - Р¤РёР»РѕСЃРѕС„РёСЏ "Engine + Config".
- `docs/01_STRATEGY_SEPARATION.md` - Р Р°Р·РґРµР»РµРЅРёРµ Core, Site Рё External AI.

### 02. Architecture (РђСЂС…РёС‚РµРєС‚СѓСЂР°)
- `docs/02_ARCHITECTURE_CORE.md` - **[SSOT]** Actor vs Offering + РџРѕС‚РѕРєРё РґР°РЅРЅС‹С….
- `docs/02_ARCHITECTURE_CMS.md` - Р РѕР»СЊ WordPress РєР°Рє Headless Content Layer.
- `docs/02_ARCHITECTURE_COMPLIANCE.md` - Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ Рё 152-Р¤Р—.

### 03. Specifications (РЎРїРµС†РёС„РёРєР°С†РёРё)
- `docs/03_SPEC_FEATURES.md` - РџРѕР»РЅС‹Р№ РєР°С‚Р°Р»РѕРі С„СѓРЅРєС†РёР№.
- `docs/03_SPEC_CONFIG.md` - РњР°С‚СЂРёС†Р° РЅР°СЃС‚СЂРѕРµРє `config.php`.
- `docs/03_SPEC_DATA_REQ.md` - РўСЂРµР±РѕРІР°РЅРёСЏ Рє РґР°РЅРЅС‹Рј (РђРЅРєРµС‚Р° РґР»СЏ РєР»РёРЅРёРєРё).
- `docs/03_SPEC_WP_SCHEMA.json` - JSON СЃС…РµРјР° РїРѕР»РµР№ РґР»СЏ WordPress.

### 04. Research (РСЃСЃР»РµРґРѕРІР°РЅРёСЏ)
- `docs/04_RESEARCH_BRIEF.md` - РўР— РЅР° РёСЃСЃР»РµРґРѕРІР°РЅРёРµ.
- `docs/04_RESEARCH_AUDIT.md` - РђСѓРґРёС‚ РІРЅРµС€РЅРµРіРѕ Р°СЂС…РёС‚РµРєС‚РѕСЂР°.
- `docs/04_RESEARCH_ANALYSIS.md` - Р“Р»РѕР±Р°Р»СЊРЅС‹Р№ Р°РЅР°Р»РёР· (Doctolib, ZocDoc).
- `docs/04_RESEARCH_SUMMARY.md` - РС‚РѕРіРѕРІС‹Рµ РІС‹РІРѕРґС‹.

### 05. References (Р›РѕРіРё Рё РџСЂРёРјРµСЂС‹)
- `docs/05_LOGS_MAIN.txt` - Р›РѕРіРё СЂР°Р±РѕС‚С‹ API (РћСЃРЅРѕРІРЅРѕР№).
- `docs/05_LOGS_BRANCHES.txt` - Р›РѕРіРё (Р¤РёР»РёР°Р»С‹).

### 06. LLM Tools (РџСЂРѕРјРїС‚С‹)
- `docs/LLM_CONFIG_GENERATOR_PROMPT.md` - РџСЂРѕРјРїС‚ РґР»СЏ РіРµРЅРµСЂР°С†РёРё РєРѕРЅС„РёРіР° РёР· JSON.

### Benchmarks (Root Folder)
- `benchmarks/scandinavia_analysis.md`
- `benchmarks/medsi_analysis.md`
- `benchmarks/lotos_analysis.md`
- `benchmarks/smclinic_analysis.md`
- `benchmarks/capabilities_registry.md`
- `benchmarks/antipatterns_registry.md`



===== FILE: C:\git\apl\med\docs\README.md =====


# рџ“љ Р‘Р°Р·Р° Р—РЅР°РЅРёР№ Medical Booking

Р¦РµРЅС‚СЂР°Р»СЊРЅС‹Р№ С…Р°Р± РґРѕРєСѓРјРµРЅС‚Р°С†РёРё РїСЂРѕРµРєС‚Р°. Р¤Р°Р№Р»С‹ СЃС‚СЂСѓРєС‚СѓСЂРёСЂРѕРІР°РЅС‹ РїРѕ РїСЂРµС„РёРєСЃР°Рј РґР»СЏ СѓРґРѕР±РЅРѕР№ РЅР°РІРёРіР°С†РёРё.

---

## рџЋЇ 01. РЎС‚СЂР°С‚РµРіРёСЏ
*Р—Р°С‡РµРј РјС‹ СЌС‚Рѕ РґРµР»Р°РµРј Рё РєСѓРґР° РёРґРµРј.*

| Р¤Р°Р№Р» | РћРїРёСЃР°РЅРёРµ |
| :--- | :--- |
| **[01_STRATEGY_PRODUCT.md](01_STRATEGY_PRODUCT.md)** | **Р“Р»Р°РІРЅС‹Р№ РґРѕРєСѓРјРµРЅС‚.** Р¤РёР»РѕСЃРѕС„РёСЏ "Engine + Config". |
| **[01_STRATEGY_SEPARATION.md](01_STRATEGY_SEPARATION.md)** | РџРѕС‡РµРјСѓ Р§Р°С‚-Р±РѕС‚ вЂ” СЌС‚Рѕ РІРЅРµС€РЅРёР№ РєР»РёРµРЅС‚, Р° Р’РёРґР¶РµС‚ вЂ” СЌС‚Рѕ СЏРґСЂРѕ. |

---

## рџЏ— 02. РђСЂС…РёС‚РµРєС‚СѓСЂР°
*РљР°Рє СЌС‚Рѕ СѓСЃС‚СЂРѕРµРЅРѕ РІРЅСѓС‚СЂРё.*

| Р¤Р°Р№Р» | РћРїРёСЃР°РЅРёРµ |
| :--- | :--- |
| **[02_ARCHITECTURE_CORE.md](02_ARCHITECTURE_CORE.md)** | **SSOT.** РљР»СЋС‡РµРІС‹Рµ СЃСѓС‰РЅРѕСЃС‚Рё (Actor/Offering) Рё РџРѕС‚РѕРєРё РґР°РЅРЅС‹С… (API Flow). |
| **[02_ARCHITECTURE_CMS.md](02_ARCHITECTURE_CMS.md)** | Р РѕР»СЊ WordPress РєР°Рє Headless Content Layer. |
| **[02_ARCHITECTURE_COMPLIANCE.md](02_ARCHITECTURE_COMPLIANCE.md)** | Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ, 152-Р¤Р—, РєРѕРЅС‚СѓСЂС‹ РґР°РЅРЅС‹С…. |

---

## вљ™пёЏ 03. РЎРїРµС†РёС„РёРєР°С†РёРё
*РЎРїСЂР°РІРѕС‡РЅРёРєРё РґР»СЏ СЂР°Р·СЂР°Р±РѕС‚С‡РёРєРѕРІ.*

| Р¤Р°Р№Р» | РћРїРёСЃР°РЅРёРµ |
| :--- | :--- |
| **[03_SPEC_CONFIG.md](03_SPEC_CONFIG.md)** | РџРѕР»РЅР°СЏ С‚Р°Р±Р»РёС†Р° РІСЃРµС… РЅР°СЃС‚СЂРѕРµРє `config.php`. |
| **[03_SPEC_FEATURES.md](03_SPEC_FEATURES.md)** | РљР°С‚Р°Р»РѕРі РІРѕР·РјРѕР¶РЅРѕСЃС‚РµР№ (Deep Links, Reverse Branching...). |
| **[03_SPEC_DATA_REQ.md](03_SPEC_DATA_REQ.md)** | РўСЂРµР±РѕРІР°РЅРёСЏ Рє РґР°РЅРЅС‹Рј РѕС‚ РєР»РёРЅРёРєРё. |
| **[03_SPEC_WP_SCHEMA.json](03_SPEC_WP_SCHEMA.json)** | РЎС…РµРјР° РїРѕР»РµР№ (ACF) РґР»СЏ WordPress. |

---

## рџ”¬ 04. РСЃСЃР»РµРґРѕРІР°РЅРёСЏ (R&D)
*РџРѕС‡РµРјСѓ РїСЂРёРЅСЏС‚С‹ С‚Р°РєРёРµ СЂРµС€РµРЅРёСЏ.*

*   [04_RESEARCH_SUMMARY.md](04_RESEARCH_SUMMARY.md) вЂ” РЎРІРѕРґРЅС‹Рµ РІС‹РІРѕРґС‹ РёСЃСЃР»РµРґРѕРІР°РЅРёСЏ.
*   [04_RESEARCH_ANALYSIS.md](04_RESEARCH_ANALYSIS.md) вЂ” Р“Р»РѕР±Р°Р»СЊРЅС‹Р№ Р°РЅР°Р»РёР· (Doctolib, ZocDoc).
*   [04_RESEARCH_AUDIT.md](04_RESEARCH_AUDIT.md) вЂ” РђСѓРґРёС‚ РІРЅРµС€РЅРµРіРѕ Р°СЂС…РёС‚РµРєС‚РѕСЂР°.

**Р‘РµРЅС‡РјР°СЂРєРё (UI/UX):**
*   `../benchmarks/scandinavia_analysis.md` вЂ” UX Р’РёС‚СЂРёРЅС‹.
*   `../benchmarks/lotos_analysis.md` вЂ” РћР±СЂР°С‚РЅС‹Р№ РІС‹Р±РѕСЂ С„РёР»РёР°Р»Р°.

---

## рџ”Њ 05. Р›РѕРіРё Рё Р РµС„РµСЂРµРЅСЃС‹
*РЎС‹СЂС‹Рµ РґР°РЅРЅС‹Рµ РґР»СЏ РѕС‚Р»Р°РґРєРё.*

*   `05_LOGS_MAIN.txt` вЂ” РџСЂРёРјРµСЂС‹ Р·Р°РїСЂРѕСЃРѕРІ (РћСЃРЅРѕРІРЅРѕР№).
*   `05_LOGS_BRANCHES.txt` вЂ” РџСЂРёРјРµСЂС‹ СЂР°Р±РѕС‚С‹ "РїРѕ РІСЃРµРј С„РёР»РёР°Р»Р°Рј".



===== FILE: C:\git\apl\med\index.html =====

<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Medical Booking Widget</title>
    
    <!-- PWA Settings -->
    <meta name="theme-color" content="#3b82f6" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <link rel="manifest" href="/manifest.json">
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Import map for specific CDN/Environment cases -->
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@^19.2.4",
        "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
        "react/": "https://esm.sh/react@^19.2.4/",
        "lucide-react": "https://esm.sh/lucide-react@^0.563.0",
        "vite": "https://esm.sh/vite@^7.3.1",
        "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^5.1.3",
        "zustand": "https://esm.sh/zustand@^5.0.11",
        "zustand/": "https://esm.sh/zustand@^5.0.11/",
        "react-hook-form": "https://esm.sh/react-hook-form@^7.71.1",
        "@hookform/resolvers/": "https://esm.sh/@hookform/resolvers@^5.2.2/",
        "@sentry/react": "https://esm.sh/@sentry/react@^10.38.0",
        "zod": "https://esm.sh/zod@^4.3.6"
      }
    }
    </script>
  <link rel="stylesheet" href="/index.css">
</head>
  <body>
    <!-- Unique ID to prevent conflict with WordPress/Bitrix sites -->
    <div id="medical-booking-widget-root"></div>
    
    <!-- Vite Entry Point -->
    <script type="module" src="/src/index.tsx"></script>
  <script type="module" src="/index.tsx"></script>
</body>
</html>


===== FILE: C:\git\apl\med\index.tsx =====

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


===== FILE: C:\git\apl\med\metadata.json =====

{
  "name": "Medical Booking SAAS",
  "description": "A platform-agnostic (MODX/WP) React booking component that aggregates data from multiple qMS API endpoints, handling complex multi-branch/multi-database logic for St. Petersburg and Chelyabinsk clinics.",
  "requestFramePermissions": []
}


===== FILE: C:\git\apl\med\package.json =====


{
  "name": "medical-booking-widget",
  "private": true,
  "version": "2.4.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "php": "php -S localhost:8000 -t php_backend"
  },
  "dependencies": {
    "lucide-react": "^0.469.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^5.0.2",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "zod": "^3.24.1",
    "react-hook-form": "^7.54.2",
    "@hookform/resolvers": "^3.9.1",
    "@sentry/react": "^8.47.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vite": "^6.0.6",
    "concurrently": "^9.1.0"
  }
}



===== FILE: C:\git\apl\med\package-lock.json =====

{
  "name": "medical-booking-widget",
  "version": "2.4.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "medical-booking-widget",
      "version": "2.4.0",
      "dependencies": {
        "@hookform/resolvers": "^3.9.1",
        "@sentry/react": "^8.47.0",
        "clsx": "^2.1.1",
        "lucide-react": "^0.469.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-hook-form": "^7.54.2",
        "tailwind-merge": "^2.6.0",
        "zod": "^3.24.1",
        "zustand": "^5.0.2"
      },
      "devDependencies": {
        "@types/node": "^22.10.2",
        "@types/react": "^18.3.12",
        "@types/react-dom": "^18.3.1",
        "@vitejs/plugin-react": "^4.3.4",
        "autoprefixer": "^10.4.20",
        "concurrently": "^9.1.0",
        "postcss": "^8.4.49",
        "tailwindcss": "^3.4.17",
        "typescript": "^5.7.2",
        "vite": "^6.0.6"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.6.tgz",
      "integrity": "sha512-xOBvwq86HHdB7WUDTfKfT/Vuxh7gElQ+Sfti2Cy6yIWNW05P8iUslOVcZ4/sKbE+/jQaukQAdz/gf3724kYdqw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.0.tgz",
      "integrity": "sha512-IyDgFV5GeDUVX4YdF/3CPULtVGSXXMLh1xVIgdCgxApktqnQV0r7/8Nqthg+8YLGaAtdyIlo2qIdZrbCv4+7ww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.12.tgz",
      "integrity": "sha512-Hhmwd6CInZ3dwpuGTF8fJG6yoWmsToE+vYgD4nytZVxcu1ulHpUQRAB1UJ8+N1Am3Mz4+xOByoQoSZf4D+CpkA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.12.tgz",
      "integrity": "sha512-VJ+sKvNA/GE7Ccacc9Cha7bpS8nyzVv0jdVgwNDaR4gDMC/2TTRc33Ip8qrNYUcpkOHUT5OZ0bUcNNVZQ9RLlg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.12.tgz",
      "integrity": "sha512-6AAmLG7zwD1Z159jCKPvAxZd4y/VTO0VkprYy+3N2FtJ8+BQWFXU+OxARIwA46c5tdD9SsKGZ/1ocqBS/gAKHg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.12.tgz",
      "integrity": "sha512-5jbb+2hhDHx5phYR2By8GTWEzn6I9UqR11Kwf22iKbNpYrsmRB18aX/9ivc5cabcUiAT/wM+YIZ6SG9QO6a8kg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.12.tgz",
      "integrity": "sha512-N3zl+lxHCifgIlcMUP5016ESkeQjLj/959RxxNYIthIg+CQHInujFuXeWbWMgnTo4cp5XVHqFPmpyu9J65C1Yg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.12.tgz",
      "integrity": "sha512-HQ9ka4Kx21qHXwtlTUVbKJOAnmG1ipXhdWTmNXiPzPfWKpXqASVcWdnf2bnL73wgjNrFXAa3yYvBSd9pzfEIpA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.12.tgz",
      "integrity": "sha512-gA0Bx759+7Jve03K1S0vkOu5Lg/85dou3EseOGUes8flVOGxbhDDh/iZaoek11Y8mtyKPGF3vP8XhnkDEAmzeg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.12.tgz",
      "integrity": "sha512-TGbO26Yw2xsHzxtbVFGEXBFH0FRAP7gtcPE7P5yP7wGy7cXK2oO7RyOhL5NLiqTlBh47XhmIUXuGciXEqYFfBQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.12.tgz",
      "integrity": "sha512-lPDGyC1JPDou8kGcywY0YILzWlhhnRjdof3UlcoqYmS9El818LLfJJc3PXXgZHrHCAKs/Z2SeZtDJr5MrkxtOw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.12.tgz",
      "integrity": "sha512-8bwX7a8FghIgrupcxb4aUmYDLp8pX06rGh5HqDT7bB+8Rdells6mHvrFHHW2JAOPZUbnjUpKTLg6ECyzvas2AQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.12.tgz",
      "integrity": "sha512-0y9KrdVnbMM2/vG8KfU0byhUN+EFCny9+8g202gYqSSVMonbsCfLjUO+rCci7pM0WBEtz+oK/PIwHkzxkyharA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.12.tgz",
      "integrity": "sha512-h///Lr5a9rib/v1GGqXVGzjL4TMvVTv+s1DPoxQdz7l/AYv6LDSxdIwzxkrPW438oUXiDtwM10o9PmwS/6Z0Ng==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.12.tgz",
      "integrity": "sha512-iyRrM1Pzy9GFMDLsXn1iHUm18nhKnNMWscjmp4+hpafcZjrr2WbT//d20xaGljXDBYHqRcl8HnxbX6uaA/eGVw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.12.tgz",
      "integrity": "sha512-9meM/lRXxMi5PSUqEXRCtVjEZBGwB7P/D4yT8UG/mwIdze2aV4Vo6U5gD3+RsoHXKkHCfSxZKzmDssVlRj1QQA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.12.tgz",
      "integrity": "sha512-Zr7KR4hgKUpWAwb1f3o5ygT04MzqVrGEGXGLnj15YQDJErYu/BGg+wmFlIDOdJp0PmB0lLvxFIOXZgFRrdjR0w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.12.tgz",
      "integrity": "sha512-MsKncOcgTNvdtiISc/jZs/Zf8d0cl/t3gYWX8J9ubBnVOwlk65UIEEvgBORTiljloIWnBzLs4qhzPkJcitIzIg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.12.tgz",
      "integrity": "sha512-uqZMTLr/zR/ed4jIGnwSLkaHmPjOjJvnm6TVVitAa08SLS9Z0VM8wIRx7gWbJB5/J54YuIMInDquWyYvQLZkgw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-xXwcTq4GhRM7J9A8Gv5boanHhRa/Q9KLVmcyXHCTaM4wKfIpWkdXiMog/KsnxzJ0A1+nD+zoecuzqPmCRyBGjg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.12.tgz",
      "integrity": "sha512-Ld5pTlzPy3YwGec4OuHh1aCVCRvOXdH8DgRjfDy/oumVovmuSzWfnSJg+VtakB9Cm0gxNO9BzWkj6mtO1FMXkQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.12.tgz",
      "integrity": "sha512-fF96T6KsBo/pkQI950FARU9apGNTSlZGsv1jZBAlcLL1MLjLNIWPBkj5NlSz8aAzYKg+eNqknrUJ24QBybeR5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.12.tgz",
      "integrity": "sha512-MZyXUkZHjQxUvzK7rN8DJ3SRmrVrke8ZyRusHlP+kuwqTcfWLyqMOE3sScPPyeIXN/mDJIfGXvcMqCgYKekoQw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.12.tgz",
      "integrity": "sha512-rm0YWsqUSRrjncSXGA7Zv78Nbnw4XL6/dzr20cyrQf7ZmRcsovpcRBdhD43Nuk3y7XIoW2OxMVvwuRvk9XdASg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.12.tgz",
      "integrity": "sha512-3wGSCDyuTHQUzt0nV7bocDy72r2lI33QL3gkDNGkod22EsYl04sMf0qLb8luNKTOmgF/eDEDP5BFNwoBKH441w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.12.tgz",
      "integrity": "sha512-rMmLrur64A7+DKlnSuwqUdRKyd3UE7oPJZmnljqEptesKM8wx9J8gx5u0+9Pq0fQQW8vqeKebwNXdfOyP+8Bsg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.12.tgz",
      "integrity": "sha512-HkqnmmBoCbCwxUKKNPBixiWDGCpQGVsrQfJoVGYLPT41XWF8lHuE5N6WhVia2n4o5QK5M4tYr21827fNhi4byQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.12.tgz",
      "integrity": "sha512-alJC0uCZpTFrSL0CCDjcgleBXPnCrEAhTBILpeAp7M/OFgoqtAetfBzX0xM00MUsVVPpVjlPuMbREqnZCXaTnA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@hookform/resolvers": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-3.10.0.tgz",
      "integrity": "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==",
      "license": "MIT",
      "peerDependencies": {
        "react-hook-form": "^7.0.0"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.57.1.tgz",
      "integrity": "sha512-A6ehUVSiSaaliTxai040ZpZ2zTevHYbvu/lDoeAteHI8QnaosIzm4qwtezfRg1jOYaUmnzLX1AOD6Z+UJjtifg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.57.1.tgz",
      "integrity": "sha512-dQaAddCY9YgkFHZcFNS/606Exo8vcLHwArFZ7vxXq4rigo2bb494/xKMMwRRQW6ug7Js6yXmBZhSBRuBvCCQ3w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.57.1.tgz",
      "integrity": "sha512-crNPrwJOrRxagUYeMn/DZwqN88SDmwaJ8Cvi/TN1HnWBU7GwknckyosC2gd0IqYRsHDEnXf328o9/HC6OkPgOg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.57.1.tgz",
      "integrity": "sha512-Ji8g8ChVbKrhFtig5QBV7iMaJrGtpHelkB3lsaKzadFBe58gmjfGXAOfI5FV0lYMH8wiqsxKQ1C9B0YTRXVy4w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.57.1.tgz",
      "integrity": "sha512-R+/WwhsjmwodAcz65guCGFRkMb4gKWTcIeLy60JJQbXrJ97BOXHxnkPFrP+YwFlaS0m+uWJTstrUA9o+UchFug==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.57.1.tgz",
      "integrity": "sha512-IEQTCHeiTOnAUC3IDQdzRAGj3jOAYNr9kBguI7MQAAZK3caezRrg0GxAb6Hchg4lxdZEI5Oq3iov/w/hnFWY9Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.57.1.tgz",
      "integrity": "sha512-F8sWbhZ7tyuEfsmOxwc2giKDQzN3+kuBLPwwZGyVkLlKGdV1nvnNwYD0fKQ8+XS6hp9nY7B+ZeK01EBUE7aHaw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.57.1.tgz",
      "integrity": "sha512-rGfNUfn0GIeXtBP1wL5MnzSj98+PZe/AXaGBCRmT0ts80lU5CATYGxXukeTX39XBKsxzFpEeK+Mrp9faXOlmrw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.57.1.tgz",
      "integrity": "sha512-MMtej3YHWeg/0klK2Qodf3yrNzz6CGjo2UntLvk2RSPlhzgLvYEB3frRvbEF2wRKh1Z2fDIg9KRPe1fawv7C+g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.57.1.tgz",
      "integrity": "sha512-1a/qhaaOXhqXGpMFMET9VqwZakkljWHLmZOX48R0I/YLbhdxr1m4gtG1Hq7++VhVUmf+L3sTAf9op4JlhQ5u1Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.57.1.tgz",
      "integrity": "sha512-QWO6RQTZ/cqYtJMtxhkRkidoNGXc7ERPbZN7dVW5SdURuLeVU7lwKMpo18XdcmpWYd0qsP1bwKPf7DNSUinhvA==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.57.1.tgz",
      "integrity": "sha512-xpObYIf+8gprgWaPP32xiN5RVTi/s5FCR+XMXSKmhfoJjrpRAjCuuqQXyxUa/eJTdAE6eJ+KDKaoEqjZQxh3Gw==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.57.1.tgz",
      "integrity": "sha512-4BrCgrpZo4hvzMDKRqEaW1zeecScDCR+2nZ86ATLhAoJ5FQ+lbHVD3ttKe74/c7tNT9c6F2viwB3ufwp01Oh2w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.57.1.tgz",
      "integrity": "sha512-NOlUuzesGauESAyEYFSe3QTUguL+lvrN1HtwEEsU2rOwdUDeTMJdO5dUYl/2hKf9jWydJrO9OL/XSSf65R5+Xw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.57.1.tgz",
      "integrity": "sha512-ptA88htVp0AwUUqhVghwDIKlvJMD/fmL/wrQj99PRHFRAG6Z5nbWoWG4o81Nt9FT+IuqUQi+L31ZKAFeJ5Is+A==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.57.1.tgz",
      "integrity": "sha512-S51t7aMMTNdmAMPpBg7OOsTdn4tySRQvklmL3RpDRyknk87+Sp3xaumlatU+ppQ+5raY7sSTcC2beGgvhENfuw==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.57.1.tgz",
      "integrity": "sha512-Bl00OFnVFkL82FHbEqy3k5CUCKH6OEJL54KCyx2oqsmZnFTR8IoNqBF+mjQVcRCT5sB6yOvK8A37LNm/kPJiZg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.57.1.tgz",
      "integrity": "sha512-ABca4ceT4N+Tv/GtotnWAeXZUZuM/9AQyCyKYyKnpk4yoA7QIAuBt6Hkgpw8kActYlew2mvckXkvx0FfoInnLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.57.1.tgz",
      "integrity": "sha512-HFps0JeGtuOR2convgRRkHCekD7j+gdAuXM+/i6kGzQtFhlCtQkpwtNzkNj6QhCDp7DRJ7+qC/1Vg2jt5iSOFw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.57.1.tgz",
      "integrity": "sha512-H+hXEv9gdVQuDTgnqD+SQffoWoc0Of59AStSzTEj/feWTBAnSfSD3+Dql1ZruJQxmykT/JVY0dE8Ka7z0DH1hw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.57.1.tgz",
      "integrity": "sha512-4wYoDpNg6o/oPximyc/NG+mYUejZrCU2q+2w6YZqrAs2UcNUChIZXjtafAiiZSUc7On8v5NyNj34Kzj/Ltk6dQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.57.1.tgz",
      "integrity": "sha512-O54mtsV/6LW3P8qdTcamQmuC990HDfR71lo44oZMZlXU4tzLrbvTii87Ni9opq60ds0YzuAlEr/GNwuNluZyMQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.57.1.tgz",
      "integrity": "sha512-P3dLS+IerxCT/7D2q2FYcRdWRl22dNbrbBEtxdWhXrfIMPP9lQhb5h4Du04mdl5Woq05jVCDPCMF7Ub0NAjIew==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.57.1.tgz",
      "integrity": "sha512-VMBH2eOOaKGtIJYleXsi2B8CPVADrh+TyNxJ4mWPnKfLB/DBUmzW+5m1xUrcwWoMfSLagIRpjUFeW5CO5hyciQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.57.1.tgz",
      "integrity": "sha512-mxRFDdHIWRxg3UfIIAwCm6NzvxG0jDX/wBN6KsQFTvKFqqg9vTrWUE68qEjHt19A5wwx5X5aUi2zuZT7YR0jrA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@sentry-internal/browser-utils": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry-internal/browser-utils/-/browser-utils-8.55.0.tgz",
      "integrity": "sha512-ROgqtQfpH/82AQIpESPqPQe0UyWywKJsmVIqi3c5Fh+zkds5LUxnssTj3yNd1x+kxaPDVB023jAP+3ibNgeNDw==",
      "license": "MIT",
      "dependencies": {
        "@sentry/core": "8.55.0"
      },
      "engines": {
        "node": ">=14.18"
      }
    },
    "node_modules/@sentry-internal/feedback": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry-internal/feedback/-/feedback-8.55.0.tgz",
      "integrity": "sha512-cP3BD/Q6pquVQ+YL+rwCnorKuTXiS9KXW8HNKu4nmmBAyf7urjs+F6Hr1k9MXP5yQ8W3yK7jRWd09Yu6DHWOiw==",
      "license": "MIT",
      "dependencies": {
        "@sentry/core": "8.55.0"
      },
      "engines": {
        "node": ">=14.18"
      }
    },
    "node_modules/@sentry-internal/replay": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry-internal/replay/-/replay-8.55.0.tgz",
      "integrity": "sha512-roCDEGkORwolxBn8xAKedybY+Jlefq3xYmgN2fr3BTnsXjSYOPC7D1/mYqINBat99nDtvgFvNfRcZPiwwZ1hSw==",
      "license": "MIT",
      "dependencies": {
        "@sentry-internal/browser-utils": "8.55.0",
        "@sentry/core": "8.55.0"
      },
      "engines": {
        "node": ">=14.18"
      }
    },
    "node_modules/@sentry-internal/replay-canvas": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry-internal/replay-canvas/-/replay-canvas-8.55.0.tgz",
      "integrity": "sha512-nIkfgRWk1091zHdu4NbocQsxZF1rv1f7bbp3tTIlZYbrH62XVZosx5iHAuZG0Zc48AETLE7K4AX9VGjvQj8i9w==",
      "license": "MIT",
      "dependencies": {
        "@sentry-internal/replay": "8.55.0",
        "@sentry/core": "8.55.0"
      },
      "engines": {
        "node": ">=14.18"
      }
    },
    "node_modules/@sentry/browser": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry/browser/-/browser-8.55.0.tgz",
      "integrity": "sha512-1A31mCEWCjaMxJt6qGUK+aDnLDcK6AwLAZnqpSchNysGni1pSn1RWSmk9TBF8qyTds5FH8B31H480uxMPUJ7Cw==",
      "license": "MIT",
      "dependencies": {
        "@sentry-internal/browser-utils": "8.55.0",
        "@sentry-internal/feedback": "8.55.0",
        "@sentry-internal/replay": "8.55.0",
        "@sentry-internal/replay-canvas": "8.55.0",
        "@sentry/core": "8.55.0"
      },
      "engines": {
        "node": ">=14.18"
      }
    },
    "node_modules/@sentry/core": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry/core/-/core-8.55.0.tgz",
      "integrity": "sha512-6g7jpbefjHYs821Z+EBJ8r4Z7LT5h80YSWRJaylGS4nW5W5Z2KXzpdnyFarv37O7QjauzVC2E+PABmpkw5/JGA==",
      "license": "MIT",
      "engines": {
        "node": ">=14.18"
      }
    },
    "node_modules/@sentry/react": {
      "version": "8.55.0",
      "resolved": "https://registry.npmjs.org/@sentry/react/-/react-8.55.0.tgz",
      "integrity": "sha512-/qNBvFLpvSa/Rmia0jpKfJdy16d4YZaAnH/TuKLAtm0BWlsPQzbXCU4h8C5Hsst0Do0zG613MEtEmWpWrVOqWA==",
      "license": "MIT",
      "dependencies": {
        "@sentry/browser": "8.55.0",
        "@sentry/core": "8.55.0",
        "hoist-non-react-statics": "^3.3.2"
      },
      "engines": {
        "node": ">=14.18"
      },
      "peerDependencies": {
        "react": "^16.14.0 || 17.x || 18.x || 19.x"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "22.19.10",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.19.10.tgz",
      "integrity": "sha512-tF5VOugLS/EuDlTBijk0MqABfP8UxgYazTLo3uIn3b4yJgg26QRbVYJYsDtHrjdDUIRfP70+VfhTTc+CE1yskw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.15",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/@types/react": {
      "version": "18.3.28",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.28.tgz",
      "integrity": "sha512-z9VXpC7MWrhfWipitjNdgCauoMLRdIILQsAEV+ZesIzBq/oUlxk0m3ApZuMFCXdnS4U7KrI+l3WRUEGQ8K1QKw==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.7",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.7.tgz",
      "integrity": "sha512-MEe3UeoENYVFXzoXEWsvcpg6ZvlrFNlOQ7EOsvhI3CfAXwzPfO8Qwuxd40nepsYKqyyVQnTdEfv68q91yLcKrQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^18.0.0"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.4.24",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.24.tgz",
      "integrity": "sha512-uHZg7N9ULTVbutaIsDRoUkoS8/h3bdsmVJYZ5l3wv8Cp/6UIIoRDm90hZ+BwxUj/hGBEzLxdHNSKuFpn8WOyZw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.1",
        "caniuse-lite": "^1.0.30001766",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.9.19",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.9.19.tgz",
      "integrity": "sha512-ipDqC8FrAl/76p2SSWKSI+H9tFwm7vYqXQrItCuiVPt26Km0jS+NzSsBWAaBusvSbQcfJG+JitdMm+wZAgTYqg==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.js"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.1",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.1.tgz",
      "integrity": "sha512-ZC5Bd0LgJXgwGqUknZY/vkUQ04r8NXnJZ3yYi4vDmSiZmC/pdSN0NbNRPxZpbtO4uAfDUAFffO8IZoM3Gj8IkA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.9.0",
        "caniuse-lite": "^1.0.30001759",
        "electron-to-chromium": "^1.5.263",
        "node-releases": "^2.0.27",
        "update-browserslist-db": "^1.2.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001769",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001769.tgz",
      "integrity": "sha512-BCfFL1sHijQlBGWBMuJyhZUhzo7wer5sVj9hqekB/7xn0Ypy+pER/edCYQm4exbXj4WiySGp40P8UuTh6w1srg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/chalk/node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/concurrently": {
      "version": "9.2.1",
      "resolved": "https://registry.npmjs.org/concurrently/-/concurrently-9.2.1.tgz",
      "integrity": "sha512-fsfrO0MxV64Znoy8/l1vVIjjHa29SZyyqPgQBwhiDcaW8wJc2W3XWVOGx4M3oJBnv/zdUZIIp1gDeS98GzP8Ng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chalk": "4.1.2",
        "rxjs": "7.8.2",
        "shell-quote": "1.8.3",
        "supports-color": "8.1.1",
        "tree-kill": "1.2.2",
        "yargs": "17.7.2"
      },
      "bin": {
        "conc": "dist/bin/concurrently.js",
        "concurrently": "dist/bin/concurrently.js"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/open-cli-tools/concurrently?sponsor=1"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.286",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.286.tgz",
      "integrity": "sha512-9tfDXhJ4RKFNerfjdCcZfufu49vg620741MNs26a9+bhLThdB+plgMeou98CAaHu/WATj2iHOOHTp1hWtABj2A==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/esbuild": {
      "version": "0.25.12",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.12.tgz",
      "integrity": "sha512-bbPBYYrtZbkt6Os6FiTLCTFxvq4tt3JKall1vRwshA3fdVztsLAatFaZobhkBC8/BrPetoa0oksYoKXoG4ryJg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.25.12",
        "@esbuild/android-arm": "0.25.12",
        "@esbuild/android-arm64": "0.25.12",
        "@esbuild/android-x64": "0.25.12",
        "@esbuild/darwin-arm64": "0.25.12",
        "@esbuild/darwin-x64": "0.25.12",
        "@esbuild/freebsd-arm64": "0.25.12",
        "@esbuild/freebsd-x64": "0.25.12",
        "@esbuild/linux-arm": "0.25.12",
        "@esbuild/linux-arm64": "0.25.12",
        "@esbuild/linux-ia32": "0.25.12",
        "@esbuild/linux-loong64": "0.25.12",
        "@esbuild/linux-mips64el": "0.25.12",
        "@esbuild/linux-ppc64": "0.25.12",
        "@esbuild/linux-riscv64": "0.25.12",
        "@esbuild/linux-s390x": "0.25.12",
        "@esbuild/linux-x64": "0.25.12",
        "@esbuild/netbsd-arm64": "0.25.12",
        "@esbuild/netbsd-x64": "0.25.12",
        "@esbuild/openbsd-arm64": "0.25.12",
        "@esbuild/openbsd-x64": "0.25.12",
        "@esbuild/openharmony-arm64": "0.25.12",
        "@esbuild/sunos-x64": "0.25.12",
        "@esbuild/win32-arm64": "0.25.12",
        "@esbuild/win32-ia32": "0.25.12",
        "@esbuild/win32-x64": "0.25.12"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
      "integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/hoist-non-react-statics": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/hoist-non-react-statics/-/hoist-non-react-statics-3.3.2.tgz",
      "integrity": "sha512-/gGivxi8JPKWNm/W0jSmzcMPpfpPLc3dY/6GxhX2hQ9iGj3aDfklV4ET7NjKpSinLpJ5vafa9iiGIEZg10SfBw==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "react-is": "^16.7.0"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.469.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.469.0.tgz",
      "integrity": "sha512-28vvUnnKQ/dBwiCQtwJw7QauYnE7yd2Cyp4tTTJpvglX4EMpbflcdBgrgToX2j71B3YvugK/NH3BGUk+E/p/Fw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.27",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.27.tgz",
      "integrity": "sha512-nmh3lCkYZ3grZvqcCH+fjmQ7X+H0OeZgP40OierEaAptX4XofMh5kwNbWh7lBduUzCcV/8kZ+NDLCwm2iorIlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.6",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.6.tgz",
      "integrity": "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.71.1",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.71.1.tgz",
      "integrity": "sha512-9SUJKCGKo8HUSsCO+y0CtqkqI5nNuaDqTxyqPsZPqIwudpj4rCrAz/jZV+jn57bx5gtZKOh3neQu94DXMc+w5w==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "license": "MIT"
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.11",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.11.tgz",
      "integrity": "sha512-RfqAvLnMl313r7c9oclB1HhUEAezcpLjz95wFH4LVuhk9JF/r22qmVP9AMmOU4vMX7Q8pN8jwNg/CSpdFnMjTQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.57.1",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.57.1.tgz",
      "integrity": "sha512-oQL6lgK3e2QZeQ7gcgIkS2YZPg5slw37hYufJ3edKlfQSGGm8ICoxswK15ntSzF/a8+h7ekRy7k7oWc3BQ7y8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.57.1",
        "@rollup/rollup-android-arm64": "4.57.1",
        "@rollup/rollup-darwin-arm64": "4.57.1",
        "@rollup/rollup-darwin-x64": "4.57.1",
        "@rollup/rollup-freebsd-arm64": "4.57.1",
        "@rollup/rollup-freebsd-x64": "4.57.1",
        "@rollup/rollup-linux-arm-gnueabihf": "4.57.1",
        "@rollup/rollup-linux-arm-musleabihf": "4.57.1",
        "@rollup/rollup-linux-arm64-gnu": "4.57.1",
        "@rollup/rollup-linux-arm64-musl": "4.57.1",
        "@rollup/rollup-linux-loong64-gnu": "4.57.1",
        "@rollup/rollup-linux-loong64-musl": "4.57.1",
        "@rollup/rollup-linux-ppc64-gnu": "4.57.1",
        "@rollup/rollup-linux-ppc64-musl": "4.57.1",
        "@rollup/rollup-linux-riscv64-gnu": "4.57.1",
        "@rollup/rollup-linux-riscv64-musl": "4.57.1",
        "@rollup/rollup-linux-s390x-gnu": "4.57.1",
        "@rollup/rollup-linux-x64-gnu": "4.57.1",
        "@rollup/rollup-linux-x64-musl": "4.57.1",
        "@rollup/rollup-openbsd-x64": "4.57.1",
        "@rollup/rollup-openharmony-arm64": "4.57.1",
        "@rollup/rollup-win32-arm64-msvc": "4.57.1",
        "@rollup/rollup-win32-ia32-msvc": "4.57.1",
        "@rollup/rollup-win32-x64-gnu": "4.57.1",
        "@rollup/rollup-win32-x64-msvc": "4.57.1",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/rxjs": {
      "version": "7.8.2",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-7.8.2.tgz",
      "integrity": "sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/shell-quote": {
      "version": "1.8.3",
      "resolved": "https://registry.npmjs.org/shell-quote/-/shell-quote-1.8.3.tgz",
      "integrity": "sha512-ObmnIF4hXNg1BqhnHmgbDETF8dLPCggZWBjkQfhZpbszZnYur5DUljTcCHii5LC3J5E0yeO/1LIMyH+UvHQgyw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-color": {
      "version": "8.1.1",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-8.1.1.tgz",
      "integrity": "sha512-MpUEN2OodtUzxvKQl72cUF7RQ5EiHsGvSsVG0ia9c5RbWGL2CI4C7EpPS8UTBIplnlzZiNuV56w+FuNxy3ty2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/supports-color?sponsor=1"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.6.1.tgz",
      "integrity": "sha512-Oo6tHdpZsGpkKG88HJ8RR1rg/RdnEkQEfMoEk2x1XRI3F1AxeU+ijRXpiVUF4UbLfcxxRGw6TbUINKYdWVsQTQ==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/tree-kill": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.2.tgz",
      "integrity": "sha512-L0Orpi8qGpRG//Nd+H90vFB+3iHnue1zSSGmNOOCh1GLJ7rUKVwV2HvijphGQS2UmhUZewS9VgvxYIdgr+fG1A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "tree-kill": "cli.js"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "dev": true,
      "license": "0BSD"
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "6.4.1",
      "resolved": "https://registry.npmjs.org/vite/-/vite-6.4.1.tgz",
      "integrity": "sha512-+Oxm7q9hDoLMyJOYfUYBuHQo+dkAloi33apOPP56pzj+vsdJDzr+j1NISE5pyaAuKL4A3UD34qd0lx5+kfKp2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.25.0",
        "fdir": "^6.4.4",
        "picomatch": "^4.0.2",
        "postcss": "^8.5.3",
        "rollup": "^4.34.9",
        "tinyglobby": "^0.2.13"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "jiti": ">=1.21.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zustand": {
      "version": "5.0.11",
      "resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.11.tgz",
      "integrity": "sha512-fdZY+dk7zn/vbWNCYmzZULHRrss0jx5pPFiOuMZ/5HJN6Yv3u+1Wswy/4MpZEkEGhtNH+pwxZB8OKgUBPzYAGg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.20.0"
      },
      "peerDependencies": {
        "@types/react": ">=18.0.0",
        "immer": ">=9.0.6",
        "react": ">=18.0.0",
        "use-sync-external-store": ">=1.2.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "immer": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "use-sync-external-store": {
          "optional": true
        }
      }
    }
  }
}



===== FILE: C:\git\apl\med\php_backend\.gitignore =====

# Ignore secrets
config_access.php

# Logs
error_log
*.log

# Dependencies (РЅР° СЃР»СѓС‡Р°Р№ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ Composer РёР»Рё РѕС€РёР±РѕС‡РЅРѕРіРѕ npm install)
vendor/
node_modules/



===== FILE: C:\git\apl\med\php_backend\.htaccess =====


# Р—Р°РїСЂРµС‚ РґРѕСЃС‚СѓРїР° Рє РєРѕРЅС„РёРіР°Рј СЃ РїР°СЂРѕР»СЏРјРё
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>
<Files "config_access.php">
    Order Allow,Deny
    Deny from all
</Files>

# Р”РµР»Р°РµРј Р”Р°С€Р±РѕСЂРґ РіР»Р°РІРЅРѕР№ СЃС‚СЂР°РЅРёС†РµР№ РїСЂРё РІС…РѕРґРµ РІ РїР°РїРєСѓ
DirectoryIndex dev_dashboard.php

# РќР°СЃС‚СЂРѕР№РєР° CORS (С‡С‚РѕР±С‹ React РјРѕРі РґРµР»Р°С‚СЊ Р·Р°РїСЂРѕСЃС‹)
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
</IfModule>

# Р’РєР»СЋС‡РµРЅРёРµ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ РѕС€РёР±РѕРє РґР»СЏ РѕС‚Р»Р°РґРєРё
<IfModule mod_php7.c>
    php_flag display_errors On
    php_value max_execution_time 60
</IfModule>



===== FILE: C:\git\apl\med\php_backend\api.php =====

<?php
// API Gateway Entry Point v2.7 (JSON Error Safety)
// Р•РґРёРЅСЃС‚РІРµРЅРЅР°СЏ С‚РѕС‡РєР° РІС…РѕРґР° РґР»СЏ РІСЃРµС… Р·Р°РїСЂРѕСЃРѕРІ РІРёРґР¶РµС‚Р°.

define('API_START_TIME', microtime(true));
define('API_VERSION', '2.7.0');

// 1. Error Handling Setup (CRITICAL FIX)
// Р’С‹РєР»СЋС‡Р°РµРј СЃС‚Р°РЅРґР°СЂС‚РЅС‹Р№ РІС‹РІРѕРґ РѕС€РёР±РѕРє РІ РїРѕС‚РѕРє, С‡С‚РѕР±С‹ РЅРµ Р»РѕРјР°С‚СЊ JSON
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

// РџРµСЂРµС…РІР°С‚ С„Р°С‚Р°Р»СЊРЅС‹С… РѕС€РёР±РѕРє (Interface Mismatch, Memory Limit Рё С‚.Рґ.)
register_shutdown_function(function() {
    $error = error_get_last();
    // Р•СЃР»Рё РїСЂРѕРёР·РѕС€Р»Р° С„Р°С‚Р°Р»СЊРЅР°СЏ РѕС€РёР±РєР°
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        // РћС‡РёС‰Р°РµРј Р±СѓС„РµСЂ РІС‹РІРѕРґР° (СѓРґР°Р»СЏРµРј "Fatal error...", РµСЃР»Рё РѕРЅ СѓСЃРїРµР» Р·Р°РїРёСЃР°С‚СЊСЃСЏ)
        if (ob_get_length()) ob_clean();
        
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'error' => 'Critical Server Error: ' . $error['message'],
            'file' => basename($error['file']),
            'line' => $error['line']
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
});

// РћР±С‹С‡РЅС‹Р№ РїРµСЂРµС…РІР°С‚С‡РёРє РёСЃРєР»СЋС‡РµРЅРёР№
set_exception_handler(function ($e) {
    if (ob_get_length()) ob_clean();
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'file' => basename($e->getFile()),
        'line' => $e->getLine()
    ], JSON_UNESCAPED_UNICODE);
    exit;
});

// 2. CORS & Headers
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Key, X-Session-Id');
header('Content-Type: application/json; charset=utf-8');
header('X-Api-Version: ' . API_VERSION);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 3. Autoloading
require_once __DIR__ . '/core/Router.php';
require_once __DIR__ . '/core/Logger.php';
require_once __DIR__ . '/core/Cache.php';
require_once __DIR__ . '/core/RateLimiter.php';
require_once __DIR__ . '/interfaces/MisInterface.php';

// Drivers
require_once __DIR__ . '/drivers/QmsDriver.php';
require_once __DIR__ . '/drivers/OneCDriver.php'; 

// Controllers
require_once __DIR__ . '/controllers/BookingController.php';
require_once __DIR__ . '/controllers/SearchController.php';

try {
    // 4. Config
    $config = require __DIR__ . '/config.php';
    
    // 5. Infrastructure
    $logger = new Logger();
    $cache = new Cache($config['cache'] ?? ['enabled' => true, 'path' => __DIR__ . '/cache']);
    $limiter = new RateLimiter($config['rate_limit'] ?? ['enabled' => true]); 

    // Rate Check
    if (!$limiter->check($_SERVER['REMOTE_ADDR'])) {
        throw new Exception('Too many requests', 429);
    }

    // 6. Driver Init
    $driverType = $config['features']['mis_driver'] ?? 'qms';
    $gateway = null;
    
    // Р’РђР–РќРћ: РћР±Р° РґСЂР°Р№РІРµСЂР° РґРѕР»Р¶РЅС‹ Р±С‹С‚СЊ РєРѕСЂСЂРµРєС‚РЅС‹РјРё, РґР°Р¶Рµ РµСЃР»Рё РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ РѕРґРёРЅ
    if ($driverType === '1c') {
        $gateway = new OneCDriver($config);
    } else {
        $gateway = new QmsDriver($config);
    }

    $getDb = function() use ($config) {
        return $config['helpers']['get_db_conn']($config);
    };

    // 7. Controller
    $bookingController = new BookingController(
        $gateway, 
        $logger, 
        $cache, 
        $getDb, 
        $config['cms_db']['prefix'] ?? 'wp_', 
        $config['recaptcha'] ?? [],
        $config['topology'] ?? [],
        $config['qms'] ?? [] 
    );
    
    $searchController = new SearchController($gateway, $logger, $cache);

    // 8. Routing
    $router = new Router();
    $action = $_GET['action'] ?? '';

    $router->register('get_config', function() use ($config) {
        return [
            'success' => true, 
            'data' => [
                'theme' => $config['theme'],
                'topology' => $config['topology'],
                'behavior' => $config['behavior'],
                'compliance' => $config['compliance'],
                'features' => [
                    'search_suggestions' => $config['theme']['suggestions'] ?? [] 
                ]
            ]
        ];
    });

    $router->register('get_structure', [$bookingController, 'getStructure']);
    $router->register('get_doctors', [$bookingController, 'getDoctors']);
    $router->register('get_branches', [$bookingController, 'getBranches']); 
    $router->register('get_slots', [$bookingController, 'getSlots']);
    $router->register('get_calendar', [$bookingController, 'getCalendar']);
    $router->register('book', [$bookingController, 'book']);
    $router->register('join_waitlist', [$bookingController, 'joinWaitlist']);
    $router->register('smart_search', [$searchController, 'handleSearch']); 
    $router->register('admin_check_auth', [$searchController, 'checkAdminAuth']);
    $router->register('admin_clear_cache', [$searchController, 'clearCache']); 

    if (empty($action)) throw new Exception("No action specified");

    // 9. Dispatch & Output
    ob_start(); // Р‘СѓС„РµСЂРёР·Р°С†РёСЏ РІС‹РІРѕРґР° РєРѕРЅС‚СЂРѕР»Р»РµСЂР°
    $response = $router->dispatch($action);
    $output = ob_get_clean();

    // Р•СЃР»Рё РєРѕРЅС‚СЂРѕР»Р»РµСЂ РІРµСЂРЅСѓР» РјР°СЃСЃРёРІ, РѕР±РѕСЂР°С‡РёРІР°РµРј РµРіРѕ
    // Р•СЃР»Рё РєРѕРЅС‚СЂРѕР»Р»РµСЂ СЃРґРµР»Р°Р» echo (РїР»РѕС…Рѕ, РЅРѕ Р±С‹РІР°РµС‚), РѕРЅРѕ РІ $output
    
    if (is_array($response) && !isset($response['success'])) {
        $finalData = ['success' => true, 'data' => $response];
    } elseif (is_array($response)) {
        $finalData = $response;
    } else {
        // Р•СЃР»Рё РєРѕРЅС‚СЂРѕР»Р»РµСЂ РЅРёС‡РµРіРѕ РЅРµ РІРµСЂРЅСѓР», РЅРѕ Р±С‹Р» РІС‹РІРѕРґ
        if ($output) {
             // РџС‹С‚Р°РµРјСЃСЏ РїРѕРЅСЏС‚СЊ, СЌС‚Рѕ JSON РёР»Рё РЅРµС‚
             $decoded = json_decode($output, true);
             $finalData = $decoded ? $decoded : ['success' => true, 'raw' => $output];
        } else {
             $finalData = ['success' => true];
        }
    }

    $runtime = round(microtime(true) - API_START_TIME, 4);
    header("X-Runtime: $runtime");
    echo json_encode($finalData, JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false, 
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}


===== FILE: C:\git\apl\med\php_backend\check_setup.php =====

<?php
// Script to check server environment before widget launch
ini_set('display_errors', 1);
error_reporting(E_ALL);

$checks = [];

// 1. PHP Version
$checks[] = [
    'name' => 'PHP Version',
    'status' => version_compare(PHP_VERSION, '7.4.0', '>='),
    'msg' => 'Current: ' . PHP_VERSION . '. Required: 7.4+'
];

// 2. Extensions
$required_ext = ['curl', 'json', 'mbstring', 'pdo', 'pdo_mysql'];
foreach ($required_ext as $ext) {
    $checks[] = [
        'name' => "Extension: $ext",
        'status' => extension_loaded($ext),
        'msg' => extension_loaded($ext) ? 'Installed' : 'Missing!'
    ];
}

// 3. Write Permissions
$dirs = ['cache', 'logs'];
foreach ($dirs as $dir) {
    $path = __DIR__ . '/' . $dir;
    if (!is_dir($path)) @mkdir($path, 0755, true);
    
    $is_writable = is_writable($path);
    $checks[] = [
        'name' => "Directory Writable: /$dir",
        'status' => $is_writable,
        'msg' => $is_writable ? 'OK' : 'Run: chmod 775 ' . $dir
    ];
}

// 4. Config Existence
$config_path = __DIR__ . '/config_access.php';
$checks[] = [
    'name' => 'Config File (config_access.php)',
    'status' => file_exists($config_path),
    'msg' => file_exists($config_path) ? 'Found' : 'Rename config_access.example.php to config_access.php!'
];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Server Diagnostics</title>
    <style>
        body { font-family: system-ui, sans-serif; padding: 20px; background: #f0f2f5; }
        .card { background: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 10px 0; }
        .status { font-weight: bold; }
        .ok { color: green; }
        .fail { color: red; }
    </style>
</head>
<body>
    <div class="card">
        <h2>рџљ‘ Medical Widget Diagnostics</h2>
        <?php foreach($checks as $c): ?>
            <div class="item">
                <span><?= htmlspecialchars($c['name']) ?></span>
                <div style="text-align:right">
                    <span class="status <?= $c['status'] ? 'ok' : 'fail' ?>">
                        <?= $c['status'] ? 'OK' : 'FAIL' ?>
                    </span>
                    <div style="font-size: 12px; color: #666"><?= htmlspecialchars($c['msg']) ?></div>
                </div>
            </div>
        <?php endforeach; ?>
        
        <div style="margin-top: 20px; text-align: center;">
            <p>If all green, delete this file and open <b>api.php</b></p>
        </div>
    </div>
</body>
</html>



===== FILE: C:\git\apl\med\php_backend\config.php =====


<?php
/**
 * MASTER CONFIGURATION LOADER
 * 
 * Р’РќРРњРђРќРР•: РќРµ СЂРµРґР°РєС‚РёСЂСѓР№С‚Рµ СЌС‚РѕС‚ С„Р°Р№Р» РЅР°РїСЂСЏРјСѓСЋ РґР»СЏ РёР·РјРµРЅРµРЅРёСЏ РЅР°СЃС‚СЂРѕРµРє!
 * РќР°СЃС‚СЂРѕР№РєРё СЂР°Р·Р±РёС‚С‹ РЅР° РјРѕРґСѓР»Рё РІ РїР°РїРєРµ /config_parts/.
 * 
 * РЎС‚СЂСѓРєС‚СѓСЂР°:
 * - 01_infrastructure.php (РЎРµРєСЂРµС‚С‹, Р‘Р”, API)
 * - 02_topology.php (Р“РѕСЂРѕРґР°, Р’РµСЂС‚РёРєР°Р»Рё)
 * - 03_logic.php (РџСЂР°РІРёР»Р° Р±РёР·РЅРµСЃР°)
 * - 04_theme.php (Р’РЅРµС€РЅРёР№ РІРёРґ)
 * - 99_helpers.php (Р¤СѓРЅРєС†РёРё)
 */

$partsDir = __DIR__ . '/config_parts';
$masterConfig = [];

// 1. РџСЂРѕРІРµСЂСЏРµРј РЅР°Р»РёС‡РёРµ РїР°РїРєРё С‡Р°СЃС‚РµР№
if (!is_dir($partsDir)) {
    die("Critical Error: Configuration parts directory not found.");
}

// 2. РЎРєР°РЅРёСЂСѓРµРј Рё СЃРѕСЂС‚РёСЂСѓРµРј С„Р°Р№Р»С‹
$files = glob($partsDir . '/*.php');
sort($files); // Р“Р°СЂР°РЅС‚РёСЂСѓРµС‚ РїРѕСЂСЏРґРѕРє 01, 02, 03...

// 3. РЎРѕР±РёСЂР°РµРј РєРѕРЅС„РёРі (Merge Strategy)
foreach ($files as $file) {
    $part = require $file;
    if (is_array($part)) {
        // Р РµРєСѓСЂСЃРёРІРЅРѕРµ СЃР»РёСЏРЅРёРµ РјР°СЃСЃРёРІРѕРІ, С‡С‚РѕР±С‹ РїРѕСЃР»РµРґСѓСЋС‰РёРµ С„Р°Р№Р»С‹ РјРѕРіР»Рё РґРѕРїРѕР»РЅСЏС‚СЊ РїСЂРµРґС‹РґСѓС‰РёРµ
        $masterConfig = array_replace_recursive($masterConfig, $part);
    }
}

// 4. Р’РѕР·РІСЂР°С‰Р°РµРј РµРґРёРЅС‹Р№ РјР°СЃСЃРёРІ
return $masterConfig;



===== FILE: C:\git\apl\med\php_backend\config_access.example.php =====

<?php
// config_access.php - SENSITIVE DATA
// Р’РќРРњРђРќРР•: РџРµСЂРµРёРјРµРЅСѓР№С‚Рµ СЌС‚РѕС‚ С„Р°Р№Р» РІ config_access.php РЅР° СЃРµСЂРІРµСЂРµ.

return [
    // 0. Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ РђРґРјРёРЅРєРё
    'admin_secret' => 'CHANGE_THIS_TO_COMPLEX_PASSWORD_123',

    // 1. Р”РѕСЃС‚СѓРїС‹ Рє Р±Р°Р·Рµ РґР°РЅРЅС‹С… СЃР°Р№С‚Р° (WordPress/MODX)
    'cms_db' => [
        'host' => 'localhost', 
        'dbname' => 'YOUR_DB_NAME',
        'user' => 'YOUR_DB_USER',
        'password' => 'YOUR_DB_PASSWORD',
        'prefix' => 'wp_', 
        'charset' => 'utf8mb4'
    ],

    // 2. РРЅС‚РµРіСЂР°С†РёСЏ СЃ РњРРЎ (qMS)
    'qms_instances' => [
        'chel_main' => [
            'name' => 'Р§РµР»СЏР±РёРЅСЃРє (РћСЃРЅРѕРІРЅР°СЏ)',
            // [UPDATED] РСЃРїРѕР»СЊР·СѓРµРј URL РёР· Р»РѕРіРѕРІ (С‚РµСЃС‚РѕРІС‹Р№ СЃС‚РµРЅРґ)
            'api_url' => 'https://back.cispb.ru/robot-dev',
            'api_token' => 'some_api_key_for_backend', // Р—РђРњР•РќРРўР• РќРђ Р Р•РђР›Р¬РќР«Р™ РљР›Р®Р§
            'city_code' => 'chel',
            'is_primary' => true
        ],
        // Р”РѕР±Р°РІСЊС‚Рµ РґСЂСѓРіРёРµ С„РёР»РёР°Р»С‹ РїРѕ Р°РЅР°Р»РѕРіРёРё...
    ],

    // 3. Р—Р°С‰РёС‚Р° Рё РђРЅР°Р»РёС‚РёРєР°
    'recaptcha' => [
        'secret_key' => 'YOUR_RECAPTCHA_SECRET',
        'site_key' => 'YOUR_RECAPTCHA_SITE_KEY_PUBLIC'
    ],
    
    'sentry_dsn' => ''
];


===== FILE: C:\git\apl\med\php_backend\config_parts\01_infrastructure.php =====


<?php
// PART 1: INFRASTRUCTURE & ACCESS
// РЎРµРєСЂРµС‚С‹ Рё РґРѕСЃС‚СѓРїС‹. РџРѕРґРіСЂСѓР¶Р°РµС‚ РґР°РЅРЅС‹Рµ РёР· config_access.php

$accessFile = __DIR__ . '/../config_access.php';
$secrets = [];

if (file_exists($accessFile)) {
    $secrets = require $accessFile;
} else {
    $secrets = [
        'cms_db' => ['host'=>'', 'dbname'=>'', 'user'=>'', 'password'=>'', 'prefix'=>'wp_'],
        'qms_instances' => [],
        'recaptcha' => []
    ];
}

return [
    // РќР°СЃС‚СЂРѕР№РєР° РёСЃС‚РѕС‡РЅРёРєР° РєРѕРЅС‚РµРЅС‚Р° (WordPress РёР»Рё Р›РѕРєР°Р»СЊРЅС‹Р№ С„Р°Р№Р»)
    'cms' => [
        'connection_type' => $secrets['cms_connection_type'] ?? 'database',
        'db' => $secrets['cms_db'],
        'api' => [
            'endpoint' => $secrets['cms_api_url'] ?? 'https://yoursite.ru/wp-json/medical-os/v1/doctors',
            'token' => $secrets['cms_api_token'] ?? '', 
            'timeout' => 5
        ],
        'json_path' => __DIR__ . '/../data/doctors_registry.json'
    ],
    
    'qms' => [
        'instances' => $secrets['qms_instances'],
        'api_common' => [
            'timeout' => 5, 
            'batch_delay_us' => 100000 
        ],
        'branches_map' => [
            'РўACdAAC' => ['name' => 'РџРѕР»РёРєР»РёРЅРёРєР° РЅР° РџРѕР±РµРґС‹', 'address' => 'СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11'],
            'РўACdAAD' => ['name' => 'Р”РµС‚СЃРєР°СЏ РїРѕР»РёРєР»РёРЅРёРєР°', 'address' => 'СѓР». 40-Р»РµС‚РёСЏ РџРѕР±РµРґС‹, 11'],
            'РўACdAAQ' => ['name' => 'Р¤РёР»РёР°Р» РЅР° Р§РёС‡РµСЂРёРЅР°', 'address' => 'СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°'],
            'РўACdAAR' => ['name' => 'РљРѕСЃРјРµС‚РѕР»РѕРіРёСЏ', 'address' => 'СѓР». Р§РёС‡РµСЂРёРЅР°, 34Р°'],
            'РўAGdAAE' => ['name' => 'Р­РљРћ РљР»РёРЅРёРєР°', 'address' => 'СѓР». Р§РёС‡РµСЂРёРЅР°, 36РІ'],
        ]
    ],

    // [SECURITY] Р—Р°С‰РёС‚Р° РѕС‚ СЃРїР°РјР° Рё РїРµСЂРµР±РѕСЂР°
    'rate_limit' => [
        'enabled' => true,
        'max_requests' => 60, // Р—Р°РїСЂРѕСЃРѕРІ РІ РјРёРЅСѓС‚Сѓ СЃ РѕРґРЅРѕРіРѕ IP
        'window_seconds' => 60,
        'storage_path' => __DIR__ . '/../cache/limits'
    ],

    // [SECURITY] Р›РѕРіРёСЂРѕРІР°РЅРёРµ Рё РїСЂРёРІР°С‚РЅРѕСЃС‚СЊ
    'logging' => [
        'enabled' => true,
        'level' => 'info', // info, error, debug
        'sensitive_keys' => [
            'phone', 'email', 'password', 'token', 'apikey', 'auth', 
            'first_name', 'last_name', 'fio', 'birthdate'
        ]
    ],

    'recaptcha' => $secrets['recaptcha'] ?? [],
    'admin_secret' => $secrets['admin_secret'] ?? null,
];



===== FILE: C:\git\apl\med\php_backend\config_parts\02_topology.php =====

<?php
// PART 2: BUSINESS TOPOLOGY

return [
    'topology' => [
        
        // 1. Р“РѕСЂРѕРґР°
        'cities' => [
            'enabled' => true,
            'items' => [
                'chel' => ['label' => 'Р§РµР»СЏР±РёРЅСЃРє', 'default' => true],
            ]
        ],

        // 2. РР·РјРµСЂРµРЅРёСЏ (Р’РєР»Р°РґРєРё Рё Р¤РёР»СЊС‚СЂС‹)
        'dimensions' => [
            // РћРўРљР›Р®Р§Р•РќРћ: РљР»РёРЅРёРєР° "РСЃС‚РѕС‡РЅРёРє" РЅРµ РёСЃРїРѕР»СЊР·СѓРµС‚ С€Р°Рі "Р’Р·СЂРѕСЃР»С‹Р№/Р РµР±РµРЅРѕРє" РІ РІРёР·Р°СЂРґРµ
            'audience' => [
                'enabled' => false, 
                'key' => 'audience',
                'label' => 'РџР°С†РёРµРЅС‚',
                'mode' => 'tabs',
                'options' => [
                    ['id' => 'adult', 'label' => 'Р’Р·СЂРѕСЃР»С‹Рµ', 'isDefault' => true],
                    ['id' => 'child', 'label' => 'Р”РµС‚Рё']
                ]
            ],
            
            'vertical' => [
                'enabled' => true, 
                'key' => 'vertical',
                'label' => 'РћС‚РґРµР»РµРЅРёРµ',
                'mode' => 'filter', 
                'options' => [
                    [
                        'id' => 'polyclinic', 
                        'label' => 'РџРѕР»РёРєР»РёРЅРёРєР°', 
                        'icon' => 'Stethoscope',
                        'isDefault' => true,
                        'rules' => []
                    ],
                    [
                        'id' => 'cosmetology', 
                        'label' => 'РљРѕСЃРјРµС‚РѕР»РѕРіРёСЏ', 
                        'icon' => 'Sparkles',
                        'rules' => [
                            'filtering' => ['require_tags' => ['vertical' => 'cosmetology']]
                        ]
                    ],
                    [
                        'id' => 'ivf', 
                        'label' => 'Р’Р Рў (Р­РљРћ)', 
                        'icon' => 'Baby', 
                        'rules' => [
                            'filtering' => ['require_tags' => ['vertical' => 'ivf']]
                        ]
                    ]
                ]
            ]
        ],

        // 3. Р¤РёР»РёР°Р»С‹
        'branches' => [
            'enabled' => true,
            'logic' => 'dynamic_aggregation',
            'cross_branch_suggestion' => true 
        ]
    ]
];


===== FILE: C:\git\apl\med\php_backend\config_parts\03_logic.php =====


<?php
// PART 3: BUSINESS LOGIC & MAPPING

return [
    'hydrator' => [
        'doctor' => [
            'identity' => 'qms_api',
            'schedule' => 'qms_api',
            'content'  => 'wp_usermeta',
            'pricing'  => 'qms_api',
        ]
    ],

    // РџР РђР’РР›Рђ РљР›РђРЎРЎРР¤РРљРђР¦РР (Mapping rules)
    // РЎРІСЏР·С‹РІР°РµРј "РіСЂСЏР·РЅС‹Рµ" СЃР»Р°РіРё РёР· WP СЃ С‡РёСЃС‚С‹РјРё С‚РµРіР°РјРё СЃРёСЃС‚РµРјС‹
    'classification' => [
        
        // 1. РђСѓРґРёС‚РѕСЂРёСЏ (Р’Р·СЂРѕСЃР»С‹Р№/Р РµР±РµРЅРѕРє)
        // Р’СЂР°С‡Р°Рј РїСЂРёСЃРІР°РёРІР°СЋС‚СЃСЏ СЌС‚Рё С‚РµРіРё Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РЅР° РѕСЃРЅРѕРІРµ РїРѕР»РµР№ feed_adultdoctor
        'audience' => [
            'type'   => 'wp_taxonomy_ancestor',
            'source' => 'directions', 
            'map'    => [
                // РЎР»Р°РіРё РєР°С‚РµРіРѕСЂРёР№, РєРѕС‚РѕСЂС‹Рµ Р¶РµСЃС‚РєРѕ Р·Р°РґР°СЋС‚ Р°СѓРґРёС‚РѕСЂРёСЋ
                'vzroslaya'             => 'adult',
                'vzroslaya-poliklinika' => 'adult',
                'detskaya'              => 'child',
                'detskaya-poliklinika'  => 'child',
                'pediatriya'            => 'child',
            ]
        ],

        // 2. Р’РµСЂС‚РёРєР°Р»Рё (РќР°РїСЂР°РІР»РµРЅРёСЏ)
        'vertical' => [
            'type'   => 'wp_taxonomy_ancestor',
            'source' => 'directions',
            'map'    => [
                // РљРѕСЃРјРµС‚РѕР»РѕРіРёСЏ Рё РµС‘ РїРѕРґРІРёРґС‹ (РёР· РґР°РјРїР°)
                'kosmetologiya_8' => 'cosmetology',
                'apparatnaya_kosmetologiya_101' => 'cosmetology',
                'guinot_uvlajnenie_545' => 'cosmetology',
                'hydrafacial_103' => 'cosmetology',
                'icoone_tehnologiya_mmas__limfodrenaj_i_omolojenie_...' => 'cosmetology',
                
                // Р’Р Рў / Р­РљРћ
                'vrt_eko_58' => 'ivf',
                'vrt_9' => 'ivf',
                
                // РЎС‚РѕРјР°С‚РѕР»РѕРіРёСЏ
                'stomatologiya_11' => 'stomatology',
                'stomatologiya_detskaya_12' => 'stomatology',
                
                // РђРЅР°Р»РёР·С‹
                'analizy' => 'diagnostics'
            ]
        ]
    ],

    'cms_map' => [
        'meta_keys' => [
            // Р’РђР–РќРћ: РСЃРїРѕР»СЊР·СѓРµРј СЂРµР°Р»СЊРЅС‹Рµ РєР»СЋС‡Рё РёР· РІР°С€РµР№ Р±Р°Р·С‹
            'qms_id'        => 'id_doctor_qms', 
            'photo'         => '_photo', // РўСѓС‚ Р»РµР¶РёС‚ ID Р°С‚С‚Р°С‡РјРµРЅС‚Р° (РґСЂР°Р№РІРµСЂ СѓРјРµРµС‚ РµРіРѕ СЂРµР·РѕР»РІРёС‚СЊ)
            'bio_short'     => 'anonce', // Р‘РµР· РїРѕРґС‡РµСЂРєРёРІР°РЅРёСЏ РґР»СЏ Р·РЅР°С‡РµРЅРёР№
            'bio_full'      => 'activities',
            'position'      => 'position',
            'experience'    => 'stage', 
            'degree'        => 'feed_stepen',
            'category'      => 'feed_category',
            'education'     => 'education',
            
            // Р›РѕРіРёС‡РµСЃРєРёРµ С„Р»Р°РіРё (Р±РµР· РїРѕРґС‡РµСЂРєРёРІР°РЅРёСЏ, С‚Р°Рє РєР°Рє СЌС‚Рѕ Р·РЅР°С‡РµРЅРёСЏ ACF)
            'is_adult'      => 'feed_adultdoctor',
            'is_child'      => 'feed_childdoctor',
            'spec_name'     => 'feed_spec'
        ],
        // РРјСЏ С‚Р°РєСЃРѕРЅРѕРјРёРё
        'taxonomies' => [
            'services' => 'directions' 
        ]
    ],

    'behavior' => [
        'entry_points' => [
            'doctor_direct' => true,
            'specialty_list' => true,
            'service_search' => true
        ],
        'waitlist' => [
            'enabled' => true,
            'trigger' => 'no_slots_available'
        ]
    ]
];



===== FILE: C:\git\apl\med\php_backend\config_parts\04_theme.php =====

<?php
// PART 4: THEME & CLIENT SETTINGS
// РќР°СЃС‚СЂРѕР№РєРё РІРЅРµС€РЅРµРіРѕ РІРёРґР° РґР»СЏ РєР»РёРЅРёРєРё "РСЃС‚РѕС‡РЅРёРє"

return [
    'client' => [
        'name' => 'РњР¦ "РСЃС‚РѕС‡РЅРёРє"',
        'city_default' => 'chel',
    ],

    'theme' => [
        // РћСЃС‚Р°РІР»СЏРµРј РїСѓСЃС‚С‹Рј, РµСЃР»Рё Р»РѕРіРѕС‚РёРї Р±РµСЂРµС‚СЃСЏ РёР· CSS РёР»Рё РЅРµ РЅСѓР¶РµРЅ
        'logo_url' => '', 
        
        // Р¦РІРµС‚РѕРІР°СЏ СЃС…РµРјР° (Р’Р·СЏС‚Рѕ СЃРѕ СЃРєСЂРёРЅС€РѕС‚РѕРІ СЃР°Р№С‚Р°)
        'colors' => [
            'primary' => '#5c9c45', // Р—РµР»РµРЅС‹Р№ (Р’Р·СЂРѕСЃР»Р°СЏ РєР»РёРЅРёРєР° - РѕСЃРЅРѕРІРЅРѕР№ С†РІРµС‚)
            'accent' => '#ea8025',  // РћСЂР°РЅР¶РµРІС‹Р№ (Р”РµС‚СЃРєР°СЏ РєР»РёРЅРёРєР° / РђРєС†РµРЅС‚С‹)
            'background' => '#F8FAFC' 
        ],
        
        'contacts' => [
            'phone' => '+7 (351) 77-88-887',
            'website' => 'https://ci74.ru'
        ],
        
        // [NEW] РќР°СЃС‚СЂРѕР№РєР° РєР°СЂС‚РѕС‡РєРё РІСЂР°С‡Р°
        'doctor_card' => [
            'show_experience' => true,
            'show_category'   => true, // РџРѕРєР°Р·С‹РІР°С‚СЊ РєР°С‚РµРіРѕСЂРёСЋ (Р’С‹СЃС€Р°СЏ, РџРµСЂРІР°СЏ)
            'show_badges'     => true, // РџРѕРєР°Р·С‹РІР°С‚СЊ РљРњРќ, Р”РњРќ
            'show_rating'     => false // РЎРєСЂС‹РІР°РµРј СЂРµР№С‚РёРЅРі, РµСЃР»Рё РµРіРѕ РЅРµС‚
        ],
        
        'labels' => [
            'step1Title' => 'Р—Р°РїРёСЃСЊ РЅР° РїСЂРёРµРј',
            'searchPlaceholder' => 'Р’СЂР°С‡, СѓСЃР»СѓРіР° РёР»Рё РЅР°РїСЂР°РІР»РµРЅРёРµ...',
            'selectTimeBtn' => 'РџРѕРєР°Р·Р°С‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ',
            'confirmBookingBtn' => 'РџРѕРґС‚РІРµСЂРґРёС‚СЊ Р·Р°РїРёСЃСЊ',
            'successTitle' => 'Р’С‹ Р·Р°РїРёСЃР°РЅС‹!',
            'successSubtitle' => 'Р–РґРµРј РІР°СЃ РІ РєР»РёРЅРёРєРµ "РСЃС‚РѕС‡РЅРёРє"',
            'waitlistBtn' => 'РЎРѕРѕР±С‰РёС‚СЊ Рѕ СЃРІРѕР±РѕРґРЅРѕРј РѕРєРЅРµ',
            'experienceLabel' => 'РЎС‚Р°Р¶',
            'yearsShort' => 'Р»РµС‚'
        ]
    ]
];


===== FILE: C:\git\apl\med\php_backend\config_parts\05_compliance.php =====


<?php
// PART 5: COMPLIANCE POLICY
// Р®СЂРёРґРёС‡РµСЃРєРёРµ РЅР°СЃС‚СЂРѕР№РєРё РѕР±СЂР°Р±РѕС‚РєРё РґР°РЅРЅС‹С….

return [
    'compliance' => [
        // 1. РњРёРЅРёРјРёР·Р°С†РёСЏ РґР°РЅРЅС‹С… (GDPR Art.5 c)
        'data_minimization' => [
            // РџРѕР»СЏ, РєРѕС‚РѕСЂС‹Рµ РјС‹ РќР• СЃРїСЂР°С€РёРІР°РµРј Рё РќР• РїРµСЂРµРґР°РµРј РІ РњРРЎ, РµСЃР»Рё РѕРЅРё РЅРµ РєСЂРёС‚РёС‡РЅС‹
            'exclude_fields' => [
                // 'email', // Р Р°СЃРєРѕРјРјРµРЅС‚РёСЂРѕРІР°С‚СЊ, РµСЃР»Рё email РЅРµ РЅСѓР¶РµРЅ РґР»СЏ Р·Р°РїРёСЃРё
                // 'patronymic' // Р•СЃР»Рё Р·Р°РїР°РґРЅС‹Р№ С„РѕСЂРјР°С‚
            ]
        ],

        // 2. Р’РѕР·СЂР°СЃС‚РЅРѕР№ С†РµРЅР·
        'age_gate' => [
            'enabled' => true,
            'threshold' => 18,
            'error_message' => 'Р—Р°РїРёСЃСЊ РґРµС‚РµР№ РѕСЃСѓС‰РµСЃС‚РІР»СЏРµС‚СЃСЏ С‡РµСЂРµР· РєРѕРЅС‚Р°РєС‚-С†РµРЅС‚СЂ РёР»Рё СЂР°Р·РґРµР» РџРµРґРёР°С‚СЂРёСЏ.'
        ],

        // 3. РЎРѕРіР»Р°СЃРёРµ (Consent)
        'consent' => [
            'required' => true,
            'version' => 'v1.0-2025', // Р’РµСЂСЃРёСЏ РѕС„РµСЂС‚С‹, РїРѕРґ РєРѕС‚РѕСЂРѕР№ РїРѕРґРїРёСЃС‹РІР°РµС‚СЃСЏ СЋР·РµСЂ
            'url' => '/privacy-policy',
            'label' => 'РЇ СЃРѕРіР»Р°СЃРµРЅ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С…'
        ],

        // 4. РђСѓРґРёС‚
        'audit' => [
            'enabled' => true,
            'level' => 'full', // 'basic' (only errors), 'full' (steps tracking)
            'retention_days' => 30
        ]
    ]
];



===== FILE: C:\git\apl\med\php_backend\config_parts\99_helpers.php =====

<?php
// PART 99: HELPER FUNCTIONS
// Р’СЃРїРѕРјРѕРіР°С‚РµР»СЊРЅС‹Рµ С„СѓРЅРєС†РёРё, РґРѕСЃС‚СѓРїРЅС‹Рµ РІ РєРѕРЅС„РёРіРµ.

return [
    'helpers' => [
        'get_db_conn' => function($config) {
            // РџРѕРґРґРµСЂР¶РєР° Рё СЃС‚Р°СЂРѕРіРѕ ('cms_db') Рё РЅРѕРІРѕРіРѕ ('cms' => ['db' => ...]) С„РѕСЂРјР°С‚Р°
            $c = $config['cms']['db'] ?? $config['cms_db'] ?? null;
            
            // Basic validation
            if (empty($c) || empty($c['host']) || empty($c['dbname'])) {
                throw new Exception("Database config invalid");
            }
            
            $dsn = "mysql:host={$c['host']};dbname={$c['dbname']};charset={$c['charset']}";
            $opt = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            return new PDO($dsn, $c['user'], $c['password'], $opt);
        }
    ]
];


===== FILE: C:\git\apl\med\php_backend\controllers\BookingController.php =====


<?php

require_once __DIR__ . '/../services/RecaptchaService.php';

class BookingController {
    /** @var MisInterface */
    private $gateway;
    private $logger;
    private $cache;
    private $pdo;
    private $dbPrefix;
    private $recaptchaConfig;
    private $topologyConfig; 
    // Add reference to full config or specific qms config if needed for branches
    private $qmsConfig;

    public function __construct(MisInterface $gateway, $logger, $cache, $pdo, $dbPrefix, $recaptchaConfig, $topologyConfig = [], $qmsConfig = []) {
        $this->gateway = $gateway;
        $this->logger = $logger;
        $this->cache = $cache;
        $this->pdo = $pdo;
        $this->dbPrefix = $dbPrefix;
        $this->recaptchaConfig = $recaptchaConfig;
        $this->topologyConfig = $topologyConfig;
        $this->qmsConfig = $qmsConfig;
    }

    /**
     * РџРѕР»СѓС‡РµРЅРёРµ СЃС‚СЂСѓРєС‚СѓСЂС‹ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚РµР№ (Р”РµСЂРµРІРѕ)
     */
    public function getStructure() {
        return $this->cache->remember('structure_tree_v1', Cache::TTL_COLD, function() {
            if (method_exists($this->gateway, 'getServiceTreeFromWP')) {
                return $this->gateway->getServiceTreeFromWP();
            }
            return [];
        });
    }

    /**
     * [NEW] РџРѕР»СѓС‡РµРЅРёРµ СЃРїРёСЃРєР° С„РёР»РёР°Р»РѕРІ РёР· РєРѕРЅС„РёРіР° РёР»Рё РњРРЎ
     * Р РµР°Р»РёР·СѓРµС‚ SSOT: СЃРїРёСЃРѕРє С„РёР»РёР°Р»РѕРІ Р±РµСЂРµС‚СЃСЏ РёР· РёРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂРЅРѕРіРѕ РєРѕРЅС„РёРіР°.
     */
    public function getBranches() {
        $city = $_GET['city'] ?? 'chel';
        
        // 1. Try to get explicit branches map from config_infrastructure
        // This is safer/faster than querying MIS every time
        $staticBranches = $this->qmsConfig['branches_map'] ?? [];
        
        // Transform to frontend format
        $result = [];
        foreach ($staticBranches as $code => $info) {
            // Basic filtering by city if infrastructure defines it (mocking city logic for now based on code)
            // Ideally infrastructure config should have 'city_code' per branch
            $isChel = strpos($code, 'РўAC') !== false || strpos($code, 'РўAG') !== false; // Example QMS logic
            
            if ($city === 'chel' && !$isChel) continue;
            // if ($city === 'spb' && $isChel) continue; 

            $result[] = [
                'id' => $code,
                'name' => $info['name'],
                'city' => $city,
                'address' => $info['address'],
                'databaseId' => 'auto', // Frontend handles this or dynamic search handles it
                'metro' => $info['metro'] ?? null
            ];
        }

        return $result;
    }

    /**
     * РџРѕР»СѓС‡РµРЅРёРµ СЃРїРёСЃРєР° РІСЂР°С‡РµР№
     */
    public function getDoctors() {
        $city = $_GET['city'] ?? 'chel';
        $spec = $_GET['specialty'] ?? '';
        $sessionId = $_GET['session_id'] ?? 'unknown';
        
        if (!$spec) return [];

        // 1. Extract & Resolve Context
        $activeDimensions = $_GET['dimensions'] ?? [];
        $context = $this->resolveContext($activeDimensions);

        // 2. Cache Key Strategy
        $contextHash = md5(json_encode($context));
        $cacheKey = "doctors_{$city}_" . md5($spec) . "_{$contextHash}";
        
        return $this->cache->remember($cacheKey, Cache::TTL_WARM, function() use ($city, $spec, $sessionId, $context) {
            $this->logger->info("Cache Miss: Fetching doctors", ['city' => $city, 'spec' => $spec]);
            return $this->gateway->getDoctorsBySpecialty($city, $spec, $sessionId, $context);
        });
    }

    private function resolveContext($activeDimensions) {
        $context = [
            'routing' => [
                'allowed_instances' => [],
                'excluded_instances' => [],
                'allowed_branches' => []
            ],
            'query' => [], 
            'filtering' => [
                'require_tags' => [],
                'exclude_keywords' => [],
                'require_keywords' => []
            ]
        ];

        if (empty($this->topologyConfig['dimensions'])) return $context;

        foreach ($activeDimensions as $dimKey => $optionId) {
            if (!isset($this->topologyConfig['dimensions'][$dimKey])) continue;
            
            $dimConfig = $this->topologyConfig['dimensions'][$dimKey];
            
            foreach ($dimConfig['options'] as $opt) {
                if ($opt['id'] === $optionId && !empty($opt['rules'])) {
                    // Merge Routing
                    if (!empty($opt['rules']['routing'])) {
                        foreach (['allowed_instances', 'allowed_branches'] as $k) {
                            if (!empty($opt['rules']['routing'][$k])) {
                                $context['routing'][$k] = array_merge($context['routing'][$k], $opt['rules']['routing'][$k]);
                            }
                        }
                    }
                    // Merge Query
                    if (!empty($opt['rules']['query'])) {
                        $context['query'] = array_merge($context['query'], $opt['rules']['query']);
                    }
                    // Merge Filtering
                    if (!empty($opt['rules']['filtering'])) {
                        foreach ($opt['rules']['filtering'] as $fKey => $fVal) {
                            if (is_array($fVal)) {
                                $context['filtering'][$fKey] = array_merge($context['filtering'][$fKey] ?? [], $fVal);
                            }
                        }
                    }
                }
            }
        }

        return $context;
    }

    public function getSlots() { return []; } 
    public function book() { return []; }
    public function joinWaitlist() { return []; }
    public function getCalendar() { return []; }
}



===== FILE: C:\git\apl\med\php_backend\controllers\SearchController.php =====


<?php

class SearchController {
    private $gateway;
    private $logger;
    private $cache;
    private $config;

    public function __construct($gateway, $logger, $cache) {
        $this->gateway = $gateway;
        $this->logger = $logger;
        $this->cache = $cache;
        $this->config = require __DIR__ . '/../config.php';
    }

    /**
     * Direct Text Search Handler
     * Performs a fuzzy search (contains string) on Doctors and Specialties.
     * NOW SUPPORTS: Dimension Filtering (Tags) & Gateway Fallback
     */
    public function handleSearch() {
        $input = json_decode(file_get_contents('php://input'), true);
        $query = trim($input['query'] ?? $_GET['q'] ?? '');
        $city = $input['city'] ?? $this->config['client']['city_default'] ?? 'chel';
        $dimensions = $input['dimensions'] ?? []; // e.g. ['audience' => 'child']
        $sessionId = $input['session_id'] ?? 'unknown';
        
        // Minimal length check
        if (mb_strlen($query) < 2) return ['results' => []];

        // 1. Try to get All Doctors from Cache
        $cacheKey = "all_doctors_index_{$city}";
        $allDoctors = $this->cache->get($cacheKey, 3600); // 1 hour cache

        if (!$allDoctors) {
            // Attempt to fetch from MIS flat list
            try {
                $rawDocs = $this->gateway->getAllDoctorsFromMis($city);
                if (!empty($rawDocs)) {
                    $allDoctors = $rawDocs;
                    $this->cache->set($cacheKey, $allDoctors);
                }
            } catch (Exception $e) {
                $this->logger->error("Search Index Build Error: " . $e->getMessage());
            }
        }

        // 2. Perform Search
        $results = [];
        $queryLower = mb_strtolower($query);
        $limit = 7;

        // STRATEGY A: Local PHP Filter (Fastest if index exists)
        if (!empty($allDoctors)) {
            foreach ($allDoctors as $doc) {
                if (count($results) >= $limit) break;

                // Dimension Filter
                if (!empty($dimensions)) {
                    $isMatch = true;
                    foreach ($dimensions as $dimKey => $dimVal) {
                        if (empty($doc['tags'][$dimKey]) || !in_array($dimVal, $doc['tags'][$dimKey])) {
                            $isMatch = false; break;
                        }
                    }
                    if (!$isMatch) continue; 
                }

                $name = $doc['name'] ?? '';
                $spec = $doc['specialty'] ?? '';
                $score = 0;
                $nameLower = mb_strtolower($name);
                $specLower = mb_strtolower($spec);

                if ($nameLower === $queryLower || $specLower === $queryLower) $score = 100;
                elseif (strpos($nameLower, $queryLower) === 0 || strpos($specLower, $queryLower) === 0) $score = 80;
                elseif (strpos($nameLower, $queryLower) !== false) $score = 60;
                elseif (strpos($specLower, $queryLower) !== false) $score = 50;

                if ($score > 0) {
                    $results[] = $this->formatResult($doc, $score);
                }
            }
        } 
        // STRATEGY B: Direct Gateway Call (Fallback for systems without "Get All")
        else {
            try {
                // Now Gateway supports dual search (Spec + FIO)
                $gatewayDocs = $this->gateway->getDoctorsBySpecialty($city, $query, $sessionId, $dimensions);
                foreach ($gatewayDocs as $doc) {
                    $results[] = $this->formatResult($doc, 70); // Default relevance for API match
                }
            } catch (Exception $e) {
                $this->logger->error("Gateway Search Fallback Error: " . $e->getMessage());
            }
        }

        // Sort by score DESC
        usort($results, function($a, $b) {
            return $b['score'] <=> $a['score'];
        });

        return ['results' => array_slice($results, 0, $limit)];
    }

    private function formatResult($doc, $score) {
        return [
            'type' => 'doctor',
            'label' => $doc['name'] ?? 'Р’СЂР°С‡',
            'subLabel' => $doc['specialty'] ?? '',
            'score' => $score,
            'tags' => $doc['tags'] ?? [], 
            'payload' => [
                'specialty' => $doc['specialty'] ?? '',
                'doctor_id' => $doc['qmsId'] ?? $doc['id'],
                'link' => null
            ]
        ];
    }

    // --- ADMIN METHODS ---

    private function checkAuth() {
        $headers = getallheaders();
        $authKey = $headers['X-Admin-Key'] ?? ($_GET['admin_key'] ?? null);
        $configKey = $this->config['admin_secret'] ?? null;

        if (!$configKey || $authKey !== $configKey) {
            http_response_code(403);
            throw new Exception("Unauthorized: Invalid Admin Key");
        }
    }

    public function checkAdminAuth() {
        try {
            $this->checkAuth();
            return ['success' => true];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public function clearCache() {
        try {
            $this->checkAuth();
            
            // Simple file-based cache clearing
            $files = glob(__DIR__ . '/../cache/*.json');
            $count = 0;
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                    $count++;
                }
            }
            
            return ['success' => true, 'message' => "Cache cleared. Removed $count files."];
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}



===== FILE: C:\git\apl\med\php_backend\core\Cache.php =====

<?php

class Cache {
    private $cacheDir;
    private $enabled;

    // РЎС‚СЂР°С‚РµРіРёРё РІСЂРµРјРµРЅРё Р¶РёР·РЅРё (РїРѕ СЂРµРєРѕРјРµРЅРґР°С†РёРё СЌРєСЃРїРµСЂС‚РѕРІ)
    const TTL_HOT = 60;        // 1 РјРёРЅСѓС‚Р° (РЎР»РѕС‚С‹, СЃС‚Р°С‚СѓСЃС‹)
    const TTL_WARM = 3600;     // 1 С‡Р°СЃ (РЎРїРёСЃРєРё РІСЂР°С‡РµР№, С†РµРЅС‹)
    const TTL_COLD = 86400;    // 24 С‡Р°СЃР° (РЎС‚СЂСѓРєС‚СѓСЂР°, СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚Рё, СЃС‚Р°С‚РёРєР°)

    public function __construct($config) {
        $this->enabled = $config['enabled'] ?? false;
        $this->cacheDir = $config['path'] ?? __DIR__ . '/../cache';
        
        if ($this->enabled && !is_dir($this->cacheDir)) {
            if (!mkdir($this->cacheDir, 0755, true)) {
                error_log("Cache: Could not create directory {$this->cacheDir}");
                $this->enabled = false;
            }
        }
    }

    /**
     * РћСЃРЅРѕРІРЅРѕР№ РјРµС‚РѕРґ: "Р’РµСЂРЅРё РёР· РєСЌС€Р°, РёР»Рё Р’С‹С‡РёСЃР»Рё, РЎРѕС…СЂР°РЅРё Рё Р’РµСЂРЅРё"
     * @param string $key РЈРЅРёРєР°Р»СЊРЅС‹Р№ РєР»СЋС‡
     * @param int $ttl Р’СЂРµРјСЏ Р¶РёР·РЅРё РІ СЃРµРєСѓРЅРґР°С…
     * @param callable $callback Р¤СѓРЅРєС†РёСЏ, РІРѕР·РІСЂР°С‰Р°СЋС‰Р°СЏ РґР°РЅРЅС‹Рµ, РµСЃР»Рё РєСЌС€Р° РЅРµС‚
     */
    public function remember($key, $ttl, callable $callback) {
        if (!$this->enabled) {
            return $callback();
        }

        $cached = $this->get($key, $ttl);
        if ($cached !== null) {
            return $cached;
        }

        $data = $callback();
        
        if (!empty($data)) {
            $this->set($key, $data);
        }

        return $data;
    }

    public function get($key, $ttl) {
        if (!$this->enabled || $ttl <= 0) return null;

        $file = $this->getFilePath($key);
        
        if (!file_exists($file)) return null;

        // РџСЂРѕРІРµСЂРєР° РІСЂРµРјРµРЅРё Р¶РёР·РЅРё
        if (time() - filemtime($file) > $ttl) {
            @unlink($file); // РЈРґР°Р»СЏРµРј РїСЂРѕС‚СѓС…С€РёР№ С„Р°Р№Р» (РїРѕРґР°РІР»СЏРµРј РѕС€РёР±РєРё РїСЂРё РіРѕРЅРєРµ)
            return null;
        }

        $content = @file_get_contents($file);
        $data = json_decode($content, true);
        
        return $data ?: null;
    }

    public function set($key, $data) {
        if (!$this->enabled) return;

        $file = $this->getFilePath($key);
        $json = json_encode($data, JSON_UNESCAPED_UNICODE);
        
        // РђС‚РѕРјР°СЂРЅР°СЏ Р·Р°РїРёСЃСЊ С‡РµСЂРµР· РІСЂРµРјРµРЅРЅС‹Р№ С„Р°Р№Р» (Р·Р°С‰РёС‚Р° РѕС‚ corrup data РїСЂРё РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕР№ Р·Р°РїРёСЃРё)
        $tmp = $file . '.tmp';
        if (file_put_contents($tmp, $json) !== false) {
            rename($tmp, $file);
        }
    }

    public function flush() {
        $files = glob($this->cacheDir . '/*.json');
        foreach ($files as $file) {
            if (is_file($file)) @unlink($file);
        }
    }

    private function getFilePath($key) {
        return $this->cacheDir . '/' . md5($key) . '.json';
    }
}


===== FILE: C:\git\apl\med\php_backend\core\Logger.php =====


<?php

class Logger {
    private $logDir;
    private $sensitiveKeys;

    public function __construct() {
        $this->logDir = __DIR__ . '/../../logs';
        if (!is_dir($this->logDir)) {
            mkdir($this->logDir, 0755, true);
        }

        // Load sensitive keys from config if available, otherwise use defaults
        $configFile = __DIR__ . '/../config.php';
        if (file_exists($configFile)) {
            $config = require $configFile;
            $this->sensitiveKeys = $config['logging']['sensitive_keys'] ?? ['phone', 'email', 'apikey', 'token', 'fio'];
        } else {
            $this->sensitiveKeys = ['phone', 'email', 'apikey', 'token', 'fio'];
        }
    }

    public function info($message, $context = []) {
        $this->write('INFO', $message, $context);
    }

    public function error($message, $context = []) {
        $this->write('ERROR', $message, $context);
    }

    public function debug($message, $context = []) {
        // Debug logs usually contain full data, be careful in prod
        // Ideally check config['logging']['level'] here
        $this->write('DEBUG', $message, $context);
    }

    private function write($level, $message, $context) {
        $date = date('Y-m-d');
        $time = date('H:i:s');
        $file = $this->logDir . "/app-{$date}.log";
        
        // 1. Sanitize Context (Mask PII)
        $safeContext = $this->sanitizeContext($context);

        $contextStr = !empty($safeContext) ? json_encode($safeContext, JSON_UNESCAPED_UNICODE) : '';
        $logLine = "[$time] [$level] $message $contextStr" . PHP_EOL;
        
        file_put_contents($file, $logLine, FILE_APPEND);
    }

    /**
     * Recursive function to mask sensitive data in logs.
     * Essential for 152-FZ compliance.
     */
    private function sanitizeContext($data) {
        if (!is_array($data)) return $data;

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = $this->sanitizeContext($value);
            } elseif (is_string($key)) {
                // Check if key contains sensitive words (case insensitive)
                foreach ($this->sensitiveKeys as $badWord) {
                    if (stripos($key, $badWord) !== false) {
                        $data[$key] = '***MASKED***';
                        break;
                    }
                }
            }
        }
        return $data;
    }
}



===== FILE: C:\git\apl\med\php_backend\core\RateLimiter.php =====


<?php

class RateLimiter {
    private $storagePath;
    private $limit;
    private $window;
    private $enabled;

    public function __construct($config) {
        $this->enabled = $config['enabled'] ?? true;
        $this->limit = $config['max_requests'] ?? 60;
        $this->window = $config['window_seconds'] ?? 60;
        $this->storagePath = $config['storage_path'] ?? sys_get_temp_dir();

        if ($this->enabled && !is_dir($this->storagePath)) {
            mkdir($this->storagePath, 0755, true);
        }
    }

    public function check($ip) {
        if (!$this->enabled) return true;

        // РЎРѕР·РґР°РµРј СѓРЅРёРєР°Р»СЊРЅС‹Р№ С…СЌС€ РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ (IP + User Agent РґР»СЏ РЅР°РґРµР¶РЅРѕСЃС‚Рё)
        $identifier = md5($ip . ($_SERVER['HTTP_USER_AGENT'] ?? ''));
        $file = $this->storagePath . '/' . $identifier . '.limit';

        // РћС‡РёСЃС‚РєР° СЃС‚Р°СЂС‹С… С„Р°Р№Р»РѕРІ (GC) СЃ РІРµСЂРѕСЏС‚РЅРѕСЃС‚СЊСЋ 1%
        if (rand(1, 100) === 1) {
            $this->garbageCollect();
        }

        $data = ['count' => 0, 'start_time' => time()];
        
        if (file_exists($file)) {
            $content = @file_get_contents($file);
            if ($content) {
                $decoded = json_decode($content, true);
                if ($decoded) {
                    $data = $decoded;
                }
            }
        }

        $now = time();

        // Р•СЃР»Рё РѕРєРЅРѕ РІСЂРµРјРµРЅРё РёСЃС‚РµРєР»Рѕ, СЃР±СЂР°СЃС‹РІР°РµРј СЃС‡РµС‚С‡РёРє
        if (($now - $data['start_time']) > $this->window) {
            $data['count'] = 1;
            $data['start_time'] = $now;
        } else {
            // РРЅР°С‡Рµ СѓРІРµР»РёС‡РёРІР°РµРј
            $data['count']++;
        }

        // РЎРѕС…СЂР°РЅСЏРµРј
        file_put_contents($file, json_encode($data));

        // РџСЂРѕРІРµСЂСЏРµРј Р»РёРјРёС‚
        if ($data['count'] > $this->limit) {
            return false;
        }

        return true;
    }

    private function garbageCollect() {
        $files = glob($this->storagePath . '/*.limit');
        $now = time();
        foreach ($files as $file) {
            if ($now - filemtime($file) > ($this->window * 2)) {
                @unlink($file);
            }
        }
    }
}



===== FILE: C:\git\apl\med\php_backend\core\Router.php =====


<?php

class Router {
    private $routes = [];

    public function register($action, $callback) {
        $this->routes[$action] = $callback;
    }

    public function dispatch($action) {
        if (array_key_exists($action, $this->routes)) {
            return call_user_func($this->routes[$action]);
        }
        
        throw new Exception("Route not found: " . htmlspecialchars($action), 404);
    }
}



===== FILE: C:\git\apl\med\php_backend\data\doctors_registry.json =====

[
  {
    "qms_id": "spb_1",
    "name_display": "РРІР°РЅРѕРІ РРІР°РЅ РРІР°РЅРѕРІРёС‡",
    "photo_url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    "position": "Р’РµРґСѓС‰РёР№ С‚РµСЂР°РїРµРІС‚",
    "experience_years": 12,
    "badges": [
      { "type": "degree", "label": "Рљ.Рњ.Рќ.", "code": "kmn" },
      { "type": "category", "label": "Р’С‹СЃС€Р°СЏ РєР°С‚РµРіРѕСЂРёСЏ", "code": "highest" }
    ],
    "root_categories": ["consultation"],
    "content": {
        "anonce": "РЎРїРµС†РёР°Р»РёСЃС‚ РїРѕ СЃР»РѕР¶РЅС‹Рј СЃР»СѓС‡Р°СЏРј С‚РµСЂР°РїРёРё. РђРІС‚РѕСЂ 15 РЅР°СѓС‡РЅС‹С… СЂР°Р±РѕС‚.",
        "activities_html": "<p>Р‘РѕР»РµРµ 10 Р»РµС‚ РѕРїС‹С‚Р° РІ РґРёР°РіРЅРѕСЃС‚РёРєРµ. РЎРїРµС†РёР°Р»РёР·РёСЂСѓРµС‚СЃСЏ РЅР°:</p><ul><li>РљР°СЂРґРёРѕР»РѕРіРёРё</li><li>РџСѓР»СЊРјРѕРЅРѕР»РѕРіРёРё</li></ul>"
    }
  },
  {
    "qms_id": "chel_m_1",
    "name_display": "РЎРёРґРѕСЂРѕРІ РџРµС‚СЂ РџРµС‚СЂРѕРІРёС‡",
    "photo_url": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    "position": "Р’СЂР°С‡-РєР°СЂРґРёРѕР»РѕРі",
    "experience_years": 8,
    "badges": [
        { "type": "rating", "label": "Р’С‹Р±РѕСЂ РїР°С†РёРµРЅС‚РѕРІ", "code": "top" }
    ],
    "root_categories": ["consultation"],
    "content": {
        "anonce": "Р’СЂР°С‡ РІС‹СЃС€РµР№ РєР°С‚РµРіРѕСЂРёРё. РџСЂРёРµРј РІР·СЂРѕСЃР»С‹С… Рё РґРµС‚РµР№ СЃ 12 Р»РµС‚."
    }
  },
  {
    "qms_id": "chel_ex_1",
    "name_display": "РњРёС…Р°Р№Р»РѕРІ РњРёС…Р°РёР» РњРёС…Р°Р№Р»РѕРІРёС‡",
    "photo_url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    "position": "РЎС‚РѕРјР°С‚РѕР»РѕРі-РѕСЂС‚РѕРїРµРґ",
    "experience_years": 15,
    "badges": [],
    "root_categories": ["stomatology"]
  }
]


===== FILE: C:\git\apl\med\php_backend\debug_doctors.php =====

<?php
// php_backend/debug_doctors.php
// Р”РРђР“РќРћРЎРўРРљРђ РљРћРќРўР РћР›Р›Р•Р Рђ Р’Р РђР§Р•Р™ (Gateway Logic Debugger)

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/api.php'; // Load Core (Interfaces, Autoloader)
// Reset buffer from api.php execution
if (ob_get_level()) ob_end_clean(); 

$config = require __DIR__ . '/config.php';
$logger = new Logger();
$cache = new Cache(['enabled' => false]); // Disable cache for debug
$pdo = null; // Not needed for logic test

// MOCK REQUEST PARAMS
$city = $_GET['city'] ?? 'chel';
$spec = $_GET['spec'] ?? ''; // Can be empty
$activeDimensions = $_GET['dims'] ?? []; // e.g. ['audience' => 'adult']

// Init Components
$gateway = new QmsDriver($config);
$controller = new BookingController($gateway, $logger, $cache, $pdo, 'wp_', [], $config['topology'], $config['qms']);

// Simulate Context Resolution
$context = [];
// Mirroring logic from BookingController::resolveContext (simplified for display)
// We want to see what strict rules are applied
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Doctors Logic Debugger</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #111; color: #eee; }
        .box { border: 1px solid #333; padding: 15px; margin-bottom: 20px; background: #222; }
        h2 { margin-top: 0; color: #61dafb; }
        pre { white-space: pre-wrap; word-break: break-all; color: #9cdcfe; }
        .green { color: #4caf50; } .red { color: #f44336; } .yellow { color: #ffeb3b; }
        input, select { background: #333; color: white; border: 1px solid #555; padding: 5px; }
        button { cursor: pointer; padding: 5px 15px; background: #007acc; color: white; border: none; }
    </style>
</head>
<body>
    <h1>рџ©є Doctors Gateway Debugger</h1>
    
    <form method="GET" class="box">
        <div>
            <label>City:</label>
            <select name="city">
                <option value="chel" <?= $city == 'chel' ? 'selected' : '' ?>>Chel</option>
                <option value="spb" <?= $city == 'spb' ? 'selected' : '' ?>>SPb</option>
            </select>
        </div>
        <div style="margin-top:10px;">
            <label>Specialty/Query:</label>
            <input type="text" name="spec" value="<?= htmlspecialchars($spec) ?>" placeholder="(Empty to test default)">
        </div>
        <div style="margin-top:10px;">
            <label>Audience (Dimension):</label>
            <select name="dims[audience]">
                <option value="">-- Any --</option>
                <option value="adult" <?= ($activeDimensions['audience'] ?? '') == 'adult' ? 'selected' : '' ?>>Adult</option>
                <option value="child" <?= ($activeDimensions['audience'] ?? '') == 'child' ? 'selected' : '' ?>>Child</option>
            </select>
        </div>
        <div style="margin-top:10px;">
            <label>Vertical (Dimension):</label>
            <input type="text" name="dims[vertical]" value="<?= htmlspecialchars($activeDimensions['vertical'] ?? '') ?>" placeholder="e.g. cosmetology">
        </div>
        <div style="margin-top:15px;">
            <button type="submit">рџ”Ќ Trace Execution</button>
        </div>
    </form>

    <div class="box">
        <h2>1. Context Resolution</h2>
        <?php
            // Reflection to access private method or just manual logic replication
            echo "<div>Checking Topology Rules for: <b>" . json_encode($activeDimensions) . "</b></div>";
            // ... Logic visualization ...
        ?>
    </div>

    <div class="box">
        <h2>2. Gateway Response</h2>
        <?php
            try {
                // Manually call getDoctorsBySpecialty to capture raw output
                $start = microtime(true);
                $res = $gateway->getDoctorsBySpecialty($city, $spec, 'debug_session', $activeDimensions); // Use $activeDimensions directly as context mock
                $time = round(microtime(true) - $start, 4);
                
                echo "<div>Time: <span class='yellow'>{$time}s</span></div>";
                echo "<div>Count: <span class='green'>" . count($res) . "</span></div>";
                
                if (empty($res)) {
                    echo "<div class='red'>No doctors found.</div>";
                    if (empty($spec)) {
                        echo "<div class='yellow'>NOTE: Query was empty. QMS might require a specialty name.</div>";
                    }
                } else {
                    echo "<pre>";
                    // Show first 3 results
                    print_r(array_slice($res, 0, 3));
                    echo "</pre>";
                    if (count($res) > 3) echo "... and " . (count($res) - 3) . " more";
                }

            } catch (Exception $e) {
                echo "<div class='red'>EXCEPTION: " . $e->getMessage() . "</div>";
                echo "<pre>" . $e->getTraceAsString() . "</pre>";
            }
        ?>
    </div>
</body>
</html>


===== FILE: C:\git\apl\med\php_backend\debug_search.php =====

<?php
// php_backend/debug_search.php
// РРќРЎРўР РЈРњР•РќРў РћРўР›РђР”РљР РџРћРРЎРљРђ
// РџРѕР·РІРѕР»СЏРµС‚ СѓРІРёРґРµС‚СЊ СЃС‹СЂРѕР№ РѕС‚РІРµС‚ РњРРЎ РЅР° Р·Р°РїСЂРѕСЃ РїРѕРёСЃРєР° РїРѕ С„Р°РјРёР»РёРё

ini_set('display_errors', 1);
error_reporting(E_ALL);

$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : die("Config missing");
$instances = $config['qms']['instances'];

// Default parameters
$query = $_GET['q'] ?? 'Р›СЋР±РёРјРѕРІР°';
$instKey = $_GET['inst'] ?? array_key_first($instances);

$api = $instances[$instKey];
$result = null;

if ($query) {
    // Р¤РѕСЂРјРёСЂСѓРµРј Р·Р°РїСЂРѕСЃ searchdocbyfio
    $url = rtrim($api['api_url'], '/') . '/searchdocbyfio/';
    
    $params = [
        'apikey' => $api['api_token'],
        'chatid' => 206156880, // Test chat ID
        'fio' => $query
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    // РСЃРїРѕР»СЊР·СѓРµРј С‚РѕС‚ Р¶Рµ РјРµС‚РѕРґ РєРѕРґРёСЂРѕРІР°РЅРёСЏ, С‡С‚Рѕ Рё РІ РѕСЃРЅРѕРІРЅРѕРј РґСЂР°Р№РІРµСЂРµ (x-www-form-urlencoded)
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $raw = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    $json = json_decode($raw, true);
    $result = [
        'info' => $info,
        'raw' => $raw,
        'json' => $json
    ];
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Debug Search: <?= htmlspecialchars($query) ?></title>
    <style>
        body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
        input, select, button { padding: 10px; font-size: 14px; background: #333; color: white; border: 1px solid #555; }
        button { background: #0e639c; cursor: pointer; }
        .box { background: #252526; padding: 20px; margin-top: 20px; border: 1px solid #333; }
        .green { color: #6a9955; }
        .blue { color: #569cd6; }
        .orange { color: #ce9178; }
        .red { color: #f87171; }
    </style>
</head>
<body>
    <h1>рџ”Ќ РћС‚Р»Р°РґРєР° РџРѕРёСЃРєР° (searchdocbyfio)</h1>
    
    <form method="GET">
        <select name="inst">
            <?php foreach($instances as $k => $v): ?>
                <option value="<?= $k ?>" <?= $instKey === $k ? 'selected' : '' ?>><?= $v['name'] ?></option>
            <?php endforeach; ?>
        </select>
        <input type="text" name="q" value="<?= htmlspecialchars($query) ?>" placeholder="Р¤Р°РјРёР»РёСЏ РІСЂР°С‡Р°Рј">
        <button type="submit">РќР°Р№С‚Рё</button>
    </form>

    <?php if ($result): ?>
        <div class="box">
            <h3>HTTP Status: <?= $result['info']['http_code'] ?></h3>
            <div>URL: <?= $result['info']['url'] ?></div>
            
            <h3 class="blue">Raw Response:</h3>
            <div class="orange"><?= htmlspecialchars($result['raw']) ?></div>

            <h3 class="green">Parsed JSON:</h3>
            <pre><?= print_r($result['json'], true) ?></pre>
            
            <?php 
                $data = $result['json']['data'] ?? $result['json'] ?? [];
                $found = false;
                if(isset($data['slots']) || isset($data['doctors']) || isset($data['data']) || isset($data['docs']['docs'])) {
                    $found = true;
                }
            ?>
            
            <?php if(!$found): ?>
                <div class="red" style="margin-top:10px; font-weight:bold;">
                    вљ пёЏ Р’ РѕС‚РІРµС‚Рµ РЅРµС‚ СЃС‚Р°РЅРґР°СЂС‚РЅС‹С… РєР»СЋС‡РµР№ ('slots', 'doctors', 'data', 'docs.docs'). <br>
                    РџСЂРѕРІРµСЂСЊС‚Рµ API.
                </div>
            <?php else: ?>
                <div class="green" style="margin-top:10px; font-weight:bold;">
                    вњ… РЎС‚СЂСѓРєС‚СѓСЂР° СЂР°СЃРїРѕР·РЅР°РЅР° РєРѕСЂСЂРµРєС‚РЅРѕ.
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</body>
</html>


===== FILE: C:\git\apl\med\php_backend\dev_api_test.php =====

<?php
// dev_api_test.php - РњРѕРґСѓР»СЊ С‚РµСЃС‚РёСЂРѕРІР°РЅРёСЏ API
// Р­С‚РѕС‚ С„Р°Р№Р» РїРѕРґРєР»СЋС‡Р°РµС‚СЃСЏ РІРЅСѓС‚СЂСЊ dev_dashboard.php

$config = require __DIR__ . '/config.php';
$instances = $config['qms']['instances'];

// Р—РЅР°С‡РµРЅРёСЏ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ (С‡С‚РѕР±С‹ С„РѕСЂРјР° РЅРµ СЃР±СЂР°СЃС‹РІР°Р»Р°СЃСЊ)
$currentInst = $_POST['inst'] ?? array_key_first($instances);
$currentMethod = $_POST['method'] ?? 'spec_list';
$currentSpec = $_POST['spec'] ?? 'РўРµСЂР°РїРµРІС‚'; // Р”РµС„РѕР»С‚, С‡С‚РѕР±С‹ СЃСЂР°Р·Сѓ СЂР°Р±РѕС‚Р°Р»Рѕ
$currentDay = $_POST['day'] ?? date('Ymd');
$currentBranch = $_POST['qqc244branch'] ?? '';
$currentChatId = $_POST['chatid'] ?? '206156880';

// Р›РѕРіРёРєР° РѕР±СЂР°Р±РѕС‚РєРё Р·Р°РїСЂРѕСЃР°
$result = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['test_api'])) {
    $api = $instances[$currentInst];
    
    $url = rtrim($api['api_url'], '/') . '/' . $currentMethod . '/';
    
    // РЎРѕР±РёСЂР°РµРј РїР°СЂР°РјРµС‚СЂС‹
    $params = [
        'apikey' => $api['api_token'],
        'chatid' => $currentChatId
    ];

    // Р”РѕРї РїРѕР»СЏ РґР»СЏ СЃРїРµС†РёС„РёС‡РЅС‹С… РјРµС‚РѕРґРѕРІ
    if ($currentMethod === 'getslotsbyspec') {
        if (!empty($currentSpec)) $params['spec'] = $currentSpec;
        if (!empty($currentBranch)) $params['qqc244branch'] = $currentBranch;
        if (!empty($currentDay)) $params['day'] = $currentDay;
    }
    
    // Р”Р»СЏ getdocinfo РЅСѓР¶РµРЅ qqc_doc, РґРѕР±Р°РІРёРј РµСЃР»Рё РІРґСЂСѓРі РїРѕРЅР°РґРѕР±РёС‚СЃСЏ, РЅРѕ РїРѕРєР° Р±Р°Р·РѕРІС‹Рµ
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    
    // Р’РђР–РќРћ: РСЃРїРѕР»СЊР·СѓРµРј x-www-form-urlencoded РєР°Рє РїСЂРѕСЃРёР» РћР»РµРі
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $raw = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    $result = [
        'url' => $url,
        'payload' => $params,
        'code' => $info['http_code'],
        'response' => json_decode($raw, true) ?: $raw
    ];
}
?>

<div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        рџ›  РўРµСЃС‚РёСЂРѕРІР°РЅРёРµ РјРµС‚РѕРґРѕРІ QMS
    </h2>
    
    <form method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="hidden" name="test_api" value="1">
        
        <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">РРЅСЃС‚Р°РЅСЃ API</label>
            <select name="inst" class="w-full p-2 border rounded bg-slate-50">
                <?php foreach($instances as $k => $v): ?>
                    <option value="<?= $k ?>" <?= $currentInst === $k ? 'selected' : '' ?>>
                        <?= $v['name'] ?> (<?= $v['city_code'] ?>)
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">РњРµС‚РѕРґ</label>
            <select name="method" id="method_selector" class="w-full p-2 border rounded bg-slate-50" onchange="toggleFields(this.value)">
                <option value="branch_list" <?= $currentMethod === 'branch_list' ? 'selected' : '' ?>>branch_list (РЎРїРёСЃРѕРє С„РёР»РёР°Р»РѕРІ)</option>
                <option value="spec_list" <?= $currentMethod === 'spec_list' ? 'selected' : '' ?>>spec_list (РЎРїРёСЃРѕРє СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚РµР№)</option>
                <option value="getslotsbyspec" <?= $currentMethod === 'getslotsbyspec' ? 'selected' : '' ?>>getslotsbyspec (РџРѕРёСЃРє СЃР»РѕС‚РѕРІ/РІСЂР°С‡РµР№)</option>
            </select>
        </div>

        <!-- РљРѕРЅС‚РµР№РЅРµСЂ РґР»СЏ РґРѕРї РїРѕР»РµР№ -->
        <div class="md:col-span-2 grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded border border-slate-200 transition-all duration-300" id="extra_fields">
            <div class="col-span-2">
                <div class="flex items-center gap-2 mb-1">
                    <label class="block text-xs font-bold text-slate-500 uppercase">Spec (РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ)</label>
                    <span class="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold" id="spec_required_badge" style="display:none">РћР‘РЇР—РђРўР•Р›Р¬РќРћ</span>
                </div>
                <input type="text" name="spec" value="<?= htmlspecialchars($currentSpec) ?>" placeholder="РќР°РїСЂ: РўРµСЂР°РїРµРІС‚" class="w-full p-2 border rounded">
                <p class="text-[10px] text-slate-400 mt-1">РћСЃС‚Р°РІСЊС‚Рµ РїСѓСЃС‚С‹Рј РґР»СЏ spec_list, РЅРѕ Р·Р°РїРѕР»РЅРёС‚Рµ РґР»СЏ getslotsbyspec</p>
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Day (Р”Р°С‚Р° YYYYMMDD)</label>
                <input type="text" name="day" value="<?= htmlspecialchars($currentDay) ?>" class="w-full p-2 border rounded">
            </div>
            <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Branch Code (Optional)</label>
                <input type="text" name="qqc244branch" value="<?= htmlspecialchars($currentBranch) ?>" placeholder="РќР°РїСЂ: РўACdAAC" class="w-full p-2 border rounded">
            </div>
             <div>
                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Chat ID</label>
                <input type="text" name="chatid" value="<?= htmlspecialchars($currentChatId) ?>" class="w-full p-2 border rounded">
            </div>
        </div>

        <div class="md:col-span-2">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 w-full shadow-lg shadow-blue-200 transition-all">
                Р’С‹РїРѕР»РЅРёС‚СЊ Р·Р°РїСЂРѕСЃ рџљЂ
            </button>
        </div>
    </form>

    <?php if ($result): ?>
        <div class="mt-6 border-t pt-4 animate-fade-in">
            <div class="mb-2 flex items-center justify-between">
                <div>
                    <span class="text-xs font-bold uppercase text-slate-500">РЎС‚Р°С‚СѓСЃ:</span> 
                    <span class="px-2 py-1 rounded text-xs font-bold <?= $result['code'] == 200 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' ?>">HTTP <?= $result['code'] ?></span>
                </div>
                <span class="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded"><?= $result['url'] ?></span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 class="text-xs font-bold mb-1 text-slate-600">РћС‚РїСЂР°РІР»РµРЅРЅС‹Рµ РґР°РЅРЅС‹Рµ (POST):</h4>
                    <pre class="bg-slate-800 text-slate-300 p-3 rounded text-xs overflow-auto max-h-60 border border-slate-700"><?= print_r($result['payload'], true) ?></pre>
                </div>
                <div>
                    <h4 class="text-xs font-bold mb-1 text-slate-600">РћС‚РІРµС‚ СЃРµСЂРІРµСЂР°:</h4>
                    <pre class="bg-slate-900 text-green-400 p-3 rounded text-xs overflow-auto max-h-[500px] border border-slate-800 shadow-inner"><?= print_r($result['response'], true) ?></pre>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<script>
function toggleFields(val) {
    const box = document.getElementById('extra_fields');
    const badge = document.getElementById('spec_required_badge');
    
    // Р›РѕРіРёРєР° РІРёР·СѓР°Р»СЊРЅРѕРіРѕ СЃРєСЂС‹С‚РёСЏ
    if (val === 'branch_list') {
        box.classList.add('opacity-50', 'grayscale');
        // box.classList.add('pointer-events-none'); // РњРѕР¶РЅРѕ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°С‚СЊ, РЅРѕ Р»СѓС‡С€Рµ РѕСЃС‚Р°РІРёС‚СЊ РґР»СЏ РіРёР±РєРѕСЃС‚Рё
    } else {
        box.classList.remove('opacity-50', 'grayscale', 'pointer-events-none');
    }

    // Р‘РµР№РґР¶РёРє "РћР±СЏР·Р°С‚РµР»СЊРЅРѕ"
    if (val === 'getslotsbyspec') {
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РїСЂРё Р·Р°РіСЂСѓР·РєРµ (С‡С‚РѕР±С‹ РІРѕСЃСЃС‚Р°РЅРѕРІРёС‚СЊ СЃРѕСЃС‚РѕСЏРЅРёРµ РїРѕСЃР»Рµ POST)
document.addEventListener('DOMContentLoaded', () => {
    toggleFields(document.getElementById('method_selector').value);
});
</script>


===== FILE: C:\git\apl\med\php_backend\dev_cms_sync.php =====

<div class="space-y-6">
    
    <!-- 1. Config Check -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold text-slate-700 border-b pb-2 mb-4">1. Р”РёР°РіРЅРѕСЃС‚РёРєР° РєРѕРЅС„РёРіСѓСЂР°С†РёРё</h2>
        <div class="text-sm font-mono text-slate-600 space-y-2">
            <?php
            $configFile = __DIR__ . '/config.php';
            $config = null;
            $prefix = 'wp_';
            $pdo = null;

            if (!file_exists($configFile)) {
                echo '<div class="text-red-600 font-bold">вќЊ Р¤Р°Р№Р» config.php РЅРµ РЅР°Р№РґРµРЅ!</div>';
            } else {
                echo "<div>вњ“ Р¤Р°Р№Р» РЅР°Р№РґРµРЅ</div>";
                try {
                    $config = require $configFile;
                    if (!is_array($config)) {
                        echo '<div class="text-red-600">вќЊ config.php РЅРµ РІРµСЂРЅСѓР» РјР°СЃСЃРёРІ!</div>';
                    } else {
                        echo "<div>вњ“ РњР°СЃСЃРёРІ РєРѕРЅС„РёРіСѓСЂР°С†РёРё Р·Р°РіСЂСѓР¶РµРЅ</div>";
                        $prefix = $config['cms_db']['prefix'] ?? 'wp_';
                        echo "<div>вњ“ DB Prefix: <b>{$prefix}</b></div>";
                    }
                } catch (Throwable $e) {
                    echo '<div class="text-red-600">вќЊ РћС€РёР±РєР° РїСЂРё С‡С‚РµРЅРёРё РєРѕРЅС„РёРіР°: ' . $e->getMessage() . '</div>';
                }
            }
            ?>
        </div>
    </div>

    <!-- 2. Database Connection -->
    <?php if ($config): ?>
    <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold text-slate-700 border-b pb-2 mb-4">2. РЎРѕРµРґРёРЅРµРЅРёРµ СЃ Р‘Р”</h2>
        <?php
            try {
                if (!isset($config['helpers']['get_db_conn'])) {
                    echo '<div class="text-red-600">вќЊ РќРµС‚ С…РµР»РїРµСЂР° get_db_conn</div>';
                } else {
                    $pdo = $config['helpers']['get_db_conn']($config);
                    $ver = $pdo->query("SELECT VERSION()")->fetchColumn();
                    echo '<div class="bg-green-50 text-green-700 p-3 rounded border border-green-200">вњ… РџРѕРґРєР»СЋС‡РµРЅРѕ! MySQL v' . htmlspecialchars($ver) . '</div>';
                }
            } catch (Throwable $e) {
                echo '<div class="bg-red-50 text-red-700 p-4 rounded border border-red-200">';
                echo '<b>РћС€РёР±РєР° РїРѕРґРєР»СЋС‡РµРЅРёСЏ:</b><br>' . htmlspecialchars($e->getMessage());
                echo '</div>';
            }
        ?>
    </div>
    <?php endif; ?>

    <!-- 3. Content Audit (Mapping Audit) -->
    <?php if ($pdo): ?>
    <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <div>
                <h3 class="font-bold text-slate-700">3. РљРѕРЅС‚РµРЅС‚РЅС‹Р№ Р°СѓРґРёС‚ РІСЂР°С‡РµР№</h3>
                <p class="text-xs text-slate-500">РђРЅР°Р»РёР· Р·Р°РїРѕР»РЅРµРЅРЅРѕСЃС‚Рё РїРѕР»РµР№ РґР»СЏ РІРёРґР¶РµС‚Р°</p>
            </div>
            <div class="flex gap-2">
                <button onclick="copyDumpToClipboard()" class="text-xs bg-blue-600 text-white px-3 py-1 rounded font-bold hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-sm">
                    <span>рџ“‹ COPY CLEAN JSON</span>
                </button>
            </div>
        </div>
        
        <div class="p-0">
            <?php
            // Helper function defined BEFORE usage
            if (!function_exists('renderField')) {
                function renderField($label, $value, $truncate = false) {
                    $isEmpty = empty(trim($value ?? ''));
                    $displayVal = $isEmpty ? 'вЂ”' : htmlspecialchars($value);
                    
                    // Check for serialized mess
                    if (strpos($value ?? '', 'a:') === 0 && strpos($value ?? '', '{') !== false) {
                        $displayVal = '<span class="text-red-500 font-bold">вљ пёЏ SERIALIZED (BAD)</span>';
                    } else {
                        // Use mb_ functions for cyrillic safety if available
                        if ($truncate) {
                             $len = function_exists('mb_strlen') ? mb_strlen($displayVal) : strlen($displayVal);
                             if ($len > 50) {
                                 $displayVal = (function_exists('mb_substr') ? mb_substr($displayVal, 0, 50) : substr($displayVal, 0, 50)) . '...';
                             }
                        }
                    }
                    
                    $class = $isEmpty ? 'text-slate-300' : 'text-slate-700 font-medium';
                    echo "<li class='flex items-baseline'>";
                    echo "<span class='w-24 shrink-0 text-slate-500'>$label:</span>";
                    echo "<span class='$class truncate' title='".htmlspecialchars($value ?? '')."'>$displayVal</span>";
                    echo "</li>";
                }
            }

            // Р¦РµР»РµРІС‹Рµ РїРѕР»СЏ, РєРѕС‚РѕСЂС‹Рµ РјС‹ РёС‰РµРј
            $targetFields = [
                'main' => ['name', 'position', 'feed_stepen', 'feed_category', 'feed_spec'],
                'bio' => ['anonce', 'activities', 'education', 'extraeducation', 'conferences'],
                'details' => ['stage', 'feed_start_date', 'duration'],
                'price' => ['cost', 'doc_price_from'],
                'contact' => ['phone', 'feed_adress', 'fast'],
                'media' => ['photo', 'photo_list']
            ];

            // РџР»РѕСЃРєРёР№ СЃРїРёСЃРѕРє РґР»СЏ РІС‹Р±РѕСЂРєРё
            $allTargetKeys = array_merge(...array_values($targetFields));
            $exportData = []; 

            try {
                $usersTable = $prefix . 'users';
                $metaTable = $prefix . 'usermeta';
                $postsTable = $prefix . 'posts'; 

                // 1. РџРѕР»СѓС‡Р°РµРј СЃРїРёСЃРѕРє РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ (РІСЂР°С‡РµР№)
                $sql = "
                    SELECT 
                        u.ID, 
                        u.display_name, 
                        u.user_email,
                        m_qms.meta_value as qms_id,
                        p_photo.guid as photo_url
                    FROM $usersTable u
                    LEFT JOIN $metaTable m_qms ON u.ID = m_qms.user_id AND m_qms.meta_key = 'id_doctor_qms'
                    LEFT JOIN $metaTable m_photo_id ON u.ID = m_photo_id.user_id AND m_photo_id.meta_key = 'photo'
                    LEFT JOIN $postsTable p_photo ON p_photo.ID = m_photo_id.meta_value AND p_photo.post_type = 'attachment'
                    ORDER BY u.ID DESC 
                    LIMIT 50
                ";
                
                $stmt = $pdo->query($sql);
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (empty($rows)) {
                    echo '<div class="text-slate-500 italic p-8 text-center">Р’ Р±Р°Р·Рµ РґР°РЅРЅС‹С… РЅРµС‚ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№.</div>';
                } else {
                    echo '<div class="overflow-x-auto"><table class="w-full text-sm text-left border-collapse">';
                    echo '<thead class="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th class="p-4 w-64">Р’СЂР°С‡ (WP User)</th>
                                <th class="p-4 w-32">РЎРІСЏР·СЊ (QMS)</th>
                                <th class="p-4">РљРѕРЅС‚РµРЅС‚ (Р—Р°РїРѕР»РЅРµРЅРЅРѕСЃС‚СЊ)</th>
                            </tr>
                          </thead>';
                    echo '<tbody class="divide-y divide-slate-100">';
                    
                    foreach ($rows as $row) {
                        // 2. Р”РѕСЃС‚Р°РµРј РјРµС‚Р°-РїРѕР»СЏ С‚РѕР»СЊРєРѕ РёР· РЅР°С€РµРіРѕ СЃРїРёСЃРєР°
                        $placeholders = str_repeat('?,', count($allTargetKeys) - 1) . '?';
                        $metaSql = "SELECT meta_key, meta_value FROM $metaTable WHERE user_id = ? AND meta_key IN ($placeholders)";
                        $metaStmt = $pdo->prepare($metaSql);
                        $metaParams = array_merge([$row['ID']], $allTargetKeys);
                        $metaStmt->execute($metaParams);
                        $metaRaw = $metaStmt->fetchAll(PDO::FETCH_KEY_PAIR); // [key => value]

                        // Р Р°СЃС‡РµС‚ Р·Р°РїРѕР»РЅРµРЅРЅРѕСЃС‚Рё
                        $filledCount = count(array_filter($metaRaw));
                        $totalCount = count($allTargetKeys);
                        $score = round(($filledCount / $totalCount) * 100);
                        
                        // Р¦РІРµС‚ СЃРєРѕСЂР°
                        $scoreColor = 'text-red-500';
                        if ($score > 30) $scoreColor = 'text-yellow-600';
                        if ($score > 60) $scoreColor = 'text-green-600';

                        // Р¤РѕСЂРјРёСЂСѓРµРј С‡РёСЃС‚С‹Р№ РѕР±СЉРµРєС‚ РґР»СЏ JSON
                        $cleanProfile = [
                            'id' => $row['ID'],
                            'qms_id' => $row['qms_id'] ?? null,
                            'name_wp' => $row['display_name'],
                            'photo_url' => $row['photo_url'] ?? null,
                            'meta' => $metaRaw
                        ];
                        $exportData[] = $cleanProfile;

                        echo '<tr class="hover:bg-slate-50 transition-colors align-top">';
                        
                        // Col 1: Р’СЂР°С‡
                        echo '<td class="p-4 border-r border-slate-100">';
                        echo '<div class="flex items-start gap-3">';
                            if ($row['photo_url']) {
                                echo '<img src="'.htmlspecialchars($row['photo_url']).'" class="w-12 h-12 rounded-full object-cover border border-slate-200">';
                            } else {
                                echo '<div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">NO</div>';
                            }
                            echo '<div>';
                                echo '<div class="font-bold text-slate-800">'.htmlspecialchars($row['display_name']).'</div>';
                                echo '<div class="text-xs text-slate-400 mb-1">ID: '.$row['ID'].'</div>';
                                echo '<div class="text-xs font-bold '.$scoreColor.'">Р—Р°РїРѕР»РЅРµРЅРЅРѕСЃС‚СЊ: '.$score.'%</div>';
                            echo '</div>';
                        echo '</div>';
                        echo '</td>';
                        
                        // Col 2: РЎРІСЏР·СЊ
                        echo '<td class="p-4 border-r border-slate-100 align-middle">';
                        if ($row['qms_id']) {
                            echo '<div class="bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono text-xs font-bold border border-blue-200 text-center mb-1">'.htmlspecialchars($row['qms_id']).'</div>';
                            echo '<div class="text-[10px] text-center text-slate-400">РЎРІСЏР·Р°РЅ</div>';
                        } else {
                            echo '<div class="text-slate-300 text-xs italic text-center">РќРµ РїСЂРёРІСЏР·Р°РЅ</div>';
                        }
                        echo '</td>';

                        // Col 3: РљРѕРЅС‚РµРЅС‚
                        echo '<td class="p-4">';
                        echo '<div class="grid grid-cols-2 gap-x-8 gap-y-4">';
                            
                            // Р“СЂСѓРїРїР°: РћСЃРЅРѕРІРЅРѕРµ
                            echo '<div>';
                                echo '<h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">РџСЂРѕС„РµСЃСЃРёРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ</h4>';
                                echo '<ul class="space-y-1 text-xs">';
                                    renderField('Р”РѕР»Р¶РЅРѕСЃС‚СЊ', $metaRaw['position'] ?? '');
                                    renderField('РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ', $metaRaw['feed_spec'] ?? '');
                                    renderField('РЎС‚РµРїРµРЅСЊ', $metaRaw['feed_stepen'] ?? '');
                                    renderField('РљР°С‚РµРіРѕСЂРёСЏ', $metaRaw['feed_category'] ?? '');
                                    renderField('РЎС‚Р°Р¶', $metaRaw['stage'] ?? ($metaRaw['feed_start_date'] ?? ''));
                                echo '</ul>';
                            echo '</div>';

                            // Р“СЂСѓРїРїР°: Р‘РёРѕРіСЂР°С„РёСЏ
                            echo '<div>';
                                echo '<h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Р‘РёРѕРіСЂР°С„РёСЏ Рё Р”РµС‚Р°Р»Рё</h4>';
                                echo '<ul class="space-y-1 text-xs">';
                                    renderField('РђРЅРѕРЅСЃ', $metaRaw['anonce'] ?? '', true);
                                    renderField('РћР±СЂР°Р·РѕРІР°РЅРёРµ', $metaRaw['education'] ?? '', true);
                                    renderField('РЈСЃР»СѓРіРё', $metaRaw['activities'] ?? '', true);
                                echo '</ul>';
                            echo '</div>';
                            
                            // Р“СЂСѓРїРїР°: Р¦РµРЅС‹ Рё РљРѕРЅС‚Р°РєС‚С‹
                            echo '<div class="col-span-2 border-t border-slate-100 pt-2 mt-2 flex gap-6">';
                                echo '<div>';
                                    echo '<span class="text-[10px] text-slate-400 uppercase mr-2">Р¦РµРЅР°:</span>';
                                    $cost = $metaRaw['cost'] ?? ($metaRaw['doc_price_from'] ?? '');
                                    echo $cost ? "<span class='font-bold text-slate-700'>$cost</span>" : "<span class='text-slate-300'>-</span>";
                                echo '</div>';
                                echo '<div>';
                                    echo '<span class="text-[10px] text-slate-400 uppercase mr-2">РђРґСЂРµСЃ:</span>';
                                    echo !empty($metaRaw['feed_adress']) ? "<span class='text-slate-600'>{$metaRaw['feed_adress']}</span>" : "<span class='text-slate-300'>-</span>";
                                echo '</div>';
                            echo '</div>';

                        echo '</div>';
                        echo '</td>';
                        
                        echo '</tr>';
                    }
                    echo '</tbody></table></div>';
                }
            } catch (Throwable $e) {
                echo '<div class="p-4 text-red-600">Error: '.$e->getMessage().'</div>';
            }
            ?>
        </div>
    </div>
    
    <!-- 4. Legend -->
    <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <h4 class="text-sm font-bold text-slate-700 mb-2">Р›РµРіРµРЅРґР° РїРѕР»РµР№ (Target Fields)</h4>
        <div class="flex flex-wrap gap-2">
            <?php foreach($allTargetKeys as $key): ?>
                <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200 font-mono"><?= $key ?></span>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

    <!-- Data Payload for JS -->
    <script>
    const CLEAN_DUMP = <?php echo json_encode($exportData ?? [], JSON_UNESCAPED_UNICODE); ?>;
    
    function copyDumpToClipboard() {
        const text = JSON.stringify(CLEAN_DUMP, null, 2);
        navigator.clipboard.writeText(text).then(() => {
            alert('вњ… Р§РёСЃС‚С‹Рµ РґР°РЅРЅС‹Рµ (Clean JSON) СЃРєРѕРїРёСЂРѕРІР°РЅС‹! (' + CLEAN_DUMP.length + ' РІСЂР°С‡РµР№)');
        }).catch(err => {
            console.error('РћС€РёР±РєР° РєРѕРїРёСЂРѕРІР°РЅРёСЏ:', err);
            alert('вќЊ РћС€РёР±РєР° РєРѕРїРёСЂРѕРІР°РЅРёСЏ.');
        });
    }
    </script>

</div>


===== FILE: C:\git\apl\med\php_backend\dev_dashboard.php =====

<?php
// dev_dashboard.php - Р“Р»Р°РІРЅР°СЏ С‚РѕС‡РєР° РІС…РѕРґР° РґР»СЏ С‚РµСЃС‚РѕРІ
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tab = $_GET['tab'] ?? 'api';
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Dev Suite: Medical Widget</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-100 min-h-screen">
    
    <div class="max-w-7xl mx-auto p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-900">рџ§° РџР°РЅРµР»СЊ Р Р°Р·СЂР°Р±РѕС‚С‡РёРєР°</h1>
                <p class="text-slate-500 text-sm">РРЅС‚РµРіСЂР°С†РёСЏ QMS + WordPress</p>
            </div>
            <div class="flex gap-2">
                <a href="?tab=api" class="px-4 py-2 rounded-lg font-medium transition-colors <?= $tab == 'api' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-50' ?>">
                    рџ“Ў API Tester
                </a>
                <a href="tools/sync_tool.php" class="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                    рџ”„ Sync Tool (New)
                </a>
                <a href="?tab=audit" class="px-4 py-2 rounded-lg font-medium transition-colors <?= $tab == 'audit' ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' : 'bg-white text-slate-600 hover:bg-slate-50' ?>">
                    рџ“Љ Content Audit
                </a>
                <a href="api.php?action=get_structure" target="_blank" class="px-4 py-2 rounded-lg font-medium bg-white text-slate-600 hover:bg-slate-50">
                    рџ“‚ JSON Structure
                </a>
            </div>
        </div>

        <!-- Content -->
        <div class="animate-fade-in">
            <?php 
                try {
                    if ($tab === 'api') {
                        $file = __DIR__ . '/dev_api_test.php';
                        if (file_exists($file)) require $file;
                        else echo "<div class='text-red-500'>File not found: $file</div>";
                    } elseif ($tab === 'audit') {
                        // РџРµСЂРµРёРјРµРЅРѕРІР°Р» СЃС‚Р°СЂС‹Р№ sync РІ audit, С‚Р°Рє РєР°Рє РѕРЅ С‚РѕР»СЊРєРѕ РїРѕРєР°Р·С‹РІР°РµС‚ РґР°РЅРЅС‹Рµ
                        $file = __DIR__ . '/dev_cms_sync.php';
                        if (file_exists($file)) require $file;
                        else echo "<div class='text-red-500'>File not found: $file</div>";
                    }
                } catch (Throwable $e) {
                    echo "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>";
                    echo "<strong class='font-bold'>Critical Error:</strong> ";
                    echo "<span class='block sm:inline'>" . $e->getMessage() . "</span>";
                    echo "</div>";
                }
            ?>
        </div>
        
        <!-- Footer -->
        <div class="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
            <p>Medical Widget Backend v3.1 | Environment: <?= php_uname('n') ?></p>
        </div>
    </div>

</body>
</html>



===== FILE: C:\git\apl\med\php_backend\drivers\BaseDriver.php =====

<?php

require_once __DIR__ . '/../helpers/DoctorFormatter.php';

class BaseDriver {
    protected $fullConfig;
    private $cmsPdo = null;

    public function __construct($fullConfig) {
        $this->fullConfig = $fullConfig;
        DoctorFormatter::setConfig($fullConfig);
    }

    protected function hydrateWithCmsData($doctors) {
        if (empty($doctors)) return [];

        // Strategy selection
        $mode = $this->fullConfig['cms']['connection_type'] ?? 'database';

        try {
            if ($mode === 'http_api') {
                return $this->hydrateViaApi($doctors);
            } elseif ($mode === 'json') {
                return $this->hydrateViaJson($doctors);
            } else {
                return $this->hydrateViaDb($doctors);
            }
        } catch (Exception $e) {
            error_log("CMS Hydration Error ($mode): " . $e->getMessage());
            return $this->applyDefaults($doctors);
        }
    }

    private function hydrateViaJson($doctors) {
        return $this->applyDefaults($doctors);
    }

    private function hydrateViaApi($doctors) {
        return $this->applyDefaults($doctors);
    }

    /**
     * РЎРўР РђРўР•Р“РРЇ B: Direct Database (Self-Hosted / Local)
     */
    private function hydrateViaDb($doctors) {
        $pdo = $this->getCmsConnection();
        if (!$pdo) throw new Exception("CMS DB Connection failed");

        $prefix = $this->getDbPrefix();
        $mapping = $this->fullConfig['cms_map']['meta_keys'] ?? [];
        $taxonomyName = $this->fullConfig['cms_map']['taxonomies']['services'] ?? 'directions';
        
        $misIds = array_map(function($d) { return $d['qmsId']; }, $doctors);
        if (empty($misIds)) return $doctors;

        // 1. Resolve IDs
        $placeholders = str_repeat('?,', count($misIds) - 1) . '?';
        $linkKey = $mapping['qms_id'];

        $sqlUsers = "
            SELECT u.ID as wp_id, m.meta_value as qms_id
            FROM {$prefix}users u
            JOIN {$prefix}usermeta m ON u.ID = m.user_id 
            WHERE m.meta_key = ? AND m.meta_value IN ($placeholders)
        ";
        
        $stmt = $pdo->prepare($sqlUsers);
        $stmt->execute(array_merge([$linkKey], $misIds));
        
        $qmsToWp = [];
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $qmsToWp[$row['qms_id']] = $row['wp_id'];
        }
        
        if (empty($qmsToWp)) return $this->applyDefaults($doctors);

        $wpIds = array_values($qmsToWp);
        $wpIdsPlaceholders = str_repeat('?,', count($wpIds) - 1) . '?';

        // 2. Fetch Meta
        // Р’РђР–РќРћ: РњР°РїРїРёРЅРі РєР»СЋС‡РµР№
        $targetMetaKeys = array_values(array_filter($mapping, function($k) { return $k !== 'qms_id'; }));
        $usersFullData = [];
        
        if (!empty($targetMetaKeys)) {
            $keysPlaceholders = str_repeat('?,', count($targetMetaKeys) - 1) . '?';
            $sqlMeta = "
                SELECT user_id, meta_key, meta_value 
                FROM {$prefix}usermeta 
                WHERE user_id IN ($wpIdsPlaceholders) 
                AND meta_key IN ($keysPlaceholders)
            ";
            $stmtMeta = $pdo->prepare($sqlMeta);
            $stmtMeta->execute(array_merge($wpIds, $targetMetaKeys));
            foreach ($stmtMeta->fetchAll(PDO::FETCH_ASSOC) as $row) {
                // РџСЂСЏРјР°СЏ Р·Р°РїРёСЃСЊ РїРѕ РєР»СЋС‡Сѓ РјРµС‚С‹
                $usersFullData[$row['user_id']][$row['meta_key']] = $row['meta_value'];
            }
        }

        // 3. Fetch Taxonomy for Classification (Tags)
        $sqlCats = "
            SELECT tr.object_id as user_id, t.slug as term_slug
            FROM {$prefix}term_relationships tr
            JOIN {$prefix}term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
            JOIN {$prefix}terms t ON t.term_id = tt.term_id
            WHERE tr.object_id IN ($wpIdsPlaceholders)
            AND tt.taxonomy = ?
        ";
        $stmtCats = $pdo->prepare($sqlCats);
        $stmtCats->execute(array_merge($wpIds, [$taxonomyName]));
        
        $userTerms = [];
        foreach ($stmtCats->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $userTerms[$row['user_id']][] = $row['term_slug'];
        }

        // 4. Fetch Photos (Р•СЃР»Рё РѕРЅРё РїСЂРёРІСЏР·Р°РЅС‹ С‡РµСЂРµР· media ID, Р° РЅРµ URL)
        $photoKey = $mapping['photo'] ?? '_photo';
        
        // РџРѕРїС‹С‚РєР° РґРѕСЃС‚Р°С‚СЊ URL РµСЃР»Рё РІ РјРµС‚Р°-РїРѕР»Рµ Р»РµР¶РёС‚ ID
        $sqlPhotos = "
            SELECT m.user_id, p.guid as url
            FROM {$prefix}usermeta m
            JOIN {$prefix}posts p ON m.meta_value = p.ID
            WHERE m.meta_key = ? AND m.user_id IN ($wpIdsPlaceholders) AND p.post_type = 'attachment'
        ";
        $stmtPhoto = $pdo->prepare($sqlPhotos);
        $stmtPhoto->execute(array_merge([$photoKey], $wpIds));
        $photos = $stmtPhoto->fetchAll(PDO::FETCH_KEY_PAIR);

        // 5. Merge & Classify
        $classificationRules = $this->fullConfig['classification'] ?? [];
        $isAdultKey = $mapping['is_adult'] ?? '_feed_adultdoctor';
        $isChildKey = $mapping['is_child'] ?? '_feed_childdoctor';
        $specNameKey = $mapping['spec_name'] ?? '_feed_spec';

        foreach ($doctors as &$doc) {
            if (isset($qmsToWp[$doc['qmsId']])) {
                $wpId = $qmsToWp[$doc['qmsId']];
                $meta = $usersFullData[$wpId] ?? [];
                
                // Photo Resolution
                $photoUrl = $photos[$wpId] ?? null; 
                if (!$photoUrl && isset($meta[$photoKey]) && filter_var($meta[$photoKey], FILTER_VALIDATE_URL)) {
                    $photoUrl = $meta[$photoKey];
                }

                $formatted = DoctorFormatter::format($meta, $wpId, $photoUrl, $mapping);

                if ($formatted['photoUrl']) $doc['photoUrl'] = $formatted['photoUrl'];
                if ($formatted['position']) $doc['position'] = $formatted['position'];
                if ($formatted['experienceYears']) $doc['experienceYears'] = $formatted['experienceYears'];
                
                // Override Specialty name from CMS if available (РњР°СЂРєРµС‚РёРЅРіРѕРІРѕРµ РЅР°Р·РІР°РЅРёРµ)
                // [FIX] Check for serialized data garbage
                if (!empty($meta[$specNameKey])) {
                    $val = $meta[$specNameKey];
                    // Р•СЃР»Рё СЌС‚Рѕ РќР• СЃРµСЂРёР°Р»РёР·РѕРІР°РЅРЅС‹Р№ РјР°СЃСЃРёРІ (РЅРµ РЅР°С‡РёРЅР°РµС‚СЃСЏ РЅР° a:...) Рё СЌС‚Рѕ СЃС‚СЂРѕРєР°
                    if (is_string($val) && strpos($val, 'a:') !== 0 && strpos($val, '{') !== 0) {
                        $doc['specialty'] = $val;
                    }
                }

                $doc['badges'] = $formatted['badges'];
                $doc['extended_data'] = $formatted['content'];
                
                // --- Classification (Tagging) ---
                $docSlugs = isset($userTerms[$wpId]) ? array_unique($userTerms[$wpId]) : [];
                $doc['root_categories'] = $docSlugs; 
                $doc['tags'] = []; 

                // A. Explicit Tagging
                if (!empty($meta[$isAdultKey]) && $meta[$isAdultKey] == '1') {
                    $doc['tags']['audience'][] = 'adult';
                }
                if (!empty($meta[$isChildKey]) && $meta[$isChildKey] == '1') {
                    $doc['tags']['audience'][] = 'child';
                }

                // B. Implicit Tagging via Taxonomy
                foreach ($classificationRules as $dimKey => $rule) {
                    if (($rule['source'] ?? '') === $taxonomyName) {
                        $map = $rule['map'] ?? [];
                        foreach ($docSlugs as $slug) {
                            if (isset($map[$slug])) {
                                $tagValue = $map[$slug];
                                if (!isset($doc['tags'][$dimKey])) $doc['tags'][$dimKey] = [];
                                if (!in_array($tagValue, $doc['tags'][$dimKey])) $doc['tags'][$dimKey][] = $tagValue;
                            }
                        }
                    }
                }
            }
        }

        return $this->applyDefaults($doctors);
    }

    private function applyDefaults($doctors) {
        foreach ($doctors as &$doc) {
            if (empty($doc['photoUrl'])) {
                // Р•СЃР»Рё С„РѕС‚Рѕ РЅРµС‚ - СЃС‚Р°РІРёРј РїР»РµР№СЃС…РѕР»РґРµСЂ СЃ РёРЅРёС†РёР°Р»Р°РјРё
                // РќРѕ Р»СѓС‡С€Рµ РїСѓСЃС‚СѓСЋ СЃС‚СЂРѕРєСѓ, С‡С‚РѕР±С‹ С„СЂРѕРЅС‚ СЃР°Рј СЂРµС€РёР» (РёР»Рё РґРµС„РѕР»С‚РЅСѓСЋ РєР°СЂС‚РёРЅРєСѓ)
                // РћСЃС‚Р°РІРёРј РїРѕРєР° РіРµРЅРµСЂР°С‚РѕСЂ РїР»РµР№СЃС…РѕР»РґРµСЂРѕРІ, РѕРЅ РїРѕР»РµР·РµРЅ РґР»СЏ РѕС‚Р»Р°РґРєРё
                $doc['photoUrl'] = 'https://placehold.co/400x500/f1f5f9/64748b?text=' . urlencode(mb_substr($doc['name'], 0, 1));
            }
            if (!isset($doc['badges'])) $doc['badges'] = [];
            if (!isset($doc['experienceYears'])) $doc['experienceYears'] = 0;
            if (!isset($doc['tags'])) $doc['tags'] = [];
        }
        return $doctors;
    }

    public function getServiceTreeFromWP() {
        try {
            $pdo = $this->getCmsConnection();
            if (!$pdo) return [];

            $prefix = $this->getDbPrefix();
            $taxonomy = $this->fullConfig['cms_map']['taxonomies']['services'] ?? 'directions';

            $sql = "
                SELECT t.term_id, t.name, t.slug, tt.parent, tt.count
                FROM {$prefix}terms t
                INNER JOIN {$prefix}term_taxonomy tt ON t.term_id = tt.term_id
                WHERE tt.taxonomy = ? AND tt.parent = 0 AND t.slug != 'uncategorized'
                ORDER BY t.name ASC
            ";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$taxonomy]);
            $roots = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($roots)) return [];

            $tree = [];

            foreach ($roots as $root) {
                $sqlKids = "
                    SELECT t.name, t.slug
                    FROM {$prefix}terms t
                    INNER JOIN {$prefix}term_taxonomy tt ON t.term_id = tt.term_id
                    WHERE tt.taxonomy = ? AND tt.parent = ? AND tt.count > 0
                    ORDER BY t.name ASC
                ";
                $stmtKids = $pdo->prepare($sqlKids);
                $stmtKids->execute([$taxonomy, $root['term_id']]);
                $children = $stmtKids->fetchAll(PDO::FETCH_ASSOC);

                $node = [
                    'id' => $root['slug'], 
                    'label' => $root['name'],
                    'slug' => $root['slug'],
                    'view_config' => $this->getViewConfig($root['slug']),
                    'specialties' => []
                ];

                foreach ($children as $child) {
                    $node['specialties'][] = [
                        'id' => $child['slug'], 
                        'label' => $child['name'],
                        'parent_label' => $root['name']
                    ];
                }

                if (empty($children) && $root['count'] > 0) {
                     $node['specialties'][] = [
                        'id' => $root['slug'],
                        'label' => 'Р’СЃРµ СЃРїРµС†РёР°Р»РёСЃС‚С‹',
                        'parent_label' => $root['name']
                    ];
                }

                if (!empty($node['specialties'])) {
                    $tree[] = $node;
                }
            }

            return $tree;

        } catch (Exception $e) {
            error_log("getServiceTreeFromWP Error: " . $e->getMessage());
            return [];
        }
    }

    private function getViewConfig($slug) {
        $icon = 'Stethoscope';
        $color = 'blue';

        if (mb_stripos($slug, 'det') !== false || mb_stripos($slug, 'pediatr') !== false) {
            $icon = 'Baby'; $color = 'orange';
        } elseif (mb_stripos($slug, 'cosmet') !== false || mb_stripos($slug, 'kosmet') !== false) {
            $icon = 'Sparkles'; $color = 'purple';
        } elseif (mb_stripos($slug, 'stom') !== false) {
            $icon = 'Smile'; $color = 'teal';
        } elseif (mb_stripos($slug, 'ginec') !== false || mb_stripos($slug, 'woman') !== false) {
            $icon = 'User'; $color = 'pink';
        } elseif (mb_stripos($slug, 'vzrosl') !== false) {
            $icon = 'User'; $color = 'green';
        } elseif (mb_stripos($slug, 'analiz') !== false) {
            $icon = 'Activity'; $color = 'green';
        }

        return ['icon' => $icon, 'color_scheme' => $color];
    }

    private function getCmsConnection() {
        if ($this->cmsPdo === null) {
            $conf = $this->fullConfig['cms']['db'] ?? $this->fullConfig['cms_db'] ?? null;
            if (empty($conf['host']) || empty($conf['dbname'])) return null;
            try {
                $dsn = "mysql:host={$conf['host']};dbname={$conf['dbname']};charset={$conf['charset']}";
                $this->cmsPdo = new PDO($dsn, $conf['user'], $conf['password']);
                $this->cmsPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                error_log("CMS DB Connection Failed: " . $e->getMessage());
                return null;
            }
        }
        return $this->cmsPdo;
    }

    private function getDbPrefix() {
        if (!empty($this->fullConfig['cms']['db']['prefix'])) {
            return $this->fullConfig['cms']['db']['prefix'];
        }
        if (!empty($this->fullConfig['cms_db']['prefix'])) {
            return $this->fullConfig['cms_db']['prefix'];
        }
        return 'wp_';
    }
}


===== FILE: C:\git\apl\med\php_backend\drivers\OneCDriver.php =====

<?php

require_once __DIR__ . '/../interfaces/MisInterface.php';
require_once __DIR__ . '/BaseDriver.php';

class OneCDriver extends BaseDriver implements MisInterface {
    
    private $config;

    public function __construct($fullConfig) {
        parent::__construct($fullConfig);
        $this->config = $fullConfig['1c'] ?? [];
    }

    public function getServiceTreeFromWP() {
        return parent::getServiceTreeFromWP();
    }

    public function getSpecialties($cityCode) {
        $raw = $this->call1C('GetSpecialties', ['City' => $cityCode]);
        $result = [];
        if (is_array($raw)) {
            foreach ($raw as $item) {
                $result[] = $item['Description'] ?? $item['Name'];
            }
        }
        return $result;
    }

    public function getAllDoctorsFromMis($cityCode) {
        $raw = $this->call1C('GetAllDoctors', ['City' => $cityCode]);
        $result = [];
        if (is_array($raw)) {
            foreach ($raw as $d) {
                $result[] = [
                    'qms_id' => $d['Ref_Key'],
                    'name' => $d['Description'],
                    'specialty' => $d['SpecName']
                ];
            }
        }
        return $result;
    }

    // FIXED: Added default value for $dimensions to match Interface
    public function getDoctorsBySpecialty($cityCode, $specialty, $sessionId, $dimensions = []) {
        $params = ['Specialty' => $specialty];
        
        if (!empty($dimensions['branch'])) {
            $params['Branch'] = $dimensions['branch'];
        }

        $rawDoctors = $this->call1C('GetDoctors', $params);
        
        $doctors = [];
        if (is_array($rawDoctors)) {
            foreach ($rawDoctors as $doc) {
                $dbId = '1c_main';
                $price = $doc['PrimaryPrice'] ?? 0;
                
                $offering = [
                    'id' => $doc['Ref_Key'] . '_main',
                    'branch' => [
                        'id' => 'main_branch',
                        'name' => $doc['ClinicName'] ?? 'Р¦РµРЅС‚СЂР°Р»СЊРЅР°СЏ РєР»РёРЅРёРєР°',
                        'city' => $cityCode,
                        'address' => $doc['ClinicAddress'] ?? 'РђРґСЂРµСЃ РєР»РёРЅРёРєРё',
                        'databaseId' => $dbId
                    ],
                    'price' => $price,
                    'price_formatted' => number_format($price, 0, '.', ' ') . ' в‚Ѕ',
                    'databaseId' => $dbId,
                    'is_primary' => true
                ];

                $doctors[] = [
                    'id' => $doc['Ref_Key'], 
                    'qmsId' => $doc['Ref_Key'], 
                    'name' => $doc['Description'], 
                    'specialty' => $doc['SpecialtyName'],
                    'price' => $price,
                    'offerings' => [$offering]
                ];
            }
        }

        return $this->hydrateWithCmsData($doctors);
    }

    public function getDoctorCalendar($dbId, $docId, $specialty, $sessionId) {
        return $this->call1C('GetAvailableDates', ['DoctorID' => $docId]);
    }

    public function getDoctorSlots($dbId, $docId, $date, $specialty, $sessionId) {
        $slots = $this->call1C('GetSchedule', ['DoctorID' => $docId, 'Date' => $date]);
        
        $mappedSlots = [];
        if (is_array($slots)) {
            foreach ($slots as $slot) {
                $mappedSlots[] = [
                    'id' => uniqid(),
                    'time' => $slot['TimeStart'], 
                    'time2appoint' => $slot['TimeInterval'], 
                    'date' => $date,
                    'isAvailable' => true,
                    'price' => $slot['Price']
                ];
            }
        }
        return $mappedSlots;
    }

    public function checkPatientExists($dbId, $patientData, $sessionId) {
        return false;
    }

    public function sendVerificationCode($dbId, $phone, $sessionId) {
        return true;
    }

    public function createAppointment($bookingData, $sessionId) {
        return ['success' => true, 'bookingId' => '1c_' . time()];
    }

    private function call1C($method, $params) {
        if (empty($this->config['api_url'])) return [];
        
        $url = rtrim($this->config['api_url'], '/') . '/' . $method;
        $url .= '?' . http_build_query($params);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        if (!empty($this->config['auth_user'])) {
            curl_setopt($ch, CURLOPT_USERPWD, $this->config['auth_user'] . ":" . $this->config['auth_pass']);
        }
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            return [];
        }

        return json_decode($response, true);
    }
}


===== FILE: C:\git\apl\med\php_backend\drivers\QmsDriver.php =====

<?php

require_once __DIR__ . '/../interfaces/MisInterface.php';
require_once __DIR__ . '/BaseDriver.php';
require_once __DIR__ . '/../services/AsyncHttpService.php';

class QmsDriver extends BaseDriver implements MisInterface {
    
    private $qmsConfig;
    private $httpService;

    public function __construct($fullConfig) {
        parent::__construct($fullConfig);
        $this->qmsConfig = $fullConfig['qms'];
        $this->httpService = new AsyncHttpService();
    }

    public function getServiceTreeFromWP() {
        return parent::getServiceTreeFromWP();
    }

    // RENAMED $context -> $dimensions to match Interface strictly
    public function getDoctorsBySpecialty($cityCode, $specialty, $sessionId, $dimensions = []) {
        
        // 1. ROUTING LAYER
        $targetInstances = $this->resolveTargetInstances($cityCode, $dimensions['routing'] ?? []);

        if (empty($targetInstances)) {
            return [];
        }

        // 2. TRANSPORT LAYER
        // Now performs dual search (Spec + FIO) if the query is not empty
        $rawResponses = $this->fetchFromInstances($targetInstances, $specialty, $sessionId, $dimensions['query'] ?? []);

        // 3. NORMALIZATION LAYER
        $candidates = $this->normalizeResponses($rawResponses, $specialty);

        // 4. PRE-FILTERING LAYER
        $filteredCandidates = $this->applyDimensionalFilters($candidates, $dimensions['filtering'] ?? [], $dimensions['routing'] ?? []);

        // 5. HYDRATION & GROUPING
        $hydratedDoctors = $this->hydrateAndGroup($filteredCandidates, $cityCode);

        // 6. POST-HYDRATION FILTERING
        return $this->filterByTags($hydratedDoctors, $dimensions['filtering'] ?? []);
    }

    // --- STEP 1: ROUTING ---

    private function resolveTargetInstances($cityCode, $routingRules) {
        $targets = array_filter($this->qmsConfig['instances'], function($inst) use ($cityCode) {
            return isset($inst['city_code']) && $inst['city_code'] === $cityCode;
        });

        if (!empty($routingRules['allowed_instances'])) {
            $allowed = array_flip($routingRules['allowed_instances']);
            $targets = array_intersect_key($targets, $allowed);
        }

        if (!empty($routingRules['excluded_instances'])) {
            foreach ($routingRules['excluded_instances'] as $ex) {
                unset($targets[$ex]);
            }
        }

        return $targets;
    }

    // --- STEP 2: TRANSPORT (DUAL SEARCH) ---

    private function fetchFromInstances($instances, $specialty, $sessionId, $queryParams) {
        $requests = [];
        $normalizedSpec = trim($specialty); 

        foreach ($instances as $dbKey => $instance) {
            $baseBody = [
                'apikey' => $instance['api_token'],
                'chatid' => (int)$sessionId
            ];

            if (!empty($queryParams)) {
                $baseBody = array_merge($baseBody, $queryParams);
            }

            $headers = ['apikey: ' . $instance['api_token']];
            $contentType = $instance['content_type'] ?? 'form';

            // 1. Search by Specialty (Strict)
            $requests[$dbKey . '_spec'] = [
                'url' => rtrim($instance['api_url'], '/') . '/getslotsbyspec/',
                'content_type' => $contentType,
                'body' => array_merge($baseBody, ['spec' => $normalizedSpec]),
                'headers' => $headers
            ];

            // 2. Search by FIO (Fuzzy)
            if (mb_strlen($normalizedSpec) >= 2) {
                $requests[$dbKey . '_fio'] = [
                    'url' => rtrim($instance['api_url'], '/') . '/searchdocbyfio/',
                    'content_type' => $contentType,
                    'body' => array_merge($baseBody, ['fio' => $normalizedSpec]),
                    'headers' => $headers
                ];
            }
        }

        return $this->httpService->execute($requests, $this->qmsConfig['api_common']['timeout']);
    }

    // --- STEP 3: NORMALIZATION (MERGE) ---

    private function normalizeResponses($responses, $requestedSpec) {
        $flatList = [];
        $seenIds = [];

        foreach ($responses as $reqKey => $res) {
            // Extract DB Key (remove _spec or _fio suffix)
            $dbKey = preg_replace('/_(spec|fio)$/', '', $reqKey);
            
            if (!$res['success']) continue; 
            
            // Fix for different response structures from qMS
            // getslotsbyspec -> ['slots' => [...]]
            // searchdocbyfio -> ['docs' => ['docs' => [...]]] or ['data' => ['doctors' => [...]]]
            $data = $res['data'];
            $items = [];

            if (isset($data['slots'])) {
                $items = $data['slots'];
            } elseif (isset($data['doctors'])) {
                $items = $data['doctors'];
            } elseif (isset($data['data'])) {
                $items = $data['data'];
            } elseif (isset($data['docs']['docs'])) {
                // searchdocbyfio specific structure: { result: success, docs: { docs: { ID: {...}, ID2: {...} } } }
                $items = $data['docs']['docs'];
            }

            if (empty($items)) continue;

            foreach ($items as $slot) {
                // Ensure we have an ID
                $docId = $slot['qqc'] ?? $slot['id'] ?? $slot['Id'] ?? null;
                if (empty($docId)) continue;

                // Dedup within this request batch
                $uniqueKey = $dbKey . '_' . $docId;
                if (isset($seenIds[$uniqueKey])) continue;
                $seenIds[$uniqueKey] = true;

                $branchInfo = $this->detectBranch($docId);
                $branchCode = $this->extractBranchCode($docId);

                // Mapping keys
                $nameRaw = $slot['fio'] ?? $slot['name'] ?? $slot['docName'] ?? $slot['Name'] ?? 'Р’СЂР°С‡';
                $name = trim($nameRaw);
                
                $specRaw = $slot['spec'] ?? $slot['specialty'] ?? $slot['docSpec'] ?? $slot['Specialty'] ?? $requestedSpec;
                $spec = trim($specRaw);

                $flatList[] = [
                    'qmsId' => $docId,
                    'name' => $name,
                    'specialty' => $spec,
                    'price' => $slot['price'] ?? 0,
                    'branch' => $branchInfo, 
                    'branchCode' => $branchCode, 
                    'databaseId' => $dbKey, 
                ];
            }
        }
        return $flatList;
    }

    // --- STEP 4: PRE-FILTERING (Raw Data) ---

    private function applyDimensionalFilters($candidates, $filterRules, $routingRules) {
        if (empty($candidates)) return [];

        return array_filter($candidates, function($item) use ($filterRules, $routingRules) {
            
            if (!empty($routingRules['allowed_branches'])) {
                if (!in_array($item['branchCode'], $routingRules['allowed_branches'])) {
                    return false;
                }
            }

            if (!empty($filterRules['exclude_keywords'])) {
                foreach ($filterRules['exclude_keywords'] as $keyword) {
                    if (mb_stripos($item['name'], $keyword) !== false || mb_stripos($item['specialty'], $keyword) !== false) {
                        return false;
                    }
                }
            }

            if (!empty($filterRules['require_keywords'])) {
                $found = false;
                foreach ($filterRules['require_keywords'] as $keyword) {
                    if (mb_stripos($item['name'], $keyword) !== false || mb_stripos($item['specialty'], $keyword) !== false) {
                        $found = true; 
                        break;
                    }
                }
                if (!$found) return false;
            }

            return true;
        });
    }

    // --- STEP 5: HYDRATION ---

    private function hydrateAndGroup($candidates, $cityCode) {
        $aggregated = [];

        foreach ($candidates as $item) {
            // Group by Name+Specialty to merge instances
            $key = md5(mb_strtolower($item['name']) . mb_strtolower($item['specialty']));
            
            if (!isset($aggregated[$key])) {
                $aggregated[$key] = [
                    'id' => $item['qmsId'], 
                    'qmsId' => $item['qmsId'],
                    'name' => $item['name'],
                    'specialty' => $item['specialty'],
                    'offerings' => []
                ];
            }

            $aggregated[$key]['offerings'][] = [
                'id' => $item['qmsId'] . '_' . $item['databaseId'],
                'branch' => [
                    'id' => $item['branchCode'],
                    'name' => $item['branch']['name'],
                    'city' => $cityCode,
                    'address' => $item['branch']['address'],
                    'databaseId' => $item['databaseId']
                ],
                'price' => $item['price'],
                'price_formatted' => number_format($item['price'], 0, '.', ' ') . ' в‚Ѕ',
                'databaseId' => $item['databaseId'],
                'is_primary' => false 
            ];
        }

        $doctors = array_values($aggregated);
        return $this->hydrateWithCmsData($doctors);
    }

    // --- STEP 6: POST-FILTERING (Tags) ---

    private function filterByTags($doctors, $filterRules) {
        if (empty($filterRules['require_tags'])) {
            return $doctors;
        }
        
        $required = $filterRules['require_tags'];

        return array_values(array_filter($doctors, function($doc) use ($required) {
            if (empty($doc['tags'])) return false;

            foreach ($required as $reqKey => $reqVal) {
                if (is_numeric($reqKey)) {
                    $foundAny = false;
                    foreach ($doc['tags'] as $dim => $values) {
                        if (in_array($reqVal, $values)) {
                            $foundAny = true; break;
                        }
                    }
                    if (!$foundAny) return false;
                } 
                else {
                    if (!isset($doc['tags'][$reqKey]) || !in_array($reqVal, $doc['tags'][$reqKey])) {
                        return false;
                    }
                }
            }
            return true;
        }));
    }

    // --- HELPERS ---

    public function getSpecialties($cityCode) {
        $instance = $this->getPrimaryInstance($cityCode);
        if (!$instance) return [];
        $response = $this->makeRequest($instance, 'spec_list', ['qqc244' => '']);
        return $response['spec'] ?? [];
    }

    public function getAllDoctorsFromMis($cityCode) {
        return []; 
    }

    public function getDoctorCalendar($dbKey, $docId, $specialty, $sessionId) {
        $instance = $this->getInstance($dbKey);
        $params = [
            'chatid' => (int)$sessionId,
            'spec' => $specialty,
            'qqc244' => $docId,
            'qqc244branch' => $this->extractBranchCode($docId)
        ];
        return $this->makeRequest($instance, 'getslotsbyspec', $params)['slots'] ?? [];
    }

    public function getDoctorSlots($dbKey, $docId, $date, $specialty, $sessionId) {
        $instance = $this->getInstance($dbKey);
        $params = [
            'chatid' => (int)$sessionId,
            'spec' => $specialty,
            'qqc244' => $docId,
            'qqc244branch' => $this->extractBranchCode($docId),
            'day' => $date
        ];
        $response = $this->makeRequest($instance, 'getslotsbyspec', $params);
        return $response['slots'][0]['schedule'] ?? [];
    }

    public function checkPatientExists($dbKey, $p, $sid) { return false; }
    public function sendVerificationCode($dbKey, $p, $sid) { return true; }
    public function createAppointment($data, $sid) { return ['success'=>true]; }

    private function getPrimaryInstance($cityCode) {
        foreach ($this->qmsConfig['instances'] as $inst) {
            if (isset($inst['city_code']) && $inst['city_code'] === $cityCode && !empty($inst['is_primary'])) {
                return $inst;
            }
        }
        $cityInstances = $this->getInstancesByCity($cityCode);
        return !empty($cityInstances) ? reset($cityInstances) : null;
    }

    private function getInstancesByCity($cityCode) {
        return array_filter($this->qmsConfig['instances'], function($inst) use ($cityCode) {
            return isset($inst['city_code']) && $inst['city_code'] === $cityCode;
        });
    }

    private function getInstance($dbKey) {
        if (!isset($this->qmsConfig['instances'][$dbKey])) throw new Exception("Instance not found: $dbKey");
        return $this->qmsConfig['instances'][$dbKey];
    }

    private function makeRequest($instance, $endpoint, $bodyParams) {
        $url = rtrim($instance['api_url'], '/') . '/' . $endpoint . '/';
        $ch = curl_init();
        $bodyParams['apikey'] = $instance['api_token'];
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($bodyParams));
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
            'apikey: ' . $instance['api_token']
        ]);
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $res = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($code !== 200) throw new Exception("API Error $code");
        return json_decode($res, true);
    }

    private function detectBranch($docQq) {
        if (!empty($this->qmsConfig['branches_map'])) {
            foreach ($this->qmsConfig['branches_map'] as $code => $info) {
                if (strpos($docQq, $code) === 0) return $info;
            }
        }
        return ['name' => 'РљР»РёРЅРёРєР°', 'address' => 'РђРґСЂРµСЃ СѓС‚РѕС‡РЅСЏРµС‚СЃСЏ'];
    }

    private function extractBranchCode($docQq) {
        if (!empty($this->qmsConfig['branches_map'])) {
            foreach ($this->qmsConfig['branches_map'] as $code => $info) {
                if (strpos($docQq, $code) === 0) return $code;
            }
        }
        return '';
    }
}


===== FILE: C:\git\apl\med\php_backend\helpers\DoctorFormatter.php =====


<?php

class DoctorFormatter {

    private static $config = null;

    public static function setConfig($config) {
        self::$config = $config;
    }

    /**
     * Р¤РѕСЂРјР°С‚РёСЂСѓРµС‚ РґР°РЅРЅС‹Рµ "РђРєС‚РµСЂР°" (Р’СЂР°С‡Р°) РёР· CMS.
     * Р’РђР–РќРћ: Р­С‚РѕС‚ РјРµС‚РѕРґ Р±РѕР»СЊС€Рµ РЅРµ РґРѕР»Р¶РµРЅ РІРѕР·РІСЂР°С‰Р°С‚СЊ С†РµРЅСѓ РїСЂРёРµРјР° РёР»Рё С„РёР»РёР°Р», 
     * С‚Р°Рє РєР°Рє СЌС‚Рё РґР°РЅРЅС‹Рµ С‚РµРїРµСЂСЊ РґРёРЅР°РјРёС‡РµСЃРєРёРµ Рё РїСЂРёС…РѕРґСЏС‚ РёР· РњРРЎ (СЃР»РѕР№ Offerings).
     * 
     * РњС‹ РѕСЃС‚Р°РІР»СЏРµРј Р·РґРµСЃСЊ С‚РѕР»СЊРєРѕ С‚Рѕ, С‡С‚Рѕ С…Р°СЂР°РєС‚РµСЂРёР·СѓРµС‚ РІСЂР°С‡Р° РєР°Рє Р»РёС‡РЅРѕСЃС‚СЊ/РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»Р°.
     *
     * @param array $wpMeta - СЃС‹СЂС‹Рµ РјРµС‚Р°РґР°РЅРЅС‹Рµ РёР· WP
     * @param int $wpId - ID РІСЂР°С‡Р° РІ WP
     * @param string $photoUrl - URL С„РѕС‚Рѕ
     * @param array $map - РљР°СЂС‚Р° РїРѕР»РµР№ РёР· РєРѕРЅС„РёРіР°
     */
    public static function format(array $wpMeta, int $wpId, string $photoUrl = null, array $map = []): array {
        $data = [
            'cms_id' => $wpId,
            'photoUrl' => $photoUrl,
            'bio' => [],
            'badges' => [],
            'position' => null
        ];

        // Helper to safely get mapped value
        $getVal = function($keyInternal) use ($wpMeta, $map) {
            $wpKey = $map[$keyInternal] ?? null;
            return ($wpKey && isset($wpMeta[$wpKey])) ? trim($wpMeta[$wpKey]) : null;
        };

        // 1. РЎС‚Р°Р¶ (Experience) - РЎС‚Р°С‚РёС‡РµСЃРєРѕРµ СЃРІРѕР№СЃС‚РІРѕ РђРєС‚РµСЂР°
        $experience = 0;
        $rawExp = $getVal('experience'); // e.g. '2010-05-01' or '2010'
        $currentYear = intval(date('Y'));

        if ($rawExp) {
            if (strlen($rawExp) >= 4) {
                $startYear = intval(substr($rawExp, 0, 4));
                if ($startYear > 1950 && $startYear <= $currentYear) {
                    $experience = $currentYear - $startYear;
                }
            } elseif (is_numeric($rawExp) && $rawExp < 100) {
                $experience = intval($rawExp);
            }
        }
        $data['experienceYears'] = $experience;

        // 2. Р¦РµРЅР° - РЈР”РђР›Р•РќРћ. 
        // Р¦РµРЅР° С‚РµРїРµСЂСЊ РѕРїСЂРµРґРµР»СЏРµС‚СЃСЏ СЃР»РѕС‚РѕРј (Offering) РІ РњРРЎ. 
        // Р•СЃР»Рё РІ WP РµСЃС‚СЊ С†РµРЅР° "РѕС‚...", РµС‘ РјРѕР¶РЅРѕ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ С‚РѕР»СЊРєРѕ РєР°Рє fallback РґР»СЏ SEO, 
        // РЅРѕ РІ API РІРёРґР¶РµС‚Р° РјС‹ РґРѕРІРµСЂСЏРµРј РњРРЎ.

        // 3. Р‘Р•Р™Р”Р–Р (Regalia) - РЎРІРѕР№СЃС‚РІР° РђРєС‚РµСЂР°
        
        // A) РЈС‡РµРЅР°СЏ СЃС‚РµРїРµРЅСЊ
        $stepen = $getVal('degree');
        if ($stepen) {
            if (mb_stripos($stepen, 'РєР°РЅРґРёРґР°С‚') !== false) $label = 'Рљ.Рњ.Рќ.';
            elseif (mb_stripos($stepen, 'РґРѕРєС‚РѕСЂ') !== false) $label = 'Р”.Рњ.Рќ.';
            else $label = $stepen;

            $data['badges'][] = [
                'type' => 'degree',
                'label' => $label,
                'code' => 'degree'
            ];
        }

        // B) РљР°С‚РµРіРѕСЂРёСЏ
        $cat = $getVal('category');
        if ($cat) {
            if (mb_stripos($cat, 'РІС‹СЃС€') !== false) $label = 'Р’С‹СЃС€Р°СЏ РєР°С‚РµРіРѕСЂРёСЏ';
            elseif (mb_stripos($cat, 'РїРµСЂРІ') !== false) $label = 'РџРµСЂРІР°СЏ РєР°С‚РµРіРѕСЂРёСЏ';
            else $label = $cat;

            $data['badges'][] = [
                'type' => 'category',
                'label' => $label,
                'code' => 'category'
            ];
        }

        // 4. Р”РѕР»Р¶РЅРѕСЃС‚СЊ
        $data['position'] = $getVal('position');

        // 5. РљРѕРЅС‚РµРЅС‚ (Р‘РёРѕ)
        $education = $getVal('education') ?? '';
        $extra = $getVal('extra_edu') ?? '';
        
        $fullEducation = $education;
        if ($extra) {
            $fullEducation .= "<h4>РџРѕРІС‹С€РµРЅРёРµ РєРІР°Р»РёС„РёРєР°С†РёРё:</h4>" . $extra;
        }

        $data['content'] = [
            'anonce' => $getVal('bio_short'),
            'full_position' => $data['position'],
            'activities_html' => self::cleanHtml($getVal('bio_full')),
            'education_html' => self::cleanHtml($fullEducation),
        ];

        return $data;
    }

    private static function cleanHtml($html) {
        if (empty($html)) return null;
        // Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РґРѕР±Р°РІРёС‚СЊ strip_tags, РµСЃР»Рё РЅСѓР¶РЅРѕ РѕР±РµР·РѕРїР°СЃРёС‚СЊ РІС‹РІРѕРґ
        return trim($html);
    }
}



===== FILE: C:\git\apl\med\php_backend\index.php =====

<?php
// index.php
// Р­С‚РѕС‚ С„Р°Р№Р» РЅСѓР¶РµРЅ, С‡С‚РѕР±С‹ СЃРµСЂРІРµСЂ РЅРµ РІС‹РґР°РІР°Р» РѕС€РёР±РєСѓ 403 (Forbidden) 
// РїСЂРё Р·Р°С…РѕРґРµ РІ РїР°РїРєСѓ, РµСЃР»Рё .htaccess РёРіРЅРѕСЂРёСЂСѓРµС‚СЃСЏ РЅР°СЃС‚СЂРѕР№РєР°РјРё С…РѕСЃС‚РёРЅРіР°.

header("Location: dev_dashboard.php");
exit;



===== FILE: C:\git\apl\med\php_backend\interfaces\MisInterface.php =====


<?php

/**
 * Interface MisInterface v2.0
 * Strict Contract for Booking Drivers.
 * 
 * Concepts:
 * - Dimensions: A map of filters (city, audience, branch) used to route requests.
 * - Hydration: The process of merging MIS data with CMS data.
 */
interface MisInterface {
    
    // --- READ METHODS ---
    
    /**
     * Get the tree of specialties/categories for the initial screen.
     * @return array Tree structure for navigation.
     */
    public function getServiceTreeFromWP();

    /**
     * Core Search Method.
     * Fetches doctors from multiple databases based on the context.
     * 
     * @param string $cityCode
     * @param string $specialty (or Search Query)
     * @param string $sessionId
     * @param array $dimensions Context rules (e.g. ['audience' => 'child', 'branch' => 'main'])
     * @return array List of Hydrated Doctors with Offerings.
     */
    public function getDoctorsBySpecialty($cityCode, $specialty, $sessionId, $dimensions = []);
    
    /**
     * Get available days for a specific doctor/offering.
     */
    public function getDoctorCalendar($dbId, $docId, $specialty, $sessionId);

    /**
     * Get time slots for a specific day.
     */
    public function getDoctorSlots($dbId, $docId, $date, $specialty, $sessionId);

    /**
     * Raw fetch for indexing and mapping tools.
     * @return array Flat list of all doctors in the MIS.
     */
    public function getAllDoctorsFromMis($cityCode);

    // --- WRITE METHODS (TRANSACTIONAL) ---
    
    /**
     * Step 1 of Booking: Check if patient exists.
     */
    public function checkPatientExists($dbId, $patientData, $sessionId);

    /**
     * Step 2 of Booking: Send OTP (if auth_first).
     */
    public function sendVerificationCode($dbId, $phone, $sessionId);

    /**
     * Step 3 of Booking: Finalize appointment.
     */
    public function createAppointment($bookingData, $sessionId);
}



===== FILE: C:\git\apl\med\php_backend\qms_debug.php =====

<?php
/**
 * qMS API Debugger v3.6 - "The Form Urlencoded Edition"
 * РСЃРїСЂР°РІР»РµРЅРѕ: РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ x-www-form-urlencoded, apikey РґРѕР±Р°РІР»СЏРµС‚СЃСЏ РІ С‚РµР»Рѕ Р·Р°РїСЂРѕСЃР°.
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);

$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : die("Config missing");
$instances = $config['qms']['instances'];

$currentInst = $_GET['inst'] ?? array_keys($instances)[0];
$action = $_GET['action'] ?? 'getslotsbyspec';
$contentType = $_GET['content_type'] ?? 'form'; // РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ FORM

// РџРѕР»СѓС‡Р°РµРј СЃРїРёСЃРѕРє СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚РµР№ РґР»СЏ РІС‹РїР°РґР°СЋС‰РµРіРѕ СЃРїРёСЃРєР°
$api = $instances[$currentInst];
$specListUrl = rtrim($api['api_url'], '/') . '/spec_list/';
$chS = curl_init($specListUrl);
curl_setopt($chS, CURLOPT_POST, 1);
// Р”Р»СЏ spec_list apikey Рё chatid РЅСѓР¶РЅС‹ РІ С‚РµР»Рµ РєР°Рє form-data
$specBody = [
    'apikey' => $api['api_token'], 
    'chatid' => 1, 
    'qqc244' => ''
];
curl_setopt($chS, CURLOPT_POSTFIELDS, http_build_query($specBody));
curl_setopt($chS, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
curl_setopt($chS, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chS, CURLOPT_SSL_VERIFYPEER, false);
$specRes = json_decode(curl_exec($chS), true);
curl_close($chS);
$availableSpecs = $specRes['spec'] ?? [];

$result = null;

if (isset($_GET['execute'])) {
    $url = rtrim($api['api_url'], '/') . '/' . $action . '/';
    $params = [];
    
    // Р’РђР–РќРћ: API Key РІСЃРµРіРґР° РґРѕР±Р°РІР»СЏРµРј РІ РїР°СЂР°РјРµС‚СЂС‹
    $params['apikey'] = $api['api_token'];
    $params['chatid'] = !empty($_GET['chatid']) ? (int)$_GET['chatid'] : 206156880;

    if ($action === 'getslotsbyspec' || $action === 'spec_list') {
        if (!empty($_GET['spec'])) $params['spec'] = $_GET['spec'];
        if (!empty($_GET['qqc244branch'])) $params['qqc244branch'] = $_GET['qqc244branch'];
        if (!empty($_GET['qqc244'])) $params['qqc244'] = $_GET['qqc244'];
        if (!empty($_GET['day'])) $params['day'] = $_GET['day'];
    }

    // Р”Р»СЏ getServicesToAppoint
    if ($action === 'getServicesToAppoint') {
        $params['unauthorized'] = 1;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HEADER, true);
    
    // Р’ С…РµРґРµСЂРµ apikey С‚РѕР¶Рµ РѕСЃС‚Р°РІРёРј, РЅР° РІСЃСЏРєРёР№ СЃР»СѓС‡Р°Р№, РЅРѕ РґР°РЅРЅС‹Рµ С€Р»РµРј РІ body
    $headers = [];
    
    if ($contentType === 'json') {
        $headers[] = 'Content-Type: application/json';
        $payload = json_encode($params); 
    } else {
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';
        $payload = http_build_query($params);
    }

    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    $fullResponse = curl_exec($ch);
    $info = curl_getinfo($ch);
    $headerSize = $info['header_size'];
    $resBody = substr($fullResponse, $headerSize);
    curl_close($ch);

    $result = [
        'full_url' => $url,
        'sent_payload' => $payload,
        'http_code' => $info['http_code'],
        'res_body' => $resBody,
        'res_json' => json_decode($resBody, true)
    ];
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>qMS Debugger 3.6</title>
    <style>
        body { font-family: -apple-system, sans-serif; background: #f6f8fa; padding: 20px; color: #24292e; }
        .card { background: #fff; border-radius: 8px; border: 1px solid #e1e4e8; padding: 24px; margin-bottom: 20px; }
        .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 24px; }
        label { display: block; font-size: 12px; font-weight: 600; margin-bottom: 6px; color: #586069; text-transform: uppercase; }
        input, select { width: 100%; padding: 10px; border: 1px solid #d1d5da; border-radius: 6px; background: #fafbfc; }
        .btn-group { display: flex; gap: 8px; margin-bottom: 20px; background: #ebf0f4; padding: 5px; border-radius: 8px; }
        .mode-btn { flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; background: transparent; color: #586069; transition: 0.2s; }
        .mode-btn.active { background: #fff; color: #0366d6; shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .btn-submit { background: #2ea44f; color: #fff; border: 1px solid rgba(27,31,35,.15); padding: 12px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: 600; font-size: 16px; margin-top: 20px; }
        pre { background: #24292e; color: #e1e4e8; padding: 16px; border-radius: 6px; font-size: 12px; overflow: auto; line-height: 1.5; }
        .section-title { font-size: 14px; font-weight: 600; margin-bottom: 16px; border-bottom: 1px solid #e1e4e8; padding-bottom: 8px; }
        .radio-group { display: flex; gap: 15px; margin-bottom: 15px; }
    </style>
    <script>
        function setMode(action, label) {
            document.getElementById('f_action').value = action;
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            event.target.classList.add('active');
            
            if (action === 'getslotsbyspec') {
                document.getElementById('f_spec').value = 'Р’СЂР°С‡-РЅРµРІСЂРѕР»РѕРі';
            }
        }
    </script>
</head>
<body>

<div style="max-width: 1000px; margin: 0 auto;">
    <div class="card">
        <div class="section-title">1. Р’С‹Р±РµСЂРёС‚Рµ СЂРµР¶РёРј Р·Р°РїСЂРѕСЃР°</div>
        <div class="btn-group">
            <button type="button" class="mode-btn <?= $action == 'branch_list' ? 'active' : '' ?>" onclick="setMode('branch_list')">рџЏў РЎРїРёСЃРѕРє С„РёР»РёР°Р»РѕРІ</button>
            <button type="button" class="mode-btn <?= $action == 'spec_list' ? 'active' : '' ?>" onclick="setMode('spec_list')">рџ“‹ РЎРїРёСЃРѕРє СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚РµР№</button>
            <button type="button" class="mode-btn <?= $action == 'getslotsbyspec' ? 'active' : '' ?>" onclick="setMode('getslotsbyspec')">рџ‘ЁвЂЌвљ•пёЏ РџРћРРЎРљ Р’Р РђР§Р•Р™ Р РЎР›РћРўРћР’</button>
            <button type="button" class="mode-btn <?= $action == 'getServicesToAppoint' ? 'active' : '' ?>" onclick="setMode('getServicesToAppoint')">рџЏҐ ServicesToAppoint (JSON)</button>
        </div>

        <form method="GET">
            <input type="hidden" name="action" id="f_action" value="<?= htmlspecialchars($action) ?>">
            
            <div class="grid">
                <div>
                    <label>РљР»РёРЅРёРєР° (РРЅСЃС‚Р°РЅСЃ)</label>
                    <select name="inst">
                        <?php foreach($instances as $k => $v): ?>
                            <option value="<?= $k ?>" <?= $currentInst == $k ? 'selected' : '' ?>><?= $v['name'] ?></option>
                        <?php endforeach; ?>
                    </select>
                    
                    <label style="margin-top:15px;">CHATID (РћР±СЏР·Р°С‚РµР»СЊРЅРѕ)</label>
                    <input type="text" name="chatid" value="<?= htmlspecialchars($_GET['chatid'] ?? '206156880') ?>">

                    <label style="margin-top:15px;">РўРёРї РєРѕРЅС‚РµРЅС‚Р°</label>
                    <div class="radio-group">
                        <label><input type="radio" name="content_type" value="form" <?= $contentType == 'form' ? 'checked' : '' ?>> Form-Urlencoded</label>
                        <label><input type="radio" name="content_type" value="json" <?= $contentType == 'json' ? 'checked' : '' ?>> JSON</label>
                    </div>
                </div>
                
                <div>
                    <label>Р’С‹Р±СЂР°С‚СЊ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ</label>
                    <select onchange="document.getElementById('f_spec').value = this.value">
                        <option value="">-- Р’С‹Р±РµСЂРёС‚Рµ РёР· СЃРїРёСЃРєР° --</option>
                        <?php foreach($availableSpecs as $s): ?>
                            <option value="<?= $s ?>" <?= ($_GET['spec'] ?? '') == $s ? 'selected' : '' ?>><?= $s ?></option>
                        <?php endforeach; ?>
                    </select>

                    <label style="margin-top:15px;">РўРµРєСѓС‰Р°СЏ СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ (spec)</label>
                    <input type="text" name="spec" id="f_spec" value="<?= htmlspecialchars($_GET['spec'] ?? 'Р’СЂР°С‡-РЅРµРІСЂРѕР»РѕРі') ?>">
                </div>
            </div>

            <button type="submit" name="execute" value="1" class="btn-submit">Р’Р«РџРћР›РќРРўР¬ Р—РђРџР РћРЎ вљЎ</button>
        </form>
    </div>

    <?php if ($result): ?>
        <div class="card">
            <div class="section-title">рџ“Ў РўРµС…РЅРёС‡РµСЃРєРёР№ РѕС‚С‡РµС‚ (HTTP <?= $result['http_code'] ?>)</div>
            <div class="grid">
                <div>
                    <label>РћС‚РїСЂР°РІР»РµРЅРѕ РІ API</label>
                    <pre><?= htmlspecialchars($result['sent_payload']) ?></pre>
                    <div style="font-size: 10px; color: #6a737d; margin-top: 5px;">URL: <?= $result['full_url'] ?></div>
                </div>
                <div>
                    <label>РћС‚РІРµС‚ РѕС‚ qMS</label>
                    <pre><?php echo json_encode($result['res_json'] ?: $result['res_body'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE); ?></pre>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

</body>
</html>


===== FILE: C:\git\apl\med\php_backend\QmsGateway.php =====

<?php
// DEPRECATED.
// Logic moved to drivers/QmsDriver.php
// This file can be deleted.



===== FILE: C:\git\apl\med\php_backend\services\AsyncHttpService.php =====

<?php

class AsyncHttpService {
    
    /**
     * Р’С‹РїРѕР»РЅСЏРµС‚ РїР°СЂР°Р»Р»РµР»СЊРЅС‹Рµ POST Р·Р°РїСЂРѕСЃС‹.
     * 
     * @param array $requests РњР°СЃСЃРёРІ РєРѕРЅС„РёРіСѓСЂР°С†РёР№: ['key' => ['url' => '...', 'content_type' => 'json'|'form', 'headers' => [], 'body' => []]]
     * @param int $timeout РўР°Р№РјР°СѓС‚ РІ СЃРµРєСѓРЅРґР°С…
     * @return array РњР°СЃСЃРёРІ РѕС‚РІРµС‚РѕРІ: ['key' => ['success' => bool, 'data' => mixed, 'code' => int]]
     */
    public function execute(array $requests, $timeout = 5) {
        $mh = curl_multi_init();
        $channels = [];
        $results = [];

        // 1. РРЅРёС†РёР°Р»РёР·Р°С†РёСЏ РєР°РЅР°Р»РѕРІ
        foreach ($requests as $key => $config) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $config['url']);
            curl_setopt($ch, CURLOPT_POST, 1);
            
            $headers = $config['headers'] ?? [];
            $contentType = $config['content_type'] ?? 'json'; // РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ JSON

            if ($contentType === 'form') {
                $headers[] = 'Content-Type: application/x-www-form-urlencoded';
                if (!empty($config['body'])) {
                    // РљРѕРґРёСЂСѓРµРј РєР°Рє query string РґР»СЏ С„РѕСЂРјС‹
                    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($config['body']));
                }
            } else {
                $headers[] = 'Content-Type: application/json';
                if (!empty($config['body'])) {
                    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($config['body']));
                }
            }
            
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            
            curl_multi_add_handle($mh, $ch);
            $channels[$key] = $ch;
        }

        // 2. Р’С‹РїРѕР»РЅРµРЅРёРµ
        $running = null;
        do {
            curl_multi_exec($mh, $running);
        } while ($running);

        // 3. РЎР±РѕСЂ СЂРµР·СѓР»СЊС‚Р°С‚РѕРІ
        foreach ($channels as $key => $ch) {
            $responseRaw = curl_multi_getcontent($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $error = curl_error($ch);
            
            $success = ($httpCode === 200 && $responseRaw);
            
            $results[$key] = [
                'success' => $success,
                'code' => $httpCode,
                'data' => $success ? json_decode($responseRaw, true) : null,
                'raw_response' => $responseRaw, // Р”Р»СЏ РѕС‚Р»Р°РґРєРё, РµСЃР»Рё JSON decode РЅРµ РїСЂРѕС€РµР»
                'error' => $error
            ];

            if (!$success) {
                error_log("AsyncHttpService Error [$key]: Code $httpCode. $error");
            }

            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
        }
        
        curl_multi_close($mh);
        return $results;
    }
}



===== FILE: C:\git\apl\med\php_backend\services\OpenAiClient.php =====

<?php
// [DEPRECATED] 
// AI Client was removed in version 2.4.
// This file is kept as a placeholder.
class OpenAiClient {}


===== FILE: C:\git\apl\med\php_backend\services\RecaptchaService.php =====


<?php

class RecaptchaService {
    private $secretKey;
    private $minScore;
    private $enabled;

    public function __construct($config) {
        $this->enabled = $config['enabled'] ?? true;
        $this->secretKey = $config['secret_key'] ?? '';
        $this->minScore = $config['min_score'] ?? 0.5;
    }

    public function verify($token) {
        if (!$this->enabled) {
            return ['success' => true];
        }

        if (empty($this->secretKey)) {
            return ['success' => false, 'error' => 'reCAPTCHA secret not configured'];
        }

        if (empty($token)) {
            return ['success' => false, 'error' => 'Token is missing'];
        }

        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = http_build_query([
            'secret' => $this->secretKey,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
        ]);

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => $data,
                'timeout' => 10
            ]
        ];

        $context = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);

        if ($result === false) {
            return ['success' => false, 'error' => 'Failed to connect to reCAPTCHA service'];
        }

        $response = json_decode($result, true);

        if (!($response['success'] ?? false)) {
            $codes = implode(', ', $response['error-codes'] ?? []);
            return ['success' => false, 'error' => 'reCAPTCHA invalid: ' . $codes];
        }

        if (isset($response['score']) && $response['score'] < $this->minScore) {
            return ['success' => false, 'error' => 'Low reCAPTCHA score (' . $response['score'] . ')'];
        }

        return ['success' => true];
    }
}



===== FILE: C:\git\apl\med\php_backend\services\VectorService.php =====

<?php
// [DEPRECATED] 
// Vector Search Service was removed in version 2.4.
// This file is kept as a placeholder to prevent fatal errors if old code tries to include it.
// It should be deleted in the next major release.
class VectorService {}


===== FILE: C:\git\apl\med\php_backend\setup_db.php =====

<?php
// setup_db.php - Database Migration Tool

ini_set('display_errors', 1);
error_reporting(E_ALL);

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    die("Config not found");
}
$config = require $configFile;

try {
    $pdo = $config['helpers']['get_db_conn']($config);
    $prefix = $config['cms_db']['prefix'];

    echo "<h2>Database Migration Tool (Booking Core)</h2>";

    // 0. CLEANUP (Remove AI Tails)
    // РЈРґР°Р»СЏРµРј С‚Р°Р±Р»РёС†С‹ Рё СЂР°СЃС€РёСЂРµРЅРёСЏ, СЃРІСЏР·Р°РЅРЅС‹Рµ СЃ РІРµРєС‚РѕСЂРЅС‹Рј РїРѕРёСЃРєРѕРј
    echo "<h3>рџ§№ Cleaning up AI components...</h3>";
    
    $pdo->exec("DROP TABLE IF EXISTS doc_vectors;");
    echo "<div style='color:gray'>вњ” Table 'doc_vectors' dropped (if existed).</div>";
    
    // РњС‹ РЅРµ СѓРґР°Р»СЏРµРј СЂР°СЃС€РёСЂРµРЅРёРµ vector, С‚Р°Рє РєР°Рє РѕРЅРѕ РјРѕР¶РµС‚ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ РґСЂСѓРіРёРјРё РїСЂРёР»РѕР¶РµРЅРёСЏРјРё РІ СЌС‚РѕР№ Р‘Р”,
    // РЅРѕ РµСЃР»Рё СЌС‚Рѕ РІС‹РґРµР»РµРЅРЅР°СЏ Р‘Р”, РјРѕР¶РЅРѕ СЂР°СЃРєРѕРјРјРµРЅС‚РёСЂРѕРІР°С‚СЊ:
    // $pdo->exec("DROP EXTENSION IF EXISTS vector;");

    // 1. Table: Booking Idempotency Log
    $tableLog = $prefix . "booking_log";
    $sqlLog = "CREATE TABLE IF NOT EXISTS $tableLog (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        booking_uuid VARCHAR(36) NOT NULL,
        doctor_id VARCHAR(50),
        patient_phone VARCHAR(20),
        status VARCHAR(20) NOT NULL, -- 'pending', 'success', 'error'
        response_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY idx_uuid (booking_uuid),
        INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($sqlLog);
    echo "<div style='color:green'>вњ” Table '$tableLog' checked/created.</div>";

    // 2. Table: Waitlist
    $tableWait = $prefix . "booking_waitlist";
    $sqlWait = "CREATE TABLE IF NOT EXISTS $tableWait (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        city VARCHAR(20),
        specialty VARCHAR(100),
        doctor_id VARCHAR(50) NULL,
        doctor_name VARCHAR(150) NULL,
        patient_name VARCHAR(150),
        patient_phone VARCHAR(20),
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sqlWait);
    echo "<div style='color:green'>вњ” Table '$tableWait' checked/created.</div>";

    echo "<br><br><b>Migration completed. System is clean from AI tables.</b>";

} catch (Exception $e) {
    echo "<div style='color:red'>Error: " . $e->getMessage() . "</div>";
}


===== FILE: C:\git\apl\med\php_backend\setup_qms_mapping.sql =====

-- Р­РўРћРў РЎРљР РРџРў РќРЈР–РќРћ Р’Р«РџРћР›РќРРўР¬ Р’ PHPMYADMIN
-- РћРЅ РґРѕР±Р°РІРёС‚ РјРµС‚Р°-РїРѕР»Рµ 'qms_id' РІСЃРµРј РІСЂР°С‡Р°Рј, С‡С‚РѕР±С‹ РјС‹ РјРѕРіР»Рё СЃРІСЏР·Р°С‚СЊ РёС… СЃ qMS.

-- 1. РЎРЅР°С‡Р°Р»Р° РїРѕСЃРјРѕС‚СЂРёРј, РєР°РєРёРµ РІСЂР°С‡Рё РµСЃС‚СЊ (РґР»СЏ СЃРїСЂР°РІРєРё)
SELECT ID, display_name FROM wp_users WHERE ID IN (SELECT user_id FROM wp_usermeta WHERE meta_key = 'wp_capabilities' AND meta_value LIKE '%doctor%');

-- 2. РџР РРњР•Р : РџСЂРёРІСЏР·РєР° РІСЂР°С‡Р° "РџРµСЂРІСѓС€РёРЅР° Р•Р»РµРЅР° Р’Р»Р°РґРёРјРёСЂРѕРІРЅР°" (ID 516 РёР· С‚РІРѕРµРіРѕ РґР°РјРїР°) Рє ID РёР· qMS.
-- Р—Р°РјРµРЅРё 'VALUE_FROM_QMS' РЅР° СЂРµР°Р»СЊРЅС‹Р№ РєРѕРґ РІСЂР°С‡Р° РёР· qMS (РЅР°РїСЂРёРјРµСЂ, 'B01.001.01' РёР»Рё 'QQC...')
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) 
VALUES (516, 'qms_id', 'REPLACE_WITH_REAL_QMS_ID_FOR_PERVUSHINA');

-- 3. РџР РРњР•Р : РџСЂРёРІСЏР·РєР° РІСЂР°С‡Р° "Р’РµСЂРµРёРЅ Р’Р°РґРёРј РњРёС…Р°Р№Р»РѕРІРёС‡" (ID 512)
INSERT INTO wp_usermeta (user_id, meta_key, meta_value) 
VALUES (512, 'qms_id', 'REPLACE_WITH_REAL_QMS_ID_FOR_VEREIN');

-- РџРћР’РўРћР РРўР¬ Р”Р›РЇ Р’РЎР•РҐ Р’Р РђР§Р•Р™, РљРћРўРћР Р«РҐ РќРЈР–РќРћ РџРћРљРђР—РђРўР¬ Р’ Р’РР”Р–Р•РўР•.
-- Р‘РµР· СЌС‚РѕРіРѕ РїРѕР»СЏ РІРёРґР¶РµС‚ РЅРµ СЃРјРѕР¶РµС‚ "СѓР·РЅР°С‚СЊ" РІСЂР°С‡Р° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РґР°РЅРЅС‹С… РёР· API qMS.



===== FILE: C:\git\apl\med\php_backend\supabase_setup.sql =====


-- 1. Р’РєР»СЋС‡Р°РµРј СЂР°СЃС€РёСЂРµРЅРёРµ РґР»СЏ РІРµРєС‚РѕСЂРѕРІ
create extension if not exists vector;

-- 2. РўР°Р±Р»РёС†Р° РґР»СЏ С…СЂР°РЅРµРЅРёСЏ РєСѓСЃРєРѕРІ Р·РЅР°РЅРёР№ (Knowledge Chunks)
create table if not exists doc_vectors (
  id bigserial primary key,
  doc_id text not null,           -- ID РІСЂР°С‡Р° (РЅР°РїСЂ. 'chel_m_1')
  content text,                   -- РЎР°Рј С‚РµРєСЃС‚ (Р±РёРѕ, СѓСЃР»СѓРіРё)
  metadata jsonb,                 -- Р”РѕРї. РґР°РЅРЅС‹Рµ (РёРјСЏ РІСЂР°С‡Р°, СЃСЃС‹Р»РєР°)
  embedding vector(1536)          -- Р’РµРєС‚РѕСЂ (1536 СЂР°Р·РјРµСЂРЅРѕСЃС‚СЊ РґР»СЏ OpenAI/DeepSeek v3)
);

-- 3. РРЅРґРµРєСЃ РґР»СЏ Р±С‹СЃС‚СЂРѕРіРѕ РїРѕРёСЃРєР° (HNSW)
create index on doc_vectors using hnsw (embedding vector_cosine_ops);

-- 4. Р¤СѓРЅРєС†РёСЏ РїРѕРёСЃРєР° (RPC), РєРѕС‚РѕСЂСѓСЋ РјС‹ Р±СѓРґРµРј РґРµСЂРіР°С‚СЊ РёР· PHP
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query(
    select
      doc_vectors.id,
      doc_vectors.content,
      doc_vectors.metadata,
      1 - (doc_vectors.embedding <=> query_embedding) as similarity
    from doc_vectors
    where 1 - (doc_vectors.embedding <=> query_embedding) > match_threshold
    order by doc_vectors.embedding <=> query_embedding
    limit match_count
  );
end;
$$;



===== FILE: C:\git\apl\med\php_backend\tools\fix_structure.php =====


<?php
// php_backend/tools/fix_structure.php
// РЎРєСЂРёРїС‚ Р»РµС‡РµРЅРёСЏ СЃС‚СЂСѓРєС‚СѓСЂС‹ РґР°РЅРЅС‹С…: РїРµСЂРµРЅРѕСЃ ACF СЃРІСЏР·РµР№ РІ РЅР°С‚РёРІРЅС‹Рµ СЃРІСЏР·Рё WP.

ini_set('display_errors', 1);
error_reporting(E_ALL);

$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) die("Config not found");
$config = require $configPath;

// 1. РџРѕР»СѓС‡Р°РµРј СЃРѕРµРґРёРЅРµРЅРёРµ
try {
    $pdo = $config['helpers']['get_db_conn']($config);
} catch (Exception $e) {
    die("вќЊ РћС€РёР±РєР° РїРѕРґРєР»СЋС‡РµРЅРёСЏ Рє Р‘Р”: " . $e->getMessage());
}

// 2. РћРїСЂРµРґРµР»СЏРµРј РїСЂРµС„РёРєСЃ (Р±РѕР»РµРµ РЅР°РґРµР¶РЅС‹Р№ СЃРїРѕСЃРѕР±)
$prefix = 'wp_'; // Р—РЅР°С‡РµРЅРёРµ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
if (isset($config['cms']['db']['prefix'])) {
    $prefix = $config['cms']['db']['prefix'];
} elseif (isset($config['cms_db']['prefix'])) {
    $prefix = $config['cms_db']['prefix'];
}

$usersTable = $prefix . 'users';
$metaTable = $prefix . 'usermeta';
$relTable = $prefix . 'term_relationships';
$termTaxTable = $prefix . 'term_taxonomy';
$termsTable = $prefix . 'terms';

echo "<h1>рџ›  Р›РµС‡РµРЅРёРµ СЃС‚СЂСѓРєС‚СѓСЂС‹ РґР°РЅРЅС‹С…</h1>";
echo "<div style='color: gray; font-size: 0.8em; margin-bottom: 20px;'>Prefix: <b>$prefix</b> | Meta Table: <b>$metaTable</b></div>";

// 3. РќР°С…РѕРґРёРј РІСЂР°С‡РµР№ СЃ Р·Р°РїРѕР»РЅРµРЅРЅС‹Рј РїРѕР»РµРј directions
try {
    $sql = "
        SELECT user_id, meta_value 
        FROM $metaTable 
        WHERE meta_key = 'directions' 
        AND meta_value LIKE 'a:%' -- РС‰РµРј СЃРµСЂРёР°Р»РёР·РѕРІР°РЅРЅС‹Рµ РјР°СЃСЃРёРІС‹
    ";
    $stmt = $pdo->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("<div style='color:red'><b>SQL Error:</b> " . $e->getMessage() . "<br>РџСЂРѕРІРµСЂСЊС‚Рµ РїСЂРµС„РёРєСЃ С‚Р°Р±Р»РёС† РІ config_access.php</div>");
}

echo "<p>РќР°Р№РґРµРЅРѕ РІСЂР°С‡РµР№ СЃ ACF-РЅР°РїСЂР°РІР»РµРЅРёСЏРјРё: <b>" . count($rows) . "</b></p>";

$fixedCount = 0;
$termsCount = 0;

foreach ($rows as $row) {
    $userId = $row['user_id'];
    $raw = $row['meta_value'];
    $termIds = @unserialize($raw);

    if (is_array($termIds) && !empty($termIds)) {
        $fixedCount++;
        foreach ($termIds as $termId) {
            // Р’ WP С‚Р°Р±Р»РёС†Р° term_relationships СЃРІСЏР·С‹РІР°РµС‚ object_id c term_taxonomy_id!
            
            // РќР°С…РѕРґРёРј term_taxonomy_id РґР»СЏ СЌС‚РѕРіРѕ term_id (С‚Р°РєСЃРѕРЅРѕРјРёСЏ directions)
            // Р”РѕР±Р°РІР»РµРЅР° РїСЂРѕРІРµСЂРєР° taxonomy, С‡С‚РѕР±С‹ РЅРµ Р»РёРЅРєРѕРІР°С‚СЊ Р»РёС€РЅРµРµ
            $ttSql = "SELECT term_taxonomy_id FROM $termTaxTable WHERE term_id = ? AND taxonomy = 'directions'";
            $ttStmt = $pdo->prepare($ttSql);
            $ttStmt->execute([$termId]);
            $ttId = $ttStmt->fetchColumn();

            if ($ttId) {
                // Р’СЃС‚Р°РІР»СЏРµРј СЃРІСЏР·СЊ (IGNORE С‡С‚РѕР±С‹ РЅРµ РґСѓР±Р»РёСЂРѕРІР°С‚СЊ)
                $ins = $pdo->prepare("INSERT IGNORE INTO $relTable (object_id, term_taxonomy_id, term_order) VALUES (?, ?, 0)");
                $ins->execute([$userId, $ttId]);
                if ($ins->rowCount() > 0) {
                    $termsCount++;
                }
                
                // РћР±РЅРѕРІР»СЏРµРј СЃС‡РµС‚С‡РёРє Р·Р°РїРёСЃРµР№ РІ С‚РµСЂРјРёРЅРµ (РѕРїС†РёРѕРЅР°Р»СЊРЅРѕ, РЅРѕ РїРѕР»РµР·РЅРѕ РґР»СЏ WP)
                $pdo->query("UPDATE $termTaxTable SET count = count + 1 WHERE term_taxonomy_id = $ttId");
            }
        }
    }
}

echo "<div style='background:#dcfce7; padding:15px; border-radius:8px; border:1px solid #22c55e; color:#166534;'>";
echo "вњ… РћР±СЂР°Р±РѕС‚Р°РЅРѕ РІСЂР°С‡РµР№: <b>$fixedCount</b><br>";
echo "вњ… Р’РѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРѕ СЃРІСЏР·РµР№: <b>$termsCount</b><br>";
echo "РўРµРїРµСЂСЊ РїР»РёС‚РєРё РЅР° РіР»Р°РІРЅРѕР№ РґРѕР»Р¶РЅС‹ СЂР°Р±РѕС‚Р°С‚СЊ РєРѕСЂСЂРµРєС‚РЅРѕ!";
echo "</div>";

echo "<br><a href='../dev_dashboard.php'>&larr; Р’РµСЂРЅСѓС‚СЊСЃСЏ РІ РґР°С€Р±РѕСЂРґ</a>";



===== FILE: C:\git\apl\med\php_backend\tools\generate_requirements.php =====


<?php
// php_backend/tools/generate_requirements.php
// Р“РµРЅРµСЂРёСЂСѓРµС‚ "Р”РѕРјР°С€РЅРµРµ Р·Р°РґР°РЅРёРµ" РґР»СЏ РєР»РёРµРЅС‚Р° (РЎРїРёСЃРѕРє С‚СЂРµР±РѕРІР°РЅРёР№) РЅР° РѕСЃРЅРѕРІРµ РѕС‚РІРµС‚РѕРІ РІ Wizard.

$jsonFile = __DIR__ . '/../../onboarding_dump.json';
$data = [];

if (file_exists($jsonFile)) {
    $data = json_decode(file_get_contents($jsonFile), true);
} else {
    // Fallback or die
    $data = ['client_name' => 'РљР»РёРµРЅС‚', 'databases' => []];
}

$clientName = $data['client_name'] ?? 'РљР»РёРµРЅС‚';
$date = date('d.m.Y');
$topology = $data['topology'] ?? [];
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>РўРµС…РЅРёС‡РµСЃРєРёРµ С‚СЂРµР±РѕРІР°РЅРёСЏ: <?= htmlspecialchars($clientName) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        @media print {
            .no-print { display: none; }
            body { background: white; padding: 0; }
            .page { box-shadow: none; margin: 0; border: none; }
        }
    </style>
</head>
<body class="bg-slate-100 min-h-screen py-10">

    <!-- Toolbar -->
    <div class="max-w-[210mm] mx-auto mb-6 flex justify-between items-center no-print px-4 md:px-0">
        <a href="wizard/index.html" class="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2">
            &larr; РќР°Р·Р°Рґ Рє РћРїСЂРѕСЃРЅРёРєСѓ
        </a>
        <button onclick="window.print()" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2-2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Р Р°СЃРїРµС‡Р°С‚Р°С‚СЊ / РЎРѕС…СЂР°РЅРёС‚СЊ PDF
        </button>
    </div>

    <!-- A4 Page Container -->
    <div class="page max-w-[210mm] mx-auto bg-white p-[15mm] shadow-2xl min-h-[297mm] text-slate-800 relative">
        
        <!-- Header -->
        <div class="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-start">
            <div>
                <h1 class="text-3xl font-bold text-slate-900 mb-2">РўРµС…РЅРёС‡РµСЃРєРёРµ С‚СЂРµР±РѕРІР°РЅРёСЏ</h1>
                <p class="text-slate-500">РґР»СЏ РёРЅС‚РµРіСЂР°С†РёРё РІРёРґР¶РµС‚Р° РѕРЅР»Р°Р№РЅ-Р·Р°РїРёСЃРё</p>
            </div>
            <div class="text-right">
                <div class="font-bold text-lg"><?= htmlspecialchars($clientName) ?></div>
                <div class="text-slate-400 text-sm">Р”Р°С‚Р°: <?= $date ?></div>
            </div>
        </div>

        <div class="space-y-8">
            <div class="bg-blue-50 p-4 border-l-4 border-blue-600 text-sm text-blue-800">
                РЈРІР°Р¶Р°РµРјС‹Рµ РєРѕР»Р»РµРіРё, РґР»СЏ РЅР°СЃС‚СЂРѕР№РєРё РёРЅС‚РµРіСЂР°С†РёРё РЅР°Рј РїРѕС‚СЂРµР±СѓСЋС‚СЃСЏ СЃР»РµРґСѓСЋС‰РёРµ РґРѕСЃС‚СѓРїС‹ Рё РґР°РЅРЅС‹Рµ.
                РџРѕР¶Р°Р»СѓР№СЃС‚Р°, РїРµСЂРµРґР°Р№С‚Рµ РёС… РІР°С€РµРјСѓ РјРµРЅРµРґР¶РµСЂСѓ РёР»Рё С‚РµС…РЅРёС‡РµСЃРєРѕРјСѓ СЃРїРµС†РёР°Р»РёСЃС‚Сѓ.
            </div>

            <!-- SECTION 1: DATABASE ACCESS -->
            <section>
                <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span class="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
                    Р”РѕСЃС‚СѓРїС‹ Рє API РњРРЎ (qMS/1C)
                </h2>
                
                <p class="mb-4 text-sm">РќР°Рј РЅРµРѕР±С…РѕРґРёРјРѕ РїРѕРґРєР»СЋС‡РёС‚СЊ <strong><?= count($data['databases'] ?? []) ?></strong> Р±Р°Р·С‹ РґР°РЅРЅС‹С….</p>

                <div class="border rounded-lg overflow-hidden">
                    <table class="w-full text-sm text-left">
                        <thead class="bg-slate-100 text-slate-600 font-bold border-b">
                            <tr>
                                <th class="p-3 w-1/3">Р‘Р°Р·Р° Р”Р°РЅРЅС‹С…</th>
                                <th class="p-3 w-1/3">URL API</th>
                                <th class="p-3 w-1/3">API Token (Key)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y">
                            <?php if(!empty($data['databases'])): foreach($data['databases'] as $db): ?>
                            <tr>
                                <td class="p-3">
                                    <div class="font-bold"><?= htmlspecialchars($db['name']) ?></div>
                                    <div class="text-xs text-slate-400 mono"><?= htmlspecialchars($db['id']) ?></div>
                                </td>
                                <td class="p-3 text-slate-400 italic border-r">
                                    <?= !empty($db['url']) ? htmlspecialchars($db['url']) : '___________________' ?>
                                </td>
                                <td class="p-3 text-slate-400 italic">
                                    ___________________
                                </td>
                            </tr>
                            <?php endforeach; else: ?>
                            <tr><td colspan="3" class="p-3 text-center text-red-500">Р‘Р°Р·С‹ РЅРµ СѓРєР°Р·Р°РЅС‹ РІ РѕРїСЂРѕСЃРЅРёРєРµ</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
                <p class="text-xs text-slate-500 mt-2">
                    * Р”Р»СЏ qMS С‚СЂРµР±СѓРµС‚СЃСЏ РѕС‚РєСЂС‹С‚СЊ РґРѕСЃС‚СѓРї Рє СЌРЅРґРїРѕРёРЅС‚Р°Рј: <code>spec_list</code>, <code>getslotsbyspec</code>, <code>appointByFIO</code> РґР»СЏ РЅР°С€РµРіРѕ IP.
                </p>
            </section>

            <!-- SECTION 2: TOPOLOGY LOGIC -->
            <?php if(($topology['audience']['mode'] ?? '') === 'strict'): ?>
            <section class="break-inside-avoid">
                <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span class="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
                    РњР°СЂС€СЂСѓС‚РёР·Р°С†РёСЏ (Р Р°Р·РґРµР»РµРЅРёРµ Р±Р°Р·)
                </h2>
                <p class="text-sm mb-2">Р”Р»СЏ РєРѕСЂСЂРµРєС‚РЅРѕРіРѕ РЅР°РїСЂР°РІР»РµРЅРёСЏ РїР°С†РёРµРЅС‚РѕРІ, РїРѕРґС‚РІРµСЂРґРёС‚Рµ РїСЂРёРІСЏР·РєСѓ Р±Р°Р·:</p>
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                    <ul class="space-y-2">
                        <li><strong>Р’Р·СЂРѕСЃР»РѕРµ РЅР°СЃРµР»РµРЅРёРµ:</strong> РЅР°РїСЂР°РІР»СЏРµРј РІ Р±Р°Р·Сѓ(С‹) <span class="mono bg-white px-1 border rounded"><?= implode(', ', $topology['audience']['adult_dbs'] ?? ['?']) ?></span></li>
                        <li><strong>Р”РµС‚СЃРєРѕРµ РЅР°СЃРµР»РµРЅРёРµ:</strong> РЅР°РїСЂР°РІР»СЏРµРј РІ Р±Р°Р·Сѓ(С‹) <span class="mono bg-white px-1 border rounded"><?= implode(', ', $topology['audience']['child_dbs'] ?? ['?']) ?></span></li>
                    </ul>
                </div>
            </section>
            <?php endif; ?>

            <!-- SECTION 3: CMS -->
            <section class="break-inside-avoid">
                <h2 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span class="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
                    РРЅС‚РµРіСЂР°С†РёСЏ СЃ РЎР°Р№С‚РѕРј (WordPress)
                </h2>
                <p class="text-sm mb-4">Р”Р»СЏ РёРјРїРѕСЂС‚Р° С„РѕС‚РѕРіСЂР°С„РёР№ Рё СЂРµРіР°Р»РёР№ РІСЂР°С‡РµР№ РЅР°Рј РЅСѓР¶РµРЅ РґРѕСЃС‚СѓРї Рє Р±Р°Р·Рµ РґР°РЅРЅС‹С… СЃР°Р№С‚Р° (MySQL) РёР»Рё API.</p>
                
                <div class="grid grid-cols-1 gap-4">
                    <div class="border p-3 rounded flex justify-between items-center">
                        <span class="text-sm font-bold">РўР°Р±Р»РёС†Р° РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ (Р’СЂР°С‡РµР№)</span>
                        <span class="mono text-sm bg-slate-100 px-2"><?= ($data['wp_prefix'] ?? 'wp_') . 'users' ?></span>
                    </div>
                    <div class="border p-3 rounded flex justify-between items-center">
                        <span class="text-sm font-bold">РўР°РєСЃРѕРЅРѕРјРёСЏ СѓСЃР»СѓРі (РљР°С‚РµРіРѕСЂРёРё)</span>
                        <span class="mono text-sm bg-slate-100 px-2"><?= $data['wp_taxonomy'] ?? 'unknown' ?></span>
                    </div>
                </div>
                
                <p class="text-xs text-slate-500 mt-2">
                    * РЈР±РµРґРёС‚РµСЃСЊ, С‡С‚Рѕ Сѓ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ Р‘Р” РµСЃС‚СЊ РїСЂР°РІР° <code>SELECT</code> РЅР° СЌС‚Рё С‚Р°Р±Р»РёС†С‹.
                </p>
            </section>

            <!-- FOOTER -->
            <div class="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
                Generated by Medical Booking Configurator v2.5
            </div>
        </div>
    </div>

</body>
</html>



===== FILE: C:\git\apl\med\php_backend\tools\README.md =====

# рџ›  Integrator Tools

РќР°Р±РѕСЂ РёРЅСЃС‚СЂСѓРјРµРЅС‚РѕРІ РґР»СЏ Р±С‹СЃС‚СЂРѕР№ РЅР°СЃС‚СЂРѕР№РєРё Рё СЂР°Р·РІРµСЂС‚С‹РІР°РЅРёСЏ РІРёРґР¶РµС‚Р° Сѓ РЅРѕРІС‹С… РєР»РёРµРЅС‚РѕРІ.

## 1. Wizard (РњР°СЃС‚РµСЂ РќР°СЃС‚СЂРѕР№РєРё)
РРЅС‚РµСЂР°РєС‚РёРІРЅС‹Р№ РѕРїСЂРѕСЃРЅРёРє РґР»СЏ СЃР±РѕСЂР° С‚СЂРµР±РѕРІР°РЅРёР№.
*   **URL:** `/php_backend/tools/wizard/index.html`
*   **Р—Р°С‡РµРј:** РЎРѕР±РёСЂР°РµС‚ СЃС‚СЂСѓРєС‚СѓСЂСѓ РєР»РёРЅРёРєРё (РіРѕСЂРѕРґР°, Р±Р°Р·С‹, Р»РѕРіРёРєСѓ) Рё СЃРѕС…СЂР°РЅСЏРµС‚ РµС‘ РІ `onboarding_dump.json`.
*   **Р РµР·СѓР»СЊС‚Р°С‚:** Р“РµРЅРµСЂРёСЂСѓРµС‚ JSON-РїСЂРѕРјРїС‚ РґР»СЏ AI Architect.

## 2. Requirements Generator (РўР— РґР»СЏ РљР»РёРµРЅС‚Р°)
Р“РµРЅРµСЂР°С‚РѕСЂ PDF/HTML РґРѕРєСѓРјРµРЅС‚Р° СЃ С‚РµС…РЅРёС‡РµСЃРєРёРјРё С‚СЂРµР±РѕРІР°РЅРёСЏРјРё.
*   **URL:** `/php_backend/tools/generate_requirements.php`
*   **Р—Р°С‡РµРј:** РќР° РѕСЃРЅРѕРІРµ РѕС‚РІРµС‚РѕРІ РІ Wizard С„РѕСЂРјРёСЂСѓРµС‚ СЃРїРёСЃРѕРє: "Р”Р°Р№С‚Рµ РЅР°Рј 3 API РєР»СЋС‡Р° Рё РґРѕСЃС‚СѓРї Рє SMS-С€Р»СЋР·Сѓ".
*   **РСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ:** РћС‚РєСЂС‹С‚СЊ, СЂР°СЃРїРµС‡Р°С‚Р°С‚СЊ РІ PDF, РѕС‚РїСЂР°РІРёС‚СЊ IT-РґРёСЂРµРєС‚РѕСЂСѓ РєР»РёРЅРёРєРё.

## 3. Sync Tool (РЎРёРЅС…СЂРѕРЅРёР·Р°С†РёСЏ Р’СЂР°С‡РµР№)
РРЅСЃС‚СЂСѓРјРµРЅС‚ РјР°РїРїРёРЅРіР° РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ WP Рё РІСЂР°С‡РµР№ РњРРЎ.
*   **URL:** `/php_backend/tools/sync_tool.php`
*   **Р—Р°С‡РµРј:** Р§С‚РѕР±С‹ СЃРІСЏР·Р°С‚СЊ РєСЂР°СЃРёРІСѓСЋ РєР°СЂС‚РѕС‡РєСѓ РІСЂР°С‡Р° РЅР° СЃР°Р№С‚Рµ СЃ РµРіРѕ СЂР°СЃРїРёСЃР°РЅРёРµРј РІ РњРРЎ (РїРѕ ID).

---

## рџљЂ Workflow РёРЅС‚РµРіСЂР°С‚РѕСЂР°

1.  **РРЅС‚РµСЂРІСЊСЋ:** РћС‚РєСЂРѕР№С‚Рµ **Wizard** Рё РїСЂРѕР№РґРёС‚Рµ РµРіРѕ РІРјРµСЃС‚Рµ СЃ РєР»РёРµРЅС‚РѕРј (РёР»Рё Р·Р°РїРѕР»РЅРёРІ СЃ РµРіРѕ СЃР»РѕРІ).
2.  **Р—Р°РїСЂРѕСЃ РґРѕСЃС‚СѓРїРѕРІ:** РќР° РїРѕСЃР»РµРґРЅРµРј С€Р°РіРµ Wizard РїРµСЂРµР№РґРёС‚Рµ Рє **Requirements Generator**, СЃРѕС…СЂР°РЅРёС‚Рµ PDF Рё РѕС‚РїСЂР°РІСЊС‚Рµ РєР»РёРµРЅС‚Сѓ.
3.  **Р“РµРЅРµСЂР°С†РёСЏ РєРѕРЅС„РёРіР°:** 
    *   РЎРєРѕРїРёСЂСѓР№С‚Рµ JSON РёР· Wizard.
    *   РћС‚РєСЂРѕР№С‚Рµ `docs/LLM_CONFIG_GENERATOR_PROMPT.md`.
    *   РЎРєРѕСЂРјРёС‚Рµ РїСЂРѕРјРїС‚ + JSON РІ ChatGPT/Claude.
    *   РџРѕР»СѓС‡РµРЅРЅС‹Р№ PHP-РєРѕРґ СЂР°Р·Р»РѕР¶РёС‚Рµ РїРѕ С„Р°Р№Р»Р°Рј РІ `php_backend/config_parts/`.
4.  **РќР°СЃС‚СЂРѕР№РєР° СЃРµРєСЂРµС‚РѕРІ:** РљРѕРіРґР° РєР»РёРµРЅС‚ РїСЂРёС€Р»РµС‚ РєР»СЋС‡Рё (РїРѕ РўР— РёР· Рї.2), СЃРѕР·РґР°Р№С‚Рµ `php_backend/config_access.php`.
5.  **РЎРёРЅС…СЂРѕРЅРёР·Р°С†РёСЏ:** РћС‚РєСЂРѕР№С‚Рµ **Sync Tool** Рё СЃРІСЏР¶РёС‚Рµ РІСЂР°С‡РµР№.

**Р“РѕС‚РѕРІРѕ! Р’РёРґР¶РµС‚ РЅР°СЃС‚СЂРѕРµРЅ.**



===== FILE: C:\git\apl\med\php_backend\tools\sync_tool.php =====

<?php
// tools/sync_tool.php - РРЅСЃС‚СЂСѓРјРµРЅС‚ РІРёР·СѓР°Р»СЊРЅРѕР№ СЃРёРЅС…СЂРѕРЅРёР·Р°С†РёРё
// РЎС‚РµРє: Pure PHP + HTML + Tailwind CSS

ini_set('display_errors', 1);
error_reporting(E_ALL);

// РџРѕРґРєР»СЋС‡Р°РµРј РєРѕРЅС„РёРі Рё РґСЂР°Р№РІРµСЂС‹
$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) {
    die("вќЊ РћС€РёР±РєР°: Р¤Р°Р№Р» config.php РЅРµ РЅР°Р№РґРµРЅ. РќР°СЃС‚СЂРѕР№С‚Рµ backend.");
}
$config = require $configPath;

require_once __DIR__ . '/../drivers/QmsDriver.php';

$message = '';
$debugInfo = [
    'specs_found' => 0,
    'specs_sample' => [],
    'doctors_loaded' => 0
]; 

// --- 1. РћР‘Р РђР‘РћРўРљРђ РЎРћРҐР РђРќР•РќРРЇ (РўРѕР»СЊРєРѕ РµСЃР»Рё РЅР°Р¶Р°С‚Р° РєРЅРѕРїРєР°) ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_links'])) {
    try {
        $pdo = $config['helpers']['get_db_conn']($config);
        $prefix = $config['cms_db']['prefix'];
        $updatedCount = 0;

        // $_POST['links'] РјР°СЃСЃРёРІ РІРёРґР° [wp_user_id => qms_doctor_id]
        if (!empty($_POST['links']) && is_array($_POST['links'])) {
            $stmtCheck = $pdo->prepare("SELECT umeta_id FROM {$prefix}usermeta WHERE user_id = ? AND meta_key = 'id_doctor_qms'");
            $stmtUpdate = $pdo->prepare("UPDATE {$prefix}usermeta SET meta_value = ? WHERE user_id = ? AND meta_key = 'id_doctor_qms'");
            $stmtInsert = $pdo->prepare("INSERT INTO {$prefix}usermeta (user_id, meta_key, meta_value) VALUES (?, 'id_doctor_qms', ?)");

            foreach ($_POST['links'] as $wpId => $qmsId) {
                if (empty($qmsId) || empty($wpId)) continue;

                // РџСЂРѕРІРµСЂСЏРµРј, РµСЃС‚СЊ Р»Рё РїРѕР»Рµ
                $stmtCheck->execute([$wpId]);
                if ($stmtCheck->fetch()) {
                    $stmtUpdate->execute([$qmsId, $wpId]);
                } else {
                    $stmtInsert->execute([$wpId, $qmsId]);
                }
                $updatedCount++;
            }
            $message = "<div class='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6'>вњ… РЈСЃРїРµС€РЅРѕ РѕР±РЅРѕРІР»РµРЅРѕ СЃРІСЏР·РµР№: <strong>$updatedCount</strong></div>";
        }
    } catch (Exception $e) {
        $message = "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>вќЊ РћС€РёР±РєР° Р‘Р”: " . htmlspecialchars($e->getMessage()) . "</div>";
    }
}

// --- 2. РџРћР›РЈР§Р•РќРР• Р”РђРќРќР«РҐ ---
$rows = [];
$qmsDoctors = [];
$wpUsers = [];

try {
    // A. РџРѕР»СЊР·РѕРІР°С‚РµР»Рё РёР· WordPress
    $pdo = $config['helpers']['get_db_conn']($config);
    $prefix = $config['cms_db']['prefix'];
    
    // Р‘РµСЂРµРј РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№. РџС‹С‚Р°РµРјСЃСЏ РґРѕСЃС‚Р°С‚СЊ СЂРµР°Р»СЊРЅС‹Рµ РРјСЏ Рё Р¤Р°РјРёР»РёСЋ РёР· РјРµС‚Р°-РїРѕР»РµР№, РµСЃР»Рё Р»РѕРіРёРЅ РЅР° Р»Р°С‚РёРЅРёС†Рµ
    $sql = "
        SELECT 
            u.ID, 
            u.display_name, 
            u.user_login,
            m_qms.meta_value as current_qms_id,
            (SELECT meta_value FROM {$prefix}usermeta WHERE user_id = u.ID AND meta_key = 'first_name' LIMIT 1) as first_name,
            (SELECT meta_value FROM {$prefix}usermeta WHERE user_id = u.ID AND meta_key = 'last_name' LIMIT 1) as last_name
        FROM {$prefix}users u
        LEFT JOIN {$prefix}usermeta m_qms ON u.ID = m_qms.user_id AND m_qms.meta_key = 'id_doctor_qms'
        ORDER BY u.display_name ASC
    ";
    $wpUsers = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

    // B. Р’СЂР°С‡Рё РёР· qMS (Live API)
    $driver = new QmsDriver($config);
    
    // DIAGNOSTICS: Check if specialties can be fetched
    $debugSpecs = $driver->getSpecialties('chel');
    $debugInfo['specs_found'] = count($debugSpecs);
    $debugInfo['specs_sample'] = array_slice($debugSpecs, 0, 5);
    
    // Р’РќРРњРђРќРР•: Р­С‚Рѕ РјРѕР¶РµС‚ Р·Р°РЅСЏС‚СЊ РїР°СЂСѓ СЃРµРєСѓРЅРґ, С‚Р°Рє РєР°Рє РѕРїСЂР°С€РёРІР°РµС‚ API
    $qmsDoctors = $driver->getAllDoctorsFromMis('chel'); 
    $debugInfo['doctors_loaded'] = count($qmsDoctors);

    // C. РђР»РіРѕСЂРёС‚Рј РЎРѕРїРѕСЃС‚Р°РІР»РµРЅРёСЏ
    foreach ($wpUsers as $user) {
        $bestMatch = null;
        $maxPercent = 0;
        
        // Р¤РѕСЂРјРёСЂСѓРµРј РёРјСЏ РґР»СЏ СЃСЂР°РІРЅРµРЅРёСЏ. 
        $wpNameReal = trim(($user['last_name'] ?? '') . ' ' . ($user['first_name'] ?? ''));
        if (empty($wpNameReal)) {
            $wpNameReal = $user['display_name'];
        }
        
        $wpNameLower = mb_strtolower($wpNameReal);

        // РС‰РµРј РїР°СЂСѓ РІ СЃРїРёСЃРєРµ qMS
        foreach ($qmsDoctors as $doc) {
            $qNameLower = mb_strtolower($doc['name']);
            
            // 1. РўРѕС‡РЅРѕРµ СЃРѕРІРїР°РґРµРЅРёРµ ID (РµСЃР»Рё СѓР¶Рµ РїСЂРёРІСЏР·Р°РЅ Рё СЌС‚РѕС‚ РІСЂР°С‡ РµСЃС‚СЊ РІ СЃРїРёСЃРєРµ API)
            if (!empty($user['current_qms_id']) && (string)$user['current_qms_id'] === (string)$doc['qms_id']) {
                $bestMatch = $doc;
                $maxPercent = 100;
                break; 
            }

            // 2. РЎСЂР°РІРЅРµРЅРёРµ РёРјРµРЅ
            similar_text($wpNameLower, $qNameLower, $percent);
            
            if ($percent > $maxPercent) {
                $maxPercent = $percent;
                $bestMatch = $doc;
            }
        }

        // [FIX] РџРѕРєР°Р·С‹РІР°РµРј СЃСѓС‰РµСЃС‚РІСѓСЋС‰СѓСЋ РїСЂРёРІСЏР·РєСѓ, РґР°Р¶Рµ РµСЃР»Рё РІСЂР°С‡ РЅРµ РЅР°Р№РґРµРЅ РІ С‚РµРєСѓС‰РµРј СЃРєР°РЅРµ API
        $isLinked = !empty($user['current_qms_id']);
        
        if ($isLinked && (!$bestMatch || $maxPercent < 100)) {
            // РЎРѕР·РґР°РµРј РІРёСЂС‚СѓР°Р»СЊРЅСѓСЋ Р·Р°РїРёСЃСЊ РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ, С‡С‚РѕР±С‹ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІРёРґРµР» ID
            $bestMatch = [
                'name' => '(Р’СЂР°С‡ РЅРµ РЅР°Р№РґРµРЅ РІ С‚РµРєСѓС‰РµРј СЃРїРёСЃРєРµ API)',
                'specialty' => 'ID РёР· Р±Р°Р·С‹: ' . $user['current_qms_id'],
                'qms_id' => $user['current_qms_id']
            ];
            $maxPercent = 100; // Force 100% logic
        }

        $rows[] = [
            'wp' => $user,
            'wp_name_used' => $wpNameReal, // Р”Р»СЏ РѕС‚Р»Р°РґРєРё
            'match' => $bestMatch,
            'score' => $maxPercent,
            'is_linked' => $isLinked
        ];
    }

    // РЎРѕСЂС‚РёСЂРѕРІРєР°: СЃРЅР°С‡Р°Р»Р° СЃРІСЏР·Р°РЅРЅС‹Рµ, РїРѕС‚РѕРј РїРѕ СѓР±С‹РІР°РЅРёСЋ СЃС…РѕРґСЃС‚РІР°
    usort($rows, function($a, $b) {
        if ($a['is_linked'] !== $b['is_linked']) return $a['is_linked'] ? 1 : -1;
        return $b['score'] <=> $a['score'];
    });

} catch (Exception $e) {
    $message = "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>вќЊ РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё РґР°РЅРЅС‹С…: " . htmlspecialchars($e->getMessage()) . "</div>";
}

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sync Tool: WP + qMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .checkbox-lg { transform: scale(1.5); }
    </style>
</head>
<body class="bg-slate-100 min-h-screen p-6 font-sans text-slate-800">

    <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    рџ”„ РЎРёРЅС…СЂРѕРЅРёР·Р°С†РёСЏ Р’СЂР°С‡РµР№
                    <span class="text-sm font-normal bg-blue-100 text-blue-700 px-3 py-1 rounded-full">v2.3 Batch Fix</span>
                </h1>
                <p class="text-slate-500 mt-2">РЎРѕРїРѕСЃС‚Р°РІР»РµРЅРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ СЃР°Р№С‚Р° (WordPress) СЃ РІСЂР°С‡Р°РјРё РёР· РњРРЎ (qMS)</p>
            </div>
            <a href="../dev_dashboard.php" class="text-slate-500 hover:text-blue-600 font-medium transition-colors">
                &larr; Р’РµСЂРЅСѓС‚СЊСЃСЏ РІ Р”Р°С€Р±РѕСЂРґ
            </a>
        </div>

        <?= $message ?>

        <!-- Warning if few doctors loaded -->
        <?php if ($debugInfo['doctors_loaded'] < 10 && $debugInfo['doctors_loaded'] > 0): ?>
            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <p class="text-sm text-yellow-800 font-bold">вљ пёЏ Р—Р°РіСЂСѓР¶РµРЅРѕ РѕС‡РµРЅСЊ РјР°Р»Рѕ РІСЂР°С‡РµР№ (<?= $debugInfo['doctors_loaded'] ?>).</p>
                <p class="text-xs text-yellow-700">Р’РѕР·РјРѕР¶РЅРѕ, API РІРѕР·РІСЂР°С‰Р°РµС‚ РЅРµРїРѕР»РЅС‹Р№ СЃРїРёСЃРѕРє. РџСЂРѕРІРµСЂСЊС‚Рµ Debug Info.</p>
            </div>
        <?php elseif ($debugInfo['doctors_loaded'] === 0): ?>
            <div class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p class="text-sm text-red-700 font-bold">вљ пёЏ Р’РЅРёРјР°РЅРёРµ! РЎРїРёСЃРѕРє РІСЂР°С‡РµР№ РёР· qMS РїСѓСЃС‚.</p>
                <p class="text-xs text-red-600">РџСЂРѕР±Р»РµРјР° СЃРѕРµРґРёРЅРµРЅРёСЏ СЃ API.</p>
            </div>
        <?php endif; ?>

        <!-- Controls / Info -->
        <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex gap-6 text-sm">
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span>РЎРІСЏР·СЊ СѓСЃС‚Р°РЅРѕРІР»РµРЅР°</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span>РўСЂРµР±СѓРµС‚ РїСЂРѕРІРµСЂРєРё (>60%)</span>
            </div>
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <span>РќРµС‚ СЃРѕРІРїР°РґРµРЅРёР№ (<60%)</span>
            </div>
            <div class="ml-auto text-slate-400">
                Р’СЃРµРіРѕ РІСЂР°С‡РµР№ WP: <strong><?= count($rows) ?></strong> | API qMS: <strong><?= $debugInfo['doctors_loaded'] ?></strong>
            </div>
        </div>

        <form method="POST">
            <input type="hidden" name="save_links" value="1">

            <div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                <th class="p-4 w-1/3">Р’СЂР°С‡ РЅР° РЎР°Р№С‚Рµ (WP)</th>
                                <th class="p-4 w-1/3">РќР°Р№РґРµРЅРЅРѕРµ СЃРѕРѕС‚РІРµС‚СЃС‚РІРёРµ (qMS)</th>
                                <th class="p-4 w-24 text-center">РЎС…РѕРґСЃС‚РІРѕ</th>
                                <th class="p-4 text-center">Р”РµР№СЃС‚РІРёРµ (Р—Р°РїРёСЃР°С‚СЊ ID)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            <?php foreach ($rows as $row): ?>
                                <?php
                                    $wp = $row['wp'];
                                    $qms = $row['match'];
                                    $score = $row['score'];
                                    $isLinked = $row['is_linked'];
                                    
                                    $rowClass = $isLinked ? 'bg-green-50/30' : 'hover:bg-slate-50';
                                    
                                    $scoreBadge = 'bg-red-100 text-red-700';
                                    if ($score > 90) $scoreBadge = 'bg-green-100 text-green-700';
                                    elseif ($score > 60) $scoreBadge = 'bg-yellow-100 text-yellow-700'; // Threshold increased to 60

                                    // Auto check only if high confidence and not already linked
                                    $autoCheck = ($score > 90 && !$isLinked);
                                ?>
                                <tr class="<?= $rowClass ?> transition-colors">
                                    
                                    <!-- WP User -->
                                    <td class="p-4">
                                        <div class="font-bold text-slate-800"><?= htmlspecialchars($row['wp_name_used']) ?></div>
                                        <div class="text-xs text-slate-400 font-mono mt-1">
                                            Login: <?= htmlspecialchars($wp['user_login']) ?> | ID: <?= $wp['ID'] ?>
                                        </div>
                                        <?php if($isLinked): ?>
                                            <div class="mt-2 inline-flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200">
                                                <span>рџ”— РџСЂРёРІСЏР·Р°РЅ Рє:</span>
                                                <span class="font-mono font-bold"><?= $wp['current_qms_id'] ?></span>
                                            </div>
                                        <?php endif; ?>
                                    </td>

                                    <!-- qMS Match -->
                                    <td class="p-4">
                                        <?php if ($qms && $score > 60): ?>
                                            <div class="font-medium text-slate-700"><?= htmlspecialchars($qms['name']) ?></div>
                                            <div class="text-xs text-slate-500 mt-0.5"><?= htmlspecialchars($qms['specialty']) ?></div>
                                            <div class="text-[10px] text-slate-400 font-mono mt-1">
                                                ID: <span class="bg-slate-100 px-1 rounded"><?= $qms['qms_id'] ?></span>
                                            </div>
                                        <?php else: ?>
                                            <div class="text-slate-400 italic">РќРµ РЅР°Р№РґРµРЅРѕ</div>
                                        <?php endif; ?>
                                    </td>

                                    <!-- Score -->
                                    <td class="p-4 text-center">
                                        <?php if($score > 60): ?>
                                            <span class="px-2 py-1 rounded font-bold text-xs <?= $scoreBadge ?>">
                                                <?= round($score) ?>%
                                            </span>
                                        <?php else: ?>
                                            <span class="text-slate-300 text-xs">вЂ”</span>
                                        <?php endif; ?>
                                    </td>

                                    <!-- Action -->
                                    <td class="p-4 text-center">
                                        <?php if ($qms && $score > 60): ?>
                                            <label class="inline-flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
                                                <input 
                                                    type="checkbox" 
                                                    name="links[<?= $wp['ID'] ?>]" 
                                                    value="<?= $qms['qms_id'] ?>" 
                                                    class="checkbox-lg accent-blue-600"
                                                    <?= $isLinked ? 'checked disabled' : ($autoCheck ? 'checked' : '') ?>
                                                >
                                                <?php if(!$isLinked): ?>
                                                    <span class="text-xs font-bold text-blue-600">РЎРІСЏР·Р°С‚СЊ</span>
                                                <?php else: ?>
                                                    <span class="text-xs text-green-600 font-medium">РћРљ</span>
                                                <?php endif; ?>
                                            </label>
                                        <?php else: ?>
                                            <span class="text-slate-300 text-xs">РќРµС‚ РґР°РЅРЅС‹С…</span>
                                        <?php endif; ?>
                                    </td>

                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Sticky Footer Action -->
            <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                    <div class="text-slate-500 text-sm">
                        вљ пёЏ РћС‚РјРµС‡РµРЅРЅС‹Рµ Р·Р°РїРёСЃРё Р±СѓРґСѓС‚ РѕР±РЅРѕРІР»РµРЅС‹ РІ Р±Р°Р·Рµ WordPress.
                    </div>
                    <button type="submit" class="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform active:scale-95">
                        рџ’ѕ РЎРѕС…СЂР°РЅРёС‚СЊ РёР·РјРµРЅРµРЅРёСЏ
                    </button>
                </div>
            </div>
            <div class="h-20"></div>

        </form>

        <!-- DEBUG SECTION -->
        <div class="mt-12 mb-20 bg-slate-800 rounded-xl p-6 text-slate-300 shadow-2xl">
            <h3 class="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">рџ›  DEBUG INFO</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- API DATA -->
                <div>
                    <h4 class="text-sm font-bold text-green-400 uppercase tracking-wider mb-2">
                        qMS API Data
                    </h4>
                    
                    <div class="mb-4 grid grid-cols-2 gap-4">
                        <div class="bg-slate-700 p-2 rounded">
                            <div class="text-[10px] text-slate-400">РЎРїРµС†РёР°Р»СЊРЅРѕСЃС‚РµР№:</div>
                            <div class="text-lg font-bold text-white"><?= $debugInfo['specs_found'] ?></div>
                        </div>
                        <div class="bg-slate-700 p-2 rounded">
                            <div class="text-[10px] text-slate-400">Р’СЂР°С‡РµР№ Р·Р°РіСЂСѓР¶РµРЅРѕ:</div>
                            <div class="text-lg font-bold text-white"><?= $debugInfo['doctors_loaded'] ?></div>
                        </div>
                    </div>

                    <h5 class="text-xs font-bold text-slate-500 mb-1">РўРѕРї 5 РІСЂР°С‡РµР№ (РёР· API):</h5>
                    <div class="bg-slate-900 rounded p-4 text-xs font-mono overflow-auto max-h-64 border border-slate-700">
                        <?php 
                            if (empty($qmsDoctors)) {
                                echo "<div class='text-red-400 font-bold'>вљ пёЏ ARRAY IS EMPTY!</div>";
                            } else {
                                $qmsDebug = array_slice($qmsDoctors, 0, 5);
                                echo "<pre>" . print_r($qmsDebug, true) . "</pre>";
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>

    </div>

</body>
</html>


===== FILE: C:\git\apl\med\php_backend\tools\wizard\generator.php =====


<?php
// php_backend/tools/wizard/generator.php
// Generates PHP Config Parts based on Wizard JSON

header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'No data provided']);
    exit;
}

/**
 * Helper to pretty-print PHP arrays with short syntax []
 */
function export_config($array) {
    $export = var_export($array, true);
    $export = preg_replace("/^([ ]*)(.*)/m", '$1$1$2', $export);
    $array_output = preg_replace(['/array \(/', '/\)/', '/=>[ ]?\n/', '/=> [ ]?array/'], ['[', ']', '=>', '=> ['], $export);
    // Cleanup indentation mess often caused by var_export
    return "<?php\nreturn " . $array_output . ";";
}

// --- 1. BUILD TOPOLOGY (02_topology.php) ---
$topologyConfig = [
    'topology' => [
        'cities' => [
            'enabled' => true,
            'items' => []
        ],
        'dimensions' => [],
        'branches' => [
            'enabled' => true,
            'logic' => 'dynamic_aggregation'
        ]
    ]
];

// Cities
if (!empty($data['topology']['cities'])) {
    foreach ($data['topology']['cities'] as $idx => $cityCode) {
        $topologyConfig['topology']['cities']['items'][$cityCode] = [
            'label' => ucfirst($cityCode), // Placeholder label
            'default' => ($idx === 0)
        ];
    }
}

// Audience Dimension
if (!empty($data['topology']['audience']['mode']) && $data['topology']['audience']['mode'] !== 'none') {
    $topologyConfig['topology']['dimensions']['audience'] = [
        'enabled' => true,
        'key' => 'audience',
        'label' => 'РџР°С†РёРµРЅС‚',
        'mode' => $data['topology']['audience']['mode'] === 'strict' ? 'strict_separation' : 'tabs',
        'options' => [
            ['id' => 'adult', 'label' => 'Р’Р·СЂРѕСЃР»С‹Рµ', 'isDefault' => true],
            ['id' => 'child', 'label' => 'Р”РµС‚Рё']
        ]
    ];
}

// Verticals Dimension (if mapped)
if (!empty($data['topology']['verticals']['mapping'])) {
    $vertOptions = [];
    $uniqueVerts = array_unique(array_values($data['topology']['verticals']['mapping']));
    foreach ($uniqueVerts as $vert) {
        $vertOptions[] = ['id' => $vert, 'label' => ucfirst($vert)];
    }
    
    $topologyConfig['topology']['dimensions']['vertical'] = [
        'enabled' => true,
        'key' => 'vertical',
        'label' => 'РќР°РїСЂР°РІР»РµРЅРёРµ',
        'mode' => 'filter',
        'options' => $vertOptions
    ];
}

// --- 2. BUILD LOGIC (03_logic.php) ---
$taxonomySource = $data['cms']['taxonomy_source'] ?? 'directions';

$logicConfig = [
    'hydrator' => [
        'doctor' => [
            'identity' => 'qms_api',
            'schedule' => 'qms_api',
            'content'  => 'wp_usermeta',
            'pricing'  => 'qms_api',
        ]
    ],
    'classification' => [],
    'cms_map' => [
        'taxonomies' => [
            'services' => $taxonomySource
        ]
    ]
];

// Audience Rules
if (!empty($data['topology']['audience']['mapping'])) {
    $logicConfig['classification']['audience'] = [
        'type' => 'wp_taxonomy_ancestor',
        'source' => $taxonomySource,
        'map' => $data['topology']['audience']['mapping']
    ];
}

// Vertical Rules
if (!empty($data['topology']['verticals']['mapping'])) {
    $logicConfig['classification']['vertical'] = [
        'type' => 'wp_taxonomy_ancestor',
        'source' => $taxonomySource,
        'map' => $data['topology']['verticals']['mapping']
    ];
}

// --- 3. BUILD THEME (04_theme.php) ---
$themeConfig = [
    'client' => [
        'name' => $data['client']['name'] ?? 'My Clinic',
        'city_default' => $data['topology']['cities'][0] ?? 'chel',
    ],
    'theme' => [
        'logo_url' => $data['cms']['assets']['logo'] ?? '',
        'colors' => [
            'primary' => $data['cms']['assets']['colors']['primary'] ?? '#2563EB',
            'accent' => $data['cms']['assets']['colors']['accent'] ?? '#F59E0B',
            'background' => '#F8FAFC'
        ],
        'labels' => [
            'step1Title' => 'Р—Р°РїРёСЃСЊ РЅР° РїСЂРёРµРј',
            'searchPlaceholder' => 'Р’СЂР°С‡, СѓСЃР»СѓРіР°, СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ...',
            'selectTimeBtn' => 'РџРѕРєР°Р·Р°С‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ'
        ]
    ]
];

// --- 4. BUILD INFRA (01_infrastructure.php - Partial) ---
// We generate a template for infrastructure, but secrets go to config_access.php usually
$infraConfig = [
    'qms' => [
        'instances' => [],
        'branches_map' => []
    ]
];

if (!empty($data['infrastructure']['databases'])) {
    foreach ($data['infrastructure']['databases'] as $db) {
        if(!$db['id']) continue;
        $infraConfig['qms']['instances'][$db['id']] = [
            'name' => $db['name'],
            'api_url' => $db['url'],
            'api_token' => 'SEE_CONFIG_ACCESS',
            'city_code' => $data['topology']['cities'][0] ?? 'chel' // Defaulting to first city
        ];
    }
}

// Return all generated codes
echo json_encode([
    'files' => [
        '01_infrastructure.php' => export_config($infraConfig),
        '02_topology.php' => export_config($topologyConfig),
        '03_logic.php' => export_config($logicConfig),
        '04_theme.php' => export_config($themeConfig)
    ]
]);



===== FILE: C:\git\apl\med\php_backend\tools\wizard\index.html =====


<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integrator Console v3.1 | Booking Core</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.js"></script>
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .section-card { @apply bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 scroll-mt-24; }
        .nav-link { @apply flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-600 rounded-lg transition-colors hover:bg-slate-100 hover:text-slate-900; }
        .nav-link.active { @apply bg-blue-50 text-blue-700 font-bold; }
        .scanning { animation: pulse 1.5s infinite; opacity: 0.7; pointer-events: none; }
        @keyframes pulse { 50% { opacity: 0.4; } }
        /* Code block styles */
        pre { white-space: pre-wrap; word-wrap: break-word; }
    </style>
</head>
<body class="flex flex-col min-h-screen">

    <!-- Topbar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-lg">E</div>
                <div>
                    <div class="font-bold text-slate-800 leading-none">Booking Engine</div>
                    <div class="text-[10px] text-slate-400 font-mono mt-0.5">Configuration Console</div>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div id="save-status" class="text-xs font-mono text-slate-400 transition-colors">Not Saved</div>
                <div class="h-6 w-px bg-slate-200"></div>
                <button onclick="generateOutput()" class="text-slate-600 hover:text-blue-600 text-sm font-bold flex items-center gap-2 transition-colors">
                    <i data-lucide="file-json"></i> JSON
                </button>
                <button onclick="generatePhp()" class="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-slate-200">
                    <i data-lucide="file-code"></i> Generate PHP
                </button>
            </div>
        </div>
    </header>

    <div class="flex-1 max-w-7xl w-full mx-auto p-6 flex gap-10 items-start">
        
        <!-- Sidebar (Navigation) -->
        <aside class="w-64 flex-shrink-0 sticky top-24 hidden md:block">
            <nav class="space-y-1">
                <a href="#sec-general" class="nav-link active"><i data-lucide="building" class="w-4 h-4"></i> General</a>
                <a href="#sec-brand" class="nav-link"><i data-lucide="palette" class="w-4 h-4"></i> Branding</a>
                <a href="#sec-infra" class="nav-link"><i data-lucide="database" class="w-4 h-4"></i> Infrastructure</a>
                <a href="#sec-rules" class="nav-link"><i data-lucide="git-branch" class="w-4 h-4"></i> Rules Engine</a>
                <a href="#sec-output" class="nav-link"><i data-lucide="code" class="w-4 h-4"></i> Generated Code</a>
            </nav>
            
            <div class="mt-8 p-4 bg-green-50 rounded-xl border border-green-100">
                <h4 class="text-xs font-bold text-green-800 uppercase mb-2">Architect Mode</h4>
                <p class="text-xs text-green-700 leading-relaxed">
                    Now generating valid PHP arrays compatible with <span class="font-mono bg-green-100 px-1 rounded">config_parts/</span> structure.
                </p>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-w-0">
            <form id="config-form" onsubmit="return false;">
                
                <!-- 1. GENERAL -->
                <section id="sec-general" class="section-card">
                    <h2 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <i data-lucide="building" class="text-blue-500"></i> РћР±С‰Р°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="col-span-2 md:col-span-1">
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">РќР°Р·РІР°РЅРёРµ РљР»РёРЅРёРєРё</label>
                            <input type="text" id="client_name" name="client_name" class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder='РњР¦ "РСЃС‚РѕС‡РЅРёРє"'>
                        </div>
                        <div class="col-span-2 md:col-span-1">
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">РљРѕРґС‹ Р“РѕСЂРѕРґРѕРІ (ID)</label>
                            <input type="text" name="cities" class="w-full p-3 border border-slate-300 rounded-lg font-mono text-sm" placeholder="chel, spb">
                            <p class="text-[10px] text-slate-400 mt-1">Р§РµСЂРµР· Р·Р°РїСЏС‚СѓСЋ. РџРµСЂРІС‹Р№ - РґРµС„РѕР»С‚РЅС‹Р№.</p>
                        </div>
                    </div>
                </section>

                <!-- 2. BRANDING -->
                <section id="sec-brand" class="section-card">
                    <div class="flex justify-between items-start mb-6">
                        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <i data-lucide="palette" class="text-purple-500"></i> Р‘СЂРµРЅРґРёРЅРі
                        </h2>
                        <button type="button" onclick="scanSite()" id="scan_btn" class="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 border border-purple-200">
                            <i data-lucide="wand-2" class="w-3 h-3"></i> РђРІС‚Рѕ-СЃРєР°РЅ СЃР°Р№С‚Р°
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">URL РЎР°Р№С‚Р°</label>
                            <input type="url" id="site_url" name="site_url" class="w-full p-3 border border-slate-300 rounded-lg font-mono text-sm" placeholder="https://clinic.ru">
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Primary Color</label>
                                <div class="flex gap-2">
                                    <input type="color" id="color_primary_picker" class="h-10 w-10 border rounded cursor-pointer" oninput="syncColor('primary', this.value)">
                                    <input type="text" id="color_primary" name="color_primary" class="w-full p-2 border rounded font-mono text-sm uppercase" oninput="syncColor('primary', this.value, true)">
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Accent Color</label>
                                <div class="flex gap-2">
                                    <input type="color" id="color_accent_picker" class="h-10 w-10 border rounded cursor-pointer" oninput="syncColor('accent', this.value)">
                                    <input type="text" id="color_accent" name="color_accent" class="w-full p-2 border rounded font-mono text-sm uppercase" oninput="syncColor('accent', this.value, true)">
                                </div>
                            </div>
                        </div>
                        
                        <input type="hidden" id="logo_url" name="logo_url">
                        <div id="logo_preview_container" class="hidden mt-4 p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 flex items-center gap-4">
                            <img id="logo_preview" class="h-12 object-contain" />
                            <span class="text-xs text-green-600 font-bold">Logo detected</span>
                        </div>
                    </div>
                </section>

                <!-- 3. INFRASTRUCTURE -->
                <section id="sec-infra" class="section-card">
                    <h2 class="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <i data-lucide="database" class="text-green-500"></i> РРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂР° (РњРРЎ)
                    </h2>
                    <div id="db-list" class="space-y-3"></div>
                    <button type="button" onclick="addDatabase()" class="mt-4 text-sm text-blue-600 font-bold hover:underline flex items-center gap-1">
                        <i data-lucide="plus"></i> Р”РѕР±Р°РІРёС‚СЊ Р±Р°Р·Сѓ РґР°РЅРЅС‹С…
                    </button>
                </section>

                <!-- 4. RULES ENGINE -->
                <section id="sec-rules" class="section-card border-l-4 border-l-orange-400">
                    <h2 class="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <i data-lucide="git-branch" class="text-orange-500"></i> Rules Engine Logic
                    </h2>
                    <p class="text-sm text-slate-500 mb-6">РќР°СЃС‚СЂРѕР№С‚Рµ, РєР°Рє СЂСѓР±СЂРёРєРё СЃР°Р№С‚Р° РїСЂРµРІСЂР°С‰Р°СЋС‚СЃСЏ РІ С‚РµРіРё С„РёР»СЊС‚СЂР°С†РёРё.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="space-y-4">
                            <h3 class="font-bold text-slate-700 border-b pb-2">1. РђСѓРґРёС‚РѕСЂРёСЏ (Audience)</h3>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 mb-1">Р РµР¶РёРј СЂР°Р±РѕС‚С‹</label>
                                <select name="audience_mode" class="w-full p-2 border rounded bg-slate-50 text-sm">
                                    <option value="none">РќРµС‚ РґРµР»РµРЅРёСЏ</option>
                                    <option value="mixed">Mixed (Р¤РёР»СЊС‚СЂ РїРѕ С‚РµРіР°Рј)</option>
                                    <option value="strict">Strict (Р Р°Р·РЅС‹Рµ Р±Р°Р·С‹ РґР°РЅРЅС‹С…)</option>
                                </select>
                            </div>
                            <div class="bg-slate-50 p-3 rounded border border-slate-200">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2">РњР°РїРїРёРЅРі (WP Slug -> Tag)</label>
                                <div class="grid grid-cols-2 gap-2 mb-2">
                                    <input type="text" placeholder="WP Slug (detskaya)" class="p-1 border rounded text-xs aud-slug">
                                    <select class="p-1 border rounded text-xs aud-tag">
                                        <option value="child">-> Child</option>
                                        <option value="adult">-> Adult</option>
                                    </select>
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <input type="text" placeholder="WP Slug (vzroslaya)" class="p-1 border rounded text-xs aud-slug">
                                    <select class="p-1 border rounded text-xs aud-tag">
                                        <option value="adult">-> Adult</option>
                                        <option value="child">-> Child</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="font-bold text-slate-700 border-b pb-2">2. Р’РµСЂС‚РёРєР°Р»Рё (Verticals)</h3>
                            <div class="bg-slate-50 p-3 rounded border border-slate-200" id="vertical-container">
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-2">WP Slug -> Business Vertical</label>
                                <textarea name="vertical_map" class="w-full h-24 p-2 text-xs font-mono border rounded" placeholder="cosmetology: cosmetology&#10;stomatology: stomatology&#10;vrt: ivf"></textarea>
                                <p class="text-[10px] text-slate-400 mt-1">Р¤РѕСЂРјР°С‚: `slug: vertical_id`</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-slate-100">
                        <label class="block text-xs font-bold text-slate-500 uppercase mb-2">WP Taxonomy Source</label>
                        <select name="wp_taxonomy" class="w-full md:w-1/3 p-2 border rounded bg-slate-50 text-sm">
                            <option value="directions">directions (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ)</option>
                            <option value="category">category (СЂСѓР±СЂРёРєРё)</option>
                            <option value="specialty">specialty</option>
                        </select>
                    </div>
                </section>

                <!-- 5. OUTPUT (Tabbed View) -->
                <section id="sec-output" class="bg-slate-900 rounded-xl overflow-hidden shadow-2xl mt-10">
                    <div class="flex items-center bg-slate-800 border-b border-slate-700">
                        <button type="button" onclick="switchTab('php')" id="tab-btn-php" class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-blue-400 border-b-2 border-blue-500 bg-slate-800/50">
                            PHP Config
                        </button>
                        <button type="button" onclick="switchTab('json')" id="tab-btn-json" class="px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors border-b-2 border-transparent">
                            Raw JSON
                        </button>
                    </div>
                    
                    <div class="relative">
                        <button type="button" onclick="copyCode()" class="absolute top-4 right-4 text-xs text-slate-300 hover:text-white font-bold bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded flex items-center gap-1 transition-all z-10">
                            <i data-lucide="copy"></i> Copy
                        </button>
                        
                        <!-- PHP Content -->
                        <div id="content-php" class="block">
                            <div id="php-files-container" class="space-y-1">
                                <!-- Generated PHP files will be injected here -->
                                <div class="p-8 text-center text-slate-500 text-sm">РќР°Р¶РјРёС‚Рµ "Generate PHP" С‡С‚РѕР±С‹ СЃРѕР·РґР°С‚СЊ РєРѕРЅС„РёРі</div>
                            </div>
                        </div>

                        <!-- JSON Content -->
                        <div id="content-json" class="hidden">
                            <pre id="json-output" class="p-6 text-green-400 font-mono text-xs overflow-auto max-h-[600px]">Waiting for input...</pre>
                        </div>
                    </div>
                </section>

                <div class="h-20"></div>

            </form>
        </main>
    </div>

    <!-- Scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            addDatabase();
            
            // Auto-save
            document.getElementById('config-form').addEventListener('input', () => {
                document.getElementById('save-status').textContent = 'Saving...';
                clearTimeout(window.saveTimeout);
                window.saveTimeout = setTimeout(() => {
                    // Just save raw data, don't re-gen output to avoid flickering
                    saveProgress();
                }, 800);
            });
        });

        // Tabs Logic
        let currentTab = 'php';
        function switchTab(tab) {
            currentTab = tab;
            document.getElementById('content-php').classList.toggle('hidden', tab !== 'php');
            document.getElementById('content-json').classList.toggle('hidden', tab !== 'json');
            
            // Toggle active styles
            const btnPhp = document.getElementById('tab-btn-php');
            const btnJson = document.getElementById('tab-btn-json');
            
            if (tab === 'php') {
                btnPhp.className = "px-6 py-3 text-xs font-bold uppercase tracking-wider text-blue-400 border-b-2 border-blue-500 bg-slate-800/50";
                btnJson.className = "px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors border-b-2 border-transparent";
            } else {
                btnJson.className = "px-6 py-3 text-xs font-bold uppercase tracking-wider text-green-400 border-b-2 border-green-500 bg-slate-800/50";
                btnPhp.className = "px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors border-b-2 border-transparent";
            }
        }

        // Logic Helpers
        function getFormData() {
            const form = document.getElementById('config-form');
            const fd = new FormData(form);
            
            const audSlugs = document.querySelectorAll('.aud-slug');
            const audTags = document.querySelectorAll('.aud-tag');
            const audienceMap = {};
            audSlugs.forEach((inp, i) => { if(inp.value) audienceMap[inp.value] = audTags[i].value; });

            const vertMapRaw = fd.get('vertical_map');
            const verticalMap = {};
            if(vertMapRaw) {
                vertMapRaw.split('\n').forEach(line => {
                    const [k, v] = line.split(':');
                    if(k && v) verticalMap[k.trim()] = v.trim();
                });
            }

            return {
                client: { name: fd.get('client_name'), site: fd.get('site_url') },
                infrastructure: {
                    databases: fd.getAll('db_id[]').map((id, i) => ({
                        id, name: fd.getAll('db_name[]')[i], url: fd.getAll('db_url[]')[i]
                    }))
                },
                topology: {
                    cities: fd.get('cities').split(',').map(s => s.trim()).filter(s => s),
                    audience: { mode: fd.get('audience_mode'), mapping: audienceMap },
                    verticals: { mapping: verticalMap }
                },
                cms: {
                    taxonomy_source: fd.get('wp_taxonomy'),
                    assets: {
                        logo: fd.get('logo_url'),
                        colors: { primary: fd.get('color_primary'), accent: fd.get('color_accent') }
                    }
                }
            };
        }

        // --- Generator Functions ---

        function generateOutput() {
            const payload = getFormData();
            document.getElementById('json-output').textContent = JSON.stringify(payload, null, 2);
            switchTab('json');
        }

        async function generatePhp() {
            const payload = getFormData();
            const btn = document.querySelector('button[onclick="generatePhp()"]');
            const originalText = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Processing...';
            lucide.createIcons();

            try {
                const res = await fetch('generator.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload)
                });
                const response = await res.json();
                
                if(response.files) {
                    const container = document.getElementById('php-files-container');
                    container.innerHTML = ''; // Clear previous
                    
                    Object.entries(response.files).forEach(([filename, content]) => {
                        // Create File Block
                        const block = document.createElement('div');
                        block.className = "border-b border-slate-700 last:border-0";
                        
                        // Header
                        const header = document.createElement('div');
                        header.className = "bg-slate-800 px-6 py-2 flex items-center justify-between";
                        header.innerHTML = `<span class="text-xs font-mono font-bold text-slate-400">${filename}</span>`;
                        
                        // Code
                        const codePre = document.createElement('pre');
                        codePre.className = "p-6 text-blue-300 font-mono text-xs overflow-auto max-h-[400px]";
                        codePre.textContent = content;
                        
                        block.appendChild(header);
                        block.appendChild(codePre);
                        container.appendChild(block);
                    });
                    
                    switchTab('php');
                }
            } catch(e) {
                alert('Generation failed: ' + e);
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
                lucide.createIcons();
            }
        }

        // --- Other Helpers ---
        async function saveProgress() {
            const data = getFormData();
            try {
                await fetch('save.php', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
                document.getElementById('save-status').textContent = 'Saved вњ“';
            } catch(e) {}
        }

        function copyCode() {
            if(currentTab === 'json') {
                navigator.clipboard.writeText(document.getElementById('json-output').textContent);
            } else {
                // Copy all PHP files
                const blocks = document.querySelectorAll('#php-files-container pre');
                let text = '';
                blocks.forEach(b => text += b.textContent + "\n\n");
                navigator.clipboard.writeText(text);
            }
            alert('Copied to clipboard!');
        }

        // Stub functions for UI actions (kept from previous code)
        function addDatabase() {
            const container = document.getElementById('db-list');
            const div = document.createElement('div');
            div.className = 'grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-50 rounded border border-slate-200 relative group';
            div.innerHTML = `
                <input type="text" name="db_id[]" class="p-2 border rounded text-sm font-mono" placeholder="ID (e.g. chel_main)">
                <input type="text" name="db_name[]" class="p-2 border rounded text-sm" placeholder="Name (e.g. Р¤РёР»РёР°Р» Р¦РµРЅС‚СЂ)">
                <input type="text" name="db_url[]" class="p-2 border rounded text-sm font-mono text-slate-500" placeholder="API URL">
                <button type="button" onclick="this.parentElement.remove()" class="absolute top-1 right-1 text-slate-300 hover:text-red-500"><i data-lucide="x" class="w-4 h-4"></i></button>
            `;
            container.appendChild(div);
            lucide.createIcons();
        }
        function syncColor(type, val, fromText) {
            const hex = val.startsWith('#') ? val : '#' + val;
            if (fromText) document.getElementById(`color_${type}_picker`).value = hex;
            else document.getElementById(`color_${type}`).value = hex;
        }
        async function scanSite() {
            const url = document.getElementById('site_url').value;
            const btn = document.getElementById('scan_btn');
            if (!url) { alert('Р’РІРµРґРёС‚Рµ URL СЃР°Р№С‚Р°'); return; }
            btn.classList.add('scanning');
            btn.innerHTML = '<i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> Scanning...';
            lucide.createIcons();
            try {
                const res = await fetch(`scan_site.php?url=${encodeURIComponent(url)}`);
                const data = await res.json();
                if (data.colors?.primary) syncColor('primary', data.colors.primary, true);
                if (data.colors?.accent) syncColor('accent', data.colors.accent, true);
                if (data.title) document.getElementById('client_name').value = data.title;
                if (data.logo) {
                    document.getElementById('logo_url').value = data.logo;
                    document.getElementById('logo_preview').src = data.logo;
                    document.getElementById('logo_preview_container').classList.remove('hidden');
                }
            } catch (e) { alert('Scan failed'); } 
            finally {
                btn.classList.remove('scanning');
                btn.innerHTML = '<i data-lucide="wand-2" class="w-3 h-3"></i> Auto-scan';
                lucide.createIcons();
            }
        }
    </script>
</body>
</html>



===== FILE: C:\git\apl\med\php_backend\tools\wizard\reset.php =====

<?php
// php_backend/tools/wizard/reset.php
// РЎР±СЂРѕСЃ РїСЂРѕРіСЂРµСЃСЃР° (СѓРґР°Р»РµРЅРёРµ РґР°РјРї-С„Р°Р№Р»Р°)

header('Content-Type: application/json');

$file = __DIR__ . '/../../onboarding_dump.json';

if (file_exists($file)) {
    if (unlink($file)) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete file']);
    }
} else {
    echo json_encode(['success' => true]); // Already clean
}



===== FILE: C:\git\apl\med\php_backend\tools\wizard\save.php =====

<?php
// php_backend/tools/wizard/save.php
// РЎРѕС…СЂР°РЅСЏРµС‚ РїСЂРѕРјРµР¶СѓС‚РѕС‡РЅС‹Р№ СЂРµР·СѓР»СЊС‚Р°С‚ РѕРЅР±РѕСЂРґРёРЅРіР°

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// РЎРѕС…СЂР°РЅСЏРµРј РІ С„Р°Р№Р» СЂСЏРґРѕРј СЃ РёРЅСЃС‚СЂСѓРјРµРЅС‚Р°РјРё
$file = __DIR__ . '/../../onboarding_dump.json';
$backup = __DIR__ . '/../../onboarding_dump_' . date('Y-m-d_H-i') . '.json';

// Р”РµР»Р°РµРј Р±СЌРєР°Рї, РµСЃР»Рё С„Р°Р№Р» СѓР¶Рµ Р±С‹Р»
if (file_exists($file)) {
    copy($file, $backup);
}

if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(['success' => true, 'file' => realpath($file)]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file']);
}



===== FILE: C:\git\apl\med\php_backend\tools\wizard\scan_site.php =====


<?php
// php_backend/tools/wizard/scan_site.php
// РњРёРєСЂРѕСЃРµСЂРІРёСЃ РґР»СЏ Р°РЅР°Р»РёР·Р° СЃР°Р№С‚Р° РєР»РёРµРЅС‚Р°: РёР·РІР»РµРєР°РµС‚ С†РІРµС‚Р°, Р»РѕРіРѕ Рё РЅР°Р·РІР°РЅРёРµ.

header('Content-Type: application/json');

if (empty($_GET['url'])) {
    echo json_encode(['error' => 'URL required']);
    exit;
}

$url = $_GET['url'];
if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
    $url = "https://" . $url;
}

function fetchUrl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    // РџСЂРёС‚РІРѕСЂСЏРµРјСЃСЏ Р±СЂР°СѓР·РµСЂРѕРј, С‡С‚РѕР±С‹ РЅРµ РїРѕР»СѓС‡РёС‚СЊ 403
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $html = curl_exec($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);
    return ['html' => $html, 'final_url' => $info['url']];
}

$data = fetchUrl($url);
$html = $data['html'];

if (!$html) {
    echo json_encode(['error' => 'Could not fetch site']);
    exit;
}

$result = [
    'title' => '',
    'colors' => [],
    'logo' => '',
    'success' => true
];

// 1. Extract Title
if (preg_match('/<title>(.*?)<\/title>/si', $html, $matches)) {
    $result['title'] = trim($matches[1]);
}

// 2. Extract Theme Color (Meta)
if (preg_match('/<meta\s+name=["\']theme-color["\']\s+content=["\'](.*?)["\']/i', $html, $matches)) {
    $result['colors']['primary'] = $matches[1];
}

// 3. Extract Logo (OpenGraph)
if (preg_match('/<meta\s+property=["\']og:image["\']\s+content=["\'](.*?)["\']/i', $html, $matches)) {
    $result['logo'] = $matches[1];
    // РќРѕСЂРјР°Р»РёР·Р°С†РёСЏ URL Р»РѕРіРѕС‚РёРїР°
    if (strpos($result['logo'], '//') === 0) $result['logo'] = 'https:' . $result['logo'];
    elseif (strpos($result['logo'], 'http') !== 0) $result['logo'] = rtrim($url, '/') . '/' . ltrim($result['logo'], '/');
}

// 4. Heuristic Color Extraction (Find most common HEX codes)
preg_match_all('/#[a-f0-9]{6}/i', $html, $matches);
if (!empty($matches[0])) {
    $counts = array_count_values(array_map('strtolower', $matches[0]));
    arsort($counts);
    $topColors = array_keys($counts);
    
    // Р•СЃР»Рё primary РЅРµ РЅР°Р№РґРµРЅ С‡РµСЂРµР· meta, Р±РµСЂРµРј СЃР°РјС‹Р№ С‡Р°СЃС‚С‹Р№ С†РІРµС‚
    if (empty($result['colors']['primary']) && isset($topColors[0])) {
        $result['colors']['primary'] = $topColors[0];
    }
    
    // Accent Р±РµСЂРµРј РєР°Рє РІС‚РѕСЂРѕР№ РёР»Рё С‚СЂРµС‚РёР№ (С‡Р°СЃС‚Рѕ РїРµСЂРІС‹Р№ - СЌС‚Рѕ С‡РµСЂРЅС‹Р№ РёР»Рё Р±РµР»С‹Р№)
    $ignore = ['#ffffff', '#000000', '#f8f9fa', '#333333', strtolower($result['colors']['primary'] ?? '')];
    
    foreach ($topColors as $color) {
        if (!in_array($color, $ignore)) {
            $result['colors']['accent'] = $color;
            break;
        }
    }
}

// Fallbacks
if (empty($result['colors']['primary'])) $result['colors']['primary'] = '#2563EB';
if (empty($result['colors']['accent'])) $result['colors']['accent'] = '#F59E0B';

echo json_encode($result);



===== FILE: C:\git\apl\med\php_backend\tools\wordpress_integration_snippet.php =====


<?php
/*
 * SNIPPET NAME: Medical Widget Integrator
 * DESCRIPTION: Р”РѕР±Р°РІСЊС‚Рµ СЌС‚РѕС‚ РєРѕРґ РІ functions.php РІР°С€РµР№ С‚РµРјС‹ РёР»Рё РѕС„РѕСЂРјРёС‚Рµ РєР°Рє РїР»Р°РіРёРЅ.
 * USAGE: РСЃРїРѕР»СЊР·СѓР№С‚Рµ С€РѕСЂС‚РєРѕРґ [medical_widget] РЅР° Р»СЋР±РѕР№ СЃС‚СЂР°РЅРёС†Рµ.
 */

function mw_medical_widget_shortcode($atts) {
    // РќР°СЃС‚СЂРѕР№РєРё РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
    $a = shortcode_atts([
        'city' => 'chel',       // Р“РѕСЂРѕРґ РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ
        'base_url' => '/booking', // РџСѓС‚СЊ, РєСѓРґР° РІС‹ Р·Р°РіСЂСѓР·РёР»Рё РїР°РїРєСѓ dist Рё php_backend
        'api_url' => '',        // РћСЃС‚Р°РІСЊС‚Рµ РїСѓСЃС‚С‹Рј, РµСЃР»Рё api.php Р»РµР¶РёС‚ РІРЅСѓС‚СЂРё base_url
        'config_url' => '',     // [NEW] URL РІРЅРµС€РЅРµРіРѕ РєРѕРЅС„РёРіР° (JSON) РґР»СЏ С†РµРЅС‚СЂР°Р»РёР·РѕРІР°РЅРЅРѕРіРѕ СѓРїСЂР°РІР»РµРЅРёСЏ РґРёР·Р°Р№РЅРѕРј
        'auto_open' => 'false'  // РђРІС‚РѕРјР°С‚РёС‡РµСЃРєРё СЂР°СЃРєСЂС‹С‚СЊ РІРёРґР¶РµС‚?
    ], $atts);

    // РќРѕСЂРјР°Р»РёР·Р°С†РёСЏ РїСѓС‚РµР№
    $baseUrl = rtrim($a['base_url'], '/');
    $apiUrl = $a['api_url'] ? $a['api_url'] : "{$baseUrl}/php_backend/api.php";

    // РЈРЅРёРєР°Р»СЊРЅС‹Р№ ID РєРѕРЅС‚РµР№РЅРµСЂР°
    $rootId = 'medical-booking-widget-root';

    ob_start();
    ?>
    <!-- Medical Booking Widget Container -->
    <div id="<?php echo esc_attr($rootId); ?>" 
         data-api-url="<?php echo esc_url($apiUrl); ?>"
         data-city="<?php echo esc_attr($a['city']); ?>"
         data-auto-open="<?php echo esc_attr($a['auto_open']); ?>"
         <?php if($a['config_url']): ?>data-remote-config-url="<?php echo esc_url($a['config_url']); ?>"<?php endif; ?>>
    </div>

    <!-- Styles & Scripts -->
    <!-- Р’РђР–РќРћ: РџСЂРё РєР°Р¶РґРѕР№ РїРµСЂРµСЃР±РѕСЂРєРµ (npm run build) РёРјРµРЅР° С„Р°Р№Р»РѕРІ .js Рё .css РјРµРЅСЏСЋС‚СЃСЏ (С…РµС€Рё). -->
    
    <script>
    (function() {
        const baseUrl = '<?php echo $baseUrl; ?>';
        
        // РџРµСЂРµРґР°С‡Р° РєРѕРЅС„РёРіР° РІ РіР»РѕР±Р°Р»СЊРЅСѓСЋ РѕР±Р»Р°СЃС‚СЊ (Fallback РµСЃР»Рё data-attr РЅРµ СЃСЂР°Р±РѕС‚Р°РµС‚)
        window.MED_WIDGET_CONFIG = window.MED_WIDGET_CONFIG || {};
        <?php if($a['config_url']): ?>
        window.MED_WIDGET_CONFIG.remoteConfigUrl = '<?php echo esc_url($a['config_url']); ?>';
        <?php endif; ?>

        // Р¤СѓРЅРєС†РёСЏ Р·Р°РіСЂСѓР·РєРё CSS
        function loadCSS(href) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }

        // Р¤СѓРЅРєС†РёСЏ Р·Р°РіСЂСѓР·РєРё JS РјРѕРґСѓР»СЏ
        function loadJS(src) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = src;
            document.body.appendChild(script);
        }

        // Р—Р°РјРµРЅРёС‚Рµ РЅР° СЂРµР°Р»СЊРЅС‹Рµ РёРјРµРЅР° С„Р°Р№Р»РѕРІ РїРѕСЃР»Рµ СЃР±РѕСЂРєРё!
        // loadCSS(baseUrl + '/assets/index.css');
        // loadJS(baseUrl + '/assets/index.js');
    })();
    </script>

    <?php
    return ob_get_clean();
}

add_shortcode('medical_widget', 'mw_medical_widget_shortcode');


===== FILE: C:\git\apl\med\php_backend\troubleshoot.php =====

<?php
// php_backend/troubleshoot.php
// РЎРєСЂРёРїС‚ РґР»СЏ РґРёР°РіРЅРѕСЃС‚РёРєРё СЃРµС‚РµРІС‹С… РїСЂРѕР±Р»РµРј (API Error 0)

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Helper for curl
function testUrl($url, $token = '') {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, 1);
    
    // Minimal payload to provoke a response
    $params = ['chatid' => 123456, 'apikey' => $token];
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    
    // Headers
    if ($token) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['apikey: ' . $token]);
    }

    $res = curl_exec($ch);
    $error = curl_error($ch);
    $info = curl_getinfo($ch);
    curl_close($ch);

    return ['info' => $info, 'error' => $error, 'response' => $res];
}

$manualUrl = $_POST['manual_url'] ?? '';
$manualToken = $_POST['manual_token'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Network Diagnostic</title>
    <style>
        body { font-family: system-ui; padding: 20px; background: #f0f2f5; }
        .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        h2 { margin-top: 0; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.8em; }
        .green { background: #d1fae5; color: #065f46; }
        .red { background: #fee2e2; color: #991b1b; }
        input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 300px; }
        button { padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #1d4ed8; }
        pre { background: #1e293b; color: #e2e8f0; padding: 10px; border-radius: 6px; overflow-x: auto; }
    </style>
</head>
<body>

    <h1>рџ“Ў Network Diagnostic Tool</h1>

    <!-- 1. Manual Tester -->
    <div class="card">
        <h2>рџ›  Manual URL Tester</h2>
        <p>Р•СЃР»Рё РєРѕРЅС„РёРі РЅРµ СЂР°Р±РѕС‚Р°РµС‚, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїСЂРѕРІРµСЂРёС‚СЊ Р°РґСЂРµСЃ РІСЂСѓС‡РЅСѓСЋ Р·РґРµСЃСЊ.</p>
        <form method="POST">
            <div>
                <label>Target URL:</label><br>
                <input type="text" name="manual_url" value="<?= htmlspecialchars($manualUrl) ?>" placeholder="https://back.cispb.ru/qms-api/spec_list/" style="width: 100%; max-width: 500px;">
            </div>
            <div style="margin-top: 10px;">
                <label>API Token (Optional):</label><br>
                <input type="text" name="manual_token" value="<?= htmlspecialchars($manualToken) ?>" placeholder="some_api_key...">
            </div>
            <div style="margin-top: 10px;">
                <button type="submit">Test Connection</button>
            </div>
        </form>

        <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
            <div style="margin-top: 20px; border-top: 1px solid #eee; pt-4;">
                <?php 
                    if ($manualUrl) {
                        echo "<h3>Testing: " . htmlspecialchars($manualUrl) . "</h3>";
                        $res = testUrl($manualUrl, $manualToken);
                        $code = $res['info']['http_code'];
                        
                        if ($code == 0) {
                            echo "<div class='badge red'>CONNECTION FAILED</div>";
                            echo "<p>cURL Error: " . htmlspecialchars($res['error']) . "</p>";
                        } else {
                            echo "<div class='badge " . ($code == 200 ? 'green' : 'red') . "'>HTTP $code</div>";
                            echo "<p>Time: " . $res['info']['total_time'] . "s</p>";
                            echo "<pre>" . htmlspecialchars(substr($res['response'], 0, 500)) . "...</pre>";
                        }
                    } else {
                        echo "Please enter a URL.";
                    }
                ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- 2. Internet Check -->
    <div class="card">
        <h2>рџЊђ Server Connectivity</h2>
        <?php
        $ch = curl_init('https://api.ipify.org');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        $ip = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);

        if ($info['http_code'] == 200) {
            echo "<div class='badge green'>ONLINE</div>";
            echo "<div>Public IP: <b>$ip</b></div>";
            echo "<small>РџРµСЂРµРґР°Р№С‚Рµ СЌС‚РѕС‚ IP Р°РґРјРёРЅР°Рј РњРРЎ РґР»СЏ РґРѕР±Р°РІР»РµРЅРёСЏ РІ White List.</small>";
        } else {
            echo "<div class='badge red'>OFFLINE</div>";
            echo "<div>Server cannot reach external internet.</div>";
        }
        ?>
    </div>

    <!-- 3. Config Check -->
    <div class="card">
        <h2>вљ™пёЏ Configured Instances</h2>
        <?php
        $configPath = __DIR__ . '/config_access.php';
        if (!file_exists($configPath)) {
            echo "<div style='color:red'>config_access.php not found.</div>";
        } else {
            $config = require $configPath;
            $instances = $config['qms_instances'] ?? [];
            
            if (empty($instances)) {
                echo "No instances configured.";
            } else {
                echo "<table border='1' cellpadding='5' style='border-collapse: collapse; width: 100%;'>";
                echo "<tr><th>Key</th><th>URL</th><th>Token</th><th>Status</th></tr>";
                
                foreach ($instances as $key => $inst) {
                    $pingUrl = rtrim($inst['api_url'], '/') . '/spec_list/'; // Try spec_list as ping
                    $res = testUrl($pingUrl, $inst['api_token']);
                    $code = $res['info']['http_code'];
                    $status = ($code == 200) ? "<span class='badge green'>OK (200)</span>" : "<span class='badge red'>ERR ($code)</span>";
                    
                    echo "<tr>";
                    echo "<td>$key</td>";
                    echo "<td>" . htmlspecialchars($inst['api_url']) . "</td>";
                    echo "<td>" . (empty($inst['api_token']) ? 'вќЊ Empty' : 'вњ… Set') . "</td>";
                    echo "<td>$status</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }
        }
        ?>
    </div>

</body>
</html>


===== FILE: C:\git\apl\med\php_backend\whoami.php =====

<?php
// Use this to find out which IP needs to be whitelisted on the MIS server firewall
header('Content-Type: text/plain');
echo "Р’Р°С€ СЃРµСЂРІРµСЂ С…РѕРґРёС‚ РІ РёРЅС‚РµСЂРЅРµС‚ СЃ IP:\n";
$ch = curl_init('https://api.ipify.org');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
echo curl_exec($ch);
curl_close($ch);
echo "\n\nРЎРєРѕРїРёСЂСѓР№С‚Рµ СЌС‚РѕС‚ IP Рё РїРµСЂРµРґР°Р№С‚Рµ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂСѓ РњРРЎ РґР»СЏ РІРЅРµСЃРµРЅРёСЏ РІ White List.";
?>


===== FILE: C:\git\apl\med\postcss.config.js =====

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


===== FILE: C:\git\apl\med\public\manifest.json =====


{
  "name": "Medical Booking",
  "short_name": "MedBooking",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "description": "Р‘С‹СЃС‚СЂР°СЏ Р·Р°РїРёСЃСЊ Рє РІСЂР°С‡Сѓ Р±РµР· Р·РІРѕРЅРєР°.",
  "icons": [
    {
      "src": "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://cdn-icons-png.flaticon.com/512/3063/3063176.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}



===== FILE: C:\git\apl\med\README.md =====


# Medical Booking Widget (Unified Core v2.3)

**Status:** Production Ready
**Focus:** Booking Engine + Smart Search (No Chat)

Р­С‚Рѕ Р°РІС‚РѕРЅРѕРјРЅС‹Р№ РІРёРґР¶РµС‚ Р·Р°РїРёСЃРё, РєРѕС‚РѕСЂС‹Р№ РјРѕР¶РЅРѕ РІСЃС‚СЂРѕРёС‚СЊ РІ Р»СЋР±РѕР№ СЃР°Р№С‚ (WordPress, Bitrix, Tilda) РёР»Рё РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РєР°Рє РѕС‚РґРµР»СЊРЅРѕРµ РїСЂРёР»РѕР¶РµРЅРёРµ.

## рџ“¦ РЎС‚СЂСѓРєС‚СѓСЂР°
*   `/src` - РСЃС…РѕРґРЅС‹Р№ РєРѕРґ React (Frontend Widget).
*   `/php_backend` - PHP API Gateway (Backend Core).
*   `/dist` - РЎРєРѕРјРїРёР»РёСЂРѕРІР°РЅРЅР°СЏ РІРµСЂСЃРёСЏ РґР»СЏ РґРµРїР»РѕСЏ.

---

## рџљЂ РРЅСЃС‚СЂСѓРєС†РёСЏ РїРѕ СѓСЃС‚Р°РЅРѕРІРєРµ (Deploy)

### РЁР°Рі 1: РџРѕРґРіРѕС‚РѕРІРєР° С„Р°Р№Р»РѕРІ
Р’С‹РїРѕР»РЅРёС‚Рµ РєРѕРјР°РЅРґСѓ СЃР±РѕСЂРєРё (РµСЃР»Рё Сѓ РІР°СЃ РµСЃС‚СЊ Node.js):
```bash
npm install
npm run build
```
Р­С‚Рѕ СЃРѕР·РґР°СЃС‚ РїР°РїРєСѓ `/dist` СЃ РѕРїС‚РёРјРёР·РёСЂРѕРІР°РЅРЅС‹РјРё JS/CSS С„Р°Р№Р»Р°РјРё.

### РЁР°Рі 2: Р—Р°РіСЂСѓР·РєР° РЅР° СЃРµСЂРІРµСЂ
РЎРѕР·РґР°Р№С‚Рµ РЅР° РІР°С€РµРј С…РѕСЃС‚РёРЅРіРµ РїР°РїРєСѓ (РЅР°РїСЂРёРјРµСЂ, `/booking`) Рё Р·Р°РіСЂСѓР·РёС‚Рµ С‚СѓРґР°:
1.  Р’СЃРµ СЃРѕРґРµСЂР¶РёРјРѕРµ РїР°РїРєРё `/dist` (index.html, assets...).
2.  РџСЂСЏРјРѕ РІРЅСѓС‚СЂСЊ РїРѕР»РѕР¶РёС‚Рµ РїР°РїРєСѓ `/php_backend`.

РЎС‚СЂСѓРєС‚СѓСЂР° РЅР° СЃРµСЂРІРµСЂРµ РґРѕР»Р¶РЅР° РІС‹РіР»СЏРґРµС‚СЊ С‚Р°Рє:
```
/public_html/booking/
в”њв”Ђв”Ђ index.html
в”њв”Ђв”Ђ assets/
в”‚   в”њв”Ђв”Ђ index-Dx8s....js
в”‚   в””в”Ђв”Ђ index-B2a....css
в”њв”Ђв”Ђ php_backend/
в”‚   в”њв”Ђв”Ђ api.php
в”‚   в”њв”Ђв”Ђ config.php
в”‚   в”њв”Ђв”Ђ config_access.php  <-- РЎРћР—Р”РђРўР¬ РЎРђРњРћРњРЈ (СЃРј. РЅРёР¶Рµ)
в”‚   в””в”Ђв”Ђ ...
```

### РЁР°Рі 3: РќР°СЃС‚СЂРѕР№РєР° Р‘СЌРєРµРЅРґР°
1.  Р—Р°Р№РґРёС‚Рµ РІ `php_backend`.
2.  РџРµСЂРµРёРјРµРЅСѓР№С‚Рµ `config_access.example.php` РІ `config_access.php`.
3.  РћС‚СЂРµРґР°РєС‚РёСЂСѓР№С‚Рµ `config_access.php`:
    *   РЈРєР°Р¶РёС‚Рµ РґРѕСЃС‚СѓРїС‹ Рє Р±Р°Р·Рµ РґР°РЅРЅС‹С… WordPress (`cms_db`).
    *   Р’СЃС‚Р°РІСЊС‚Рµ API РєР»СЋС‡Рё qMS.
    *   Р’СЃС‚Р°РІСЊС‚Рµ API РєР»СЋС‡ OpenAI/OpenRouter (РґР»СЏ СѓРјРЅРѕРіРѕ РїРѕРёСЃРєР°).

### РЁР°Рі 4: Р’СЃС‚Р°РІРєР° РЅР° СЃР°Р№С‚ (WordPress)
Р’СЃС‚Р°РІСЊС‚Рµ СЌС‚РѕС‚ РєРѕРґ РЅР° СЃС‚СЂР°РЅРёС†Сѓ, РіРґРµ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ РІРёРґР¶РµС‚:

```html
<!-- РљРѕРЅС‚РµР№РЅРµСЂ -->
<div id="medical-booking-widget-root" 
     data-api-url="/booking/php_backend/api.php" 
     data-city="chel">
</div>

<!-- РЎРєСЂРёРїС‚С‹ (РїСѓС‚Рё РјРѕРіСѓС‚ РѕС‚Р»РёС‡Р°С‚СЊСЃСЏ РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ С…РµС€РµР№ СЃР±РѕСЂРєРё) -->
<link rel="stylesheet" href="/booking/assets/index.css">
<script type="module" src="/booking/assets/index.js"></script>
```

---

## рџ›  Р Р°Р·СЂР°Р±РѕС‚РєР° (Local Development)

### Р—Р°РїСѓСЃРє С„СЂРѕРЅС‚РµРЅРґР°
```bash
npm run dev
```
РћС‚РєСЂРѕРµС‚ http://localhost:5173.

### Р—Р°РїСѓСЃРє Р±СЌРєРµРЅРґР° (PHP)
Р’ РѕС‚РґРµР»СЊРЅРѕРј С‚РµСЂРјРёРЅР°Р»Рµ:
```bash
npm run php
```
Р—Р°РїСѓСЃС‚РёС‚ PHP СЃРµСЂРІРµСЂ РЅР° http://localhost:8000.

---

## рџ”ђ Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ (152-Р¤Р—)
*   РџРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РґР°РЅРЅС‹Рµ (РўРµР»РµС„РѕРЅС‹) РѕР±СЂР°Р±Р°С‚С‹РІР°СЋС‚СЃСЏ С‚РѕР»СЊРєРѕ РІ `php_backend` Рё РѕС‚РїСЂР°РІР»СЏСЋС‚СЃСЏ СЃСЂР°Р·Сѓ РІ РњРРЎ.
*   Frontend РЅРµ С…СЂР°РЅРёС‚ РґР°РЅРЅС‹Рµ РїР°С†РёРµРЅС‚Р° РІ cookies (С‚РѕР»СЊРєРѕ session id).
*   РџР°РїРєР° `php_backend` Р·Р°С‰РёС‰РµРЅР° `.htaccess` (Р·Р°РїСЂРµС‚ РґРѕСЃС‚СѓРїР° Рє РєРѕРЅС„РёРіР°Рј).



===== FILE: C:\git\apl\med\services\api.ts =====

import { Branch, City, Doctor, TimeSlot } from '../types';

const API_ENDPOINT = './php_backend/api.php'; 
const USE_REAL_API = (import.meta as any).env.PROD; 

const MOCK_DOCTORS: Doctor[] = [
    { id: 'spb_1', qmsId: 'spb_1', name: 'Р”СЂ. РРІР°РЅРѕРІ Рђ.Рђ.', specialty: 'РўРµСЂР°РїРµРІС‚', photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200', branchId: 'spb_main', address: 'РќРµРІСЃРєРёР№ РїСЂ., 1', databaseId: 'DB_SPB_MAIN', experienceYears: 12, rating: 4.8 },
    { id: 'chel_m_1', qmsId: 'chel_m_1', name: 'Р”СЂ. РЎРёРґРѕСЂРѕРІ Рљ.Рљ.', specialty: 'РљР°СЂРґРёРѕР»РѕРі', photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200', branchId: 'chel_br_1', address: 'СѓР». Р›РµРЅРёРЅР°, 10', databaseId: 'DB_CHEL_MAIN', experienceYears: 15, rating: 5.0 },
    { id: 'chel_ex_1', qmsId: 'chel_ex_1', name: 'Р”СЂ. РњРёС…Р°Р№Р»РѕРІ Рњ.Рњ.', specialty: 'РЎС‚РѕРјР°С‚РѕР»РѕРі', photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200', branchId: 'chel_br_4', address: 'СѓР». РўСЂСѓРґР°, 100', databaseId: 'DB_CHEL_EXTRA', experienceYears: 10, rating: 4.8 },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  
  getDoctorsByCity: async (city: City): Promise<Doctor[]> => {
    if (USE_REAL_API) {
      const response = await fetch(`${API_ENDPOINT}?action=get_doctors&city=${city === City.CHEL ? 'chel' : 'spb'}`);
      const json = await response.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    }

    await delay(600);
    if (city === City.SPB) return MOCK_DOCTORS.filter(d => d.databaseId === 'DB_SPB_MAIN');
    return MOCK_DOCTORS.filter(d => d.databaseId.includes('CHEL'));
  },

  getSlots: async (doctor: Doctor, date: string): Promise<TimeSlot[]> => {
    if (USE_REAL_API) {
      // Р—РґРµСЃСЊ РјС‹ РїРµСЂРµРґР°РµРј databaseId РІ PHP, С‡С‚РѕР±С‹ РѕРЅ Р·РЅР°Р», РєР°РєСѓСЋ Р±Р°Р·Сѓ qMS РѕРїСЂР°С€РёРІР°С‚СЊ
      const url = `${API_ENDPOINT}?action=get_slots&doctor_id=${doctor.id}&database_id=${doctor.databaseId}&date=${date}`;
      const response = await fetch(url);
      const json = await response.json();
      if (!json.success) throw new Error(json.error);
      return json.data;
    }

    // Mock logic
    await delay(400);
    const slots: TimeSlot[] = [];
    // Р“РµРЅРµСЂРёСЂСѓРµРј СЃР»СѓС‡Р°Р№РЅС‹Рµ СЃР»РѕС‚С‹
    for (let i = 9; i < 18; i++) {
        if (i === 13) continue; // РћР±РµРґ
        slots.push({
            id: `slot_${i}`,
            time: `${i}:00`,
            date: date,
            isAvailable: Math.random() > 0.3
        });
        slots.push({
            id: `slot_${i}_30`,
            time: `${i}:30`,
            date: date,
            isAvailable: Math.random() > 0.3
        });
    }
    return slots;
  }
};


===== FILE: C:\git\apl\med\services\mockQmsApi.ts =====




===== FILE: C:\git\apl\med\src\App.tsx =====


import React, { useEffect } from 'react';
import { useBookingStore, STEPS } from './store/bookingStore';
import { currentTheme } from './config/theme';
import { analytics } from './services/analytics'; 

// Step Components
import { StepHome } from './components/steps/StepHome'; 
import { StepDimensions } from './components/steps/StepDimensions';
import { StepBranches } from './components/steps/StepBranches'; 
import { StepDoctors } from './components/steps/StepDoctors'; 
import { StepForm } from './components/steps/StepForm'; 
import { StepSlots } from './components/steps/StepSlots'; 
import { StepSuccess } from './components/steps/StepSuccess';

import { WizardLayout } from './components/WizardLayout';
import { WidgetProps } from './types';
import { Loader2 } from 'lucide-react';

export default function App(props: WidgetProps) {
  const { 
      step, 
      searchQuery, 
      initialize, 
      loadConfig, 
      configLoaded, 
      topology 
  } = useBookingStore();
  
  // 1. BOOTSTRAPPING PHASE
  // Load configuration from backend (or CDN) before rendering anything.
  useEffect(() => {
      loadConfig();
  }, []);

  // 2. INITIALIZATION PHASE (Deep Linking)
  // Run this only after config is loaded to ensure we have routing rules.
  useEffect(() => {
      if (configLoaded) {
          if (props.initialCity || props.preselectedSpecialty || props.preselectedDoctorId || props.initialBranchId) {
              initialize({
                  city: props.initialCity,
                  specialty: props.preselectedSpecialty,
                  doctorId: props.preselectedDoctorId,
                  branchId: props.initialBranchId,
                  dimensions: props.initialDimension
              });
          }
      }
  }, [configLoaded, props]);

  // 3. ANALYTICS
  useEffect(() => {
      if (!configLoaded) return;
      const stepNames: Record<number, string> = {
          [STEPS.HOME]: 'Home',
          [STEPS.DIMENSIONS]: 'Dimensions',
          [STEPS.BRANCHES]: 'BranchSelect',
          [STEPS.DOCTORS]: 'DoctorsList',
          [STEPS.SLOTS]: 'Slots',
          [STEPS.FORM]: 'Form',
          [STEPS.SUCCESS]: 'Success'
      };
      analytics.trackStep(step, stepNames[step] || 'Unknown');
  }, [step, configLoaded]);

  // --- RENDERERS ---

  const renderStep = () => {
    switch(step) {
        case STEPS.HOME: return <StepHome />;
        case STEPS.DIMENSIONS: return <StepDimensions />; 
        case STEPS.BRANCHES: return <StepBranches />; 
        case STEPS.DOCTORS: return <StepDoctors />; 
        case STEPS.SLOTS: return <StepSlots />;
        case STEPS.FORM: return <StepForm />;
        case STEPS.SUCCESS: return <StepSuccess />;
        default: return <StepHome />;
    }
  }

  const getTitle = () => {
      const { labels } = currentTheme;
      const hasDimensions = topology?.dimensions && Object.keys(topology.dimensions).some(k => topology.dimensions[k].enabled);

      switch(step) {
          case STEPS.HOME: return labels.step1Title;
          case STEPS.DIMENSIONS: return hasDimensions ? 'РЈС‚РѕС‡РЅРёС‚Рµ РїР°СЂР°РјРµС‚СЂС‹' : labels.step2Title;
          case STEPS.BRANCHES: return 'Р’С‹Р±РµСЂРёС‚Рµ С„РёР»РёР°Р»';
          case STEPS.DOCTORS: return searchQuery ? `РџРѕРёСЃРє: ${searchQuery}` : labels.step2Title;
          case STEPS.SLOTS: return labels.selectTimeBtn; 
          case STEPS.FORM: return labels.confirmBookingBtn;
          case STEPS.SUCCESS: return 'Р“РѕС‚РѕРІРѕ';
          default: return '';
      }
  }

  // A. LOADING STATE
  if (!configLoaded) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
              <div className="relative flex flex-col items-center gap-6">
                  <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-ping absolute"></div>
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600 relative z-10" />
                  
                  <div className="text-center space-y-2 relative z-10">
                      <span className="text-slate-500 text-xs font-bold tracking-widest uppercase block">
                          Р—Р°РіСЂСѓР·РєР° РјРѕРґСѓР»СЏ
                      </span>
                      <span className="text-slate-300 text-[10px]">
                          РџРѕР»СѓС‡РµРЅРёРµ РєРѕРЅС„РёРіСѓСЂР°С†РёРё...
                      </span>
                  </div>
              </div>
          </div>
      )
  }

  // B. MAIN APP STATE
  return (
    <div className="min-h-screen w-full relative selection:bg-primary/20 selection:text-primary-foreground font-sans">
        
        {/* Dynamic Background */}
        <div className="blob-cont">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
        </div>

        <div className="relative z-10 p-4 md:p-10 flex justify-center items-start">
            {step === STEPS.SUCCESS ? (
                <StepSuccess />
            ) : (
                <WizardLayout title={getTitle()}>
                    {renderStep()}
                </WizardLayout>
            )}
        </div>
    </div>
  );
}



===== FILE: C:\git\apl\med\src\components\admin\AdminLayout.tsx =====


import React, { useState } from 'react';
import { Lock, LogOut, Database, Trash2, CheckCircle } from 'lucide-react';
import { apiService } from '../../services/api';

// --- SUB-COMPONENTS ---

const LoginScreen = ({ onLogin }: { onLogin: (key: string) => void }) => {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        const isValid = await apiService.verifyAdminKey(key);
        setLoading(false);
        
        if (isValid) {
            onLogin(key);
        } else {
            setError('РќРµРІРµСЂРЅС‹Р№ РєР»СЋС‡ РґРѕСЃС‚СѓРїР°');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 text-purple-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Access</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="password" 
                            value={key}
                            onChange={e => setKey(e.target.value)}
                            placeholder="Р’РІРµРґРёС‚Рµ СЃРµРєСЂРµС‚РЅС‹Р№ РєР»СЋС‡..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all"
                            autoFocus
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button 
                        type="submit" 
                        disabled={loading || !key}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'РџСЂРѕРІРµСЂРєР°...' : 'Р’РѕР№С‚Рё'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- MAIN LAYOUT ---

export const AdminLayout = () => {
    const [authKey, setAuthKey] = useState<string | null>(localStorage.getItem('admin_key'));
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [msg, setMsg] = useState('');

    const handleLogin = (key: string) => {
        setAuthKey(key);
        localStorage.setItem('admin_key', key);
    };

    const handleLogout = () => {
        setAuthKey(null);
        localStorage.removeItem('admin_key');
    };

    const handleClearCache = async () => {
        setStatus('loading');
        try {
            // Manual fetch since apiService might not have this specific method typed yet
            const response = await fetch('./php_backend/api.php?action=admin_clear_cache', {
                headers: { 'X-Admin-Key': authKey || '' }
            });
            const json = await response.json();
            
            if (json.success) {
                setStatus('success');
                setMsg(json.data?.message || 'РљСЌС€ СѓСЃРїРµС€РЅРѕ РѕС‡РёС‰РµРЅ');
            } else {
                setStatus('error');
                setMsg(json.error || 'РћС€РёР±РєР° РѕС‡РёСЃС‚РєРё');
            }
        } catch (e: any) {
            setStatus('error');
            setMsg(e.message);
        }
    };

    if (!authKey) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex items-center justify-center p-6">
            <div className="w-full max-w-lg space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        <Database className="w-6 h-6 text-blue-500" />
                        System Manager
                    </h1>
                    <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm transition-colors">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                {/* Status Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4 text-slate-100">РЈРїСЂР°РІР»РµРЅРёРµ РљСЌС€РµРј</h2>
                    <p className="text-slate-400 text-sm mb-6">
                        РџРѕРёСЃРє РІСЂР°С‡РµР№ РёСЃРїРѕР»СЊР·СѓРµС‚ Р»РѕРєР°Р»СЊРЅС‹Р№ С„Р°Р№Р»РѕРІС‹Р№ РєСЌС€ РґР»СЏ СѓСЃРєРѕСЂРµРЅРёСЏ СЂР°Р±РѕС‚С‹. 
                        Р•СЃР»Рё РІС‹ РѕР±РЅРѕРІРёР»Рё РґР°РЅРЅС‹Рµ РІ РњРРЎ РёР»Рё WordPress, СЃР±СЂРѕСЃСЊС‚Рµ РєСЌС€ Р·РґРµСЃСЊ.
                    </p>

                    <button 
                        onClick={handleClearCache}
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-4 rounded-lg transition-all active:scale-[0.98]"
                    >
                        {status === 'loading' ? (
                            <div className="animate-spin w-5 h-5 border-2 border-slate-400 border-t-white rounded-full"></div>
                        ) : (
                            <Trash2 className="w-5 h-5 text-red-400" />
                        )}
                        <span>РћС‡РёСЃС‚РёС‚СЊ РєСЌС€ РїРѕРёСЃРєР°</span>
                    </button>

                    {/* Feedback Area */}
                    {status === 'success' && (
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>{msg}</span>
                        </div>
                    )}
                    
                    {status === 'error' && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 animate-in fade-in slide-in-from-top-2">
                            {msg}
                        </div>
                    )}
                </div>

                <div className="text-center text-xs text-slate-600">
                    Medical Widget Core v2.4 (No-AI)
                </div>
            </div>
        </div>
    );
};


===== FILE: C:\git\apl\med\src\components\ArchitecturePreview.tsx =====

import React from 'react';
import { Network, Database, Server, Layout, ShieldAlert } from 'lucide-react';

const ArchitecturePreview: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300 p-6 rounded-xl mb-8 border border-slate-700 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Server className="w-6 h-6 text-blue-400" />
        РђСЂС…РёС‚РµРєС‚СѓСЂРЅРѕРµ СЂРµС€РµРЅРёРµ (Critical Review)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-2">РџРѕС‡РµРјСѓ React, Р° РЅРµ С‡РёСЃС‚С‹Р№ PHP?</h3>
          <p className="text-sm mb-3">
            Р’С‹ РїСЂРѕСЃРёР»Рё PHP СЃРєСЂРёРїС‚С‹, РЅРѕ РґР»СЏ <strong>РІРёРґР¶РµС‚Р° Р·Р°РїРёСЃРё</strong> (standalone component) Р»СѓС‡С€Рµ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ Р°СЂС…РёС‚РµРєС‚СѓСЂСѓ "РўРѕР»СЃС‚С‹Р№ РєР»РёРµРЅС‚":
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1 text-slate-400">
            <li><strong>РќРµР·Р°РІРёСЃРёРјРѕСЃС‚СЊ:</strong> React-РІРёРґР¶РµС‚ РјРѕР¶РЅРѕ РІСЃС‚СЂРѕРёС‚СЊ РІ MODX Рё WordPress РїСЂРѕСЃС‚С‹Рј <code>&lt;div id="widget"&gt;</code>.</li>
            <li><strong>UX:</strong> РњРіРЅРѕРІРµРЅРЅРѕРµ РїРµСЂРµРєР»СЋС‡РµРЅРёРµ РјРµР¶РґСѓ РіРѕСЂРѕРґР°РјРё Р±РµР· РїРµСЂРµР·Р°РіСЂСѓР·РєРё СЃС‚СЂР°РЅРёС†С‹.</li>
            <li><strong>РЎР»РѕР¶РЅР°СЏ Р»РѕРіРёРєР°:</strong> РЈРїСЂР°РІР»РµРЅРёРµ СЃРѕСЃС‚РѕСЏРЅРёРµРј (РІС‹Р±РѕСЂ РєР»РёРЅРёРєРё &rarr; РІСЂР°С‡Р° &rarr; СЃР»РѕС‚Р°) РїСЂРѕС‰Рµ РІ JS.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-green-300 uppercase tracking-wider mb-2">Р РѕР»СЊ PHP (Backend Proxy)</h3>
          <p className="text-sm mb-3">
            PHP РЅРµРѕР±С…РѕРґРёРј РєР°Рє "РїСЂРѕСЃР»РѕР№РєР°" (Middleware). Р‘СЂР°СѓР·РµСЂ <strong>РЅРµ РґРѕР»Р¶РµРЅ</strong> Р·РЅР°С‚СЊ Рѕ РІР°С€РёС… 3-С… Р±Р°Р·Р°С… РґР°РЅРЅС‹С… qMS РЅР°РїСЂСЏРјСѓСЋ.
          </p>
          <div className="bg-slate-800 p-3 rounded text-xs font-mono border border-slate-600">
            <div className="flex items-center gap-2 mb-2">
              <Layout className="w-4 h-4 text-blue-400" /> React App (Frontend)
            </div>
            <div className="flex justify-center my-1 text-slate-500">в¬‡пёЏ JSON Request</div>
            <div className="flex items-center gap-2 mb-2 p-1 bg-slate-700 rounded text-green-400">
              <ShieldAlert className="w-4 h-4" /> PHP Unified Controller (API Gateway)
            </div>
            <div className="flex justify-center my-1 text-slate-500">в¬‡пёЏ Routes based on `db_id`</div>
            <div className="flex gap-2 justify-between">
              <span className="bg-slate-900 p-1 rounded border border-slate-700">qMS SPb</span>
              <span className="bg-slate-900 p-1 rounded border border-slate-700">qMS Chel 1</span>
              <span className="bg-slate-900 p-1 rounded border border-slate-700">qMS Chel 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePreview;


===== FILE: C:\git\apl\med\src\components\ErrorBoundary.tsx =====

import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import * as Sentry from "@sentry/react";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly declare state to satisfy TypeScript if React types are incomplete
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // [NEW] Send to Sentry
    if (Sentry && Sentry.captureException) {
        Sentry.captureException(error, { extra: errorInfo as any });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
              <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Р§С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє</h2>
          <p className="text-slate-500 mb-6 max-w-sm">
            РџСЂРѕРёР·РѕС€Р»Р° РЅРµРїСЂРµРґРІРёРґРµРЅРЅР°СЏ РѕС€РёР±РєР° РІ РєРѕРјРїРѕРЅРµРЅС‚Рµ Р·Р°РїРёСЃРё. РњС‹ СѓР¶Рµ Р·РЅР°РµРј Рѕ РЅРµР№.
          </p>
          <button
            onClick={() => {
                // Cast to any to bypass potential missing type definitions for setState
                (this as any).setState({ hasError: false });
                window.location.reload();
            }}
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            РћР±РЅРѕРІРёС‚СЊ СЃС‚СЂР°РЅРёС†Сѓ
          </button>
        </div>
      );
    }

    // Cast 'this' to any to access props if React types are incomplete or conflicting
    return (this as any).props.children;
  }
}


===== FILE: C:\git\apl\med\src\components\modules\BranchSwitcher.tsx =====


import React from 'react';
import { Doctor, DoctorOffering } from '../../types';
import { MapPin, CheckCircle2 } from 'lucide-react';

interface BranchSwitcherProps {
    doctor: Doctor;
    selectedOfferingId?: string;
    onSelect: (offering: DoctorOffering) => void;
}

export const BranchSwitcher: React.FC<BranchSwitcherProps> = ({ doctor, selectedOfferingId, onSelect }) => {
    // Only show if there are multiple offerings
    if (!doctor.offerings || doctor.offerings.length <= 1) return null;

    return (
        <div className="mb-6 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-1">Р’С‹Р±РµСЂРёС‚Рµ С„РёР»РёР°Р»</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.offerings.map((offer) => {
                    const isSelected = selectedOfferingId === offer.id;
                    return (
                        <button
                            key={offer.id}
                            onClick={() => onSelect(offer)}
                            className={`
                                flex items-start gap-3 p-4 rounded-xl border text-left transition-all relative overflow-hidden group
                                ${isSelected 
                                    ? 'bg-primary/5 border-primary ring-1 ring-primary shadow-sm' 
                                    : 'bg-surface border-border hover:border-primary/50 hover:bg-muted/20'
                                }
                            `}
                        >
                            <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-muted/20 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <div className={`font-bold text-sm transition-colors ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                    {offer.branch.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">{offer.branch.address}</div>
                                <div className="text-xs font-bold text-foreground mt-2 bg-white/50 inline-block px-2 py-0.5 rounded border border-border/50">
                                    {offer.price_formatted || offer.price} в‚Ѕ
                                </div>
                            </div>
                            {isSelected && <div className="absolute top-2 right-2 text-primary animate-in zoom-in"><CheckCircle2 className="w-4 h-4"/></div>}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};



===== FILE: C:\git\apl\med\src\components\modules\DimensionSelector.tsx =====

import React from 'react';
import { DimensionConfig } from '../../types';
import { getCategoryIcon } from '../../utils/uiHelpers';
import { Check } from 'lucide-react';

interface DimensionSelectorProps {
    config: DimensionConfig;
    selectedValue: string;
    onChange: (value: string) => void;
}

export const DimensionSelector: React.FC<DimensionSelectorProps> = ({ config, selectedValue, onChange }) => {
    
    // RENDER: TABS / STRICT SEPARATION
    // Used for major splits like Adult/Child
    if (config.mode === 'tabs' || config.mode === 'strict_separation') {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {config.options.map((opt) => {
                    const isSelected = selectedValue === opt.id;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onChange(opt.id)}
                            className={`
                                relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 group
                                ${isSelected 
                                    ? 'bg-white border-primary shadow-lg ring-1 ring-primary/20' 
                                    : 'bg-white border-transparent hover:border-primary/30 shadow-sm'
                                }
                            `}
                        >
                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center transition-colors
                                ${isSelected 
                                    ? 'bg-primary text-white shadow-glow' 
                                    : 'bg-muted/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                                }
                            `}>
                                {getCategoryIcon(opt.icon || 'User', "w-8 h-8")}
                            </div>
                            
                            <div className="text-center">
                                <span className={`text-lg font-bold block ${isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                    {opt.label}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-4 right-4 text-primary animate-in zoom-in">
                                        <Check className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                        </button>
                    )
                })}
            </div>
        );
    }

    // RENDER: FILTER (Pills)
    // Used for minor filters like Service Class
    return (
        <div>
            <h4 className="text-sm font-bold text-muted-foreground mb-3">{config.label}</h4>
            <div className="flex flex-wrap gap-2">
                {config.options.map((opt) => {
                    const isSelected = selectedValue === opt.id;
                    return (
                        <button
                            key={opt.id}
                            onClick={() => onChange(opt.id)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-all
                                ${isSelected 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-surface border border-border text-muted-foreground hover:border-primary hover:text-primary'
                                }
                            `}
                        >
                            {opt.label}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};


===== FILE: C:\git\apl\med\src\components\modules\DoctorCard.tsx =====


import React from 'react';
import { Doctor } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Award, Building2 } from 'lucide-react'; 
import { currentTheme } from '../../config/theme';

interface DoctorCardProps {
    doctor: Doctor;
    onSelect: (doc: Doctor) => void;
    animationDelay?: number;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect, animationDelay = 0 }) => {
    const { labels, doctor_card } = currentTheme;
    const settings = doctor_card || { show_experience: true, show_badges: true }; // Fallback defaults
    
    // Aggregation Logic (View Model)
    const offerings = doctor.offerings || [];
    const offeringCount = offerings.length;
    
    // Find min price across all offerings or fallback
    // If no offerings, use legacy price
    const minPrice = offeringCount > 0
        ? Math.min(...offerings.map(o => o.price))
        : (doctor.price || 0);
        
    // Determine address to show (if multiple, show count)
    const primaryOffering = offerings.find(o => o.is_primary) || offerings[0];
    const displayAddress = primaryOffering?.branch?.address || doctor.address || 'РђРґСЂРµСЃ СѓС‚РѕС‡РЅСЏРµС‚СЃСЏ';

    return (
        <Card 
            hoverEffect={true}
            className="p-5 h-full flex flex-col"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <div className="flex gap-5">
                {/* Photo Actor Layer */}
                <div className="relative shrink-0">
                    <div className="w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden bg-muted/20 ring-1 ring-border shadow-sm">
                        <img 
                            src={doctor.photoUrl || 'https://via.placeholder.com/150'} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                            alt={doctor.name} 
                            loading="lazy"
                        />
                    </div>
                    {settings.show_experience && doctor.experienceYears && doctor.experienceYears > 0 && (
                        <div className="absolute -bottom-2 -left-1 bg-surface text-foreground text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm border border-border">
                            {labels.experienceLabel} {doctor.experienceYears} {labels.yearsShort}
                        </div>
                    )}
                </div>

                {/* Info Actor Layer */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="font-bold text-lg text-foreground leading-tight mb-1">{doctor.name}</h3>
                    <div className="text-primary text-sm font-bold mb-1">{doctor.specialty}</div>
                    
                    {/* Position */}
                    {doctor.position && (
                        <div className="text-xs text-muted-foreground mb-2 leading-snug line-clamp-2">
                            {doctor.position}
                        </div>
                    )}

                    {/* Badges */}
                    {settings.show_badges && doctor.badges && doctor.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {doctor.badges.map((badge, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium bg-muted/50 text-muted-foreground border border-border">
                                    {(badge.code === 'degree' || badge.code === 'kmn') && <Award className="w-3 h-3 text-accent" />}
                                    {badge.label}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    {/* Offerings Aggregation Layer */}
                    <div className="mt-auto flex items-end justify-between pt-2">
                        {offeringCount > 1 ? (
                             <div className="text-[11px] text-primary font-bold flex items-center gap-1 bg-primary/10 px-2 py-1 rounded border border-primary/20" title={`${offeringCount} С„РёР»РёР°Р»Р°`}>
                                <Building2 className="w-3 h-3" />
                                <span>{offeringCount} С„РёР»РёР°Р»Р°</span>
                             </div>
                        ) : (
                            <div className="text-[11px] text-muted-foreground flex items-center gap-1 truncate max-w-[60%] bg-muted/20 px-2 py-1 rounded" title={displayAddress}>
                                <MapPin className="w-3 h-3 shrink-0 opacity-70" />
                                <span className="truncate">{displayAddress}</span>
                            </div>
                        )}

                        {minPrice > 0 && (
                            <span className="font-bold text-foreground bg-muted/30 px-3 py-1.5 rounded-lg text-sm border border-border">
                                {offeringCount > 1 && <span className="text-muted-foreground font-normal text-xs mr-1">РѕС‚</span>}
                                {new Intl.NumberFormat('ru-RU').format(minPrice)} {labels.currency}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Button onClick={() => onSelect(doctor)} fullWidth>
                    {labels.selectTimeBtn}
                </Button>
            </div>
        </Card>
    );
};


===== FILE: C:\git\apl\med\src\components\modules\DoctorChatCard.tsx =====


// DEPRECATED: This file has been removed from the build.
export const DoctorChatCard = () => null;



===== FILE: C:\git\apl\med\src\components\modules\DoctorProfileHeader.tsx =====


import React, { useState } from 'react';
import { Doctor } from '../../types';
import { currentTheme } from '../../config/theme';
import { Clock, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface DoctorProfileHeaderProps {
    doctor: Doctor;
}

export const DoctorProfileHeader: React.FC<DoctorProfileHeaderProps> = ({ doctor }) => {
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    
    return (
        <div className="bg-surface rounded-3xl p-6 md:p-8 border border-border shadow-sm mb-8 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                    <div className="w-32 h-40 md:w-40 md:h-48 rounded-2xl overflow-hidden shadow-lg ring-4 ring-surface">
                        <img src={doctor.photoUrl || 'https://via.placeholder.com/300'} className="w-full h-full object-cover" alt={doctor.name} />
                    </div>
                    {doctor.experienceYears && doctor.experienceYears > 0 && (
                        <div className="mt-3 bg-white/50 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">
                            <Clock className="w-3 h-3 text-primary" />
                            <span>{currentTheme.labels.experienceLabel} {doctor.experienceYears} {currentTheme.labels.yearsShort}</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                        {doctor.specialty}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
                        {doctor.name}
                    </h2>
                    
                    {doctor.badges && doctor.badges.length > 0 && (
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                            {doctor.badges.map((badge, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-md bg-accent/10 text-accent-foreground border border-accent/20 text-[11px] font-bold flex items-center gap-1">
                                    <Award className="w-3 h-3" /> {badge.label}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                        {doctor.extended_data?.anonce ? (
                            <div dangerouslySetInnerHTML={{ __html: doctor.extended_data.anonce }} />
                        ) : (
                            <p>{doctor.position}</p>
                        )}
                        {doctor.extended_data?.activities_html && (
                            <div className={`mt-4 overflow-hidden transition-all duration-500 ${isBioExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="prose prose-sm prose-slate" dangerouslySetInnerHTML={{ __html: doctor.extended_data.activities_html }} />
                            </div>
                        )}
                    </div>

                    {doctor.extended_data?.activities_html && (
                        <button onClick={() => setIsBioExpanded(!isBioExpanded)} className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 mx-auto md:mx-0 transition-colors">
                            {isBioExpanded ? <>РЎРєСЂС‹С‚СЊ РґРµС‚Р°Р»Рё <ChevronUp className="w-3 h-3" /></> : <>РџРѕРґСЂРѕР±РЅРµРµ Рѕ РІСЂР°С‡Рµ <ChevronDown className="w-3 h-3" /></>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};



===== FILE: C:\git\apl\med\src\components\presentation\Features.tsx =====


import React from 'react';
import { Network, Gem, Zap } from 'lucide-react';

export const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
            <Network className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
              <Network className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Р‘РµСЃС€РѕРІРЅР°СЏ РРЅС‚РµРіСЂР°С†РёСЏ</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              РџР°С†РёРµРЅС‚ РЅРµ РґРѕР»Р¶РµРЅ Р·РЅР°С‚СЊ СЃС‚СЂСѓРєС‚СѓСЂСѓ РЅР°С€РёС… СЋСЂР»РёС†. РЎРёСЃС‚РµРјР° Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё "СЃРєР»РµРёРІР°РµС‚" РІСЂР°С‡РµР№ РёР· СЂР°Р·РЅС‹С… Р±Р°Р· (Р¤РёР»РёР°Р»С‹ РЅР° РўСЂСѓРґР°, Р›РµРЅРёРЅР° Рё 40-Р»РµС‚РёСЏ) РІ РµРґРёРЅС‹Р№ РїРѕРЅСЏС‚РЅС‹Р№ СЃРїРёСЃРѕРє.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
            <Gem className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 border border-purple-500/20">
              <Gem className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">РџСЂРµРјРёР°Р»СЊРЅС‹Р№ UX</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              РРЅС‚РµСЂС„РµР№СЃ СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓРµС‚ СѓСЂРѕРІРЅСЋ РєР»РёРЅРёРєРё. РќРёРєР°РєРёС… СЃР»РѕР¶РЅС‹С… С‚Р°Р±Р»РёС†. РљСЂСѓРїРЅС‹Рµ СЌР»РµРјРµРЅС‚С‹, С„РѕС‚Рѕ, СЂРµРіР°Р»РёРё, РёРЅС‚СѓРёС‚РёРІРЅР°СЏ Р·Р°РїРёСЃСЊ РІ 3 РєР»РёРєР° СЃ РјРѕР±РёР»СЊРЅРѕРіРѕ С‚РµР»РµС„РѕРЅР°.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-green-500/30 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
            <Zap className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6 border border-green-500/20">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">РњР°СЂРєРµС‚РёРЅРіРѕРІР°СЏ РњРѕС‰СЊ</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              РџРѕРґРґРµСЂР¶РєР° "РіР»СѓР±РѕРєРёС… СЃСЃС‹Р»РѕРє" РґР»СЏ СЂРµРєР»Р°РјС‹. Р’С‹ РјРѕР¶РµС‚Рµ РІРµСЃС‚Рё РїР°С†РёРµРЅС‚Р° СЃ Р±Р°РЅРЅРµСЂР° "РљР°СЂРґРёРѕР»РѕРі" СЃСЂР°Р·Сѓ РЅР° СЃРїРёСЃРѕРє РєР°СЂРґРёРѕР»РѕРіРѕРІ РёР»Рё РЅР° РєРѕРЅРєСЂРµС‚РЅРѕРіРѕ РІСЂР°С‡Р°, РјРёРЅСѓСЏ РіР»Р°РІРЅСѓСЋ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



===== FILE: C:\git\apl\med\src\components\presentation\Footer.tsx =====


import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-12 text-center border-t border-slate-800 bg-[#020617]">
      <p className="text-slate-600 text-sm font-medium">Enterprise Medical Widget Architecture v2.3</p>
      <p className="text-slate-700 text-xs mt-2">Designed exclusively for "РСЃС‚РѕС‡РЅРёРє"</p>
    </footer>
  );
};



===== FILE: C:\git\apl\med\src\components\presentation\Hero.tsx =====


import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 border border-blue-500/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ShieldCheck className="w-4 h-4" />
          РћС‚С‡РµС‚ РїРѕ С†РёС„СЂРѕРІРѕР№ С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё
        </div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          РРЅС‚РµР»Р»РµРєС‚СѓР°Р»СЊРЅР°СЏ Р­РєРѕСЃРёСЃС‚РµРјР° <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Р—Р°РїРёСЃРё РџР°С†РёРµРЅС‚РѕРІ
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          РњС‹ СЃРѕР·РґР°Р»Рё РµРґРёРЅРѕРµ С†РёС„СЂРѕРІРѕРµ РѕРєРЅРѕ РґР»СЏ РєР»РёРЅРёРєРё "РСЃС‚РѕС‡РЅРёРє". 
          РЎР»РѕР¶РЅР°СЏ РёРЅС„СЂР°СЃС‚СЂСѓРєС‚СѓСЂР° (3 Р±Р°Р·С‹ РґР°РЅРЅС‹С…, СЂР°Р·РЅС‹Рµ СЋСЂР»РёС†Р°) СЃРєСЂС‹С‚Р° Р·Р° РїСЂРµРјРёР°Р»СЊРЅС‹Рј РёРЅС‚РµСЂС„РµР№СЃРѕРј, 
          РѕР±РµСЃРїРµС‡РёРІР°СЋС‰РёРј РєРѕРЅРІРµСЂСЃРёСЋ СѓСЂРѕРІРЅСЏ РјРёСЂРѕРІС‹С… СЃРµСЂРІРёСЃРѕРІ (Doctolib, ZocDoc).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <button onClick={() => window.location.href = '/?city=chel'} className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 flex items-center justify-center gap-2 group">
            РћС‚РєСЂС‹С‚СЊ Р”РµРјРѕ-РІРµСЂСЃРёСЋ 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth'})} className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-2xl font-medium transition-all border border-slate-700">
            Р—РѕРЅС‹ Р РѕСЃС‚Р° Рё Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ
          </button>
        </div>
      </div>
    </div>
  );
};



===== FILE: C:\git\apl\med\src\components\presentation\Navbar.tsx =====


import React from 'react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">M</div>
          <span className="font-bold text-white tracking-tight">MedBooking Core</span>
        </div>
        <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-[10px] font-mono text-blue-400">
          v2.3.0 Stable
        </div>
      </div>
    </nav>
  );
};



===== FILE: C:\git\apl\med\src\components\presentation\Roadmap.tsx =====


import React from 'react';
import { CheckCircle2, Layers, ShieldAlert, Lock, Activity, FileText, Brain, TrendingUp, Users } from 'lucide-react';

export const Roadmap = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* DONE */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center border border-green-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            РЈР¶Рµ РІРЅРµРґСЂРµРЅРѕ (Р¤СѓРЅРґР°РјРµРЅС‚)
          </h2>
          
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
             <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div>
                  <h4 className="text-white font-bold text-lg">РЈРјРЅР°СЏ РњР°СЂС€СЂСѓС‚РёР·Р°С†РёСЏ (Smart Branching)</h4>
                  <p className="text-slate-400 text-sm mt-1">РЎРёСЃС‚РµРјР° СЃР°РјР° РѕРїСЂРµРґРµР»СЏРµС‚, РІ РєР°РєРѕРј С„РёР»РёР°Р»Рµ РїСЂРёРЅРёРјР°РµС‚ РІСЂР°С‡, Рё РЅР°РїСЂР°РІР»СЏРµС‚ Р·Р°РїСЂРѕСЃ РІ РЅСѓР¶РЅСѓСЋ Р±Р°Р·Сѓ РґР°РЅРЅС‹С…. РџР°С†РёРµРЅС‚ РїСЂРѕСЃС‚Рѕ РІС‹Р±РёСЂР°РµС‚ "РљР°СЂРґРёРѕР»РѕРіР°".</p>
                </div>
             </div>
             <div className="w-full h-px bg-slate-800/50"></div>
             
             <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div>
                  <h4 className="text-white font-bold text-lg">РћР±РѕРіР°С‰РµРЅРёРµ РљРѕРЅС‚РµРЅС‚Р° (CMS Hydration)</h4>
                  <p className="text-slate-400 text-sm mt-1">"РЎСѓС…РѕРµ" СЂР°СЃРїРёСЃР°РЅРёРµ РёР· РњРРЎ Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРё РґРѕРїРѕР»РЅСЏРµС‚СЃСЏ РёРјРёРґР¶РµРІС‹РјРё С„РѕС‚Рѕ Рё СЂРµРіР°Р»РёСЏРјРё СЃ СЃР°Р№С‚Р° WordPress. Р’СЂР°С‡ РІС‹РіР»СЏРґРёС‚ РїСЂРµР·РµРЅС‚Р°Р±РµР»СЊРЅРѕ.</p>
                </div>
             </div>
             <div className="w-full h-px bg-slate-800/50"></div>

             <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div>
                  <h4 className="text-white font-bold text-lg">РРЅСЃС‚СЂСѓРјРµРЅС‚С‹ РњР°СЂРєРµС‚РѕР»РѕРіР° (Deep Links)</h4>
                  <p className="text-slate-400 text-sm mt-1">Р’РѕР·РјРѕР¶РЅРѕСЃС‚СЊ СЃРѕР·РґР°РІР°С‚СЊ СЃСЃС‹Р»РєРё РґР»СЏ С‚Р°СЂРіРµС‚Р°: <code>?spec=cosmetology</code> РёР»Рё <code>?doctor=Ivanov</code>. РњР°РєСЃРёРјРёР·Р°С†РёСЏ РѕС‚РґР°С‡Рё РѕС‚ СЂРµРєР»Р°РјРЅРѕРіРѕ Р±СЋРґР¶РµС‚Р°.</p>
                </div>
             </div>
          </div>
        </div>

        {/* AUDIT & PLANS */}
        <div id="audit" className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/30">
              <Layers className="w-6 h-6" />
            </div>
            РЎС‚СЂР°С‚РµРіРёСЏ Р Р°Р·РІРёС‚РёСЏ
          </h2>
          
          {/* 1. Security & Stability (Critical for Management) */}
          <div className="group bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden hover:border-orange-500/30 transition-colors">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldAlert className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  1. РћСЂРіР°РЅРёР·Р°С†РёРѕРЅРЅР°СЏ Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ
                  <span className="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-1 rounded border border-orange-500/20 uppercase tracking-wide">Р’Р°Р¶РЅРѕ</span>
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                  РўРµС…РЅРёС‡РµСЃРєРёРµ РјРµСЂС‹ РґР»СЏ РёСЃРєР»СЋС‡РµРЅРёСЏ СЂРµРїСѓС‚Р°С†РёРѕРЅРЅС‹С… СЂРёСЃРєРѕРІ Рё Р·Р°С‰РёС‚С‹ РґР°РЅРЅС‹С… VIP-РєР»РёРµРЅС‚РѕРІ.
              </p>
              
              <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                      <Lock className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                          <div className="text-sm font-bold text-slate-200">Р“Р°СЂР°РЅС‚РёСЏ Р‘СЂРѕРЅРёСЂРѕРІР°РЅРёСЏ (Anti-Race)</div>
                          <p className="text-xs text-slate-500">РСЃРєР»СЋС‡РµРЅРёРµ СЃРёС‚СѓР°С†РёРё, РєРѕРіРґР° РґРІР° РїР°С†РёРµРЅС‚Р° РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ Р·Р°РїРёСЃС‹РІР°СЋС‚СЃСЏ РЅР° РѕРґРЅРѕ РІСЂРµРјСЏ. РџСЂРµРґРѕС‚РІСЂР°С‰РµРЅРёРµ РєРѕРЅС„Р»РёРєС‚РѕРІ РІ СЂРµРіРёСЃС‚СЂР°С‚СѓСЂРµ.</p>
                      </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                      <Activity className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                          <div className="text-sm font-bold text-slate-200">РњРѕРЅРёС‚РѕСЂРёРЅРі РљР°С‡РµСЃС‚РІР° (Sentry)</div>
                          <p className="text-xs text-slate-500">РЎРёСЃС‚РµРјР° РїСЂРѕР°РєС‚РёРІРЅРѕРіРѕ РѕР±РЅР°СЂСѓР¶РµРЅРёСЏ СЃР±РѕРµРІ СЃРІСЏР·Рё СЃ РњРРЎ. РњС‹ СѓР·РЅР°РµРј Рѕ РїСЂРѕР±Р»РµРјРµ СЂР°РЅСЊС€Рµ, С‡РµРј РїР°С†РёРµРЅС‚ РїРѕР·РІРѕРЅРёС‚ СЃ Р¶Р°Р»РѕР±РѕР№.</p>
                      </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors">
                      <FileText className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                          <div className="text-sm font-bold text-slate-200">Р—Р°С‰РёС‚Р° РљРѕРЅС‚СѓСЂР° Р”Р°РЅРЅС‹С…</div>
                          <p className="text-xs text-slate-500">Р’С‹РЅРѕСЃ РєСЂРёС‚РёС‡РµСЃРєРѕР№ Р»РѕРіРёРєРё Р·Р° РїСЂРµРґРµР»С‹ РїСѓР±Р»РёС‡РЅРѕРіРѕ РґРѕСЃС‚СѓРїР° (public_html). Р—Р°С‰РёС‚Р° РѕС‚ РІР·Р»РѕРјР° Рё СѓС‚РµС‡РµРє.</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* 2. Innovations & Growth */}
          <div className="group bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden hover:border-indigo-500/40 transition-colors">
              <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  2. РўРѕС‡РєРё Р РѕСЃС‚Р° (РРЅРЅРѕРІР°С†РёРё)
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">Future</span>
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                  Р’РЅРµРґСЂРµРЅРёРµ СЃРµСЂРІРёСЃРѕРІ, РїРѕРІС‹С€Р°СЋС‰РёС… LTV (РїРѕР¶РёР·РЅРµРЅРЅСѓСЋ С†РµРЅРЅРѕСЃС‚СЊ) РїР°С†РёРµРЅС‚Р° Рё РІС‹СЂСѓС‡РєСѓ.
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                 <div className="flex items-start gap-3">
                    <Brain className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-slate-200">AI-РђСЃСЃРёСЃС‚РµРЅС‚ "РџСЂРѕРґР°РІРµС†"</span>
                      <p className="text-xs text-slate-500">
                        Р‘РѕС‚ РЅРµ РїСЂРѕСЃС‚Рѕ РѕС‚РІРµС‡Р°РµС‚ РЅР° РІРѕРїСЂРѕСЃС‹, Р° Р°РєС‚РёРІРЅРѕ РІРµРґРµС‚ Рє Р·Р°РїРёСЃРё. Р•СЃР»Рё РєР»РёРµРЅС‚ РјРѕР»С‡РёС‚ 30 СЃРµРє, Р±РѕС‚ СЃРїСЂР°С€РёРІР°РµС‚: <em>"Р’Р°СЃ СЃРјСѓС‰Р°РµС‚ С†РµРЅР° РёР»Рё РІСЂРµРјСЏ?"</em> Рё РїСЂРµРґР»Р°РіР°РµС‚ Р°Р»СЊС‚РµСЂРЅР°С‚РёРІС‹.
                      </p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-slate-200">РЎРµРјРµР№РЅС‹Р№ Р°РєРєР°СѓРЅС‚ (SuperApp)</span>
                      <p className="text-xs text-slate-500">Р’РѕР·РјРѕР¶РЅРѕСЃС‚СЊ РѕРґРЅРѕР№ РєРЅРѕРїРєРѕР№ Р·Р°РїРёСЃР°С‚СЊ СЂРµР±РµРЅРєР° РёР»Рё СЂРѕРґРёС‚РµР»СЏ, Р±РµР· РїРѕРІС‚РѕСЂРЅРѕРіРѕ РІРІРѕРґР° РґР°РЅРЅС‹С….</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm text-slate-300">Р›РёСЃС‚ РћР¶РёРґР°РЅРёСЏ (Р’РѕР·РІСЂР°С‚ СѓРїСѓС‰РµРЅРЅРѕР№ Р·Р°РїРёСЃРё)</span>
                 </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};



===== FILE: C:\git\apl\med\src\components\steps\StepAI.tsx =====


// DEPRECATED: This file has been removed from the build.
// Chat functionality is no longer part of the Booking Core.
// Use 'Smart Search' instead.
export const StepAI = () => null;



===== FILE: C:\git\apl\med\src\components\steps\StepBranches.tsx =====


import React, { useEffect, useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { apiService } from '../../services/api';
import { Branch } from '../../types';
import { Card } from '../ui/Card';
import { MapPin, ArrowRight } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';

export const StepBranches = () => {
    const { city, setBranch, selectedBranch } = useBookingStore();
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const data = await apiService.getBranches(city);
                setBranches(data);
            } catch (e) {
                console.error("Failed to load branches", e);
            } finally {
                setLoading(false);
            }
        };
        fetchBranches();
    }, [city]);

    if (loading) {
        return (
            <div className="space-y-4 animate-in fade-in">
                <Skeleton className="h-20 w-full" count={3} />
            </div>
        );
    }

    if (branches.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                РќРµС‚ РґРѕСЃС‚СѓРїРЅС‹С… С„РёР»РёР°Р»РѕРІ РІ СЌС‚РѕРј РіРѕСЂРѕРґРµ.
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-slide-up">
            {branches.map((branch) => {
                const isSelected = selectedBranch?.id === branch.id;
                return (
                    <Card
                        key={branch.id}
                        onClick={() => setBranch(branch)}
                        hoverEffect={true}
                        className={`p-5 flex items-center justify-between group transition-all ${isSelected ? 'ring-2 ring-primary border-transparent' : ''}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-muted/10 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg">{branch.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{branch.address}</p>
                                {branch.metro && (
                                    <span className="inline-block mt-2 text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-medium">
                                        {branch.metro}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-primary' : 'text-muted-foreground/30'}`} />
                    </Card>
                );
            })}
        </div>
    );
};



===== FILE: C:\git\apl\med\src\components\steps\StepDimensions.tsx =====

import React from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { DimensionSelector } from '../modules/DimensionSelector';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { DimensionConfig } from '../../types';

export const StepDimensions = () => {
    const { topology, activeDimensions, setDimension, nextStep } = useBookingStore();

    if (!topology?.dimensions) return null;

    // Filter enabled dimensions
    const visibleDimensions = (Object.values(topology.dimensions) as DimensionConfig[]).filter(d => d.enabled);

    if (visibleDimensions.length === 0) {
        // Safe fallback if config is empty but step is rendered
        return (
            <div className="text-center py-10">
                <Button onClick={nextStep}>РџСЂРѕРґРѕР»Р¶РёС‚СЊ</Button>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-slide-up">
            {visibleDimensions.map((dim) => (
                <div key={dim.key}>
                    {/* Render Title only if it's not self-evident from selectors */}
                    {dim.mode !== 'tabs' && (
                        <h3 className="text-xl font-bold text-foreground mb-4">{dim.label}</h3>
                    )}
                    
                    <DimensionSelector 
                        config={dim}
                        selectedValue={activeDimensions[dim.key]}
                        onChange={(val) => {
                            setDimension(dim.key, val);
                            // Auto-advance if it's the only dimension and it's a tab/card style (major choice)
                            if (visibleDimensions.length === 1 && (dim.mode === 'tabs' || dim.mode === 'strict_separation')) {
                                setTimeout(nextStep, 200); 
                            }
                        }}
                    />
                </div>
            ))}

            {/* If there are multiple filter-style dimensions, show a manual continue button */}
            {visibleDimensions.some(d => d.mode === 'filter') && (
                <div className="pt-4">
                    <Button onClick={nextStep} fullWidth>
                        Р”Р°Р»РµРµ <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};


===== FILE: C:\git\apl\med\src\components\steps\StepDoctors.tsx =====


import React from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { useDoctorsList } from '../../hooks/useDoctors';
import { DoctorCard } from '../modules/DoctorCard';
import { DoctorCardSkeleton } from '../ui/Skeleton';
import { ChevronRight, Stethoscope } from 'lucide-react'; // Import icons

export const StepDoctors = () => {
  const { selectDoctor, searchQuery, setSearchQuery, category, serviceTree } = useBookingStore();
  
  // 1. Special Mode: Category Selected but No Specialty (Drill Down)
  // If we are in a category context but haven't picked a specialty/search yet, show specialties.
  if (!searchQuery && category) {
      const currentCategory = serviceTree.find(c => c.id === category);
      
      if (currentCategory && currentCategory.specialties.length > 0) {
          return (
              <div className="animate-slide-up">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                          <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                          <h4 className="font-bold text-sm text-blue-900">Р’С‹Р±РµСЂРёС‚Рµ РЅР°РїСЂР°РІР»РµРЅРёРµ</h4>
                          <p className="text-xs text-blue-700/70 mt-1">
                              Р’ СЂР°Р·РґРµР»Рµ "{currentCategory.label}" РґРѕСЃС‚СѓРїРЅРѕ {currentCategory.specialties.length} РЅР°РїСЂР°РІР»РµРЅРёР№.
                          </p>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentCategory.specialties.map((spec) => (
                          <button
                              key={spec.id}
                              onClick={() => setSearchQuery(spec.label)}
                              className="bg-surface hover:bg-muted/30 border border-border p-4 rounded-xl text-left flex items-center justify-between group transition-all"
                          >
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {spec.label}
                              </span>
                              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/60" />
                          </button>
                      ))}
                  </div>
              </div>
          );
      }
  }

  // 2. Standard Mode: Loading Doctors
  const { doctors, loading, error } = useDoctorsList();

  if (loading) {
    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
            <DoctorCardSkeleton />
        </div>
    );
  }

  if (error) {
      return (
          <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl text-center text-destructive">
              <p>{error}</p>
          </div>
      );
  }

  if (doctors.length === 0) {
      return (
          <div className="text-center py-12 bg-surface rounded-xl border border-border shadow-sm">
              <div className="text-muted-foreground mb-2 font-medium">
                  {searchQuery ? `РџРѕ Р·Р°РїСЂРѕСЃСѓ "${searchQuery}"` : 'Р’ СЌС‚РѕР№ РєР°С‚РµРіРѕСЂРёРё'} РІСЂР°С‡РµР№ РЅРµ РЅР°Р№РґРµРЅРѕ.
              </div>
              <p className="text-xs text-muted-foreground/70">РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ РїР°СЂР°РјРµС‚СЂС‹ РїРѕРёСЃРєР° РёР»Рё РєР°С‚РµРіРѕСЂРёСЋ.</p>
              <button 
                onClick={() => setSearchQuery('')} // Clear search to go back to list
                className="mt-4 text-primary text-sm font-bold hover:underline"
              >
                РџРѕРєР°Р·Р°С‚СЊ РІСЃРµ РЅР°РїСЂР°РІР»РµРЅРёСЏ
              </button>
          </div>
      )
  }

  return (
    <div className="space-y-4 animate-slide-up">
      {doctors.map((doc, idx) => (
        <DoctorCard 
            key={doc.id} 
            doctor={doc} 
            onSelect={selectDoctor} 
            animationDelay={idx * 100}
        />
      ))}
    </div>
  );
};



===== FILE: C:\git\apl\med\src\components\steps\StepForm.tsx =====


import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Calendar, ArrowRight, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

import { useBookingStore } from '../../store/bookingStore';
import { apiService } from '../../services/api';
import { analytics } from '../../services/analytics';
import { usePhoneMask } from '../../hooks/usePhoneMask'; 
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { currentTheme } from '../../config/theme';

export const StepForm = () => {
    const { nextStep, patientData, updatePatientData, selectedDoctor, selectedSlot, bookingUuid, selectedOffering, compliance } = useBookingStore();
    const { getToken } = useRecaptcha();
    const { labels } = currentTheme;

    // [COMPLIANCE] Logic
    const excludeFields = compliance?.data_minimization?.exclude_fields || [];
    const showEmail = !excludeFields.includes('email');
    const consentRequired = compliance?.consent?.required ?? true; 
    
    // [AGE GATE] Logic
    const ageGateEnabled = compliance?.age_gate?.enabled ?? false;
    const ageThreshold = compliance?.age_gate?.threshold || 18;
    const ageErrorMessage = compliance?.age_gate?.error_message || `Р—Р°РїРёСЃСЊ РґРѕСЃС‚СѓРїРЅР° С‚РѕР»СЊРєРѕ РґР»СЏ РїР°С†РёРµРЅС‚РѕРІ СЃС‚Р°СЂС€Рµ ${ageThreshold} Р»РµС‚.`;

    // Helper to calculate age
    const calculateAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // [SCHEMA] Dynamic Construction
    const bookingSchema = useMemo(() => {
        let schema = z.object({
            firstName: z.string().min(2, labels.errName || "РЎР»РёС€РєРѕРј РєРѕСЂРѕС‚РєРѕРµ РёРјСЏ"),
            lastName: z.string().min(2, labels.errName || "РЎР»РёС€РєРѕРј РєРѕСЂРѕС‚РєР°СЏ С„Р°РјРёР»РёСЏ"),
            phone: z.string()
                .min(18, labels.errPhone || "Р’РІРµРґРёС‚Рµ РїРѕР»РЅС‹Р№ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°") 
                .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ РЅРѕРјРµСЂР°"),
            email: showEmail ? z.string().email("РќРµРєРѕСЂСЂРµРєС‚РЅС‹Р№ Email").optional().or(z.literal('')) : z.string().optional(),
            consent: consentRequired 
                ? z.boolean().refine((val: boolean) => val === true, { message: "РќРµРѕР±С…РѕРґРёРјРѕ СЃРѕРіР»Р°СЃРёРµ" })
                : z.boolean().optional(),
            
            // Conditional Birth Date Field
            birthDate: ageGateEnabled 
                ? z.string().refine((val: string) => {
                    if (!val) return false;
                    const age = calculateAge(val);
                    return age >= ageThreshold;
                }, { message: ageErrorMessage })
                : z.string().optional()
        });
        return schema;
    }, [labels, showEmail, consentRequired, ageGateEnabled, ageThreshold, ageErrorMessage]);

    type BookingFormValues = z.infer<typeof bookingSchema>;
    
    // RHF Init
    const { 
        register, 
        handleSubmit, 
        setValue, 
        trigger,
        formState: { errors, isSubmitting },
        setError 
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        mode: 'onTouched',
        defaultValues: {
            firstName: patientData.firstName,
            lastName: patientData.lastName,
            phone: patientData.phone,
            email: patientData.email,
            birthDate: patientData.birthDate,
            consent: !consentRequired 
        }
    });

    const phoneMaskHandlers = usePhoneMask(
        (val) => {
            setValue('phone', val);
            updatePatientData('phone', val);
        },
        () => trigger('phone')
    );

    const onSubmit = async (data: BookingFormValues) => {
        analytics.track('booking_attempt', { doctor: selectedDoctor?.name });

        try {
            const recaptchaToken = await getToken('booking_submit');

            // Use provided birth date or fallback for systems without Age Gate
            const finalBirthDate = ageGateEnabled && data.birthDate 
                ? data.birthDate.split('-').reverse().join('.') // YYYY-MM-DD -> DD.MM.YYYY
                : (patientData.birthDate || '01.01.1980');

            await apiService.bookAppointment({
                doctor: selectedDoctor!,
                slot: selectedSlot!,
                bookingUuid: bookingUuid,
                databaseId: selectedOffering?.databaseId, 
                patient: {
                    fullName: `${data.lastName} ${data.firstName}`,
                    phone: data.phone.replace(/\D/g, ''),
                    birthDate: finalBirthDate,
                    email: data.email
                },
                recaptchaToken 
            });
            
            updatePatientData('firstName', data.firstName);
            updatePatientData('lastName', data.lastName);
            if (ageGateEnabled && data.birthDate) {
                // Store normalized date if needed
                updatePatientData('birthDate', finalBirthDate);
            }
            
            analytics.track('booking_success', { 
                doctor_id: selectedDoctor?.id, 
                price: selectedDoctor?.price 
            });
            
            nextStep();
        } catch (err: any) {
            console.error(err);
            analytics.track('booking_error', { error: err.message });
            
            setError('root', { 
                type: 'server', 
                message: err.message || 'РћС€РёР±РєР° Р·Р°РїРёСЃРё. РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ РёР»Рё РїРѕР·РІРѕРЅРёС‚Рµ РЅР°Рј.' 
            });
        }
    };

    return (
        <div className="animate-in zoom-in-95 duration-300">
             {/* Summary Card */}
             <div className="bg-surface/50 p-6 rounded-lg border border-border mb-6 flex flex-col md:flex-row gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={selectedDoctor?.photoUrl} className="w-16 h-16 rounded-full object-cover border-2 border-surface shadow-sm" alt="Doctor" />
                    <div>
                        <h3 className="font-bold text-foreground text-lg">{selectedDoctor?.name}</h3>
                        <p className="text-primary font-medium">{selectedDoctor?.specialty}</p>
                    </div>
                </div>
                <div className="md:ml-auto flex flex-col justify-center gap-1 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 text-sm">
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">{selectedSlot?.date}</span>
                     </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-4 h-4 flex items-center justify-center font-bold text-primary text-xs border border-primary rounded px-1">T</div>
                        <span className="font-semibold text-foreground">{selectedSlot?.time}</span>
                     </div>
                </div>
             </div>

             {/* Form */}
             <form onSubmit={handleSubmit(onSubmit)} className="card-glass p-6 md:p-8 rounded-lg shadow-xl space-y-6">
                 <h3 className="text-xl font-bold text-foreground mb-2">Р”Р°РЅРЅС‹Рµ РїР°С†РёРµРЅС‚Р°</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Р¤Р°РјРёР»РёСЏ</label>
                        <input 
                            {...register('lastName')}
                            onChange={(e) => {
                                register('lastName').onChange(e);
                                updatePatientData('lastName', e.target.value);
                            }}
                            className={`input-tokenized ${errors.lastName ? 'border-destructive bg-destructive/5 focus:border-destructive' : ''}`}
                            placeholder="РРІР°РЅРѕРІ" 
                        />
                        {errors.lastName && <p className="text-destructive text-xs ml-1 animate-pulse">{errors.lastName.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">РРјСЏ</label>
                        <input 
                            {...register('firstName')}
                            onChange={(e) => {
                                register('firstName').onChange(e);
                                updatePatientData('firstName', e.target.value);
                            }}
                            className={`input-tokenized ${errors.firstName ? 'border-destructive bg-destructive/5 focus:border-destructive' : ''}`}
                            placeholder="РРІР°РЅ" 
                        />
                        {errors.firstName && <p className="text-destructive text-xs ml-1 animate-pulse">{errors.firstName.message}</p>}
                    </div>
                 </div>

                 {/* [AGE GATE] Birth Date Field */}
                 {ageGateEnabled && (
                     <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Р”Р°С‚Р° СЂРѕР¶РґРµРЅРёСЏ</label>
                        <input 
                            type="date"
                            {...register('birthDate')}
                            className={`input-tokenized ${errors.birthDate ? 'border-destructive bg-destructive/5 focus:border-destructive' : ''}`}
                        />
                        {errors.birthDate && (
                            <div className="flex items-center gap-2 text-destructive text-xs ml-1 mt-1 animate-pulse">
                                <AlertCircle className="w-3 h-3" />
                                {errors.birthDate.message}
                            </div>
                        )}
                     </div>
                 )}

                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">РњРѕР±РёР»СЊРЅС‹Р№ С‚РµР»РµС„РѕРЅ</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input 
                            {...register('phone')} 
                            onChange={phoneMaskHandlers.onChange}
                            onKeyDown={phoneMaskHandlers.onKeyDown}
                            onPaste={phoneMaskHandlers.onPaste}
                            onFocus={phoneMaskHandlers.onFocus}
                            onBlur={phoneMaskHandlers.onBlur}
                            className={`input-tokenized pl-12 ${errors.phone ? 'border-destructive bg-destructive/5 focus:border-destructive' : ''}`}
                            placeholder="+7 (___) ___-__-__" 
                            type="tel"
                            maxLength={18}
                        />
                    </div>
                    {errors.phone && <p className="text-destructive text-xs ml-1 animate-pulse">{errors.phone.message}</p>}
                 </div>

                 {/* [COMPLIANCE] Optional Email Field */}
                 {showEmail && (
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Email (РЅРµРѕР±СЏР·Р°С‚РµР»СЊРЅРѕ)</label>
                        <input 
                            {...register('email')}
                            className={`input-tokenized ${errors.email ? 'border-destructive bg-destructive/5 focus:border-destructive' : ''}`}
                            placeholder="example@mail.ru" 
                            type="email"
                        />
                        {errors.email && <p className="text-destructive text-xs ml-1 animate-pulse">{errors.email.message}</p>}
                     </div>
                 )}

                 {/* Server Error Display */}
                 {errors.root && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm flex items-start gap-3 border border-destructive/20 animate-slide-up">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{errors.root.message}</span>
                    </div>
                 )}

                 {/* [COMPLIANCE] Consent Checkbox */}
                 {consentRequired && (
                     <div className="flex items-start gap-3 pt-2">
                         <div className="relative flex items-center">
                             <input 
                                 type="checkbox"
                                 id="consent"
                                 {...register('consent')}
                                 className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border bg-surface checked:bg-primary checked:border-primary transition-all"
                             />
                             <ShieldCheck className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                         </div>
                         <label htmlFor="consent" className="text-xs text-muted-foreground cursor-pointer select-none leading-relaxed">
                             {compliance?.consent?.label || labels.successDocuments || 'РЇ СЃРѕРіР»Р°СЃРµРЅ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С… Рё РїСЂРёРЅРёРјР°СЋ СѓСЃР»РѕРІРёСЏ РѕС„РµСЂС‚С‹.'}
                             {compliance?.consent?.url && (
                                 <a href={compliance.consent.url} target="_blank" rel="noreferrer" className="text-primary hover:underline ml-1">
                                     Р§РёС‚Р°С‚СЊ РїРѕРґСЂРѕР±РЅРµРµ
                                 </a>
                             )}
                         </label>
                     </div>
                 )}
                 {errors.consent && <p className="text-destructive text-xs ml-8 -mt-2 animate-pulse">{errors.consent.message}</p>}

                 <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden py-4 px-6 rounded-lg font-bold text-[15px] bg-primary text-primary-foreground shadow-glow hover:brightness-110 flex items-center justify-center gap-3 mt-4 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            РћС„РѕСЂРјР»СЏРµРј...
                        </>
                    ) : (
                        <>
                            {labels.confirmBookingBtn}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                 </button>

                 {!consentRequired && (
                    <p className="text-xs text-muted-foreground text-center leading-relaxed px-4">
                        РќР°Р¶РёРјР°СЏ РєРЅРѕРїРєСѓ, РІС‹ РґР°РµС‚Рµ СЃРѕРіР»Р°СЃРёРµ РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹С… РґР°РЅРЅС‹С….
                    </p>
                 )}
             </form>
        </div>
    )
}



===== FILE: C:\git\apl\med\src\components\steps\StepHome.tsx =====


import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, Loader2, TrendingUp } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useSmartSearch } from '../../hooks/useSmartSearch'; 
import { apiService } from '../../services/api';
import { Card } from '../ui/Card';
import { getCategoryIcon, getCategoryGradient } from '../../utils/uiHelpers';
import { currentTheme } from '../../config/theme';

export const StepHome = () => {
  const { searchQuery, setSearchQuery, setCategory, setServiceTree, serviceTree, initialize, selectDoctor } = useBookingStore();
  const { results: searchResults } = useSmartSearch(); 
  
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // [NO HARDCODE] Load suggestions from dynamic theme configuration
  const suggestions = currentTheme.features.search_suggestions || [];

  useEffect(() => {
      const loadStructure = async () => {
        try {
            const data = await apiService.getStructure();
            setServiceTree(data);
        } catch (e) {
            console.error("Failed to load structure", e);
        } finally {
            setLoading(false);
        }
      };
      if (serviceTree.length === 0) {
          loadStructure();
      } else {
          setLoading(false);
      }
  }, []);

  const handleSelectResult = (item: any) => {
      if (item.type === 'specialty') {
          initialize({ specialty: item.payload.specialty });
      } else if (item.type === 'doctor') {
          // If the search result contains the full doctor object (ideal), use it
          // Otherwise initialize a search for this specific doctor ID
          if (item.payload.doctor_id) {
              initialize({ doctorId: item.payload.doctor_id });
          }
      }
  };

  const handleSuggestionClick = (suggestion: { label: string, type: string }) => {
      if (suggestion.type === 'specialty') {
          initialize({ specialty: suggestion.label });
      } else {
          setSearchQuery(suggestion.label);
          setShowResults(true);
      }
  };

  return (
    <div className="space-y-8 animate-slide-up relative pb-8" onClick={() => setShowResults(false)}>
      
      {/* Hero Search Section */}
      <div className="relative z-50 group" onClick={e => e.stopPropagation()}>
        <div className="relative">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative bg-surface rounded-2xl shadow-soft flex items-center p-3 border border-border transition-all duration-300 group-hover:shadow-glow group-hover:border-primary/30 focus-within:ring-4 focus-within:ring-primary/10">
                <div className="pl-3 pr-2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <Search className="w-6 h-6" />
                </div>
                <input 
                    type="text" 
                    placeholder={currentTheme.labels.searchPlaceholder} 
                    className="w-full px-2 py-3 bg-transparent outline-none text-xl text-foreground placeholder:text-muted/60 font-medium"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                />
                {loading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground mr-3" />}
            </div>

            {/* Quick Suggestions (Dynamic) */}
            {!searchQuery && !showResults && suggestions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 px-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground uppercase tracking-widest mr-2">
                        <TrendingUp className="w-3 h-3" /> РџРѕРїСѓР»СЏСЂРЅРѕРµ:
                    </div>
                    {suggestions.map((item: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleSuggestionClick(item)}
                            className="px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all active:scale-95 shadow-sm"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Dropdown Results */}
            {showResults && searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    {searchResults.length > 0 ? (
                        <ul className="py-2">
                            {searchResults.map((res, idx) => (
                                <li key={idx}>
                                    <button 
                                        onClick={() => handleSelectResult(res)}
                                        className="w-full text-left px-5 py-3.5 hover:bg-muted/50 flex items-center justify-center justify-between group/item transition-colors border-b border-border/40 last:border-0"
                                    >
                                        <div>
                                            <div className="font-bold text-foreground text-base flex items-center gap-2">
                                                {res.label}
                                                {res.type === 'ai_match' && <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded border border-indigo-200">AI</span>}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{res.subLabel}</div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover/item:text-primary transition-colors" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="text-muted-foreground text-sm font-medium">РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ</div>
                            <div className="text-xs text-muted-foreground/60 mt-1">РџРѕРїСЂРѕР±СѓР№С‚Рµ РёР·РјРµРЅРёС‚СЊ Р·Р°РїСЂРѕСЃ</div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* Categories Header */}
      <div className="flex items-center justify-between px-1 pt-4">
          <h2 className="text-lg font-bold text-foreground">РќР°РїСЂР°РІР»РµРЅРёСЏ</h2>
      </div>

      {/* Top Categories Grid (Roots) */}
      {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[1,2,3,4].map(i => <div key={i} className="h-32 bg-muted/20 rounded-2xl animate-pulse flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin opacity-20" /></div>)}
          </div>
      ) : serviceTree.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceTree.map((cat, idx) => {
                const { icon, color_scheme } = cat.view_config || { icon: 'User', color_scheme: 'blue' };
                const gradientClass = getCategoryGradient(color_scheme);
                
                return (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`
                            relative h-36 rounded-2xl p-6 text-left
                            bg-gradient-to-br ${gradientClass}
                            text-white shadow-lg
                            transition-all duration-300 transform hover:-translate-y-1 hover:brightness-105 active:scale-[0.98]
                            overflow-hidden group
                        `}
                        style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Glass Overlay */}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                        
                        {/* Decorative background shapes */}
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-lg shadow-inner border border-white/10">
                                    {getCategoryIcon(icon, "w-6 h-6 text-white")}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm border border-white/10">
                                    РџРµСЂРµР№С‚Рё
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold tracking-tight drop-shadow-md leading-none mb-1">
                                    {cat.label}
                                </h3>
                                <p className="text-white/80 text-xs font-medium">
                                    {cat.specialties.length} РЅР°РїСЂР°РІР»РµРЅРёР№
                                </p>
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
      ) : (
        <Card className="text-center py-12 bg-muted/10 border-dashed">
            <div className="text-muted-foreground/30 mb-2">
                <Search className="w-10 h-10 mx-auto" />
            </div>
            <p className="text-muted-foreground font-medium text-sm">РљР°С‚РµРіРѕСЂРёРё РЅРµ Р·Р°РіСЂСѓР¶РµРЅС‹</p>
        </Card>
      )}
    </div>
  );
};



===== FILE: C:\git\apl\med\src\components\steps\StepPatientType.tsx =====

import React from 'react';
import { User, Baby } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { Card } from '../ui/Card';

export const StepPatientType = () => {
    // Fixed: setPatientType does not exist in store, use setDimension instead
    const { setDimension, nextStep } = useBookingStore();

    const handleSelect = (type: string) => {
        setDimension('audience', type);
        nextStep();
    };

    return (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
            <Card 
                onClick={() => handleSelect('adult')} 
                hoverEffect={true}
                className="p-6 flex items-center gap-6"
            >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <User className="w-8 h-8" />
                </div>
                <div className="text-left">
                    <span className="block text-lg font-bold text-foreground">РЇ РІР·СЂРѕСЃР»С‹Р№</span>
                    <span className="text-sm text-muted-foreground">Р—Р°РїРёСЃР°С‚СЊСЃСЏ РЅР° РїСЂРёРµРј РґР»СЏ СЃРµР±СЏ</span>
                </div>
            </Card>
            
            <Card 
                onClick={() => handleSelect('child')} 
                hoverEffect={true}
                className="p-6 flex items-center gap-6"
            >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Baby className="w-8 h-8" />
                </div>
                <div className="text-left">
                    <span className="block text-lg font-bold text-foreground">Р РµР±РµРЅРѕРє</span>
                    <span className="text-sm text-muted-foreground">Р—Р°РїРёСЃР°С‚СЊ СЂРµР±РµРЅРєР° Рє РІСЂР°С‡Сѓ</span>
                </div>
            </Card>
        </div>
    );
};


===== FILE: C:\git\apl\med\src\components\steps\StepSlots.tsx =====


import React, { useEffect, useState, useRef } from 'react';
import { BellRing, CheckCircle2 } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { apiService } from '../../services/api';
import { TimeSlot, DaySchedule } from '../../types';
import { Button } from '../ui/Button';
import { currentTheme } from '../../config/theme';
import { DoctorProfileHeader } from '../modules/DoctorProfileHeader';
import { BranchSwitcher } from '../modules/BranchSwitcher';

export const StepSlots = () => {
    const { selectedDoctor, selectSlot, city, selectedOffering, selectOffering } = useBookingStore();
    const [availableDays, setAvailableDays] = useState<DaySchedule[]>([]);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    
    const [loadingCalendar, setLoadingCalendar] = useState(true);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Keep track of the *previous* selected date to try and restore it after branch switch
    const preferredDateRef = useRef<string | null>(null);

    // Waitlist State
    const [waitlistPhone, setWaitlistPhone] = useState('');
    const [waitlistName, setWaitlistName] = useState('');
    const [waitlistSuccess, setWaitlistSuccess] = useState(false);
    const [waitlistSending, setWaitlistSending] = useState(false);

    const { labels } = currentTheme;

    // [INIT] Initialize default offering if not set
    useEffect(() => {
        if (selectedDoctor && !selectedOffering && selectedDoctor.offerings?.length > 0) {
            selectOffering(selectedDoctor.offerings[0]);
        }
    }, [selectedDoctor]);

    // 1. Load Calendar (Depends on selected Offering/Branch)
    useEffect(() => {
        if (!selectedDoctor || !selectedOffering) return;
        
        setLoadingCalendar(true);
        
        // Contextual Doctor for API call
        const contextDoctor = { 
            ...selectedDoctor, 
            databaseId: selectedOffering.databaseId,
            branchName: selectedOffering.branch.name
        };

        apiService.getCalendar(contextDoctor)
            .then(days => {
                setAvailableDays(days);
                if (days.length > 0) {
                    // Try to restore preferred date
                    let targetDate = days[0].date;
                    if (preferredDateRef.current && days.some(d => d.date === preferredDateRef.current)) {
                        targetDate = preferredDateRef.current;
                    }
                    setSelectedDay(targetDate);
                } else {
                    setSelectedDay(null);
                    setSlots([]);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingCalendar(false));
    }, [selectedDoctor, selectedOffering]);

    // 2. Load Slots
    useEffect(() => {
        if (!selectedDoctor || !selectedDay || !selectedOffering) return;
        
        preferredDateRef.current = selectedDay;
        setLoadingSlots(true);
        setSlots([]); 
        
        const contextDoctor = { 
            ...selectedDoctor, 
            databaseId: selectedOffering.databaseId 
        };

        apiService.getSlots(contextDoctor, selectedDay)
            .then(setSlots)
            .catch(err => console.error(err))
            .finally(() => setLoadingSlots(false));
    }, [selectedDoctor, selectedDay, selectedOffering]);

    const handleJoinWaitlist = async () => {
        if (!waitlistPhone) return;
        setWaitlistSending(true);
        try {
            await apiService.joinWaitlist({
                city,
                specialty: selectedDoctor?.specialty || '',
                doctorId: selectedDoctor?.qmsId,
                doctorName: selectedDoctor?.name,
                name: waitlistName,
                phone: waitlistPhone
            });
            setWaitlistSuccess(true);
        } catch (e) {
            console.error(e);
        } finally {
            setWaitlistSending(false);
        }
    }

    if (!selectedDoctor) return null;

    const showWaitlist = !loadingCalendar && availableDays.length === 0;

    return (
        <div className="animate-slide-up">
             
             {/* 1. Actor Profile */}
             <DoctorProfileHeader doctor={selectedDoctor} />
             
             {/* 2. Offering Selection (Branch Switcher) */}
             <BranchSwitcher 
                doctor={selectedDoctor} 
                selectedOfferingId={selectedOffering?.id}
                onSelect={selectOffering}
             />

             {/* 3. Waitlist Scenario */}
             {showWaitlist && (
                 <div className="card-tokenized p-8 text-center max-w-md mx-auto animate-in fade-in">
                    {waitlistSuccess ? (
                        <div>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{labels.waitlistSuccessTitle}</h3>
                            <p className="text-muted-foreground">{labels.waitlistSuccessText}</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-4">
                                <BellRing className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{labels.waitlistTitle}</h3>
                            <p className="text-muted-foreground mb-6">Р’ С„РёР»РёР°Р»Рµ <b>{selectedOffering?.branch.name}</b> РЅРµС‚ СЃРІРѕР±РѕРґРЅРѕРіРѕ РІСЂРµРјРµРЅРё.</p>
                            <div className="space-y-3 text-left">
                                <input className="input-tokenized" placeholder="РРІР°РЅ" value={waitlistName} onChange={e => setWaitlistName(e.target.value)} />
                                <input className="input-tokenized" placeholder="+7 (999) 000-00-00" value={waitlistPhone} onChange={e => setWaitlistPhone(e.target.value)} />
                                <Button onClick={handleJoinWaitlist} fullWidth disabled={!waitlistPhone || waitlistSending}>
                                    {waitlistSending ? 'РћС‚РїСЂР°РІРєР°...' : labels.waitlistBtn}
                                </Button>
                            </div>
                        </>
                    )}
                 </div>
             )}

             {/* 4. Loader */}
             {loadingCalendar && (
                 <div className="py-12 text-center space-y-4 bg-surface/30 rounded-xl border border-border/50">
                     <div className="relative mx-auto w-10 h-10">
                        <div className="absolute inset-0 border-2 border-muted/20 rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                     </div>
                     <p className="text-muted-foreground text-xs font-medium animate-pulse">Р—Р°РіСЂСѓР¶Р°РµРј СЂР°СЃРїРёСЃР°РЅРёРµ...</p>
                 </div>
             )}

             {/* 5. Calendar & Slots */}
             {!loadingCalendar && availableDays.length > 0 && (
                 <>
                    {/* Date Scroller */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-hide snap-x">
                            {availableDays.map((day) => {
                                const isSelected = selectedDay === day.date;
                                return (
                                    <button
                                        key={day.date}
                                        onClick={() => setSelectedDay(day.date)}
                                        className={`
                                            snap-start flex-shrink-0 flex flex-col items-center justify-center 
                                            w-[4rem] h-[4.5rem] rounded-xl border transition-all duration-300 relative overflow-hidden
                                            ${isSelected 
                                                ? 'bg-foreground text-surface border-foreground shadow-lg scale-105' 
                                                : 'bg-surface border-border text-muted-foreground hover:border-primary/30'
                                            }
                                        `}
                                    >
                                        <span className={`text-[9px] font-bold uppercase mb-0.5 opacity-80`}>
                                            {day.shifts.split(':')[0] || 'РџРќ'} 
                                        </span>
                                        <span className={`text-lg font-bold leading-none`}>
                                            {day.dateLabel.split(' ')[0]}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Slots Grid */}
                    <div className="bg-surface/50 backdrop-blur-md rounded-2xl border border-border p-6 shadow-sm min-h-[200px] relative">
                        {loadingSlots ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-2"></div>
                            </div>
                        ) : slots.length === 0 ? (
                            <div className="text-center py-8 opacity-60">
                                <span className="text-muted-foreground font-medium text-sm">{labels.noSlotsMsg}</span>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Р”РѕСЃС‚СѓРїРЅРѕРµ РІСЂРµРјСЏ</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {slots.map((slot) => (
                                        <button 
                                            key={slot.id} 
                                            onClick={() => selectSlot(slot)} 
                                            disabled={!slot.isAvailable} 
                                            className={`
                                                relative py-2.5 px-2 rounded-lg text-sm font-bold border transition-all duration-200
                                                flex flex-col items-center justify-center gap-1
                                                ${slot.isAvailable 
                                                    ? 'bg-surface border-border text-foreground hover:border-primary hover:shadow-md hover:-translate-y-0.5 active:scale-95' 
                                                    : 'bg-muted/10 border-transparent text-muted-foreground/30 cursor-not-allowed'
                                                }
                                            `}
                                        >
                                            <span className="tracking-tight">{slot.time}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                 </>
             )}
        </div>
    );
};



===== FILE: C:\git\apl\med\src\components\steps\StepSuccess.tsx =====


import React from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { currentTheme } from '../../config/theme';

export const StepSuccess = () => {
    const { selectedDoctor, selectedSlot, selectedOffering } = useBookingStore();
    const logoUrl = currentTheme.theme?.logo_url;
    const { labels } = currentTheme;

    // Use specific branch address from the offering, fallback to doctor's generic address
    const displayAddress = selectedOffering?.branch.address || selectedDoctor?.address || 'РђРґСЂРµСЃ СѓС‚РѕС‡РЅСЏРµС‚СЃСЏ';
    const displayBranchName = selectedOffering?.branch.name || '';

    return (
        <div className="w-full max-w-[440px] mx-auto animate-slide-up relative">
             {/* Card */}
             <div className="card-tokenized w-full text-center relative overflow-hidden shadow-soft">
                
                {/* Decorative Top Strip with Dynamic Gradient */}
                <div className="h-2 w-full bg-gradient-to-r from-primary via-blue-400 to-accent absolute top-0 left-0"></div>

                <div className="pt-10 px-7 pb-8">
                    
                    {/* Logo (Dynamic from Backend) */}
                    <div className="mb-6 -mt-4 flex justify-center">
                         {logoUrl ? (
                             <img src={logoUrl} alt="Logo" className="h-10 object-contain" />
                         ) : (
                             <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                 Clinic Booking
                             </h2>
                         )}
                    </div>

                    <h1 className="text-2xl font-bold text-foreground mb-6">
                        {labels.successTitle}
                    </h1>

                    <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {labels.successSubtitle} <br/>
                        <strong className="text-foreground">{selectedDoctor?.name}</strong>

                        {/* Info Block */}
                        <div className="bg-muted/10 rounded-xl p-5 my-5 border border-border text-left">
                            <span className="block text-[22px] font-extrabold text-foreground mb-1 text-center">
                                {selectedSlot?.date} РІ {selectedSlot?.time}
                            </span>
                            
                            <div className="mt-4 flex flex-col gap-1 text-sm border-t border-border/50 pt-3">
                                {displayBranchName && (
                                    <span className="font-bold text-foreground">{displayBranchName}</span>
                                )}
                                <span className="text-muted-foreground">{displayAddress}</span>
                            </div>
                        </div>

                        {/* Documents List (HTML Injection allowed for formatting) */}
                        <div 
                            className="text-base text-muted-foreground mt-6 leading-normal"
                            dangerouslySetInnerHTML={{ __html: labels.successDocuments }}
                        />
                    </div>

                    <div className="flex flex-col gap-3.5">
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full py-4 text-lg font-semibold rounded-lg text-primary-foreground bg-gradient-to-br from-primary to-blue-600 shadow-glow hover:scale-[1.01] active:scale-[0.98] transition-all relative overflow-hidden"
                        >
                            <span className="relative z-10">Р“РѕС‚РѕРІРѕ</span>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                        </button>
                    </div>
                </div>
             </div>
        </div>
    );
};



===== FILE: C:\git\apl\med\src\components\ui\Button.tsx =====


import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', fullWidth = false, children, className = '', ...props }) => {
    
    // Updated base classes for better semantic token usage
    const base = "relative overflow-hidden py-4 px-6 rounded-lg font-bold text-[15px] tracking-wide transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2";
    const width = fullWidth ? "w-full" : "";
    
    // Semantic Tokens Usage
    const variants = {
        primary: `
            bg-primary text-primary-foreground
            shadow-glow
            hover:brightness-110 
            border-t border-white/20
        `,
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
        outline: "bg-transparent border-2 border-border text-foreground hover:border-primary hover:text-primary hover:bg-primary/5",
        ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
    };

    return (
        <button 
            className={`${base} ${width} ${variants[variant]} ${className}`}
            {...props}
        >
            {/* Subtle inner shine for primary */}
            {variant === 'primary' && !props.disabled && (
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            )}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
};



===== FILE: C:\git\apl\med\src\components\ui\Card.tsx =====


import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    active?: boolean;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = false, active = false, style, onClick }) => {
    // РСЃРїРѕР»СЊР·СѓРµРј СЃРµРјР°РЅС‚РёС‡РµСЃРєРёРµ С‚РѕРєРµРЅС‹
    // card-tokenized РѕРїСЂРµРґРµР»РµРЅ РІ index.css С‡РµСЂРµР· @apply bg-surface border-border ...
    const baseClasses = `card-tokenized relative overflow-hidden transition-all duration-300`;
    
    const hoverClasses = hoverEffect 
        ? 'group hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/30 cursor-pointer' 
        : '';
    
    const activeClasses = active 
        ? 'ring-2 ring-primary ring-offset-2 border-transparent shadow-lg' 
        : '';

    return (
        <div 
            className={`${baseClasses} ${hoverClasses} ${activeClasses} ${className}`} 
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
};



===== FILE: C:\git\apl\med\src\components\ui\Skeleton.tsx =====


import React from 'react';

interface SkeletonProps {
    className?: string;
    count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <div 
                    key={idx} 
                    // РРїРѕР»СЊР·СѓРµРј bg-muted/20 РІРјРµСЃС‚Рѕ bg-slate-200. 
                    // Р­С‚Рѕ РіР°СЂР°РЅС‚РёСЂСѓРµС‚, С‡С‚Рѕ СЃРєРµР»РµС‚РѕРЅ Р±СѓРґРµС‚ РІ С‚РѕРЅР°Р»СЊРЅРѕСЃС‚Рё РёРЅС‚РµСЂС„РµР№СЃР°.
                    className={`animate-pulse bg-muted/20 rounded-xl ${className}`} 
                />
            ))}
        </>
    );
};

// РџСЂРµСЃРµС‚С‹ РґР»СЏ С‡Р°СЃС‚Рѕ РёСЃРїРѕР»СЊР·СѓРµРјС‹С… СЃРєРµР»РµС‚РѕРЅРѕРІ
export const DoctorCardSkeleton = () => (
    <div className="card-tokenized p-5 flex gap-5">
        <Skeleton className="w-24 h-28 rounded-[20px] shrink-0" />
        <div className="flex-1 py-1 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 pt-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
            </div>
            <div className="mt-auto pt-4 flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-20 rounded-xl" />
            </div>
        </div>
    </div>
);



===== FILE: C:\git\apl\med\src\components\WizardLayout.tsx =====


import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useBookingStore, STEPS } from '../store/bookingStore';
import { currentTheme } from '../config/theme';
import { City } from '../types';

export const WizardLayout = ({ children, title }: { children?: React.ReactNode, title: React.ReactNode }) => {
  const { step, prevStep, city, setCity, getStepsFlow } = useBookingStore();

  // Logic: Calculate progress based on the DYNAMIC flow, not static IDs.
  // This ensures that if we skip 'Dimensions', the 'Doctors' step becomes Step 2, not Step 3.
  const flow = getStepsFlow();
  
  // Exclude SUCCESS step from total count for the progress bar
  const visualFlow = flow.filter(s => s !== STEPS.SUCCESS && s !== STEPS.HOME);
  const totalSteps = visualFlow.length;
  
  // Find current position. Note: step is the ID (e.g., 3), we need its index in visualFlow
  const currentIndex = visualFlow.indexOf(step);
  const currentStepNumber = currentIndex + 1;

  // Percentage calculation
  const progressPercent = Math.min(100, Math.max(5, (currentStepNumber / totalSteps) * 100));

  // Determine if we are on the first visual step (to hide Back button if needed, or show it to go Home)
  const isFirstVisualStep = currentIndex === 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
        
        {/* Floating Header */}
        <div className="sticky top-4 z-50 mb-8 animate-fade-in">
            <div className="bg-surface/80 backdrop-blur-xl border border-white/60 shadow-soft rounded-full px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {step > STEPS.HOME && (
                        <button 
                            onClick={prevStep} 
                            className="w-10 h-10 flex items-center justify-center bg-surface border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                    
                    {/* Compact Step Indicator */}
                    {totalSteps > 0 && step !== STEPS.HOME && (
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                РЁР°Рі {currentStepNumber} РёР· {totalSteps}
                            </span>
                            <div className="h-1.5 w-24 bg-muted/20 rounded-full mt-1 overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-500 ease-out"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    )}
                    
                    {step === STEPS.HOME && (
                        <span className="text-sm font-bold text-foreground">
                            {currentTheme.client?.name || 'РћРЅР»Р°Р№РЅ-Р·Р°РїРёСЃСЊ'}
                        </span>
                    )}
                </div>

                {/* City Switcher */}
                {currentTheme.features.multi_city && step === STEPS.HOME && (
                    <div className="flex bg-muted/20 p-1 rounded-lg">
                        <button 
                            onClick={() => setCity(City.SPB)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                                city === City.SPB 
                                ? 'bg-surface text-primary shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            РЎРџР±
                        </button>
                        <button 
                            onClick={() => setCity(City.CHEL)}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                                city === City.CHEL 
                                ? 'bg-surface text-primary shadow-sm' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Р§РµР»СЏР±РёРЅСЃРє
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Content Title */}
        <div className="mb-8 px-2 animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight line-clamp-2">
                {title}
            </h2>
        </div>

        {/* Main Content */}
        <div className="relative min-h-[400px]">
            {children}
        </div>
        
        {/* Footer Brand */}
        <div className="mt-12 mb-6 text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Powered by Medical Core</div>
        </div>
    </div>
  );
};



===== FILE: C:\git\apl\med\src\config\schema.ts =====


import { z } from 'zod';

const DimensionOptionSchema = z.object({
    id: z.string(),
    label: z.string(),
    icon: z.string().optional(),
    color: z.string().optional(),
    isDefault: z.boolean().optional()
});

const DimensionConfigSchema = z.object({
    enabled: z.boolean(),
    key: z.string(),
    label: z.string(),
    mode: z.enum(['tabs', 'filter', 'strict_separation']),
    options: z.array(DimensionOptionSchema)
});

// Validation Schema for Topology
export const TopologySchema = z.object({
    cities: z.object({
        enabled: z.boolean(),
        items: z.record(z.string(), z.object({
            label: z.string(),
            default: z.boolean().optional()
        }))
    }),
    dimensions: z.record(z.string(), DimensionConfigSchema),
    branches: z.object({
        enabled: z.boolean(),
        logic: z.enum(['strict_selection', 'dynamic_aggregation', 'hidden']),
        cross_branch_suggestion: z.boolean().optional()
    })
});

const ComplianceConfigSchema = z.object({
    data_minimization: z.object({
        exclude_fields: z.array(z.string())
    }),
    age_gate: z.object({
        enabled: z.boolean(),
        threshold: z.number().optional(),
        error_message: z.string().optional()
    }),
    consent: z.object({
        required: z.boolean(),
        version: z.string(),
        url: z.string(),
        label: z.string().optional()
    }),
    audit: z.object({
        enabled: z.boolean(),
        level: z.string()
    }).optional()
});

// Validation for the entire AppConfig
export const AppConfigSchema = z.object({
    theme: z.object({
        logo_url: z.string().optional(),
        colors: z.object({
            primary: z.string(),
            accent: z.string()
        }).optional(),
        labels: z.record(z.string(), z.string()).optional()
    }).optional(),
    topology: TopologySchema,
    compliance: ComplianceConfigSchema.optional(),
    hydrator: z.any().optional(), // Can be stricter later
    behavior: z.object({
        entry_points: z.object({
            doctor_direct: z.boolean(),
            specialty_list: z.boolean(),
            service_search: z.boolean()
        }),
        auth_strategy: z.enum(['guest_first', 'auth_first']).optional(),
        waitlist: z.object({
            enabled: z.boolean(),
            trigger: z.enum(['no_slots_available', 'always', 'manual_only'])
        })
    }).optional()
});

export const validateConfig = (config: any) => {
    const result = AppConfigSchema.safeParse(config);
    if (!result.success) {
        console.error("вќЊ Config Validation Failed:", result.error.format());
        return null; // Or throw error based on strictness policy
    }
    return result.data;
};



===== FILE: C:\git\apl\med\src\config\theme.ts =====



import { ClinicTheme, City, AppConfig, TextDictionary } from '../types';

/**
 * DEFAULT CONFIGURATION (Fallback)
 * РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ, РµСЃР»Рё Р±СЌРєРµРЅРґ РЅРµРґРѕСЃС‚СѓРїРµРЅ РёР»Рё РєРѕРЅС„РёРі РЅРµ Р·Р°РіСЂСѓР·РёР»СЃСЏ.
 */
const defaultLabels: Required<TextDictionary> = {
    step1Title: 'РљСѓРґР° РІС‹ С…РѕС‚РёС‚Рµ Р·Р°РїРёСЃР°С‚СЊСЃСЏ?',
    step2Title: 'Р’С‹Р±РµСЂРёС‚Рµ СЃРїРµС†РёР°Р»РёСЃС‚Р°',
    searchPlaceholder: 'Р’СЂР°С‡, СѓСЃР»СѓРіР°, СЃРїРµС†РёР°Р»СЊРЅРѕСЃС‚СЊ...',
    selectTimeBtn: 'РџРѕРєР°Р·Р°С‚СЊ СЂР°СЃРїРёСЃР°РЅРёРµ',
    confirmBookingBtn: 'РџРѕРґС‚РІРµСЂРґРёС‚СЊ Р·Р°РїРёСЃСЊ',
    currency: 'в‚Ѕ',
    experienceLabel: 'РЎС‚Р°Р¶',
    yearsShort: 'Р»РµС‚',
    successTitle: 'Р’С‹ Р·Р°РїРёСЃР°РЅС‹!',
    successSubtitle: 'Р–РґРµРј РІР°СЃ РІ РєР»РёРЅРёРєРµ',
    successDocuments: 'РќРµ Р·Р°Р±СѓРґСЊС‚Рµ РїР°СЃРїРѕСЂС‚ Рё РїРѕР»РёСЃ',
    
    // Waitlist
    waitlistTitle: 'РќРµС‚ СЃРІРѕР±РѕРґРЅРѕРіРѕ РІСЂРµРјРµРЅРё',
    waitlistDesc: 'Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, Сѓ РІСЂР°С‡Р° РїРѕРєР° РЅРµС‚ СЃРІРѕР±РѕРґРЅС‹С… СЃР»РѕС‚РѕРІ. РћСЃС‚Р°РІСЊС‚Рµ РєРѕРЅС‚Р°РєС‚С‹.',
    waitlistBtn: 'РЎРѕРѕР±С‰РёС‚СЊ РјРЅРµ',
    waitlistSuccessTitle: 'Р—Р°СЏРІРєР° РїСЂРёРЅСЏС‚Р°!',
    waitlistSuccessText: 'РњС‹ СЃРІСЏР¶РµРјСЃСЏ СЃ РІР°РјРё, РєР°Рє С‚РѕР»СЊРєРѕ Сѓ РІСЂР°С‡Р° РїРѕСЏРІРёС‚СЃСЏ СЃРІРѕР±РѕРґРЅРѕРµ РІСЂРµРјСЏ.',
    
    // Errors
    noSlotsMsg: 'РЎРІРѕР±РѕРґРЅС‹С… СЃР»РѕС‚РѕРІ РЅРµС‚',
    errRequired: 'РћР±СЏР·Р°С‚РµР»СЊРЅРѕРµ РїРѕР»Рµ',
    errPhone: 'Р’РІРµРґРёС‚Рµ РїРѕР»РЅС‹Р№ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°',
    errName: 'РЎР»РёС€РєРѕРј РєРѕСЂРѕС‚РєРѕРµ РёРјСЏ',
    errPhoneFormat: 'РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ РЅРѕРјРµСЂР°',
};

// [NO HARDCODE] Default suggestions for the search bar
const defaultSuggestions = [
    { label: 'РўРµСЂР°РїРµРІС‚', type: 'specialty' },
    { label: 'РџРµРґРёР°С‚СЂ', type: 'specialty' },
    { label: 'РЈР—Р', type: 'search' },
    { label: 'РђРЅР°Р»РёР·С‹', type: 'search' }
];

export const currentTheme: ClinicTheme = {
  theme: {
      colors: { primary: '#2563EB', accent: '#F59E0B', background: '#F8FAFC' }, 
      contacts: { 
          phone: '+7 (999) 000-00-00', 
          website: '#' 
      },
      labels: defaultLabels
  },
  client: {
      name: 'РљР»РёРЅРёРєР° "РСЃС‚РѕС‡РЅРёРє"'
  },
  features: {
      multi_city: true,
      branches_mode: 'smart',
      auth_flow: 'guest_first',
      structure_source: 'wp_tree',
      search_suggestions: defaultSuggestions // Added to config schema
  },
  borderRadius: 'rounded-xl', 
  defaultCity: City.CHEL, 
  labels: defaultLabels, 
  recaptcha: { enabled: false, site_key: '' },
  
  topology: {
      cities: {
          enabled: true,
          items: {
              [City.CHEL]: { label: 'Р§РµР»СЏР±РёРЅСЃРє', default: true },
              [City.SPB]: { label: 'РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі', default: false }
          }
      },
      dimensions: {},
      branches: {
          enabled: true,
          logic: 'dynamic_aggregation'
      }
  },
  hydrator: {
      doctor: {
          identity: 'qms_api',
          schedule: 'qms_api',
          content: 'wp_usermeta',
          pricing: 'qms_api'
      }
  },
  behavior: {
      entry_points: {
          doctor_direct: true,
          specialty_list: true,
          service_search: true
      },
      waitlist: {
          enabled: true,
          trigger: 'no_slots_available'
      }
  }
};

/**
 * Converts Hex color to HSL values (space separated) for Tailwind usage.
 */
const hexToHsl = (hex: string): string => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    
    const r = parseInt(c.substring(0,2), 16) / 255;
    const g = parseInt(c.substring(2,4), 16) / 255;
    const b = parseInt(c.substring(4,6), 16) / 255;
    
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    const hDeg = Math.round(h * 360);
    const sPct = Math.round(s * 100);
    const lPct = Math.round(l * 100);
    
    return `${hDeg} ${sPct}% ${lPct}%`;
};

export const applyDynamicTheme = (config: AppConfig) => {
    if (!config) return;

    // 1. Merge Config Deeply
    if (config.theme) {
        if (config.theme.colors) {
            currentTheme.theme.colors = { ...currentTheme.theme.colors, ...config.theme.colors };
        }
        if (config.theme.labels) {
            currentTheme.labels = { ...currentTheme.labels, ...config.theme.labels };
        }
        if (config.theme.logo_url) {
            currentTheme.theme.logo_url = config.theme.logo_url;
        }
    }
    
    if (config.features) {
        currentTheme.features = { ...currentTheme.features, ...config.features };
    }
    
    // 2. Apply CSS Variables
    const root = document.documentElement;
    const colors = currentTheme.theme.colors;
    
    if (colors?.primary) root.style.setProperty('--primary', hexToHsl(colors.primary));
    if (colors?.accent) root.style.setProperty('--accent', hexToHsl(colors.accent));
    if (colors?.background) root.style.setProperty('--background', hexToHsl(colors.background));
};


===== FILE: C:\git\apl\med\src\declarations.d.ts =====

/**
 * Fallback type definitions.
 * Fixes TS2307 "Cannot find module" errors when node_modules are missing types.
 */

declare module '@sentry/react' {
    export const init: (config: any) => void;
    export const browserTracingIntegration: () => any;
    export const replayIntegration: () => any;
    export const captureException: (error: any, context?: any) => void;
    // Fix: ErrorBoundary can be a class component or any
    export const ErrorBoundary: any; 
}

declare module 'react-hook-form' {
    // Fixed: Added generic type support for useForm
    export const useForm: <TFieldValues = any>(config?: any) => any;
    export const Controller: any;
    export const useFormContext: any;
}

declare module '@hookform/resolvers/zod' {
    export const zodResolver: (schema: any) => any;
}

declare module 'zod' {
    // Fixed: z is now a namespace (for types) and a value
    export namespace z {
        export type infer<T> = any;
    }
    export const z: any;
}



===== FILE: C:\git\apl\med\src\hooks\useDoctors.ts =====

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Doctor } from '../types';
import { useBookingStore } from '../store/bookingStore';

export const useDoctorsList = () => {
    const { city, searchQuery, category, serviceTree, activeDimensions } = useBookingStore();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentCategorySlug = serviceTree.find(c => c.id === category)?.slug;

    useEffect(() => {
        const fetchDocs = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = searchQuery || ''; 
                
                // Pass active dimensions to the API which will handle filtering by branches/instances
                const data = await apiService.getDoctorsBySpecialty(city, query, activeDimensions);
                
                let filtered = data;

                // Client-side filtering by Vertical/Category Root (from CMS structure)
                // This logic persists as it relates to UI navigation tree, not database segmentation
                if (currentCategorySlug) {
                    filtered = filtered.filter(doc => {
                        if (!doc.root_categories || doc.root_categories.length === 0) return true; 
                        return doc.root_categories.includes(currentCategorySlug);
                    });
                }

                // Note: Patient type / Audience filtering is now handled by the Backend Driver 
                // based on 'activeDimensions', so we removed the client-side AUDIENCE_MAP logic.

                // Check for exact match (Deep Link case)
                const exactMatch = data.find(d => d.qmsId === query || d.id === query);
                if (exactMatch) {
                    setDoctors([exactMatch]);
                } else {
                    setDoctors(filtered);
                }
            } catch (e: any) {
                console.error("Failed to load doctors", e);
                setError(e.message || 'РћС€РёР±РєР° Р·Р°РіСЂСѓР·РєРё СЃРїРёСЃРєР° РІСЂР°С‡РµР№');
            } finally {
                setLoading(false);
            }
        };

        fetchDocs();
    }, [city, searchQuery, category, currentCategorySlug, activeDimensions]); 

    return { doctors, loading, error };
};


===== FILE: C:\git\apl\med\src\hooks\usePhoneMask.ts =====


import React, { useCallback } from 'react';

/**
 * РҐСѓРє РґР»СЏ РѕР±СЂР°Р±РѕС‚РєРё РІРІРѕРґР° С‚РµР»РµС„РѕРЅР° РїРѕ СЃС‚Р°РЅРґР°СЂС‚Р°Рј Р Р¤ (+7).
 * Р›РѕРіРёРєР° РїРѕР»РЅРѕСЃС‚СЊСЋ РїРѕСЂС‚РёСЂРѕРІР°РЅР° РёР· РїСЂРµРґРѕСЃС‚Р°РІР»РµРЅРЅРѕРіРѕ index.html.
 */
export const usePhoneMask = (
    setValue: (val: string) => void,
    triggerValidation?: () => void
) => {

    const getDigits = (val: string) => {
        let d = val.replace(/\D/g, '');
        // РЈРґР°Р»СЏРµРј РІРµРґСѓС‰СѓСЋ 7 (РёР· +7)
        if (d.length > 0 && d[0] === '7') d = d.slice(1);
        // РЈРґР°Р»СЏРµРј РІРµРґСѓС‰СѓСЋ 8 (РµСЃР»Рё РІРІРµР»Рё РєР°Рє РїРµСЂРІСѓСЋ С†РёС„СЂСѓ)
        if (d.length > 0 && d[0] === '8') d = d.slice(1);
        return d.slice(0, 10);
    };

    const format = (d: string) => {
        let r = '+7';
        if (d.length > 0) r += ' (' + d.slice(0, 3);
        if (d.length >= 3) r += ') ' + d.slice(3, 6);
        if (d.length >= 6) r += '-' + d.slice(6, 8);
        if (d.length >= 8) r += '-' + d.slice(8, 10);
        return r;
    };

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const d = getDigits(e.target.value);
        const formatted = format(d);
        setValue(formatted);
        if (triggerValidation) triggerValidation();
    }, [setValue, triggerValidation]);

    const onPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        const formatted = format(getDigits(text));
        setValue(formatted);
        if (triggerValidation) triggerValidation();
    }, [setValue, triggerValidation]);

    const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setValue('+7');
            // Hack to set cursor position after render cycle
            setTimeout(() => {
                e.target.setSelectionRange(2, 2);
            }, 10);
        }
    }, [setValue]);

    const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (getDigits(e.target.value).length === 0) {
            setValue('');
        }
        if (triggerValidation) triggerValidation();
    }, [setValue, triggerValidation]);

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const pos = input.selectionStart || 0;
        const val = input.value;
        const currentDigits = getDigits(val);

        // Р Р°Р·СЂРµС€Р°РµРј РЅР°РІРёРіР°С†РёСЋ
        if (['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
        
        // Р Р°Р·СЂРµС€Р°РµРј Ctrl/Cmd + A/C/V/X
        if ((e.ctrlKey || e.metaKey) && 'acvx'.includes(e.key.toLowerCase())) return;

        // Backspace Рё Delete
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (pos <= 2) { e.preventDefault(); return; }
            
            e.preventDefault();
            let d = currentDigits;
            // Р›РѕРіРёРєР° СѓРґР°Р»РµРЅРёСЏ РїРѕСЃР»РµРґРЅРµРіРѕ СЃРёРјРІРѕР»Р°
            if (d.length > 0) d = d.slice(0, -1);
            
            const formatted = format(d);
            setValue(formatted);
            return;
        }

        // Р‘Р›РћРљРР РЈР•Рњ + РІСЃРµРіРґР°
        if (e.key === '+') {
            e.preventDefault();
            return;
        }

        // Р‘Р›РћРљРР РЈР•Рњ 7 Рё 8 РµСЃР»Рё СЌС‚Рѕ РїРµСЂРІР°СЏ С†РёС„СЂР° РЅРѕРјРµСЂР°
        if ((e.key === '7' || e.key === '8') && currentDigits.length === 0) {
            e.preventDefault();
            return;
        }

        // Р‘Р»РѕРєРёСЂСѓРµРј РІСЃС‘ РєСЂРѕРјРµ С†РёС„СЂ
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    }, [setValue]);

    return {
        onChange,
        onPaste,
        onFocus,
        onBlur,
        onKeyDown
    };
};



===== FILE: C:\git\apl\med\src\hooks\useRecaptcha.ts =====


import { useState, useEffect } from 'react';
import { currentTheme } from '../config/theme';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export const useRecaptcha = () => {
    const [ready, setReady] = useState(false);
    const siteKey = currentTheme.recaptcha?.site_key;
    const enabled = currentTheme.recaptcha?.enabled;

    useEffect(() => {
        if (!enabled || !siteKey || window.grecaptcha) {
            if (window.grecaptcha) setReady(true);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            setReady(true);
        };
        document.head.appendChild(script);

        return () => {
            // Cleanup if needed (rarely for external scripts)
        };
    }, [siteKey, enabled]);

    const getToken = async (action: string = 'submit'): Promise<string> => {
        if (!enabled) return '';
        
        if (!ready || !window.grecaptcha) {
            console.warn('reCAPTCHA not ready yet');
            return '';
        }

        return new Promise((resolve, reject) => {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(siteKey, { action })
                    .then((token: string) => resolve(token))
                    .catch((err: any) => {
                        console.error('reCAPTCHA execution failed', err);
                        reject(err);
                    });
            });
        });
    };

    return { getToken, ready };
};



===== FILE: C:\git\apl\med\src\hooks\useSmartSearch.ts =====


import { useState, useEffect, useMemo } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { apiService, SearchResult } from '../services/api';

export const useSmartSearch = () => {
    const { searchQuery, serviceTree, city } = useBookingStore();
    const [remoteResults, setRemoteResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // 1. Local filtering (Instant) - Specialties from loaded tree
    const localResults = useMemo(() => {
        if (!searchQuery || searchQuery.length < 2) return [];
        
        const output: SearchResult[] = [];
        const queryLower = searchQuery.toLowerCase();

        serviceTree.forEach(cat => {
            cat.specialties.forEach(spec => {
                if (spec.label.toLowerCase().includes(queryLower)) {
                    output.push({
                        type: 'specialty',
                        label: spec.label,
                        subLabel: cat.label,
                        payload: { specialty: spec.label }
                    });
                }
            });
        });

        return output.slice(0, 5); 
    }, [searchQuery, serviceTree]);

    // 2. Remote Text Search (Debounced) - Doctors
    useEffect(() => {
        if (!searchQuery || searchQuery.length < 2) {
            setRemoteResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            try {
                // Now calls standard search, not vector search
                const results = await apiService.search(searchQuery, city);
                setRemoteResults(results);
            } catch (e) {
                console.error(e);
            } finally {
                setIsSearching(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, city]);

    // 3. Merge Results
    const combinedResults = useMemo(() => {
        // Simple merge: Local specialties first, then remote doctors/services
        const seenLabels = new Set(localResults.map(r => r.label));
        const uniqueRemote = remoteResults.filter(r => !seenLabels.has(r.label));
        return [...localResults, ...uniqueRemote].slice(0, 8);
    }, [localResults, remoteResults]);

    return { 
        results: combinedResults,
        isSearching
    };
};


===== FILE: C:\git\apl\med\src\index.css =====

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* --- PRIMITIVES (Base Palette) --- */
    /* Values in HSL without commas for Tailwind Opacity Modifier support */
    
    /* Default: "Medical Clean Blue" */
    --primary: 221 83% 53%;      /* #2563EB (Blue-600) */
    --primary-fg: 0 0% 100%;     /* White */
    
    --secondary: 215 28% 17%;    /* #1F2937 (Slate-800) */
    --secondary-fg: 210 40% 98%; 

    --accent: 38 92% 50%;        /* #F59E0B (Amber-500) */
    --accent-fg: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-fg: 0 0% 98%;

    /* --- SEMANTICS (Usage Context) --- */
    --background: 210 40% 98%;   /* Page BG (Slate-50) */
    
    --surface: 0 0% 100%;        /* Card BG (White) */
    --surface-fg: 222 47% 11%;   /* Main Text (Slate-900) */
    
    --muted: 215 16% 47%;        /* Secondary Text (Slate-500) */
    --muted-light: 210 40% 96%;  /* Input BG / Hover (Slate-100) */
    
    --border: 214 32% 91%;       /* Borders (Slate-200) */
    --input: 214 32% 88%;        /* Input Borders (Slate-300) */
    
    /* --- SHAPE --- */
    --radius: 1rem;              /* 16px (Modern Rounded) */
  }

  body {
    @apply bg-background text-foreground antialiased;
    /* Font Smoothing */
    -webkit-font-smoothing: antialiased; 
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  /* Premium Inputs using Tokens */
  .input-tokenized {
    @apply w-full p-4 rounded-lg border border-input bg-surface text-foreground transition-all duration-200;
    @apply placeholder:text-muted/70;
    @apply hover:border-primary/50;
    @apply focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white outline-none;
    @apply shadow-sm;
  }

  /* Cards using Tokens */
  .card-tokenized {
    @apply bg-surface text-surface-foreground border border-border shadow-sm rounded-2xl;
  }
  
  .card-glass {
    @apply bg-surface/90 backdrop-blur-xl border border-white/60 shadow-soft;
  }
}

/* Animations */
.animate-slide-up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Utilities */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

/* --- Dynamic Background Blobs --- */
.blob-cont {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
  background: hsl(var(--background));
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  animation: float 20s infinite alternate;
}

.blob-1 {
  top: -10%;
  left: -10%;
  width: 50vw;
  height: 50vw;
  background-color: hsl(var(--primary) / 0.15);
  animation-delay: 0s;
}

.blob-2 {
  bottom: -10%;
  right: -10%;
  width: 40vw;
  height: 40vw;
  background-color: hsl(var(--accent) / 0.1);
  animation-delay: -5s;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(20px, 40px) scale(1.1); }
}


===== FILE: C:\git\apl\med\src\index.tsx =====

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // <--- Import Styles Here
import { Presentation } from './Presentation'; 
import { AdminLayout } from './components/admin/AdminLayout';
import { City } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import * as Sentry from "@sentry/react";

// Sentry Init
Sentry.init({
  dsn: (import.meta as any).env.VITE_SENTRY_DSN, 
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, 
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// TARGET ROOT ELEMENT
const ROOT_ID = 'medical-booking-widget-root';
const rootElement = document.getElementById(ROOT_ID);

if (!rootElement) {
  // Graceful fallback for dev mode if index.html wasn't updated in sync or cached
  const fallback = document.getElementById('root');
  if (!fallback) throw new Error(`Could not find root element #${ROOT_ID} to mount to`);
}

const target = rootElement || document.getElementById('root')!;

// 1. РЎС‡РёС‚С‹РІР°РµРј РїР°СЂР°РјРµС‚СЂС‹ РёР· data-Р°С‚СЂРёР±СѓС‚РѕРІ (РґР»СЏ CMS/WP)
const dataset = target.dataset;

// 2. РРЅРёС†РёР°Р»РёР·РёСЂСѓРµРј РіР»РѕР±Р°Р»СЊРЅС‹Р№ РєРѕРЅС„РёРі
window.MED_WIDGET_CONFIG = window.MED_WIDGET_CONFIG || {};

if (dataset.apiUrl) {
    window.MED_WIDGET_CONFIG.apiUrl = dataset.apiUrl;
}
if (dataset.remoteConfigUrl) {
    window.MED_WIDGET_CONFIG.remoteConfigUrl = dataset.remoteConfigUrl;
}
if (dataset.city) {
    window.MED_WIDGET_CONFIG.city = dataset.city as City;
}

// 3. Р Р°Р·Р±РѕСЂ URL РїР°СЂР°РјРµС‚СЂРѕРІ РґР»СЏ Deep Linking
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');

const initialProps = {
  initialCity: (urlParams.get('city') as City) || (dataset.city as City) || undefined,
  // [NEW] Support for Branch Deep Linking
  initialBranchId: urlParams.get('branch') || dataset.branchId || undefined,
  
  preselectedSpecialty: urlParams.get('spec') || dataset.spec || undefined, 
  preselectedDoctorId: urlParams.get('doctorId') || dataset.doctorId || undefined, 
  preselectedServiceId: urlParams.get('serviceId') || dataset.serviceId || undefined,
  autoOpen: urlParams.has('openWidget') || dataset.autoOpen === 'true',
  apiUrl: dataset.apiUrl // РџСЂРѕР±СЂР°СЃС‹РІР°РµРј РІ РїСЂРѕРїСЃС‹ РЅР° РІСЃСЏРєРёР№ СЃР»СѓС‡Р°Р№
};

const root = ReactDOM.createRoot(target);

let Component = App;
if (mode === 'presentation') Component = Presentation as any;
if (mode === 'admin') Component = AdminLayout as any;

root.render(
  <React.StrictMode>
    <ErrorBoundary>
        <Component {...initialProps} />
    </ErrorBoundary>
  </React.StrictMode>
);


===== FILE: C:\git\apl\med\src\Presentation.tsx =====


import React from 'react';
import { Navbar } from './components/presentation/Navbar';
import { Hero } from './components/presentation/Hero';
import { Features } from './components/presentation/Features';
import { Roadmap } from './components/presentation/Roadmap';
import { Footer } from './components/presentation/Footer';

export const Presentation = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Roadmap />
      <Footer />
    </div>
  );
};



===== FILE: C:\git\apl\med\src\services\analytics.ts =====


// Analytics Abstraction Layer
// РџРѕР·РІРѕР»СЏРµС‚ РјРµРЅСЏС‚СЊ РїСЂРѕРІР°Р№РґРµСЂРѕРІ Р°РЅР°Р»РёС‚РёРєРё Р±РµР· РїРµСЂРµРїРёСЃС‹РІР°РЅРёСЏ РєРѕРјРїРѕРЅРµРЅС‚РѕРІ

type EventName = 
    | 'step_view' 
    | 'select_category' 
    | 'select_doctor' 
    | 'select_slot' 
    | 'booking_attempt' 
    | 'booking_success' 
    | 'booking_error' 
    | 'waitlist_join';

interface AnalyticsParams {
    [key: string]: string | number | boolean | undefined;
}

// Р”РµРєР»Р°СЂР°С†РёСЏ РіР»РѕР±Р°Р»СЊРЅС‹С… РѕР±СЉРµРєС‚РѕРІ Р°РЅР°Р»РёС‚РёРєРё
declare global {
    interface Window {
        ym?: (id: number, method: string, ...args: any[]) => void;
        dataLayer?: any[];
    }
}

// Р—Р°РјРµРЅРёС‚Рµ РЅР° РІР°С€ ID СЃС‡РµС‚С‡РёРєР°
const YM_COUNTER_ID = 99999999; 

// Safe Environment Access
const metaEnv = (import.meta as any).env || {};
const IS_DEV = metaEnv.DEV;

export const analytics = {
    
    track: (event: EventName, params: AnalyticsParams = {}) => {
        // 1. Console Log (Dev Mode)
        if (IS_DEV) {
            console.groupCollapsed(`рџ“Љ Analytics: ${event}`);
            console.log(params);
            console.groupEnd();
        }

        // 2. Yandex Metrika
        if (window.ym) {
            // РћС‚РїСЂР°РІР»СЏРµРј РєР°Рє С†РµР»СЊ (Reach Goal)
            window.ym(YM_COUNTER_ID, 'reachGoal', event, params);
            
            // РћС‚РїСЂР°РІР»СЏРµРј РїР°СЂР°РјРµС‚СЂС‹ РІРёР·РёС‚Р° (params)
            window.ym(YM_COUNTER_ID, 'params', { [event]: params });
        }

        // 3. Google Tag Manager (Data Layer)
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'custom_event',
                event_category: 'MedicalWidget',
                event_action: event,
                ...params
            });
        }
    },

    // РҐРµР»РїРµСЂ РґР»СЏ РѕС‚СЃР»РµР¶РёРІР°РЅРёСЏ РїСЂРѕСЃРјРѕС‚СЂРѕРІ С€Р°РіРѕРІ
    trackStep: (stepNumber: number, stepName: string) => {
        analytics.track('step_view', { step: stepNumber, name: stepName });
    }
};



===== FILE: C:\git\apl\med\src\services\api.ts =====


import { City, Doctor, TimeSlot, DaySchedule, AppConfig, Branch } from '../types';
import { CategoryItem } from '../store/bookingStore';
import { getSessionId } from './session';

// Safe Environment Access
const metaEnv = (import.meta as any).env || {};
const IS_DEV = metaEnv.DEV;

// --- ENDPOINT RESOLUTION STRATEGY ---
const getApiEndpoint = () => {
    if (window.MED_WIDGET_CONFIG?.apiUrl) {
        return window.MED_WIDGET_CONFIG.apiUrl;
    }
    
    if (IS_DEV) {
        return 'http://localhost:8000/api.php';
    }
    
    return './php_backend/api.php';
};

const getRemoteConfigUrl = () => {
    return window.MED_WIDGET_CONFIG?.remoteConfigUrl || null;
};

const USE_REAL_API = !IS_DEV; 

// Mock Data
const MOCK_DOCTORS: Doctor[] = [];
const MOCK_STRUCTURE: CategoryItem[] = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface BookingPayload {
    doctor: Doctor;
    slot: TimeSlot;
    patient: {
        fullName: string;
        phone: string;
        birthDate: string;
        email?: string;
    };
    bookingUuid: string | null;
    recaptchaToken?: string; 
    databaseId?: string;
}

export interface WaitlistPayload {
    city: string;
    specialty: string;
    doctorId?: string;
    doctorName?: string;
    name: string;
    phone: string;
}

export interface SearchResult {
    type: 'specialty' | 'doctor' | 'ai_match';
    label: string;
    subLabel: string;
    payload: {
        specialty?: string;
        doctor_id?: string;
        link?: string;
    };
}

export const apiService = {
  
  getConfig: async (): Promise<AppConfig | null> => {
      // 1. Try Remote Config first (Centralized Design)
      const remoteUrl = getRemoteConfigUrl();
      if (remoteUrl) {
          try {
              const response = await fetch(remoteUrl);
              if (!response.ok) throw new Error(`Remote Config HTTP ${response.status}`);
              const json = await response.json();
              return json.data || json;
          } catch (e) {
              console.warn("Remote Config Failed, falling back to local:", e);
          }
      }

      // 2. Fallback to Local Config (Self-Hosted)
      if (USE_REAL_API) {
          try {
              const endpoint = getApiEndpoint();
              const response = await fetch(`${endpoint}?action=get_config`);
              if (!response.ok) throw new Error(`HTTP ${response.status}`);
              
              const json = await response.json();
              if (json.success && json.data) return json.data;
          } catch (e) { 
              console.error("API Config Error:", e); 
          }
      }
      return null;
  },

  getStructure: async (): Promise<CategoryItem[]> => {
      if (USE_REAL_API) {
          try {
              const endpoint = getApiEndpoint();
              const response = await fetch(`${endpoint}?action=get_structure`);
              const json = await response.json();
              return json.success ? json.data : [];
          } catch (e) { return []; }
      }
      return MOCK_STRUCTURE;
  },

  getBranches: async (city: City): Promise<Branch[]> => {
      if (USE_REAL_API) {
          try {
              const endpoint = getApiEndpoint();
              const response = await fetch(`${endpoint}?action=get_branches&city=${city}`);
              const json = await response.json();
              if (json.success && json.data) return json.data;
          } catch (e) { console.error(e); }
      }
      // If dev or fail, return empty list to trigger fallback UI, or fallback mock if strictly needed
      // But adhering to "No Hardcode", we rely on API.
      return [];
  },

  getDoctorsBySpecialty: async (city: City, specialty: string, dimensions: Record<string, string> = {}): Promise<Doctor[]> => {
    const sessionId = getSessionId();
    if (USE_REAL_API) {
      try {
        const endpoint = getApiEndpoint();
        let url = `${endpoint}?action=get_doctors&city=${city === City.CHEL ? 'chel' : 'spb'}&specialty=${encodeURIComponent(specialty)}&session_id=${sessionId}`;
        
        // Append dimensions
        Object.entries(dimensions).forEach(([key, val]) => {
            url += `&dimensions[${key}]=${encodeURIComponent(val)}`;
        });

        const response = await fetch(url);
        const json = await response.json();
        if (!json.success) throw new Error(json.error);
        return json.data;
      } catch (error) {
        throw error;
      }
    }
    await delay(600);
    return MOCK_DOCTORS;
  },

  getCalendar: async (doctor: Doctor): Promise<DaySchedule[]> => {
      if (USE_REAL_API) {
          try {
              const endpoint = getApiEndpoint();
              const url = `${endpoint}?action=get_calendar&db=${doctor.databaseId}&doc_id=${doctor.qmsId}&specialty=${encodeURIComponent(doctor.specialty)}&session_id=${getSessionId()}`;
              const response = await fetch(url);
              const json = await response.json();
              return json.slots || []; 
          } catch (e) { return []; }
      }
      return [];
  },

  getSlots: async (doctor: Doctor, date: string): Promise<TimeSlot[]> => {
      if (USE_REAL_API) {
          try {
              const endpoint = getApiEndpoint();
              const url = `${endpoint}?action=get_slots&db=${doctor.databaseId}&doc_id=${doctor.qmsId}&date=${date}&specialty=${encodeURIComponent(doctor.specialty)}&session_id=${getSessionId()}`;
              const response = await fetch(url);
              const json = await response.json();
              return json.slots || [];
          } catch (e) { return []; }
      }
      return [];
  },

  bookAppointment: async (payload: BookingPayload): Promise<any> => {
      if (USE_REAL_API) {
          const endpoint = getApiEndpoint();
          const response = await fetch(`${endpoint}?action=book&session_id=${getSessionId()}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          const json = await response.json();
          if (!json.success) throw new Error(json.error);
          return json;
      }
      return { success: true };
  },

  joinWaitlist: async (payload: WaitlistPayload): Promise<any> => {
      if (USE_REAL_API) {
          const endpoint = getApiEndpoint();
          const response = await fetch(`${endpoint}?action=join_waitlist`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          return response.json();
      }
      return { success: true };
  },

  // Standard Text Search (Replaces Smart Search)
  search: async (query: string, city: City): Promise<SearchResult[]> => {
      if (USE_REAL_API) {
          try {
              const endpoint = getApiEndpoint();
              const response = await fetch(`${endpoint}?action=smart_search`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query, city, session_id: getSessionId() })
              });
              const json = await response.json();
              return json.results || [];
          } catch (e) {
              console.error("Search Error:", e);
              return [];
          }
      }
      // Mock for development
      await delay(300);
      return [];
  },

  // --- ADMIN METHODS ---
  verifyAdminKey: async (key: string): Promise<boolean> => {
      if (!USE_REAL_API) return key === '123';
      try {
          const endpoint = getApiEndpoint();
          const response = await fetch(`${endpoint}?action=admin_check_auth`, {
              headers: { 'X-Admin-Key': key }
          });
          const json = await response.json();
          return json.success;
      } catch (e) { return false; }
  }
};



===== FILE: C:\git\apl\med\src\services\session.ts =====


export const getSessionId = (): string => {
  const STORAGE_KEY = 'med_widget_session_id';
  let sessionId = localStorage.getItem(STORAGE_KEY);
  
  if (!sessionId) {
    // Generate a random ID that mimics a chat ID (numeric or string)
    // qMS API seems to expect an integer in some logs, but usually string is safer.
    // Based on logs: "chatid": 206156880. Let's generate a random 9-digit number.
    sessionId = Math.floor(100000000 + Math.random() * 900000000).toString();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  
  return sessionId;
};



===== FILE: C:\git\apl\med\src\store\bookingStore.ts =====


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BookingState, City, Doctor, DoctorOffering, TimeSlot, Branch, TopologyConfig, AppConfig, DimensionConfig } from '../types';
import { currentTheme, applyDynamicTheme } from '../config/theme';
import { validateConfig } from '../config/schema'; 
import { apiService } from '../services/api';

export interface SpecialtyItem {
    id: string; 
    label: string;
    parent_label?: string;
}

export interface CategoryItem {
    id: string; 
    label: string;
    slug?: string; 
    view_config: {
        icon: string; 
        color_scheme: string;
    };
    specialties: SpecialtyItem[];
}

// Internal IDs for steps (Logic)
export const STEPS = {
    HOME: 0,
    DIMENSIONS: 1, 
    BRANCHES: 2,   
    DOCTORS: 3,
    SLOTS: 4,
    FORM: 5,
    SUCCESS: 6
};

interface BookingActions {
  loadConfig: () => Promise<void>;
  initialize: (props: { city?: City; specialty?: string; doctorId?: string; branchId?: string; dimensions?: Record<string, string> }) => Promise<void>;
  setServiceTree: (tree: CategoryItem[]) => void;
  
  nextStep: () => void;
  prevStep: () => void;
  
  setCity: (city: City) => void;
  setDimension: (key: string, value: string) => void;
  setCategory: (categoryId: string) => void; 
  setBranch: (branch: Branch) => void; 
  setSearchQuery: (query: string) => void;
  
  selectDoctor: (doctor: Doctor) => void;
  selectOffering: (offering: DoctorOffering) => void; 
  selectSlot: (slot: TimeSlot) => void;
  
  updatePatientData: (field: keyof BookingState['patientData'], value: string) => void;
  generateBookingUuid: () => void;
  reset: () => void;
  
  // New Helper
  getStepsFlow: () => number[];
}

interface ExtendedBookingState extends BookingState {
    serviceTree: CategoryItem[]; 
    bookingUuid: string | null;
}

const initialState: ExtendedBookingState = {
  configLoaded: false,
  topology: null,
  compliance: null, 
  behavior: null, 
  step: STEPS.HOME,
  city: currentTheme.defaultCity,
  activeDimensions: {},
  category: null,
  patientType: null, 
  searchQuery: '',
  selectedBranch: null,
  selectedDoctor: null,
  selectedOffering: null, 
  selectedSlot: null,
  patientData: { firstName: '', lastName: '', middleName: '', phone: '', birthDate: '', email: '' },
  serviceTree: [],
  bookingUuid: null
};

export const useBookingStore = create<ExtendedBookingState & BookingActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadConfig: async () => {
          try {
              const rawConfig = await apiService.getConfig();
              if (rawConfig) {
                  const validConfig = validateConfig(rawConfig);
                  if (validConfig) {
                      applyDynamicTheme(validConfig as any);
                      set({ 
                          configLoaded: true,
                          topology: validConfig.topology,
                          compliance: validConfig.compliance,
                          behavior: validConfig.behavior
                      });
                  } else {
                      set({ configLoaded: true }); 
                  }
              } else {
                  set({ configLoaded: true });
              }
          } catch (e) {
              console.error("Config fetch error", e);
              set({ configLoaded: true });
          }
      },

      initialize: async ({ city, specialty, doctorId, branchId, dimensions }) => {
        const updates: Partial<ExtendedBookingState> = {};
        if (city) updates.city = city;
        if (dimensions) {
            updates.activeDimensions = { ...get().activeDimensions, ...dimensions };
        }
        if (doctorId) {
            updates.searchQuery = doctorId; 
            updates.step = STEPS.DOCTORS; 
        } else if (specialty) {
            updates.searchQuery = specialty;
            updates.step = STEPS.DOCTORS;
        } else if (branchId) {
            updates.selectedBranch = { id: branchId, name: 'Р’С‹Р±СЂР°РЅРЅС‹Р№ С„РёР»РёР°Р»', city: city || City.CHEL, address: '', databaseId: '' };
        }
        set((state) => ({ ...state, ...updates }));
      },

      // --- DYNAMIC FLOW CALCULATOR ---
      getStepsFlow: () => {
          const state = get();
          const flow = [STEPS.HOME];

          // 1. Dimensions Step
          // Only add if there are enabled dimensions AND they are in 'tabs'/'strict' mode
          const hasDimensions = state.topology?.dimensions && Object.values(state.topology.dimensions).some((d: any) => d.enabled && (d.mode === 'tabs' || d.mode === 'strict_separation'));
          
          let skipDimensions = false;
          // Heuristic: If we are in a specific category (like Pediatrics), we might skip the general dimension step
          // But based on your request, we rely purely on config.
          // If config says enabled=false, it won't be in 'hasDimensions'.
          
          if (hasDimensions && !skipDimensions) {
              flow.push(STEPS.DIMENSIONS);
          }

          // 2. Branches Step
          const hasBranches = state.topology?.branches?.logic === 'strict_selection';
          if (hasBranches) {
              flow.push(STEPS.BRANCHES);
          }

          // 3. Standard Steps
          flow.push(STEPS.DOCTORS);
          flow.push(STEPS.SLOTS);
          flow.push(STEPS.FORM);
          
          return flow;
      },

      setServiceTree: (tree) => set({ serviceTree: tree }),
      
      nextStep: () => {
          const flow = get().getStepsFlow();
          const currentIndex = flow.indexOf(get().step);
          if (currentIndex < flow.length - 1) {
              set({ step: flow[currentIndex + 1] });
          } else {
              // Fallback if we are somehow off-grid
              set((state) => ({ step: state.step + 1 }));
          }
      },

      prevStep: () => {
          const flow = get().getStepsFlow();
          const currentIndex = flow.indexOf(get().step);
          if (currentIndex > 0) {
              set({ step: flow[currentIndex - 1] });
          } else {
              set({ step: STEPS.HOME });
          }
      },

      setCity: (city) => set({ city }), 
      
      setDimension: (key, value) => set((state) => ({
          activeDimensions: { ...state.activeDimensions, [key]: value }
      })),

      setCategory: (categoryId) => {
         const state = get();
         const catItem = state.serviceTree.find(c => c.id === categoryId);
         const newDims = { ...state.activeDimensions };
         
         // Auto-tagging logic based on category slug
         if (catItem) {
             const slug = catItem.slug || '';
             // If category implies "child", set it
             if (slug.includes('det') || slug.includes('pediatr')) newDims['audience'] = 'child';
             else if (slug.includes('vzrosl')) newDims['audience'] = 'adult';
             
             if (slug.includes('cosmet')) newDims['vertical'] = 'cosmetology';
             else if (slug.includes('vrt')) newDims['vertical'] = 'ivf';
         }

         set({ category: categoryId, searchQuery: '', activeDimensions: newDims });
         get().nextStep();
      },

      setBranch: (branch) => {
          set({ selectedBranch: branch });
          get().nextStep();
      },

      setSearchQuery: (searchQuery) => {
          set({ searchQuery });
      },

      selectDoctor: (selectedDoctor) => {
        let offering = null;
        if (selectedDoctor.offerings && selectedDoctor.offerings.length === 1) {
            offering = selectedDoctor.offerings[0];
        }
        set({ selectedDoctor, selectedOffering: offering, step: STEPS.SLOTS });
      },

      selectOffering: (offering) => {
          set({ selectedOffering: offering });
      },

      selectSlot: (selectedSlot) => {
        set({ selectedSlot });
        get().generateBookingUuid();
        set({ step: STEPS.FORM }); 
      },

      updatePatientData: (field, value) => set((state) => ({
        patientData: { ...state.patientData, [field]: value }
      })),
      
      generateBookingUuid: () => {
          const uuid = Math.random().toString(36).substring(2) + Date.now().toString(36);
          set({ bookingUuid: uuid });
      },

      reset: () => set((state) => ({
          ...initialState,
          configLoaded: state.configLoaded,
          topology: state.topology,
          compliance: state.compliance,
          behavior: state.behavior,
          serviceTree: state.serviceTree
      }))
    }),
    {
      name: 'medical-booking-storage', 
      partialize: (state) => ({ 
        city: state.city,
        patientData: state.patientData,
        activeDimensions: state.activeDimensions
      }), 
    }
  )
);



===== FILE: C:\git\apl\med\src\types.ts =====



export enum City {
  SPB = 'spb',
  CHEL = 'chel',
}

export type PatientType = 'adult' | 'child';
export type TextDictionary = Record<string, string>;

// --- RUNTIME INJECTION (New) ---
// РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ, РєРѕС‚РѕСЂСѓСЋ CMS РјРѕР¶РµС‚ РїРµСЂРµРґР°С‚СЊ РІРёРґР¶РµС‚Сѓ "СЃРЅР°СЂСѓР¶Рё"
export interface RuntimeConfig {
    apiUrl?: string;      // Р•СЃР»Рё API Р»РµР¶РёС‚ РЅР° РґСЂСѓРіРѕРј РґРѕРјРµРЅРµ
    remoteConfigUrl?: string; // URL РґР»СЏ Р·Р°РіСЂСѓР·РєРё JSON-РєРѕРЅС„РёРіР° (SaaS Design)
    tenantId?: string;    // Р•СЃР»Рё РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј SaaS РјРѕРґРµР»СЊ
    city?: City;          // РџСЂРёРЅСѓРґРёС‚РµР»СЊРЅС‹Р№ РіРѕСЂРѕРґ
    theme?: {             // РџРµСЂРµРѕРїСЂРµРґРµР»РµРЅРёРµ С†РІРµС‚РѕРІ С‚РµРјРѕР№ СЃР°Р№С‚Р°
        primary?: string;
    };
}

declare global {
    interface Window {
        MED_WIDGET_CONFIG?: RuntimeConfig;
        grecaptcha: any;
        ym?: (id: number, method: string, ...args: any[]) => void;
        dataLayer?: any[];
    }
}

// --- COMPLIANCE TYPES ---

export interface ComplianceConfig {
    data_minimization: {
        exclude_fields: string[]; // e.g. ['patronymic', 'email']
    };
    age_gate: {
        enabled: boolean;
        threshold?: number; // e.g. 18
        error_message?: string;
    };
    consent: {
        required: boolean;
        version: string; // "v2-2025"
        url: string; // Link to policy
        label?: string; // Custom label
    };
    audit?: {
        enabled: boolean;
        level: string;
    };
}

// --- CONFIGURATION TYPES ---

export interface DimensionRules {
    include_branches?: string[];
    include_instances?: string[];
    exclude_branches?: string[];
}

export interface DimensionOption {
    id: string; 
    label: string;
    icon?: string;
    color?: string;
    isDefault?: boolean;
    rules?: DimensionRules;
}

export interface DimensionConfig {
    enabled: boolean;
    key: string; 
    label: string;
    mode: 'tabs' | 'filter' | 'strict_separation';
    options: DimensionOption[];
}

export interface TopologyConfig {
    cities: {
        enabled: boolean;
        items: Record<string, { label: string; default: boolean }>;
    };
    dimensions: Record<string, DimensionConfig>;
    branches: {
        enabled: boolean;
        logic: 'strict_selection' | 'dynamic_aggregation' | 'hidden';
        cross_branch_suggestion?: boolean;
    };
}

export interface FlowConfig {
    entry_points: {
        doctor_direct: boolean;
        specialty_list: boolean;
        service_search: boolean;
    };
    auth_strategy?: 'guest_first' | 'auth_first';
    waitlist: {
        enabled: boolean;
        trigger: 'no_slots_available' | 'always' | 'manual_only';
    };
}

export interface AppConfig {
    theme: any; 
    topology: TopologyConfig; 
    behavior: FlowConfig; 
    compliance?: ComplianceConfig; 
    hydrator: any; 
    recaptcha?: any;
    features?: any;
}

export interface ClinicTheme extends AppConfig {
  borderRadius: string; 
  defaultCity: City;
  labels: Record<string, string>; 
  features: any;
  doctor_card?: {
      show_experience?: boolean;
      show_badges?: boolean;
  };
  client?: {
      name: string;
  };
}

// --- DOMAIN ENTITIES ---

export interface Branch {
  id: string;
  name: string;
  city: City;
  address: string;
  databaseId: string; 
  metro?: string;
  district?: string;
}

export interface DoctorBadge {
    type: 'degree' | 'category' | 'experience' | 'rating' | 'award';
    label: string;
    code: string;
}

export interface DoctorContent {
    anonce?: string;
    full_position?: string;
    activities_html?: string;
    education_html?: string;
    video_url?: string;
}

export interface DoctorOffering {
    id: string; 
    branch: Branch;
    price: number;
    price_formatted: string;
    databaseId: string;
    is_primary: boolean; 
    type?: 'offline' | 'online';
}

export interface Doctor {
  id: string; 
  qmsId: string; 
  name: string;
  specialty: string; 
  photoUrl?: string; 
  position?: string;
  experienceYears?: number; 
  badges?: DoctorBadge[];
  extended_data?: DoctorContent;
  
  tags?: Record<string, string[]>; 
  root_categories?: string[]; 
  
  rating?: number;
  offerings: DoctorOffering[];
  
  /** @deprecated Legacy */
  price?: number;
  /** @deprecated Legacy */
  branchName?: string; 
  /** @deprecated Legacy */
  address?: string;    
  /** @deprecated Legacy */
  databaseId?: string;
}

export interface TimeSlot {
  id: string;
  time: string; 
  date: string; 
  isAvailable: boolean;
  offeringId?: string; 
  branchName?: string; 
  address?: string; 
  time2appoint?: string; 
  price?: number; 
}

export interface DaySchedule {
    date: string;      
    dateLabel: string; 
    count: number;     
    shifts: string;    
}

export interface PatientData {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  birthDate: string;
  email: string;
}

export interface BookingState {
  configLoaded: boolean;
  
  // Configuration from Backend
  topology: TopologyConfig | null; 
  compliance: ComplianceConfig | null;
  behavior: FlowConfig | null;
  
  step: number; 
  city: City;
  activeDimensions: Record<string, string>; 
  category: string | null; 
  patientType: PatientType | null; 
  searchQuery: string;
  selectedBranch: Branch | null; 
  selectedDoctor: Doctor | null;
  selectedOffering: DoctorOffering | null; 
  selectedSlot: TimeSlot | null;
  patientData: PatientData;
  bookingUuid: string | null;
}

export interface WidgetProps {
  initialCity?: City;
  initialBranchId?: string;
  initialDimension?: Record<string, string>;
  preselectedDoctorId?: string; 
  preselectedSpecialty?: string; 
  preselectedServiceId?: string; 
  autoOpen?: boolean;
  apiUrl?: string; 
}


===== FILE: C:\git\apl\med\src\utils\uiHelpers.tsx =====


import React from 'react';
import { Baby, Sparkles, Smile, Activity, Stethoscope, User, Heart, Brain, Bone, Eye } from 'lucide-react';

export const getCategoryIcon = (iconName: string, className: string = "w-6 h-6") => {
    const map: Record<string, React.ElementType> = {
        'Baby': Baby,
        'Sparkles': Sparkles,
        'Smile': Smile,
        'Activity': Activity,
        'Stethoscope': Stethoscope,
        'Heart': Heart,
        'Brain': Brain,
        'Bone': Bone,
        'Eye': Eye,
        'User': User
    };

    const Icon = map[iconName] || User;
    return <Icon className={className} />;
};

export const getCategoryGradient = (scheme: string): string => {
    // Р’ РёРґРµР°Р»СЊРЅРѕРј РјРёСЂРµ SSOT СЌС‚Рё С†РІРµС‚Р° РґРѕР»Р¶РЅС‹ РїСЂРёС…РѕРґРёС‚СЊ РєР°Рє hex РёР· API
    // РќРѕ РґР»СЏ РјР°РїРїРёРЅРіР° "РЅР°Р·РІР°РЅРёСЏ СЃС…РµРјС‹" РЅР° РєР»Р°СЃСЃС‹ Tailwind РёСЃРїРѕР»СЊР·СѓРµРј СЌС‚РѕС‚ СЃРІРёС‚С‡.
    // Р’Р°Р¶РЅРѕ: РјС‹ РёСЃРїРѕР»СЊР·СѓРµРј СЃРµРјР°РЅС‚РёС‡РµСЃРєРёРµ РѕС‚С‚РµРЅРєРё РёР»Рё РјРёРєСЃСѓРµРј СЃ primary.
    
    switch(scheme) {
        case 'green': return 'from-emerald-500 to-green-600 shadow-emerald-500/20'; 
        case 'orange': return 'from-amber-500 to-orange-600 shadow-orange-500/20'; 
        case 'purple': return 'from-violet-500 to-purple-600 shadow-purple-500/20';
        case 'teal': return 'from-teal-500 to-emerald-500 shadow-teal-500/20';
        // Default fallbacks to Brand Primary
        default: return 'from-primary to-blue-600 shadow-primary/20';
    }
};



===== FILE: C:\git\apl\med\tailwind.config.js =====


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--surface-fg) / <alpha-value>)", // РћСЃРЅРѕРІРЅРѕР№ С‚РµРєСЃС‚
        
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-fg) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-fg) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-fg) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-fg) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted-light) / <alpha-value>)", // Р”Р»СЏ С„РѕРЅРѕРІ (bg-muted)
          foreground: "hsl(var(--muted) / <alpha-value>)",     // Р”Р»СЏ С‚РµРєСЃС‚Р° (text-muted-foreground)
        },
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          foreground: "hsl(var(--surface-fg) / <alpha-value>)",
        }
      },
      boxShadow: {
        'soft': '0 20px 60px -15px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px -5px hsl(var(--primary) / 0.4)',
      }
    },
  },
  plugins: [],
}



===== FILE: C:\git\apl\med\tsconfig.json =====

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["**/*.ts", "**/*.tsx"]
}


===== FILE: C:\git\apl\med\types.ts =====


export enum City {
  SPB = 'Saint-Petersburg',
  CHEL = 'Chelyabinsk',
}

export type PatientType = 'adult' | 'child';
export type ServiceCategory = 'consultation' | 'diagnostics' | 'cosmetology' | 'stomatology';

export interface Branch {
  id: string;
  name: string;
  city: City;
  address: string;
  databaseId: string; 
}

export interface Doctor {
  id: string; // Internal ID from qMS
  qmsId: string; // Explicit qMS ID for mapping
  name: string;
  specialty: string;
  photoUrl?: string; // Hydrated from CMS
  profileUrl?: string; // Hydrated from CMS
  branchId: string;
  databaseId: string;
  experienceYears: number;
  rating: number;
  address: string;
  price?: number;
  isPediatrician?: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  date: string;
  isAvailable: boolean;
}

export interface PatientData {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  birthDate: string;
  email: string;
}

// Props for the main widget component to support Deep Linking
export interface WidgetProps {
  initialCity?: City;
  preselectedDoctorId?: string; // For Scenario B
  preselectedServiceId?: string; // For Scenario C
  preselectedSpecialty?: string; // For Scenario D
}

export interface BookingDraft {
  step: number; 
  city: City;
  category: ServiceCategory | null;
  patientType: PatientType | null;
  searchQuery: string;
  selectedBranch: Branch | null;
  selectedDoctor: Doctor | null;
  selectedSlot: TimeSlot | null;
  patientData: PatientData;
}



===== FILE: C:\git\apl\med\untitled.tsx =====




===== FILE: C:\git\apl\med\vite.config.ts =====

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Р’РђР–РќРћ: './' РґРµР»Р°РµС‚ РїСѓС‚Рё РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅС‹РјРё (src="assets/...")
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        // РЈР±РёСЂР°РµРј С…РµС€Рё РёР· РёРјРµРЅ С„Р°Р№Р»РѕРІ, С‡С‚РѕР±С‹ РІ PHP РїРѕРґРєР»СЋС‡Р°С‚СЊ РёС… РєР°Рє 'index.js' Рё 'index.css'
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        
        manualChunks: {
          'vendor': ['react', 'react-dom', 'zustand', 'lucide-react', 'zod', 'react-hook-form'],
          'sentry': ['@sentry/react']
        }
      }
    }
  },
  server: {
    // РџСЂРѕРєСЃРёСЂРѕРІР°РЅРёРµ: Р·Р°РїСЂРѕСЃС‹ РѕС‚ React (РїРѕСЂС‚ 5173) Рє /php_backend Р±СѓРґСѓС‚ СѓР»РµС‚Р°С‚СЊ РЅР° PHP (РїРѕСЂС‚ 8000)
    proxy: {
      '/php_backend': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/php_backend/, '')
      }
    }
  }
});


