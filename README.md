GATEWAY : 
/ms1 
/ms2
/ms3
/ms1/hello-2 => call MS2 internally
/ms1/hello-3 => call MS3 internally
/ms2/hello-1 => call MS1 internally
/ms2/hello-3 => call MS3 internally
/ms3/hello-1 => call MS1 internally
/ms3/hello-2 => call MS2 internally
/ms1/hello-2-3 => Call MS2 then MS3 internally

env
APP_NAME=gateway
APP_PROTOCOL=http
APP_HOST=localhost
APP_PORT=6200

REPORT = report

MS_1=http://127.0.0.1:6201
MS_2=http://127.0.0.1:6202
MS_3=http://127.0.0.1:6203
