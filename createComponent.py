import os
oldpath = 'components'
while 1:
    path = input("path")
    name = input("name")
    if (path == ''):
        path = oldpath
    path = 'src/'+path+'/'+name
    os.system('mkdir '+path)
    #os.system('pushd '+path)
    os.system('touch '+path+'/'+name+'.jsx')
    os.system('touch '+path+'/'+name+'.module.css')

    os.system('touch '+path+'/index.js')
    os.system('echo "export {default} from '+"'./"+name+"'"+'"> '+path+'/index.js')
    forfile = '''

import styles from "./%s.module.css";
import {useState,useEffect} from "react";

import React from "react";
//import { useDispatch, useSelector } from "react-redux";

export default function %s() {
    return <>
        <div className={styles.parent}>
        </div>
    </>;
}

    '''%(name,name)
    os.system("echo '%s' > %s"%(forfile,"%s/%s.jsx"%(path,name)))

