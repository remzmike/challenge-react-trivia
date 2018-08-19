set PORT=3001 && node bin/www

# this will let `debugger` statements work, otherwise they are passed
set PORT=3001 && node inspect bin/www

# this will let you connect with chrome debugger (apparently)
set PORT=3001 && node --inspect bin/www
(((??? untested))) whoah it works...?