#!/usr/bin/env nodejs

const https = require('https');
const fs = require('fs');

var projectcache = [];

function fetchPage(page, cb){
    https.get({
        host: 'api.github.com',
        path: '/orgs/CDCgov/repos?type=public&sort=updated&direction=desc&page=' + page,
        headers: {'User-Agent': 'request'}
    }, function(res){
        let json = '';

        res.on('data', function(chunk){ json += chunk });
        res.on('end', function(){
            if (res.statusCode === 200) {
                try {
                    var projects = JSON.parse(json);
                    var n = projects.length;
                    for (var i = 0; i < n; i++) {
                        var project = projects[i];
                        var match = projectcache.findIndex(function (p) {
                            return p.id === project.id;
                        });
                        if (match > -1) {
                            if (projectcache[match].updated_at === project.updated_at) continue;
                            projectcache[match] = project;
                        } else {
                            projectcache.splice(i, 0, project);
                        }
                    }
                    if (projects.length === 30){
                        fetchPage(page + 1, cb);
                    } else {
                        return cb();
                    }
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
    });
}

fetchPage(1, function(){
    projectcache.sort((a, b) => {
        return a['updated_at'] < b['updated_at'] ? 1 : -1;
    });
    fs.writeFile('projects.json', JSON.stringify(projectcache), function(){
      console.log('Cache file (projects.json) has been updated!\nDon\'t forget to commit it!');
    });
});
