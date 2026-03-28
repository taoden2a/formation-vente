import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { renderToBuffer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", backgroundColor: "#ffffff" },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "#ea580c", marginBottom: 4 },
  subtitle: { fontSize: 10, color: "#6b7280" },
  divider: { borderBottom: "1px solid #e5e7eb", marginVertical: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  label: { fontSize: 10, color: "#6b7280" },
  value: { fontSize: 10, color: "#111827", fontWeight: "bold" },
  table: { marginTop: 20, borderTop: "1px solid #e5e7eb" },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    paddingTop: 10,
    paddingBottom: 10,
  },
  tableLabel: { flex: 3, fontSize: 10, color: "#111827" },
  tableValue: { flex: 1, fontSize: 10, color: "#111827", textAlign: "right" },
  total: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  totalLabel: { fontSize: 12, fontWeight: "bold", color: "#111827" },
  totalValue: { fontSize: 12, fontWeight: "bold", color: "#ea580c" },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#9ca3af",
    textAlign: "center",
  },
});

export async function generateInvoicePDF({
  invoiceNumber,
  date,
  customerEmail,
  amount,
}: {
  invoiceNumber: string;
  date: Date;
  customerEmail: string;
  amount: number;
}): Promise<Buffer> {
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Comprendre pour Vendre</Text>
          <Text style={styles.subtitle}>comprendrepourvendre.com</Text>
        </View>

        <View style={styles.divider} />

        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          FACTURE
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Numéro de facture</Text>
          <Text style={styles.value}>{invoiceNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date.toLocaleDateString("fr-FR")}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{customerEmail}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              Formation &quot;Comprendre pour Vendre&quot;
            </Text>
            <Text style={styles.tableValue}>{amount}€</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>
              TVA (non applicable — art. 293 B du CGI)
            </Text>
            <Text style={styles.tableValue}>0€</Text>
          </View>
        </View>

        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total TTC</Text>
          <Text style={styles.totalValue}>{amount}€</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.footer}>
          Comprendre pour Vendre — comprendrepourvendre.com —
          contact@comprendrepourvendre.com{"\n"}
          TVA non applicable en vertu de l&apos;article 293 B du CGI
        </Text>
      </Page>
    </Document>
  );

  return await renderToBuffer(doc);
}
