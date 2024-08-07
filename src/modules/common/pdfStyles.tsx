import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
    page: {
        fontFamily: 'SourceSansPro',
        display: 'flex',
        paddingTop: 40,
        paddingBottom: 100,
        paddingHorizontal: 40,
    },
    //Header
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 12,
    },
    fnr: {
        fontWeight: 'normal',
        fontSize: 12,
    },

    //Fonts
    h1: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    h3: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    normaltekst: {
        paddingTop: 2.5,
        fontSize: 11,
    },

    // General
    section: {
        padding: 10,
    },
    twoColumns: {
        width: '50%',
    },
    threeColumns: {
        width: '33%',
    },
    pageNumber: {
        fontSize: 11,
    },

    //Tables
    flexGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    tableTitle: {
        paddingVertical: 10,
        width: '100%',
    },
    flexSection: {
        paddingTop: 12,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        paddingVertical: 2,
        paddingRight: 10,
        width: '33%',
    },

    //Footer
    footer: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        paddingTop: 10,
        fontSize: 11,
    },

    //Detaljert
    h2Container: {
        display: 'flex',
        flexDirection: 'column',
    },
    introRow: {
        display: 'flex',
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    //Liste
    liste: {
        marginHorizontal: 10,
        borderTop: '1px solid black',
        borderBottom: '1px solid #979797',
    },
    listeRow: {
        paddingVertical: 10,
        borderTop: '1px solid #979797',
    },
});
