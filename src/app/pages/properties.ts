



export class Properties{
    key = "HackersSeeIT2";
    labelLista:string="Lista de "
    labelNuevo="Nuevo"
    labelActualizar="Actualizar"
    labelSeleccione="SELECCIONE"
    iconEditar = "fa-edit"; //Se debe eliminar
    iconDependencias = "fa-eye"; //Se debe eliminar
    iconAdvertencia = "fa fa-exclamation-triangle"
    titutloPreguntaConfirmacion = "Pregunta de Confirmación";
    sinDatos="Registros no encontrados."
    nuevo={icon:"fa-plus-circle",label:"Nuevo"}
    guardar={icon:"fa-floppy-o",label:"Guardar"}
    validar={icon:"fa-check",label:"Validar"}
    cancelar={icon:"fa-times",label:"Cancelar"}
    atras={icon:"fa-times",label:"Atrás"}
    buscar ={icon:"fa-search-plus", label:"Buscar"};
    imprimir ={icon:"fa-print", label:"Imprimir"};
    es = {
        firstDayOfWeek: 1,
        dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
        dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
        dayNamesMin: [ "D","L","M","X","J","V","S" ],
        monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
        monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
        today: 'Hoy',
        clear: 'Borrar'
    }
    formatoFecha = "dd/MM/yyyy";

    cantidadRegistros=10

    cabezeraReporte(tituloReporte,codigo,codigoBienes,tipo=0){
      //tipo 0 es para inventario
      let tituloCabezera1="CÓDIGO"
      let tituloCabezera2="CÓDIGO CONTROL BIENES"
      if(tipo==1){
         tituloCabezera1="ACTA NÚMERO"
         tituloCabezera2="FECHA"
      }
        let stringHtml=`<div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid margin">

        <div class="ui-grid-row">
          <div class="ui-grid-col-10">
            <div class="ui-g">
              <div class="ui-g-3">
                <img src="assets/images/uce_logo_clasic.png" style="width: 40%" alt="">
              </div>
              <div class="ui-g-6" style="font-weight: bold;padding-top:3%">
                <h3>UNIVERSIDAD CENTRAL DEL ECUADOR</h3>
                <h3>DIRECCIÓN MUSEO UNIVERSITARIO</h3>
                <h3>ÁREA DE INVENTARIO Y CATALOGACIÓN</h3>
              </div>
              <div class="ui-g-3">
                <img src="assets/images/muce_logo2.png" style="width: 50%" alt="">
              </div>

            </div>


          </div>
          <div class="ui-grid-col-2" style="padding: 0">
            <div class="ui-g" style="width: 100%">
              <div class="ui-g-12" style="background: #8db4e2; color: #8db4e2;border-bottom: 1px solid;
              ">
                _
              </div>
              <div class="ui-g-12" style="border-bottom: 1px solid">
               ${tituloCabezera1} 
              </div>
              <div class="ui-g-12" style="border-bottom: 1px solid">
              ${codigo}
              </div>
              <div class="ui-g-12" style="border-bottom: 1px solid">
                ${tituloCabezera2}                  
              </div>
              <div class="ui-g-12" style="border-bottom: 1px solid">
              ${codigoBienes}
              </div>

            </div>

          </div>
        </div>
      </div>
      <div class="separadorInventario" style="text-align: center;border-bottom: 2px solid">
        <h5>${tituloReporte}</h5>
        

      </div>`

      return stringHtml
    }
}