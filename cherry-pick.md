
cd /media/share/NotturnaApp/notturnapwa
git remote add notturna4 /media/share/NotturnaApp/notturna4
git fetch notturna4

git log notturna4/main -1

git cherry-pick <commit>

Se ci sono conflitti, Git si ferma e li segnala nei file interessati. Risolvili manualmente, poi:

git add <file-risolti>
git cherry-pick --continue

git cherry-pick --abort

git remote remove notturna4

