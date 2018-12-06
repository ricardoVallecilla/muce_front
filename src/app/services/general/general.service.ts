import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
//import { Cookie } from 'ng2-cookies'; 
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UrlServices } from '../urls'
import * as CryptoJS from 'crypto-js';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class GeneralService {
    @BlockUI() blockUI: NgBlockUI;
    url = new UrlServices();
    strSesion = "sesion";
    key = "HackersSeeIT2";
    constructor(private _http: Http, private _router: Router) { }

    autenticarMuse(username = null, password = null) {
        let params = new URLSearchParams();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa("uce.edu.ec.muce.seguridad:uce.edu.ec.muce.seguridad"))
        let options = new RequestOptions({ headers: headers });
        
        this._http.post(this.url.login + '&username=' + username + '&password=' + password, params.toString(), options)
            .map(res => res.json())
            .subscribe(
                token => {
                    let headersToken = new Headers();
                    console.log(token.access_token);
                    
                    headersToken.append('Authorization', 'Bearer ' + token.access_token)
                    let optionsToken = new RequestOptions({ headers: headersToken });
                    this._http.get(this.url.token, optionsToken)
                        .map(res => res.json())
                        .subscribe(
                            usuario => {


                                

                                this._http.get( this.url.rolUsuario + 'rol/' + usuario.principal.id, optionsToken)
                                    .map(res => res.json())
                                    .subscribe(
                                        roles => {
                                                
                                                
                                            usuario.principal.roles=roles
                                            let usuarioLocalStorage = { "token": token, "usuario": usuario.principal }
                                            localStorage.setItem("username", usuario.principal.username);

                                            var encrypted = CryptoJS.AES.encrypt(JSON.stringify(usuarioLocalStorage), this.key);
                                            // console.log(encrypted.toString());
                                            // var decrypted = CryptoJS.AES.decrypt(encrypted, key);
                                            // console.log(decrypted.toString(CryptoJS.enc.Utf8));
                                            let sesion = encrypted.toString()
                                            localStorage.setItem(this.strSesion, sesion);

                                            window.open("/", "_self")




                                        },
                                        err => {
                                            //console.log("error",err.status)
                                            if (err.status == 401) {
                                                this.stopBlock()
                                                this._router.navigate(['/authentication/login/error']);
                                            }
                                        }
                                    );

                                




                            },
                            err => {
                                //console.log("error",err.status)
                                if (err.status == 401) {
                                    this.stopBlock()
                                    this._router.navigate(['/authentication/login/error']);
                                }
                            }
                        );
                },
                err => {
                    this.stopBlock()
                    if (err.status == 401) {
                        this._router.navigate(['/authentication/login/error']);
                    }
                }
            );
    }

    autenticar(username, password) {
        let credenciales = {
            usuario: username,
            password: password

        }
        this._http.post(this.url.loginActive, credenciales)
            //.map(res => res.json())
            .subscribe(


                res => {
                    let codigo = res["_body"]
                    
                    if (codigo == "0000002" || codigo == "0000003")
                        this.autenticarMuse(username, password)
                    else
                        this._router.navigate(['/authentication/login/error']);

                },
                err => {
                    this.stopBlock()
                    if (err.status == 401 || err.status == 400) {
                        this._router.navigate(['/authentication/login/error']);
                    }
                }
            );
    }

    autenticarRegistro() {
        let username = 'registro'
        let password = 'password'
        let params = new URLSearchParams();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa("acme:acmesecret"))
        let options = new RequestOptions({ headers: headers });
        console.log(params.toString());
        this._http.post(this.url.login + '&username=' + username + '&password=' + password, params.toString(), options)
            .map(res => res.json())
            .subscribe(
                token => {
                    let headersToken = new Headers();
                    headersToken.append('Authorization', 'Bearer ' + token.access_token)
                    let optionsToken = new RequestOptions({ headers: headersToken });
                    this._http.get(this.url.token, optionsToken)
                        .map(res => res.json())
                        .subscribe(
                            usuario => {
                                let usuarioLocalStorage = { "token": token, "usuario": usuario.principal }
                                //console.log(usuarioLocalStorage);                                     
                                var encrypted = CryptoJS.AES.encrypt(JSON.stringify(usuarioLocalStorage), this.key);
                                // console.log(encrypted.toString());
                                // var decrypted = CryptoJS.AES.decrypt(encrypted, key);
                                // console.log(decrypted.toString(CryptoJS.enc.Utf8));
                                let sesion = encrypted.toString()
                                localStorage.setItem(this.strSesion, sesion);



                            },
                            err => { this._router.navigate(['/authentication/login/131231sd1123']); }
                        );
                },
                err => { this._router.navigate(['/authentication/login/131231sd1123']); }
            );
    }

    checkCredentials() {
        if (localStorage.getItem(this.strSesion) == null) {
            this._router.navigate(['/authentication/login']);
        }
    }
    getCredentials() {
        if (localStorage.getItem(this.strSesion) == null) {
            this._router.navigate(['/authentication/login']);
        } else {
            var decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.strSesion), this.key);
            let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
            return persona.usuario.roles
        }
    }



    getPersonaId() {
        if (localStorage.getItem(this.strSesion) == null) {
            this._router.navigate(['/authentication/login']);
        } else {
            var decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.strSesion), this.key);
            let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
            return persona.usuario.personaId
        }
    }

    logout() {
        localStorage.removeItem(this.strSesion);
        localStorage.removeItem("nombres");
        this._router.navigate(['/authentication/login']);
    }


    getResources(tipo, url, body = null): Observable<any> {
        this.blockUI.start('Loading...');
        let result;
        if (localStorage.getItem(this.strSesion) != null) {
            let headersToken = new Headers();
            var decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.strSesion), this.key);
            let token = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
            headersToken.append('Authorization', 'Bearer ' + token.token.access_token)
            let optionsToken = new RequestOptions({ headers: headersToken });
            if (tipo == "get") {
                return this._http["get"](url, optionsToken)
                    .map((res: Response) => {
                        this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo == "post") {
                
                if(Array.isArray(body)){
                    body.forEach(element => {
                        if(typeof element == 'object'){
                            element["usuarioregistroid"]=localStorage.getItem("username")
                            element["fecharegistro"]=new Date()
                            
                        }
                    });

                }else if(typeof body == 'object'){
                    body["usuarioregistroid"]=localStorage.getItem("username")
                    body["fecharegistro"]=new Date()
                    
                }
                
                
                return this._http["post"](url, body, optionsToken)
                    .map((res: Response) => {
                        this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo == "getFile") {
                optionsToken = new RequestOptions({ headers: headersToken, responseType: ResponseContentType.Blob });
                return this._http["get"](url, optionsToken)
                    .map((res: Response) => {
                        this.blockUI.stop();
                        return res;
                    }).catch(this.handleError());
            } else if (tipo == "postFile") {
                optionsToken = new RequestOptions({ headers: headersToken, responseType: ResponseContentType.Blob });
                return this._http["post"](url, body, optionsToken)
                    .map((res: Response) => {
                        this.blockUI.stop();
                        return res;
                    }).catch(this.handleError());
            } else if (tipo == "delete") {
                return this._http["delete"](url, optionsToken)
                    .map((res: Response) => {
                        this.blockUI.stop();
                        //result = res.json();
                        return result;
                    }).catch(this.handleError());
            }

        }
        return null;
    }

    stopBlock() {
        this.blockUI.stop();
    }
    private handleError() {
        return (res: Response) => {
            this.blockUI.stop();
            let errMessage: any;
            try {
                console.log(res);
                if (res.status == 412) {
                    errMessage = { 'status': res.status, 'message': res.text() };
                } else if (res.status == 401) {
                    this._router.navigate(['/authentication/login']);
                }
                else {
                    errMessage = res.json();
                }

            } catch (err) {
                errMessage = res.statusText;
            }
            // Security errors
            // this.utilService.stopProcess();
            return Observable.throw(errMessage);
        };
    }

}