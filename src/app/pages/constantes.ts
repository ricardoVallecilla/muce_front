export class Constantes{

    tipoIngreso=9
    tipoIngresoPrestamo=13;
    grupo=16
    grupoCultural=19
    grupoTecnologico=18
    grupoAdminsitrativo=17
    grupoCulturalPadre=22
    grupoTecnologicoPadre=21
    grupoAdminsitrativoPadre=20
    arqueologia=25;
    botanica=26;
    entomologia=27;
    fotografia=28;
    geologia=29;
    instrumental=30
    peleontologia=31
    zoologia=32
    isntrumentalEstadoBien=58;
    arqueologiaEstadoBien = 322;
    botanicaEstadoBien=351;
    entomologiaEstadoBien=364;
    fotografiaEstadoBien=373;
    geologiaEstadoBien=401;
    paleontologiaEstadoBien=415;
    zoologiaEstadoBien=429;
    estadoConservacion=87;
    integridadPieza=91
    ubicaciones=33;
    materialInstrumentos=316
    tecnicasConservacionEntomologia=447;
    paises=455
    tecnicasConservacionBotanica=706;
    origenBotanica=709;
    materialesArqueologia=713;
    tipoMovimientosEgreso=722;
    tipoMovimientosIngreso=729;
    prestamoExterno=723;
    prestamoInterno=724;
    traspasointerno=725;
    devolucionOtro=730
    devolucionDesinfeccion=731
    devolucionRestauracion=732
    devolucionPrestamoInterno=733
    devolucionPrestamoExterno=734

    tecnicasConservacionZoo = 750
    sexo = 754
    /*
    740	1	EN DESINFECCIÓN
739	1	EN RESTAURACIÓN
738	1	OTRO
737	1	EN PRÉSTAMO EXTERNO
736	1	EN PRÉSTAMO INTERNO
735	1	ESTADOS ITEM MOVIMIENTOS

728	1	OTRO	OTRO	
727	1	DESINFECCIÓN	DESINFECCIÓN	
726	1	RESTAURACIÓN	RESTAURACIÓN	
725	1	TRASPASO INTERNO	TRASPASO INTERNO	
724	1	PRÉSTAMO INTERNO	PRÉSTAMO INTERNO	
723	1	PRÉSTAMO EXTERNO	PRÉSTAMO EXTERNO	
    */
    estadosPiezasMovimientos=735;
    diccionarioMovimientoEstado={
        prestamoInterno:{tipoMovimiento:724,estadoPieza:736},
        prestamoExterno:{tipoMovimiento:723,estadoPieza:737},
        restauracion:{tipoMovimiento:726,estadoPieza:739},
        otro:{tipoMovimiento:728,estadoPieza:738},
        desinfecion:{tipoMovimiento:727,estadoPieza:740},

    }


    //museo
    rolCustodio = 3
    rolAdministrador = 1
    rolDirector=2
    rolRestaurador=4;
    rolSinPermisos=5;
    motivosBaja=741
    estadoDadoBaja=748
}