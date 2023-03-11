cd frontend
rm -rf frontend/build
npm run build

cd ..
rm -rf backend/src/main/resources/static/
mkdir backend/src/main/resources/static
cp -r frontend/build/* backend/src/main/resources/static/

cd backend
./gradlew build
