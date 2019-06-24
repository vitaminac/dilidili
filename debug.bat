START npm start --prefix frontend

CALL .\enviroment\Scripts\activate.bat
cd backend
CALL pip install -r .\requirements.txt
SET FLASK_APP=main:app
SET FLASK_DEBUG=1
CALL flask init-db
CALL flask run